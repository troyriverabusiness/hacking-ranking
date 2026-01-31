import { supabase } from "../supabaseClient";
import { Profile } from "@/models/profile";

// Fetch participant profiles for a team by joining team_members with Profiles table
export async function getTeamParticipants(teamId: string): Promise<Profile[]> {
    // Join via user_id foreign key to get profile data for each team member
    const { data, error } = await supabase
        .from('team_members')
        .select('user_id(*)')
        .eq('team_id', teamId);

    if (error) {
        console.error('Error fetching team participants:', error);
        return [];
    }

    if (!data) {
        return [];
    }

    // Extract profiles from the joined data
    return data.map(item => item.user_id as unknown as Profile);
}