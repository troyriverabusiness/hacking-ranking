import { supabase } from "../supabaseClient";
import { Team } from "@/models/team";

// Fetch all teams with their members for a given hackathon

export async function getHackathonTeams(hackathonId: string): Promise<Team[]> {
    // First, get all teams for the hackathon
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

    // Get all team IDs
    const teamIds = teams.map(team => team.id);

    // Fetch all team members for these teams
    const { data: teamMembers, error: membersError } = await supabase
        .from('team_members')
        .select('team_id, user_id')
        .in('team_id', teamIds);

    if (membersError) {
        console.error('Error fetching team members:', membersError);
        // Return teams without members if members fetch fails
        return teams.map(team => ({ ...team, members: [] }));
    }

    // Group members by team_id
    const membersByTeam = (teamMembers || []).reduce((acc, member) => {
        if (!acc[member.team_id]) {
            acc[member.team_id] = [];
        }
        acc[member.team_id].push(member.user_id);
        return acc;
    }, {} as Record<string, string[]>);

    // Combine teams with their members
    return teams.map(team => ({
        ...team,
        members: membersByTeam[team.id] || []
    }));
}