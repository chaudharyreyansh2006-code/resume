import { getResume, storeResume, getUsernameById } from '@/lib/server/redisActions';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { invalidateUserCache, invalidatePublicPageCache } from '@/lib/server/cache';
import { authRateLimit, authHourlyRateLimit, getClientIP, checkRateLimit } from '@/lib/server/rateLimit';
import { validateResumeData } from '@/lib/server/validation';
import { scheduleFileCleanup } from '@/lib/server/fileCleanup'

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = await getResume(user.id);

    if (!resume) {
      return NextResponse.json({ resume: null });
    }

    return NextResponse.json({ resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// In your resume upload/update handler:
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const userRateCheck = await checkRateLimit(user.id, authRateLimit, authHourlyRateLimit);
    const ipRateCheck = await checkRateLimit(clientIP, authRateLimit, authHourlyRateLimit);
    
    if (!userRateCheck.success || !ipRateCheck.success) {
      const failedCheck = !userRateCheck.success ? userRateCheck : ipRateCheck;
      const resetTime = failedCheck.reset || Date.now() + 60000; // Default to 1 minute if undefined
      
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds.`,
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    const body = await request.json();
    const { resumeData, status, file } = body;

    let validatedResumeData = undefined;

    // If resumeData is provided, validate it
    if (resumeData) {
      const validation = validateResumeData(resumeData);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }
      validatedResumeData = validation.sanitized;
    }

    const currentResume = await getResume(user.id);
    const updatedResume = {
      ...currentResume,
      // Update status if provided, otherwise keep current status
      status: status || currentResume?.status || 'draft',
      // Update resumeData if provided and validated
      ...(validatedResumeData && { resumeData: validatedResumeData }),
      // Update file if provided
      ...(file && { file }),
    };

    await storeResume(user.id, updatedResume);

    // Invalidate caches when resume is updated
    invalidateUserCache(user.id);
    
    // If resume is published, also invalidate public page cache
    if (updatedResume.status === 'live') {
      const username = await getUsernameById(user.id);
      if (username) {
        invalidatePublicPageCache(username);
      }
    }

    // Schedule file cleanup if there's a new file URL
    if (file && typeof file === 'string') {
      scheduleFileCleanup(user.id, file);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
