import { supabase } from '../supabaseClient';

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
