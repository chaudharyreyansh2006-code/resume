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
import LoadingFallback from '../../../components/LoadingFallback';
import { MAX_USERNAME_LENGTH } from '@/lib/config';

async function LLMProcessing({ userId }: { userId: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let resume = await getResume(userId);

  if (!resume?.fileContent || !resume.file) redirect('/upload');

  let messageTip: string | undefined;

  if (!resume.resumeData) {
    let resumeObject = await generateResumeObject(resume?.fileContent);

    if (!resumeObject) {
      messageTip =
        "We couldn't extract data from your PDF. Please edit your resume manually.";
      resumeObject = {
        header: {
          name:
            user?.user_metadata?.full_name || user?.email || 'user',
          shortAbout: 'This is a short description of your profile',
          location: '',
          contacts: {},
          skills: ['Add your skills here'],
        },
        summary: 'You should add a summary here',
        workExperience: [],
        education: [],
      };
    }

    await storeResume(userId, {
      ...resume,
      resumeData: resumeObject,
    });
    resume.resumeData = resumeObject;
  }

  // we set the username only if it wasn't already set for this user meaning it's new user
  const foundUsername = await getUsernameById(userId);

  const saltLength = 6;

  const createSalt = () =>
    Math.random()
      .toString(36)
      .substring(2, 2 + saltLength);

  if (!foundUsername) {
    const username =
      (
        (resume.resumeData.header.name || 'user')
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
      <Suspense
        fallback={
          <LoadingFallback message="Creating your personal website..." />
        }
      >
        <LLMProcessing userId={user.id} />
      </Suspense>
    </>
  );
}

export const maxDuration = 40;
