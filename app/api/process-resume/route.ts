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

    console.log('🔍 [API Process Resume] Starting complete processing for user:', user.id);
    
    // Get resume data from Redis
    const resume = await getResume(user.id);
    console.log('🔍 [API Process Resume] Retrieved resume from Redis:', {
      hasResume: !!resume,
      hasFile: !!resume?.file,
      fileUrl: resume?.file?.url,
      hasFileContent: !!resume?.fileContent,
      fileSize: resume?.file?.size
    });

    if (!resume || !resume.file || !resume.file.url) {
      console.log('❌ [API Process Resume] Missing resume or file');
      return NextResponse.json(
        { error: 'No resume file found. Please upload a PDF first.' }, 
        { status: 400 }
      );
    }

    // Step 1: Always extract PDF content from the current file
    console.log('📄 [API Process Resume] Extracting PDF content from:', resume.file.url);
    let fileContent: string;
    try {
      fileContent = await scrapePdfContent(resume.file.url);
      console.log('📄 [API Process Resume] PDF content extracted successfully:', {
        contentLength: fileContent.length,
        contentPreview: fileContent.substring(0, 200) + '...'
      });
    } catch (error) {
      console.error('❌ [API Process Resume] PDF extraction failed:', error);
      return NextResponse.json(
        { error: 'Failed to extract content from PDF. Please try uploading again.' }, 
        { status: 400 }
      );
    }

    // Content quality check
    if (!fileContent || fileContent.trim().length < 100) {
      console.log('❌ [API Process Resume] PDF content too short or empty');
      
      // Clean up the blob if content is insufficient - Fixed: Pass object with url property
      if (resume.file.url) {
        try {
          await deleteVercelBlob({ url: resume.file.url });
          console.log('🗑️ [API Process Resume] Cleaned up insufficient PDF blob');
        } catch (cleanupError) {
          console.error('❌ [API Process Resume] Blob cleanup failed:', cleanupError);
        }
      }
      
      return NextResponse.json(
        { error: 'The PDF content appears to be insufficient or unreadable. Please upload a different PDF.' }, 
        { status: 400 }
      );
    }

    // Step 2: Generate AI resume data
    console.log('🤖 [API Process Resume] Starting AI generation with content:', {
      contentLength: fileContent.length,
      contentPreview: fileContent.substring(0, 300) + '...'
    });
    
    let resumeObject: ResumeDataSchemaType;
    
    try {
      // Fixed: Handle potential undefined return from generateResumeObject
      const generatedObject = await generateResumeObject(fileContent);
      
      if (!generatedObject) {
        throw new Error('AI generation returned null or undefined');
      }
      
      resumeObject = generatedObject;
      console.log('🤖 [API Process Resume] AI generation completed:', {
        success: !!resumeObject,
        hasHeader: !!resumeObject?.header,
        hasName: !!resumeObject?.header?.name,
        hasSummary: !!resumeObject?.summary,
        workExperienceCount: resumeObject?.workExperience?.length || 0,
        educationCount: resumeObject?.education?.length || 0
      });
    } catch (error) {
      console.error('❌ [API Process Resume] Error during AI generation:', error);
      
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
        },
        projects: [],
        certifications: [],
        languages: [],
        theme: 'default',
      };
      console.log('🤖 [API Process Resume] Created fallback resume object');
    }

    // Step 3: Store complete resume data in Redis
    console.log('💾 [API Process Resume] Storing complete resume with AI data');
    await storeResume(user.id, {
      ...resume,
      fileContent: fileContent,
      resumeData: resumeObject,
    });
    console.log('✅ [API Process Resume] Complete resume stored successfully in Redis');

    // Step 4: Generate username if needed
    const foundUsername = await getUsernameById(user.id);
    const saltLength = 6;

    const createSalt = () =>
      Math.random()
        .toString(36)
        .substring(2, 2 + saltLength);

    if (!foundUsername) {
      console.log('🔍 [API Process Resume] Creating username for new user');
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
        console.error('❌ [API Process Resume] Username creation failed');
        return NextResponse.json(
          { error: 'Failed to create username. Please try again.' }, 
          { status: 500 }
        );
      }
      console.log('✅ [API Process Resume] Username created successfully:', username);
    }

    console.log('🔍 [API Process Resume] All processing complete');
    return NextResponse.json({ 
      success: true, 
      message: 'Resume processed successfully' 
    });

  } catch (error) {
    console.error('❌ [API Process Resume] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' }, 
      { status: 500 }
    );
  }
}

export const maxDuration = 40;