'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase/auth';
import { getProfile } from '@/lib/supabase';
import { ProfileCompletionDialog } from '@/components/profile/profile-completion-dialog';

export default function ProfileSetupPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Get the current authenticated user
        const user = await getCurrentUser();

        if (!user) {
          // If not authenticated, redirect to login
          router.push('/login');
          return;
        }

        // Check if user already has a profile
        const profile = await getProfile(user.id);

        if (profile) {
          // If profile exists, redirect to the profile page
          router.push(`/profile/${user.id}`);
          return;
        }

        // User is authenticated and has no profile
        setUserId(user.id);
      } catch (error) {
        // Auth error - redirect to login
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show the profile completion dialog for new users
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ProfileCompletionDialog userId={userId} isNewProfile={true} />
    </div>
  );
}
