import { createClient } from '@/utils/supabase/server';
import { cache } from 'react';

// Cache user data fetching
export const getCachedUser = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
});
