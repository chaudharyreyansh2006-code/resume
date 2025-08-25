import React from 'react';
import { createClient } from '@/utils/supabase/server';
import PreviewClient from './client';
import { getResume } from '../../../lib/server/redisActions';
import { redirect } from 'next/navigation';
import PreviewStepUpdater from '@/components/PreviewStepUpdater';

export default async function Preview() {
  console.log('👁️ [Preview] Loading preview page (display-only)');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Only fetch data from Redis - no processing
  const resume = await getResume(user.id);
  console.log('👁️ [Preview] Retrieved resume from Redis:', {
    hasResume: !!resume,
    hasFileContent: !!resume?.fileContent,
    hasFile: !!resume?.file,
    hasResumeData: !!resume?.resumeData
  });

  // If no resume data exists, redirect to upload
  if (!resume?.resumeData || !resume?.file) {
    console.log('❌ [Preview] No resume data found, redirecting to upload');
    redirect('/upload');
  }

  console.log('✅ [Preview] Displaying existing resume data from Redis');
  return (
    <>
      <PreviewStepUpdater />
      <PreviewClient />
    </>
  );
}
