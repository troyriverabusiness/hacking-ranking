import { supabase } from "../supabaseClient";
import { Team } from "@/models/team";
import { getCurrentUser } from "../auth";

interface RegisterTeamInput {
    name: string;
    rank: number;
    hackathon_id: string;
}

// Register a new team for a hackathon
export async function registerTeam(input: RegisterTeamInput): Promise<Team | null> {
    const user = await getCurrentUser();

    if (!user) {
        console.error('User must be authenticated to register a team');
        return null;
    }

    // Step 1: Insert the team into the Teams table
    const teamData = {
        name: input.name,
        rank: input.rank,
        hackathon_id: input.hackathon_id,
        // created_by is automatically set by the database default (auth.uid())
    };

    const { data: team, error: teamError } = await supabase
        .from('Teams')
        .insert(teamData)
        .select()
        .single();

    if (teamError || !team) {
        console.error('Error creating team:', teamError);
        return null;
    }

    // Step 2: Add the current user as a team member in the team_members junction table
    const { error: memberError } = await supabase
        .from('team_members')
        .insert({
            team_id: team.id,
            user_id: user.id
        });

    if (memberError) {
        console.error('Error adding team member:', memberError);
        // Optionally: rollback the team creation here
        return null;
    }

    // Return the team with members array populated
    return {
        ...team,
        members: [user.id]
    };
}
