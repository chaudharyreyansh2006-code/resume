'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

export default function TopMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <div className="flex items-center space-x-2">
            {user.user_metadata?.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            )}
            <span className="text-sm font-medium">
              {user.user_metadata?.full_name || user.email}
            </span>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => router.push('/login')}
            variant="outline"
            size="sm"
          >
            Sign In
          </Button>
          <Button
            onClick={() => router.push('/login')}
            size="sm"
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  );
}
