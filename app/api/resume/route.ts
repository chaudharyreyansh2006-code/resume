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

    console.log('📖 [API Resume GET] Fetching resume for user:', user.id);
    const resume = await getResume(user.id);
    console.log('📖 [API Resume GET] Retrieved resume:', {
      hasResume: !!resume,
      hasFile: !!resume?.file,
      fileUrl: resume?.file?.url,
      hasResumeData: !!resume?.resumeData,
      status: resume?.status
    });

    if (!resume) {
      console.log('📖 [API Resume GET] No resume found, returning null');
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
    console.log('📝 [API Resume POST] Request body:', body);
    const { resumeData, status, file } = body;

    let validatedResumeData = undefined;

    // If resumeData is provided, validate it
    if (resumeData) {
      console.log('✅ [API Resume POST] Validating resume data');
      const validation = validateResumeData(resumeData);
      if (!validation.valid) {
        console.error('❌ [API Resume POST] Validation failed:', validation.error);
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        );
      }
      validatedResumeData = validation.sanitized;
      console.log('✅ [API Resume POST] Resume data validated successfully');
    }

    console.log('📖 [API Resume POST] Fetching current resume for user:', user.id);
    const currentResume = await getResume(user.id);
    console.log('📖 [API Resume POST] Current resume:', {
      hasCurrentResume: !!currentResume,
      currentFile: currentResume?.file?.url,
      currentStatus: currentResume?.status
    });
    
    // Schedule file cleanup BEFORE storing the new resume if there's a new file
    if (file && currentResume?.file?.url) {
      const newFileUrl = typeof file === 'string' ? file : file.url;
      const oldFileUrl = currentResume.file.url;
      
      if (newFileUrl && oldFileUrl && newFileUrl !== oldFileUrl) {
        console.log('🗑️ [API Resume POST] Scheduling cleanup for old file:', oldFileUrl);
        scheduleFileCleanup(user.id, oldFileUrl);
      }
    }
    
    const updatedResume = {
      ...currentResume,
      status: status || currentResume?.status || 'draft',
      ...(validatedResumeData && { resumeData: validatedResumeData }),
      ...(file && { file }),
    };
    
    console.log('💾 [API Resume POST] Storing updated resume:', {
      hasFile: !!updatedResume.file,
      fileUrl: updatedResume.file?.url,
      hasResumeData: !!updatedResume.resumeData,
      status: updatedResume.status
    });

    await storeResume(user.id, updatedResume);
    console.log('✅ [API Resume POST] Resume stored successfully');

    // Invalidate caches when resume is updated
    console.log('🔄 [API Resume POST] Invalidating user cache');
    invalidateUserCache(user.id);
    
    // If resume is published, also invalidate public page cache
    if (updatedResume.status === 'live') {
      const username = await getUsernameById(user.id);
      if (username) {
        console.log('🔄 [API Resume POST] Invalidating public page cache for:', username);
        invalidatePublicPageCache(username);
      }
    }

    // Remove the old cleanup scheduling code that was using the new file URL

    console.log('✅ [API Resume POST] Resume update completed successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ [API Resume POST] Error saving resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
