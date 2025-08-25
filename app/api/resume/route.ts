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
    console.error('❌ [API Resume GET] Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
        console.error('❌ [API Resume POST] Validation failed:', validation.error);
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }
      validatedResumeData = validation.sanitized;
    }

    const currentResume = await getResume(user.id);
    
    // Schedule file cleanup BEFORE storing the new resume if there's a new file
    if (file && currentResume?.file?.url) {
      const newFileUrl = typeof file === 'string' ? file : file.url;
      const oldFileUrl = currentResume.file.url;
      
      if (newFileUrl && oldFileUrl && newFileUrl !== oldFileUrl) {
        scheduleFileCleanup(user.id, oldFileUrl);
      }
    }
    
    const updatedResume = {
      ...currentResume,
      status: status || currentResume?.status || 'draft',
      ...(validatedResumeData && { resumeData: validatedResumeData }),
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

    // Remove the old cleanup scheduling code that was using the new file URL

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ [API Resume POST] Error saving resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
