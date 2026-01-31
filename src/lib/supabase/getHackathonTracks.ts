import { supabase } from "../supabaseClient";
import { ChallengeTrack } from "@/models";

// Fetch all challenge tracks for a given hackathon
export async function getHackathonTracks(hackathonId: string): Promise<ChallengeTrack[]> {
    const { data, error } = await supabase
        .from('Challenge_Tracks')
        .select('*')
        .eq('hackathon_id', hackathonId);

    if (error) {
        console.error('Error fetching hackathon tracks:', error);
        return [];
    }

    return data;
}