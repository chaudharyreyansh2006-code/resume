import { del } from '@vercel/blob'

export async function cleanupOldResumeFile(userId: string, oldFileUrlToDelete: string) {
  try {
    console.log(`🗑️ [File Cleanup] Starting cleanup for user ${userId}, deleting: ${oldFileUrlToDelete}`);
    
    // Directly delete the specific old file URL
    try {
      await del(oldFileUrlToDelete);
      console.log(`✅ [File Cleanup] Successfully deleted old file: ${oldFileUrlToDelete}`);
    } catch (deleteError) {
      console.error(`❌ [File Cleanup] Failed to delete file ${oldFileUrlToDelete}:`, deleteError);
    }

    console.log(`✅ [File Cleanup] Cleanup completed for user ${userId}`);
  } catch (error) {
    console.error('❌ [File Cleanup] Error during file cleanup:', error);
  }
}

export async function scheduleFileCleanup(userId: string, oldFileUrlToDelete: string) {
  // Schedule cleanup to run after a short delay to ensure the new file is properly saved
  setTimeout(() => {
    cleanupOldResumeFile(userId, oldFileUrlToDelete);
  }, 5000); // 5 second delay
}