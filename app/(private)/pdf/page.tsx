import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { getResume, storeResume } from '../../../lib/server/redisActions';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import GenerationProgress from '@/components/GenerationProgress';
import { scrapePdfContent } from '@/lib/server/scrapePdfContent';
import { deleteVercelBlob } from '@/lib/server/deleteVercelBlob';
import PdfStepUpdater from '@/components/PdfStepUpdater';

async function PdfProcessing({ userId }: { userId: string }) {
  const resume = await getResume(userId);

  if (!resume || !resume.file || !resume.file.url) redirect('/upload');

  if (!resume.fileContent) {
    const fileContent = await scrapePdfContent(resume?.file.url);

    // check if the fileContent was good or bad, if bad we redirect to the upload page and delete the object from Vercel Blob and redis
    const isContentBad = false; // await isFileContentBad(fileContent);

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
      resumeData: null,
    });
  }

  redirect('/preview');
  return <></>; // This line will never be reached due to the redirect
}

export default async function Pdf() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <PdfStepUpdater />
      <Suspense fallback={<GenerationProgress />}>
        <PdfProcessing userId={user.id} />
      </Suspense>
    </>
  );
}
