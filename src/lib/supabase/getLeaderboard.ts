import { supabase } from "../supabaseClient";
import { Profile } from "@/models/profile";

// Fetch the leaderboard (general)
export async function getLeaderboard(): Promise<Profile[]> {
    const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .order('elo', { ascending: false });

    if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }

    return data;
}

// Top 100
export async function getLeaderboard100(): Promise<Profile[]> {
    const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .order('elo', { ascending: false })
        .limit(100);

    if (error) {
        console.error('Error fetching leaderboard 100:', error);
        return [];
    }

    return data;
}