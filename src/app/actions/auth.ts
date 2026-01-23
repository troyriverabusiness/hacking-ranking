'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: authData } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  // Redirect to profile page to complete profile
  if (authData.user) {
    redirect(`/profile/${authData.user.id}`);
  }

  redirect('/complete-profile');
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: authData } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  // Check if user has a complete profile
  if (authData.user) {
    const profile = await getUserProfile(authData.user.id);

    // If no profile exists or profile is incomplete, redirect to profile page
    if (!profile || !profile.full_name) {
      revalidatePath('/', 'layout');
      redirect(`/profile/${authData.user.id}`);
    }
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('Profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}
