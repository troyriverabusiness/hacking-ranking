import { supabase } from "../supabaseClient";
import { ChallengeTrack } from "@/models";

// Update an existing challenge track
export async function updateHackathonTrack(id: string, track: Partial<ChallengeTrack>): Promise<ChallengeTrack | null> {
    const { data, error } = await supabase
        .from('Challenge_Tracks')
        .update(track)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating hackathon track:', error);
        return null;
    }

    return data;
}
