import { supabase } from "../supabaseClient";
import { Team } from "@/models/team";

// Fetch all teams (ONLY TEAMS) for a given hackathon

export async function getHackathonTeams(hackathonId: string): Promise<Team[]> {
    const { data, error } = await supabase
        .from('Teams')
        .select('*')
        .eq('hackathon_id', hackathonId)
        .order('rank', { ascending: true });

    if (error) {
        console.error('Error fetching hackathon teams:', error);
        return [];
    }

    return data;
}