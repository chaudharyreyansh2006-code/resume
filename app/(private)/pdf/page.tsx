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
  console.log('🔍 [PDF Processing] Starting PDF processing for user:', userId);
  const resume = await getResume(userId);
  console.log('🔍 [PDF Processing] Retrieved resume from Redis:', {
    hasResume: !!resume,
    hasFile: !!resume?.file,
    fileUrl: resume?.file?.url,
    hasFileContent: !!resume?.fileContent,
    fileSize: resume?.file?.size
  });

  if (!resume || !resume.file || !resume.file.url) {
    console.log('❌ [PDF Processing] Missing resume or file, redirecting to upload');
    redirect('/upload');
  }

  if (!resume.fileContent) {
    console.log('🔍 [PDF Processing] No file content found, starting PDF scraping for URL:', resume?.file.url);
    
    try {
      const fileContent = await scrapePdfContent(resume?.file.url);
      console.log('✅ [PDF Processing] PDF content extracted successfully:', {
        contentLength: fileContent?.length,
        contentPreview: fileContent?.substring(0, 200) + '...'
      });

      // check if the fileContent was good or bad, if bad we redirect to the upload page and delete the object from Vercel Blob and redis
      const isContentBad = false; // await isFileContentBad(fileContent);
      console.log('🔍 [PDF Processing] Content quality check result:', { isContentBad });

      if (isContentBad) {
        console.log('❌ [PDF Processing] Content quality check failed, cleaning up and redirecting');
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

      console.log('💾 [PDF Processing] Storing resume with extracted content');
      await storeResume(userId, {
        ...resume,
        fileContent: fileContent,
        resumeData: null,
      });
      console.log('✅ [PDF Processing] Resume stored successfully with file content');
    } catch (error) {
      console.error('❌ [PDF Processing] Error during PDF content extraction:', error);
      console.error('❌ [PDF Processing] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      // Continue to redirect even if there's an error
    }
  } else {
    console.log('✅ [PDF Processing] File content already exists, skipping extraction');
  }

  console.log('🔍 [PDF Processing] Redirecting to preview page');
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
