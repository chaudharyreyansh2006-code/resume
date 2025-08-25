import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { 
  getResume, 
  storeResume, 
  createUsernameLookup,
  getUsernameById 
} from '@/lib/server/redisActions';
import { scrapePdfContent } from '@/lib/server/scrapePdfContent';
import { deleteVercelBlob } from '@/lib/server/deleteVercelBlob';
import { generateResumeObject } from '@/lib/server/ai/generateResumeObject';
import { MAX_USERNAME_LENGTH } from '@/lib/config';
import { ResumeDataSchemaType } from '@/lib/resume';
import { authRateLimit, getClientIP, checkRateLimit } from '@/lib/server/rateLimit';

export async function POST(request: Request) {
  try {
    // Authentication check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = await checkRateLimit(user.id, authRateLimit);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' }, 
        { status: 429 }
      );
    }
    
    // Get resume data from Redis
    const resume = await getResume(user.id);

    if (!resume || !resume.file || !resume.file.url) {
      return NextResponse.json(
        { error: 'No resume file found. Please upload a PDF first.' }, 
        { status: 400 }
      );
    }

    // Step 1: Always extract PDF content from the current file
    let fileContent: string;
    try {
      fileContent = await scrapePdfContent(resume.file.url);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to extract content from PDF. Please try uploading again.' }, 
        { status: 400 }
      );
    }

    // Content quality check
    if (!fileContent || fileContent.trim().length < 100) {
      // Clean up the blob if content is insufficient - Fixed: Pass object with url property
      if (resume.file.url) {
        try {
          await deleteVercelBlob({ url: resume.file.url });
        } catch (cleanupError) {
          // Silent cleanup failure - not critical
        }
      }
      
      return NextResponse.json(
        { error: 'The PDF content appears to be insufficient or unreadable. Please upload a different PDF.' }, 
        { status: 400 }
      );
    }

    // Step 2: Generate AI resume data
    let resumeObject: ResumeDataSchemaType;
    
    try {
      // Fixed: Handle potential undefined return from generateResumeObject
      const generatedObject = await generateResumeObject(fileContent);
      
      if (!generatedObject) {
        throw new Error('AI generation returned null or undefined');
      }
      
      resumeObject = generatedObject;
    } catch (error) {
      // Create fallback resume object
      resumeObject = {
        header: {
          name: user?.user_metadata?.full_name || user?.email || 'user',
          shortAbout: 'This is a short description of your profile',
          location: '',
          contacts: {},
          skills: ['Add your skills here'],
        },
        summary: 'You should add a summary here',
        workExperience: [],
        education: [],
        profilePicture: undefined,
        sectionVisibility: {
          summary: true,
          workExperience: true,
          education: true,
          skills: true,
          projects: false,
          certifications: false,
          languages: false,
          cvfolioBadge: true,
        },
        projects: [],
        certifications: [],
        languages: [],
        theme: 'default',
      };
    }

    // Step 3: Store complete resume data in Redis
    await storeResume(user.id, {
      ...resume,
      fileContent: fileContent,
      resumeData: resumeObject,
    });

    // Step 4: Generate username if needed
    const foundUsername = await getUsernameById(user.id);
    const saltLength = 6;

    const createSalt = () =>
      Math.random()
        .toString(36)
        .substring(2, 2 + saltLength);

    if (!foundUsername) {
      const userName = resumeObject?.header?.name || 'user';
      const username =
        (
          userName
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-') + '-'
        ).slice(0, MAX_USERNAME_LENGTH - saltLength) + createSalt();

      const creation = await createUsernameLookup({
        userId: user.id,
        username,
      });

      if (!creation) {
        return NextResponse.json(
          { error: 'Failed to create username. Please try again.' }, 
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Resume processed successfully' 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' }, 
      { status: 500 }
    );
  }
}

export const maxDuration = 40;