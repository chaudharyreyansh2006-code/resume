import { checkUsernameAvailability } from '@/lib/server/redisActions';
import { NextResponse } from 'next/server';
import { publicRateLimit, publicHourlyRateLimit, getClientIP, checkRateLimit } from '@/lib/server/rateLimit';

// API Response Types
export type PostResponse = { available: boolean } | { error: string };

// POST endpoint to check username availability
export async function POST(
  request: Request,
): Promise<NextResponse<PostResponse>> {
  try {
    // Rate limiting by IP for public APIs
    const clientIP = getClientIP(request);
    const rateCheck = await checkRateLimit(clientIP, publicRateLimit, publicHourlyRateLimit);
    
    if (!rateCheck.success) {
      const resetTime = rateCheck.reset || Date.now() + 60000; // Default to 1 minute if undefined
      const limit = rateCheck.limit || 0;
      const remaining = rateCheck.remaining || 0;
      
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds.` 
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

    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username parameter is required' },
        { status: 400 },
      );
    }

    const { available } = await checkUsernameAvailability(username);

    return NextResponse.json({ available });
  } catch (error) {
    console.error('Error checking username availability:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
