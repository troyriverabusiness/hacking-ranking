"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/supabase/index";
import { NavigationClient } from "./navigation-client";
import type { Profile } from "@/models/profile";
import type { User } from "@supabase/supabase-js";

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
