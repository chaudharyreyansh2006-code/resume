import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SubscribeClient from './client';

export const metadata: Metadata = {
  title: 'Subscribe - Get Pro Access',
  description: 'Upgrade to Pro and unlock your stunning portfolio website',
};

export default async function SubscribePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <SubscribeClient />;
}