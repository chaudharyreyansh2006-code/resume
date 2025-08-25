import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { getResume, storeResume } from '../../../lib/server/redisActions';
import { redirect } from 'next/navigation';
// Remove generation context imports
// import { Suspense } from 'react';
// import GenerationProgress from '@/components/GenerationProgress';
// import PdfStepUpdater from '@/components/PdfStepUpdater';
import { scrapePdfContent } from '@/lib/server/scrapePdfContent';
import { deleteVercelBlob } from '@/lib/server/deleteVercelBlob';

async function PdfProcessing({ userId }: { userId: string }) {
  const resume = await getResume(userId);

  if (!resume || !resume.file || !resume.file.url) redirect('/upload');

  if (!resume.fileContent) {
    const fileContent = await scrapePdfContent(resume?.file.url);

    const isContentBad = false;

    if (isContentBad) {
      await deleteVercelBlob({
        url: resume.file.url,
      });

      await storeResume(userId, {
        ...resume,
        file: undefined,
        fileContent: null,
        resumeData: null,
      });

      redirect('/upload');
    }

    await storeResume(userId, {
      ...resume,
      fileContent: fileContent,
      resumeData: null, // Force AI regeneration
    });
  }

  redirect('/preview');
  return <></>;
}

export default async function Pdf() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Remove all generation context components
  return <PdfProcessing userId={user.id} />;
}

export const maxDuration = 40;
