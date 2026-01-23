import { ProfileCreationForm } from '@/components/auth/profile-creation-form';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { getProfileById } from '@/lib/supabase-queries';

export default async function CompleteProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is not logged in, redirect to signup
  if (!user) {
    redirect('/signup');
  }

  // Check if user already has a profile
  const profile = await getProfileById(user.id);
  if (profile) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <ProfileCreationForm userId={user.id} />
    </div>
  );
}
