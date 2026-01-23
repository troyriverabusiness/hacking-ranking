import { createClient } from "@/lib/supabase-server";
import { getProfile } from "@/lib/supabase/index";
import { NavigationClient } from "./navigation-client";

export async function Navigation() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let profile = null;
    if (user) {
      profile = await getProfile(user.id);
    }

    const userForClient = user ? { id: user.id, email: user.email || '' } : null;

    return (
      <NavigationClient
        user={userForClient}
        profile={profile}
      />
    );
  } catch (error) {
    console.error('Navigation error:', error);
    // Return navigation without user if there's an error
    return (
      <NavigationClient
        user={null}
        profile={null}
      />
    );
  }
}
