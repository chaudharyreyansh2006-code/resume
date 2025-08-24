import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has an active subscription using the database function
    const { data: hasActiveSubscription, error: subscriptionError } = await supabase
      .rpc('has_active_subscription', { user_uuid: user.id });

    if (subscriptionError) {
      console.error('Error checking subscription status:', subscriptionError);
      return NextResponse.json(
        { error: 'Failed to check subscription status' },
        { status: 500 }
      );
    }

    // Get detailed subscription information
    const { data: subscriptionDetails, error: detailsError } = await supabase
      .rpc('get_user_subscription', { user_uuid: user.id });

    if (detailsError) {
      console.error('Error fetching subscription details:', detailsError);
      return NextResponse.json(
        { error: 'Failed to fetch subscription details' },
        { status: 500 }
      );
    }

    const subscription = subscriptionDetails?.[0] || null;

    return NextResponse.json({
      hasActiveSubscription: Boolean(hasActiveSubscription),
      isPro: Boolean(hasActiveSubscription),
      subscription: subscription ? {
        id: subscription.subscription_id,
        status: subscription.status,
        planName: subscription.plan_name,
        activatedAt: subscription.activated_at,
        expiresAt: subscription.expires_at
      } : null
    });

  } catch (error) {
    console.error('Subscription status API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}