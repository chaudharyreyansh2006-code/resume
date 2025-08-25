'use client';

import { useGeneration } from '@/components/generation-context';
import LoadingFallback from '@/components/LoadingFallback';
import { PopupSiteLive } from '@/components/PopupSiteLive';
import PreviewActionbar from '@/components/PreviewActionbar';
import { FullResume } from '@/components/resume/FullResume';
import { EditResume } from '@/components/resume/editing/EditResume';
import { useUserActions } from '@/hooks/useUserActions';
import { ResumeData } from '@/lib/server/redisActions';
import { getCVfolioUrl } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Eye, Edit, Save, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';
import { getThemeConfig } from '@/lib/themes';

export default function PreviewClient({ messageTip }: { messageTip?: string }) {
  const { setStep } = useGeneration();
  
  // Complete the generation process when component mounts
  useEffect(() => {
    setStep('complete');
  }, [setStep]);
  
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  const {
    resumeQuery,
    toggleStatusMutation,
    usernameQuery,
    saveResumeDataMutation,
  } = useUserActions();
  const [showModalSiteLive, setModalSiteLive] = useState(false);
  const [localResumeData, setLocalResumeData] = useState<ResumeData>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);

  useEffect(() => {
    if (resumeQuery.data?.resume?.resumeData) {
      console.log('🎨 [Preview Client] Resume data loaded successfully:', {
        hasResumeData: !!resumeQuery.data?.resume?.resumeData,
        hasHeader: !!resumeQuery.data?.resume?.resumeData?.header,
        headerName: resumeQuery.data?.resume?.resumeData?.header?.name,
        hasSummary: !!resumeQuery.data?.resume?.resumeData?.summary,
        workExperienceCount: resumeQuery.data?.resume?.resumeData?.workExperience?.length || 0
      });
      setLocalResumeData(resumeQuery.data?.resume?.resumeData);
    } else {
      console.log('❌ [Preview Client] No resume data found in query result:', {
        hasQueryData: !!resumeQuery.data,
        hasResume: !!resumeQuery.data?.resume,
        queryStatus: resumeQuery.status,
        isLoading: resumeQuery.isLoading,
        isError: resumeQuery.isError
      });
    }
  }, [resumeQuery.data?.resume?.resumeData]);

  console.log('🎨 [Preview Client] Current state:', {
    resumeQueryStatus: resumeQuery.status,
    hasLocalResumeData: !!localResumeData,
    messageTip
  });

  const handleSaveChanges = async () => {
    if (!localResumeData) {
      toast.error('No resume data to save');
      return;
    }

    try {
      await saveResumeDataMutation.mutateAsync(localResumeData);
      toast.success('Changes saved successfully');
      setHasUnsavedChanges(false);
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to save changes: ${error.message}`);
      } else {
        toast.error('Failed to save changes');
      }
    }
  };

  const handleDiscardChanges = () => {
    // Show confirmation dialog instead of immediately discarding
    setShowDiscardConfirmation(true);
  };

  const confirmDiscardChanges = () => {
    // Reset to original data
    if (resumeQuery.data?.resume?.resumeData) {
      setLocalResumeData(resumeQuery.data?.resume?.resumeData);
    }
    setHasUnsavedChanges(false);
    setIsEditMode(false);
    setShowDiscardConfirmation(false);
    toast.info('Changes discarded');
  };

  const handleResumeChange = (newResume: ResumeData) => {
    setLocalResumeData(newResume);
    setHasUnsavedChanges(true);
  };

  if (
    resumeQuery.isLoading ||
    usernameQuery.isLoading ||
    !usernameQuery.data ||
    !localResumeData
  ) {
    return <LoadingFallback message="Loading..." />;
  }

  const CustomLiveToast = () => (
    <div className="w-fit min-w-[360px] h-[44px] items-center justify-between relative rounded-md bg-[#eaffea] border border-[#009505] shadow-md flex flex-row gap-2 px-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        preserveAspectRatio="none"
      >
        <rect width="24" height="24" rx="4" fill="#EAFFEA"></rect>
        <path
          d="M16.6668 8.5L10.2502 14.9167L7.3335 12"
          stroke="#009505"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <p className="text-sm text-left text-[#003c02] mr-2">
        <span className="hidden md:block"> Your website has been updated!</span>
        <span className="md:hidden"> Website updated!</span>
      </p>
      <a
        href={getCVfolioUrl(usernameQuery.data.username)}
        target="_blank"
        className="flex justify-center items-center overflow-hidden gap-1 px-3 py-1 rounded bg-[#009505] h-[26px]"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="grow-0 shrink-0 w-2.5 h-2.5 relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M6.86768 2.39591L1.50684 7.75675L2.2434 8.49331L7.60425 3.13248V7.60425H8.64591V1.35425H2.39591V2.39591H6.86768Z"
            fill="white"
          ></path>
        </svg>
        <p className="grow-0 shrink-0 text-sm font-medium text-left text-white">
          View
        </p>
      </a>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-background flex flex-col pb-8">
      {/* Sticky Header Container */}
      <div className="sticky top-0 z-50 top-16 px-4">
        {messageTip && (
          <div className="max-w-3xl mx-auto w-full md:px-0 px-4">
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4 flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{messageTip}</p>
            </div>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto w-full md:px-0 py-4">
          <PreviewActionbar
            initialUsername={usernameQuery.data.username}
            status={resumeQuery.data?.resume?.status}
            onStatusChange={async (newStatus) => {
              await toggleStatusMutation.mutateAsync(newStatus);
              const isFirstTime = !localStorage.getItem('publishedSite');

              if (isFirstTime && newStatus === 'live') {
                setModalSiteLive(true);
                localStorage.setItem('publishedSite', new Date().toDateString());
              } else {
                if (newStatus === 'draft') {
                  toast.warning('Your website has been unpublished');
                } else {
                  toast.custom((t) => <CustomLiveToast />);
                }
              }
            }}
            isChangingStatus={toggleStatusMutation.isPending}
          />
        </div>

        <div className="max-w-3xl mx-auto gap-2 flex flex-row rounded-lg bg-[#fcfcfc] border-[0.5px] border-neutral-300 items-center justify-center px-4 py-2  sm:px-4 sm:py-2.5">
          <ToggleGroup
            type="single"
            value={isEditMode ? 'edit' : 'preview'}
            onValueChange={(value) => setIsEditMode(value === 'edit')}
            aria-label="View mode"
          >
            <ToggleGroupItem value="preview" aria-label="Preview mode">
              <Eye className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Preview</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="edit" aria-label="Edit mode">
              <Edit className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </ToggleGroupItem>
          </ToggleGroup>

          {isEditMode && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDiscardChanges}
                className="flex items-center gap-1"
                disabled={!hasUnsavedChanges || saveResumeDataMutation.isPending}
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Discard</span>
              </Button>
              <Button
                onClick={handleSaveChanges}
                className="flex items-center gap-1"
                disabled={!hasUnsavedChanges || saveResumeDataMutation.isPending}
              >
                {saveResumeDataMutation.isPending ? (
                  <span className="animate-spin">⌛</span>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {saveResumeDataMutation.isPending ? 'Saving...' : 'Save'}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 pt-4 px-4">
        <div className="max-w-3xl mx-auto w-full rounded-lg z-10 md:rounded-lg border-[0.5px] border-neutral-300 flex items-center justify-between">
          {isEditMode ? (
            <EditResume
              resume={localResumeData}
              onChangeResume={handleResumeChange}
            />
          ) : (
            <div className={`w-full ${getThemeConfig(localResumeData?.theme || 'default').backgroundClass} ${getThemeConfig(localResumeData?.theme || 'default').containerClass}`}>
            <FullResume
              resume={localResumeData}
              profilePicture={localResumeData?.profilePicture || '/placeholder-user.jpg'}
              theme={localResumeData?.theme || 'default'}
            />
          </div>
        )}
      </div>

      <AlertDialog
        open={showDiscardConfirmation}
        onOpenChange={setShowDiscardConfirmation}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to discard your changes? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDiscardChanges}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PopupSiteLive
        isOpen={showModalSiteLive}
        websiteUrl={getCVfolioUrl(usernameQuery.data.username)}
        onClose={() => {
          setModalSiteLive(false);
        }}
      />
    </div>
    </div>
  );
}
