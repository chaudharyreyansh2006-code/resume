import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FullResume } from '@/components/resume/FullResume';
import { Metadata } from 'next';
import { getUserData } from './utils';
import { notFound } from 'next/navigation';
import { getSelfSoUrl } from '@/lib/utils';
import { unstable_cache } from 'next/cache';
import { getThemeConfig } from '@/lib/themes';

// Cache user data for published resumes
const getCachedUserData = unstable_cache(
  async (username: string) => {
    return await getUserData(username);
  },
  ['user-data'],
  {
    tags: ['user-data'],
    revalidate: 300, // Cache for 5 minutes
  }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const { user_id, resume, supabaseUser } = await getUserData(username);

  if (!user_id || !resume?.resumeData) {
    return {
      title: 'User not found',
    };
  }

  const name = resume.resumeData.header.name || 'User';
  const shortAbout = resume.resumeData.header.shortAbout || '';
  const skills = resume.resumeData.header.skills?.join(', ') || '';

  return {
    title: `${name} - ${shortAbout}`,
    description: `${name}'s professional profile. Skills: ${skills}`,
    openGraph: {
      title: `${name} - ${shortAbout}`,
      description: `${name}'s professional profile. Skills: ${skills}`,
      url: getSelfSoUrl(`/${username}`),
      siteName: 'CVFolio.Me',
      images: [
        {
          url: getSelfSoUrl(`/${username}/og`),
          width: 1200,
          height: 630,
          alt: `${name}'s Profile`,
        },
      ],
      locale: 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} - ${shortAbout}`,
      description: `${name}'s professional profile. Skills: ${skills}`,
      images: [getSelfSoUrl(`/${username}/og`)],
    },
  };
}

export default async function UsernamePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { user_id, resume, supabaseUser } = await getCachedUserData(username);

  // If user doesn't exist at all, show 404
  if (!user_id) {
    return notFound();
  }

  // If user exists but resume is unpublished (draft) or doesn't exist, redirect to home
  if (!resume || !resume.resumeData) {
    redirect('/');
  }

  // Use profile picture from resume data, fallback to placeholder
  const profilePicture = resume.resumeData.profilePicture || '/placeholder-user.jpg';
  
  // Get theme configuration
  const theme = resume.resumeData.theme || 'default';
  const themeConfig = getThemeConfig(theme);

  return (
    <div className={`min-h-screen ${themeConfig.backgroundClass} ${themeConfig.containerClass}`}>
      <FullResume 
        resume={resume.resumeData} 
        profilePicture={profilePicture}
        theme={theme}
      />
    </div>
  );
}

// Enable static generation for published pages
export const revalidate = 300; // Revalidate every 5 minutes
export const dynamic = 'force-static';
