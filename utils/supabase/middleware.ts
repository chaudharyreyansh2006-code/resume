import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getResume, getUsernameById } from '@/lib/server/redisActions'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fast redirection for authenticated users accessing login page
  if (user && request.nextUrl.pathname === '/login') {
    try {
      // Check if user has existing resume and username
      const [resume, username] = await Promise.all([
        getResume(user.id),
        getUsernameById(user.id)
      ])
      
      const url = request.nextUrl.clone()
      
      // Smart redirection logic:
      // If user has resume data and username (published site), go to preview
      // Otherwise, go to upload to complete setup
      if (resume?.resumeData && username) {
        url.pathname = '/preview'
      } else {
        url.pathname = '/upload'
      }
      
      return NextResponse.redirect(url)
    } catch (error) {
      // Fallback to upload if Redis check fails
      const url = request.nextUrl.clone()
      url.pathname = '/upload'
      return NextResponse.redirect(url)
    }
  }

  // Protect private routes - require authentication
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/upload') ||
     request.nextUrl.pathname.startsWith('/pdf') ||
     request.nextUrl.pathname.startsWith('/preview'))
  ) {
    // Redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // For authenticated users, check subscription status for pro-only routes
  if (user && request.nextUrl.pathname.startsWith('/preview')) {
    try {
      // Check if user has an active subscription
      const { data: hasActiveSubscription, error: subscriptionError } = await supabase
        .rpc('has_active_subscription', { user_uuid: user.id })

      if (subscriptionError) {
        console.error('Subscription check error in middleware:', subscriptionError)
        // Allow access on error to avoid blocking users
        return supabaseResponse
      }

      // If user doesn't have active subscription, redirect to upload page
      if (!hasActiveSubscription) {
        const url = request.nextUrl.clone()
        url.pathname = '/upload'
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.error('Error checking subscription in middleware:', error)
      // Allow access on error to avoid blocking users
      return supabaseResponse
    }
  }

  return supabaseResponse
}