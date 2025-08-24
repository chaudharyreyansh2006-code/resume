import { getResume, getUserIdByUsername } from '@/lib/server/redisActions';

export async function getUserData(username: string) {
  const user_id = await getUserIdByUsername(username);
  if (!user_id) {
    return { user_id: undefined, resume: undefined, supabaseUser: null, userExists: false };
  }

  const resume = await getResume(user_id);
  if (!resume) {
    return { user_id, resume: undefined, supabaseUser: null, userExists: true };
  }

  // Only return resume data if the status is 'live' (published)
  // If status is 'draft' (unpublished), return undefined but indicate user exists
  if (resume.status !== 'live') {
    return { user_id, resume: undefined, supabaseUser: null, userExists: true };
  }

  // For public profile pages, we don't need Supabase user data
  // The resume data contains all the necessary information
  return { user_id, resume, supabaseUser: null, userExists: true };
}
