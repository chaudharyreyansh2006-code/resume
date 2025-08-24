import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getResume, storeResume } from '@/lib/server/redisActions';
import { authRateLimit, authHourlyRateLimit, getClientIP, checkRateLimit } from '@/lib/server/rateLimit';
import { validateImageUpload, validateFileContent } from '@/lib/server/validation';
// Remove this import:
// import { optimizeProfilePicture, getOptimizedFilename } from '@/lib/server/imageOptimization';

export async function POST(request: NextRequest) {
  try {
    // Check authentication first
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const userRateCheck = await checkRateLimit(user.id, authRateLimit, authHourlyRateLimit);
    const ipRateCheck = await checkRateLimit(clientIP, authRateLimit, authHourlyRateLimit);
    
    if (!userRateCheck.success) {
      const resetTime = userRateCheck.reset || Date.now() + 60000; // Default to 1 minute if undefined
      const limit = userRateCheck.limit || 0;
      const remaining = userRateCheck.remaining || 0;
      
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds.`,
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': resetTime.toString()
          }
        }
      );
    }
    
    if (!ipRateCheck.success) {
      const resetTime = ipRateCheck.reset || Date.now() + 60000; // Default to 1 minute if undefined
      
      return NextResponse.json(
        { 
          error: `IP rate limit exceeded. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds.`,
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Validate file upload
    const validation = validateImageUpload(request);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Get the file from the request
    const arrayBuffer = await request.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file content (magic number check)
    const contentType = request.headers.get('content-type');
    if (contentType) {
      const contentValidation = await validateFileContent(arrayBuffer, contentType);
      if (!contentValidation.valid) {
        return NextResponse.json(
          { error: contentValidation.error },
          { status: 400 }
        );
      }
    }

    // Upload original image directly to Vercel Blob (no optimization)
    const blob = await put(`profile-pictures/${user.id}/${filename}`, Buffer.from(arrayBuffer), {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: contentType || 'application/octet-stream',
    });

    // Get current resume data
    const resume = await getResume(user.id);
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    // Update resume data with new profile picture URL
    const updatedResume = {
      ...resume,
      resumeData: {
        // Provide defaults for required fields if they don't exist
        header: {
          name: '',
          shortAbout: '',
          contacts: {},
          skills: [],
        },
        summary: '',
        workExperience: [],
        education: [],
        // Override with existing data if available
        ...resume.resumeData,
        // Add the new profile picture URL
        profilePicture: blob.url,
      }
    };

    await storeResume(user.id, updatedResume);

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      size: arrayBuffer.byteLength
      // Remove optimization-related fields:
      // originalSize, optimizedSize, compressionRatio
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}