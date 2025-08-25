import React from 'react';
import { createClient } from '@/utils/supabase/server';
import PreviewClient from './client';
import {
  createUsernameLookup,
  getResume,
  getUsernameById,
  storeResume,
} from '../../../lib/server/redisActions';
import { generateResumeObject } from '@/lib/server/ai/generateResumeObject';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import GenerationProgress from '@/components/GenerationProgress';
import { MAX_USERNAME_LENGTH } from '@/lib/config';
import { ResumeDataSchemaType } from '@/lib/resume';
import PreviewStepUpdater from '@/components/PreviewStepUpdater';

async function LLMProcessing({ userId }: { userId: string }) {
  console.log('🤖 [AI Processing] Starting LLM processing for user:', userId);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let resume = await getResume(userId);
  console.log('🤖 [AI Processing] Retrieved resume from Redis:', {
    hasResume: !!resume,
    hasFileContent: !!resume?.fileContent,
    hasFile: !!resume?.file,
    hasResumeData: !!resume?.resumeData,
    fileContentLength: resume?.fileContent?.length
  });

  if (!resume?.fileContent || !resume.file) {
    console.log('❌ [AI Processing] Missing file content or file, redirecting to upload');
    redirect('/upload');
  }

  let messageTip: string | undefined;

  if (!resume.resumeData) {
    console.log('🤖 [AI Processing] No resume data found, starting AI generation...');
    console.log('🤖 [AI Processing] Input file content preview:', {
      contentLength: resume.fileContent.length,
      contentPreview: resume.fileContent.substring(0, 300) + '...'
    });
    
    // Declare resumeObject outside the try block
    let resumeObject: ResumeDataSchemaType | undefined;
    
    try {
      resumeObject = await generateResumeObject(resume?.fileContent);
      console.log('🤖 [AI Processing] AI generation completed:', {
        success: !!resumeObject,
        hasHeader: !!resumeObject?.header,
        hasName: !!resumeObject?.header?.name,
        hasSummary: !!resumeObject?.summary,
        workExperienceCount: resumeObject?.workExperience?.length || 0,
        educationCount: resumeObject?.education?.length || 0
      });

      if (!resumeObject) {
        console.log('❌ [AI Processing] AI generation failed, creating fallback resume object');
        messageTip =
          "We couldn't extract data from your PDF. Please edit your resume manually.";
        
        // Create a complete resumeObject with all required fields
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
        console.log('🤖 [AI Processing] Created fallback resume object');
      }
    } catch (error) {
      console.error('❌ [AI Processing] Error during AI generation:', error);
      console.error('❌ [AI Processing] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Create fallback object on error
      messageTip = "We couldn't extract data from your PDF. Please edit your resume manually.";
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
    }

    console.log('💾 [AI Processing] Storing resume with AI-generated data');
    await storeResume(userId, {
      ...resume,
      resumeData: resumeObject,
    });
    resume.resumeData = resumeObject;
    console.log('✅ [AI Processing] Resume stored successfully with AI data');
  } else {
    console.log('✅ [AI Processing] Resume data already exists, skipping AI generation');
  }

  // we set the username only if it wasn't already set for this user meaning it's new user
  const foundUsername = await getUsernameById(userId);

  const saltLength = 6;

  const createSalt = () =>
    Math.random()
      .toString(36)
      .substring(2, 2 + saltLength);

  if (!foundUsername) {
    // Safe access to resume.resumeData with null check
    const userName = resume.resumeData?.header?.name || 'user';
    const username =
      (
        userName
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-') + '-'
      ).slice(0, MAX_USERNAME_LENGTH - saltLength) + createSalt();

    const creation = await createUsernameLookup({
      userId,
      username,
    });

    if (!creation) redirect('/upload?error=usernameCreationFailed');
  }

  return <PreviewClient messageTip={messageTip} />;
}

export default async function Preview() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <PreviewStepUpdater />
      <Suspense fallback={<GenerationProgress />}>
        <LLMProcessing userId={user.id} />
      </Suspense>
    </>
  );
}

export const maxDuration = 40;
