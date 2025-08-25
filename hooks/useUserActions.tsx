import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Resume, ResumeData } from '@/lib/server/redisActions';
import { PublishStatuses } from '@/components/PreviewActionbar';
import { ResumeDataSchema } from '@/lib/resume';

// Fetch resume data
const fetchResume = async (): Promise<{
  resume: Resume | undefined;
}> => {
  const response = await fetch('/api/resume');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch resume');
  }
  return await response.json();
};

const fetchUsername = async (): Promise<{
  username: string;
}> => {
  const response = await fetch('/api/username');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch username');
  }
  return await response.json();
};

const checkUsernameAvailability = async (
  username: string
): Promise<{
  available: boolean;
}> => {
  const response = await fetch(
    `/api/check-username?username=${encodeURIComponent(username)}`,
    {
      method: 'POST',
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to check username availability');
  }
  return await response.json();
};

export function useUserActions() {
  const queryClient = useQueryClient();

  // Query for fetching resume data
  const resumeQuery = useQuery({
    queryKey: ['resume'],
    queryFn: fetchResume,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Prevent refetch on tab switch
    refetchOnMount: false, // Only fetch if data is stale
    retry: 1,
  });

  const usernameQuery = useQuery({
    queryKey: ['username'],
    queryFn: fetchUsername,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  const internalResumeUpdate = async (newResume: Resume) => {
    const response = await fetch('/api/resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newResume),
    });

    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(new Error(error));
    }
  };

  const internalUsernameUpdate = async (newUsername: string) => {
    const response = await fetch('/api/username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername }),
    });

    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return {
      success: true,
    };
  };

  // Upload file to Vercel Blob
  const uploadToVercelBlob = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `/api/blob-upload?filename=${encodeURIComponent(file.name)}`,
      {
        method: 'POST',
        body: file,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  };

  // Update resume data in Upstash
  // Update uploadFileResume function
  const uploadFileResume = async (file: File) => {
    console.log('📤 [useUserActions] Starting file upload to Vercel Blob:', {
      fileName: file.name,
      fileSize: file.size
    });
    
    const fileOnBlob = await uploadToVercelBlob(file);
    console.log('✅ [useUserActions] File uploaded to Vercel Blob:', fileOnBlob);
  
    const newResume: Resume = {
      file: {
        name: file.name,
        url: fileOnBlob.url,
        size: fileOnBlob.size || file.size,
        pathname: fileOnBlob.pathname,
      },
      resumeData: undefined, // Force AI regeneration
      fileContent: null, // Clear cached content
      status: 'draft',
    };
    
    console.log('💾 [useUserActions] Updating query cache with new resume:', newResume);
    queryClient.setQueryData(['resume'], (oldData: any) => {
      console.log('💾 [useUserActions] Old cache data:', oldData);
      const updatedData = {
        ...oldData,
        resume: newResume,
      };
      console.log('💾 [useUserActions] New cache data:', updatedData);
      return updatedData;
    });
  
    console.log('🔄 [useUserActions] Calling internal resume update API');
    await internalResumeUpdate(newResume);
    console.log('✅ [useUserActions] Internal resume update completed');
  };
  
  // Update uploadResumeMutation
  const uploadResumeMutation = useMutation({
    mutationFn: uploadFileResume,
    onSuccess: () => {
      console.log('✅ [useUserActions] Upload mutation succeeded, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['resume'] });
    },
    onError: (error) => {
      console.error('❌ [useUserActions] Upload mutation failed:', error);
    },
  });

  // Mutation for toggling status of publishment
  const toggleStatusMutation = useMutation({
    mutationFn: async (newPublishStatus: PublishStatuses) => {
      if (!resumeQuery.data?.resume) return;
      await internalResumeUpdate({
        ...resumeQuery.data?.resume,
        status: newPublishStatus,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ['resume'] });
    },
  });

  // mutation to allow editing a username for a user_id, if it fails means that username is already taken
  const updateUsernameMutation = useMutation({
    mutationFn: internalUsernameUpdate,
    onSuccess: () => {
      // Invalidate and refetch username data
      queryClient.invalidateQueries({ queryKey: ['username'] });
    },
    throwOnError: false,
  });

  // Mutation for checking username availability
  const checkUsernameMutation = useMutation({
    mutationFn: checkUsernameAvailability,
    onSuccess: () => {
      // Invalidate and refetch username availability data
      queryClient.invalidateQueries({ queryKey: ['username-availability'] });
    },
  });

  // Function to save resume data changes
  const saveResumeDataChanges = async (newResumeData: ResumeData) => {
    // Validate the resume data using Zod schema
    try {
      // Validate the resume data
      ResumeDataSchema.parse(newResumeData);

      // If validation passes, update the resume
      if (!resumeQuery.data?.resume) {
        throw new Error('No resume found to update');
      }

      const updatedResume: Resume = {
        ...resumeQuery.data.resume,
        resumeData: newResumeData,
      };

      await internalResumeUpdate(updatedResume);

      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Validation failed: ${error.message}`);
      }
      throw error;
    }
  };

  // Mutation for saving resume data changes
  const saveResumeDataMutation = useMutation({
    mutationFn: saveResumeDataChanges,
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ['resume'] });
    },
  });

  return {
    resumeQuery,
    uploadResumeMutation,
    toggleStatusMutation,
    usernameQuery,
    updateUsernameMutation,
    checkUsernameMutation,
    saveResumeDataMutation,
  };
}
