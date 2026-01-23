import { SignInForm } from '@/components/auth/sign-in-form';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is already logged in, redirect to home
  if (user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SignInForm />
    </div>
  );
}
