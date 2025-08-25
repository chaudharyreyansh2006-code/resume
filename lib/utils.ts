import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCVfolioUrl(username: string) {
  const domain =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://cvfolio.me';
  return `${domain}/${username}`;
}
