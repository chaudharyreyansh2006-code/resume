import { del } from '@vercel/blob';

export const deleteVercelBlob = async ({
  url,
}: {
  url: string;
}) => {
  try {
    console.log(`Deleting file from Vercel Blob: ${url}`);
    
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log(`File deleted from Vercel Blob: ${url}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file from Vercel Blob:', error);
    throw new Error('Failed to delete file from Vercel Blob');
  }
};