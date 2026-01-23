import { supabase } from "../supabase";
import { Profile } from "@/models/profile";

// Fetch all profiles (sorted by Elo)
// Used in: Leaderboard page
export async function getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .order('elo', { ascending: false });

    if (error) {
        console.error('Error fetching all profiles:', error);
        return [];
    }

    return data;
}