import { del } from '@vercel/blob';

export const deleteVercelBlob = async ({
  url,
}: {
  url: string;
}) => {
  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting file from Vercel Blob:', error);
    throw new Error('Failed to delete file from Vercel Blob');
  }
};