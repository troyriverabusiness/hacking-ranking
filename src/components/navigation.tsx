"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/supabase";
import { supabase } from "@/lib/supabaseClient";
import { NavigationClient } from "./navigation-client";
import type { Profile } from "@/models/profile";

export function Navigation() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          const userForClient = {
            id: currentUser.id,
            email: currentUser.email || ''
          };
          setUser(userForClient);

          const userProfile = await getProfile(currentUser.id);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error('Navigation error:', error);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const userForClient = {
          id: session.user.id,
          email: session.user.email || ''
        };
        setUser(userForClient);

        const userProfile = await getProfile(session.user.id);
        setProfile(userProfile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    // Return a basic navigation skeleton while loading
    return (
      <NavigationClient user={null} profile={null} />
    );
  }

  return (
    <NavigationClient user={user} profile={profile} />
  );
}
