import { supabase } from "../supabase";
import { Profile } from "@/models/profile";

// Fetch a single profile
export async function getProfile(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data;
}
