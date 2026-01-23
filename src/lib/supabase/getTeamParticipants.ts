import { supabase } from "../supabase";
import { Profile } from "@/models/profile";

// Fetch all participants (ONLY PROFILES) for a given team
export async function getTeamParticipants(teamId: string): Promise<Profile[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', teamId);

    if (error) {
        console.error('Error fetching team participants:', error);
        return [];
    }

    return data;
}