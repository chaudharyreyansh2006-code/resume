'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export interface AuthState {
  error?: string
  success?: string
}

export async function signInWithMagicLink(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient()
  const email = formData.get('email') as string

  // Process magic link request

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/upload`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: 'Check your email for the magic link!' }
  } catch (err) {
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}

export async function signInWithGoogle(): Promise<void> {
  const supabase = await createClient()

  // Start Google OAuth

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/upload`,
    },
  })

  if (error) {
    redirect('/error')
  }

  if (data?.url) {
    redirect(data.url)
  }

  redirect('/error')
}

// Keep existing functions for backward compatibility
export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/upload')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/upload')
}