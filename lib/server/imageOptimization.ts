import sharp from 'sharp';

export interface OptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export async function optimizeImage(
  buffer: ArrayBuffer,
  options: OptimizationOptions = {}
): Promise<{ buffer: Buffer; contentType: string; size: number }> {
  const {
    width = 400,
    height = 400,
    quality = 80,
    format = 'webp'
  } = options;
  
  try {
    let pipeline = sharp(Buffer.from(buffer))
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      });
    
    // Apply format-specific optimizations
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ quality, effort: 6 });
        break;
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality, progressive: true });
        break;
      case 'png':
        pipeline = pipeline.png({ quality, progressive: true });
        break;
    }
    
    const optimizedBuffer = await pipeline.toBuffer();
    
    return {
      buffer: optimizedBuffer,
      contentType: `image/${format}`,
      size: optimizedBuffer.length
    };
  } catch (error) {
    console.error('Image optimization failed:', error);
    throw new Error('Failed to optimize image');
  }
}

// Profile picture specific optimization
export async function optimizeProfilePicture(buffer: ArrayBuffer) {
  return optimizeImage(buffer, {
    width: 400,
    height: 400,
    quality: 85,
    format: 'webp'
  });
}

// Get optimized filename with WebP extension
export function getOptimizedFilename(originalFilename: string): string {
  const nameWithoutExt = originalFilename.replace(/\.[^/.]+$/, '');
  return `${nameWithoutExt}.webp`;
}