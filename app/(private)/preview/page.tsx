import React from 'react';
import { createClient } from '@/utils/supabase/server';
import PreviewClient from './client';
import { getResume } from '../../../lib/server/redisActions';
import { redirect } from 'next/navigation';
import PreviewStepUpdater from '@/components/PreviewStepUpdater';

export default async function Preview() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Only fetch data from Redis - no processing
  const resume = await getResume(user.id);

  // If no resume data exists, redirect to upload
  if (!resume?.resumeData || !resume?.file) {
    redirect('/upload');
  }

  return (
    <>
      <PreviewStepUpdater />
      <PreviewClient />
    </>
  );
}
