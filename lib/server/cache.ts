import { revalidateTag } from 'next/cache';

// Cache invalidation functions
export function invalidateUserCache(userId: string) {
  revalidateTag('user-data');
  revalidateTag(`user-${userId}`);
}

export function invalidateAnalyticsCache() {
  revalidateTag('analytics');
}

// Call this when resume is published/unpublished
export function invalidatePublicPageCache(username: string) {
  revalidateTag('user-data');
  revalidateTag(`public-${username}`);
}