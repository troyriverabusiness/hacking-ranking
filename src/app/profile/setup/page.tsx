import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getProfile } from '@/lib/supabase';
import { ProfileCompletionDialog } from '@/components/profile/profile-completion-dialog';

// Force dynamic rendering - this page requires authentication
export const dynamic = 'force-dynamic';

export default async function ProfileSetupPage() {
  // Get the current authenticated user
  const user = await getCurrentUser();

  if (!user) {
    // If not authenticated, redirect to login
    redirect('/login');
  }

  // Check if user already has a profile
  const profile = await getProfile(user.id);

  if (profile) {
    // If profile exists, redirect to the profile page
    redirect(`/profile/${user.id}`);
  }

  // Show the profile completion dialog for new users
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ProfileCompletionDialog userId={user.id} isNewProfile={true} />
    </div>
  );
}
