import { supabase } from '../supabaseClient';

import type { Team, Profile } from "@/models/";


// ===============================
// POSTs
// ===============================

export async function addTeamMember(teamId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
        .from('team_members')
        .insert({
            team_id: teamId,
            user_id: userId
        });

    if (error) {
        console.error('Error adding team member:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export interface RegisterTeamInput {
    name: string;
    rank: number;
    hackathon_id: string;
}

export async function createTeam(input: RegisterTeamInput): Promise<Team | null> {
    const { data, error } = await supabase
        .from('Teams')
        .insert(input)
        .select()
        .single();

    if (error) {
        console.error('Error creating team:', error);
        return null;
    }

    return data;
}
    


// ===============================
// GETs
// ===============================

export async function getTeamsForHackathon(hackathonId: string): Promise<Team[]> {
    const { data: teams, error: teamsError } = await supabase
        .from('Teams')
        .select('*')
        .eq('hackathon_id', hackathonId)
        .order('rank', { ascending: true });

    if (teamsError) {
        console.error('Error fetching hackathon teams:', teamsError);
        return [];
    }

    if (!teams || teams.length === 0) {
        return [];
    }

    return teams;
}


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