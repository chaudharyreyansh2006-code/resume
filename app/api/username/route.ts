import { getUsernameById, updateUsername } from '@/lib/server/redisActions';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { validateUsername } from '@/lib/server/validation';
import { authRateLimit, authHourlyRateLimit, getClientIP, checkRateLimit } from '@/lib/server/rateLimit';

// API Response Types
export type GetResponse = { username?: string | null } | { error: string };
export type PostResponse = { success: true } | { error: string };

// GET endpoint to retrieve username
export async function GET(
  request: Request,
  { params }: { params: { username?: string } }
): Promise<NextResponse<GetResponse>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const username = await getUsernameById(user.id);
    return NextResponse.json({ username });
  } catch (error) {
    console.error('Error retrieving username:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// POST endpoint to update username
export async function POST(
  request: Request,
  { params }: { params: { username?: string } }
): Promise<NextResponse<PostResponse>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const userRateCheck = await checkRateLimit(user.id, authRateLimit, authHourlyRateLimit);
    const ipRateCheck = await checkRateLimit(clientIP, authRateLimit, authHourlyRateLimit);
    
    if (!userRateCheck.success || !ipRateCheck.success) {
      const failedCheck = !userRateCheck.success ? userRateCheck : ipRateCheck;
      const resetTime = failedCheck.reset || Date.now() + 60000; // Default to 1 minute if undefined
      
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. Try again in ${Math.ceil((resetTime - Date.now()) / 1000)} seconds.` 
        },
        { status: 429 }
      );
    }

    const { username } = await request.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 },
      );
    }

    // Validate and sanitize username
    const validation = validateUsername(username);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || 'Invalid username' },
        { status: 400 },
      );
    }

    const success = await updateUsername(user.id, validation.sanitized!);

    if (!success) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating username:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
