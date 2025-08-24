import { del } from '@vercel/blob'
import { createClient } from '@/utils/supabase/server'

export async function cleanupOldResumeFiles(userId: string, newFileUrl: string) {
  try {
    const supabase = await createClient()
    
    // Get user's current resume data
    const { data: userData, error } = await supabase
      .from('users')
      .select('resume_data')
      .eq('id', userId)
      .single()

    if (error || !userData?.resume_data) {
      console.log('No existing resume data found for cleanup')
      return
    }

    const resumeData = userData.resume_data
    const oldFileUrls: string[] = []

    // Collect all old file URLs from resume data
    if (resumeData.profilePicture && resumeData.profilePicture !== newFileUrl) {
      oldFileUrls.push(resumeData.profilePicture)
    }

    // Check for any other file references in the resume data
    const collectFileUrls = (obj: any) => {
      if (typeof obj === 'string' && obj.includes('blob.vercel-storage.com')) {
        if (obj !== newFileUrl) {
          oldFileUrls.push(obj)
        }
      } else if (typeof obj === 'object' && obj !== null) {
        Object.values(obj).forEach(collectFileUrls)
      }
    }

    collectFileUrls(resumeData)

    // Delete old files from Vercel Blob
    for (const url of oldFileUrls) {
      try {
        await del(url)
        console.log(`Deleted old file: ${url}`)
      } catch (deleteError) {
        console.error(`Failed to delete file ${url}:`, deleteError)
      }
    }

    console.log(`Cleanup completed for user ${userId}. Deleted ${oldFileUrls.length} old files.`)
  } catch (error) {
    console.error('Error during file cleanup:', error)
  }
}

export async function scheduleFileCleanup(userId: string, newFileUrl: string) {
  // Schedule cleanup to run after a short delay to ensure the new file is properly saved
  setTimeout(() => {
    cleanupOldResumeFiles(userId, newFileUrl)
  }, 5000) // 5 second delay
}