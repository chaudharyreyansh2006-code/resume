'use client';

import { Button } from '@/components/ui/button';
import { Dropzone } from '@/components/ui/dropzone';
import { Linkedin, X, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserActions } from '@/hooks/useUserActions';
import { useSubscription } from '@/hooks/use-subscription';
import { useEffect, useState } from 'react';
import { CustomSpinner } from '@/components/CustomSpinner';
import LoadingFallback from '@/components/LoadingFallback';
import { useGeneration } from '@/components/generation-context';
import GenerationProgress from '@/components/GenerationProgress';

import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';

type FileState =
  | { status: 'empty' }
  | { status: 'saved'; file: { name: string; url: string; size: number } };

export default function UploadPageClient() {
  const router = useRouter();
  const { setStep, isGenerating } = useGeneration();

  const { resumeQuery, uploadResumeMutation } = useUserActions();
  const { hasActiveSubscription, isPro, loading: subscriptionLoading } = useSubscription();
  const [fileState, setFileState] = useState<FileState>({ status: 'empty' });

  const resume = resumeQuery.data?.resume;

  // Update fileState whenever resume changes
  useEffect(() => {
    if (resume?.file?.url && resume.file.name && resume.file.size) {
      setFileState({
        status: 'saved',
        file: {
          name: resume.file.name,
          url: resume.file.url,
          size: resume.file.size,
        },
      });
    }
  }, [resume]);

  const handleUploadFile = async (file: File) => {
    uploadResumeMutation.mutate(file);
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleUploadFile(acceptedFiles[0]);
    }
  };

  const handleReset = () => {
    setFileState({ status: 'empty' });
  };

  const handleGenerateWebsite = async () => {
    if (!isPro) {
      router.push('/subscribe');
      return;
    }
    
    // Start the generation process immediately
    setStep('processing');
    
    try {
      const response = await fetch('/api/process-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process resume');
      }
    
      const result = await response.json();
      
      // Success - redirect to preview page
      router.push('/preview');
      
    } catch (error) {
      console.error('Error processing resume:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process resume. Please try again.');
      
      // Reset the generation state on error
      setStep('idle');
    }
  };

  if (resumeQuery.isLoading || subscriptionLoading) {
    return <LoadingFallback message="Loading..." />;
  }

  // Show generation progress if generating
  if (isGenerating) {
    return <GenerationProgress />;
  }

  const isUpdating = resumeQuery.isPending || uploadResumeMutation.isPending;

  return (
    <div className="flex flex-col items-center flex-1 px-4 py-12 gap-6">
      <div className="w-full max-w-[438px] text-center font-mono">
        <h1 className="text-base text-center pb-6">
          Resume In ⟶ Website Out
        </h1>

        <div className="relative">
          {fileState.status !== 'empty' && (
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full z-10"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          <Dropzone
            accept={{ 'application/pdf': ['.pdf'] }}
            maxFiles={1}
            icon={
              fileState.status !== 'empty' ? (
                <img src="/uploaded-pdf.svg" className="h-6 w-6" />
              ) : (
                <img src="/upload.svg" className="h-6 w-6" />
              )
            }
            title={
              <span className="text-base font-bold text-center text-design-black">
                {fileState.status !== 'empty'
                  ? fileState.file.name
                  : 'Upload PDF'}
              </span>
            }
            description={
              <span className="text-xs font-light text-center text-design-gray">
                {fileState.status !== 'empty'
                  ? `${(fileState.file.size / 1024 / 1024).toFixed(2)} MB`
                  : 'Resume or LinkedIn PDF'}
              </span>
            }
            isUploading={isUpdating}
            onDrop={handleFileDrop}
            onDropRejected={() => toast.error('Only PDF files are supported')}
            maxSize={10 * 1024 * 1024}
            className="p-8"
          />
        </div>
      </div>
      
      {/* Subscription Status Alert */}
      {!isPro && (
        <Alert className="w-full max-w-[438px] border-amber-200 bg-amber-50">
          <Crown className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <span className="font-medium">Upgrade to Pro</span> to generate unlimited websites.
            <Button
              variant="link"
              className="p-0 h-auto ml-1 text-amber-700 underline"
              onClick={() => router.push('/subscribe')}
            >
              Upgrade now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="font-mono">
        <div className="relative">
          <Button
            className="px-4 py-3 h-auto bg-design-black hover:bg-design-black/95"
            disabled={fileState.status === 'empty' || isUpdating || !isPro}
            onClick={handleGenerateWebsite}
          >
            {isUpdating ? (
              <>
                <CustomSpinner className="h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              <>
                <img src="/sparkle.png" alt="Sparkle Icon" className="h-5 w-5 mr-2" />
                {isPro ? 'Generate Website' : 'Upgrade to Generate'}
              </>
            )}
          </Button>
          {fileState.status === 'empty' && isPro && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="absolute inset-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a PDF to continue</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {!isPro && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="absolute inset-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to Pro to generate websites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn PDF</span>
        </div>
        <div className="text-gray-400">or</div>
        <div className="flex items-center gap-2">
          <span>📄</span>
          <span>Resume PDF</span>
        </div>
      </div>
    </div>
  );
}