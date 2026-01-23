import { Hackathon } from "@/models/hackathon";
import { supabase } from "../supabaseClient";


export async function getHackathonParticipations(userId: string): Promise<Hackathon[]> {
    // We want to get all teams this user has been on, and then what hackathons these teams have participated in
    
    const { data, error } = await supabase
        .from('team_members')
        .select(`
      team_id,
      Teams!inner (
        id,
        name,
        hackathon_id,
        Hackathons!inner (
          id,
          name,
          description,
          start_timestamp,
          end_timestamp,
          location,
          topics,
          created_at
        )
      )
    `)
        .eq('user_id', userId)
        .order('Hackathons.start_timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching hackathon participations:', error);
        return [];
    }

    const rows = (data ?? []) as Array<{
        Teams?: Array<{
            Hackathons?: Hackathon[];
        }>;
    }>;

    const uniqueHackathons = new Map<string, Hackathon>();

    rows.forEach((participation) => {
        participation.Teams?.forEach((team) => {
            team.Hackathons?.forEach((hackathon) => {
                if (hackathon?.id && !uniqueHackathons.has(hackathon.id)) {
                    uniqueHackathons.set(hackathon.id, hackathon);
                }
            });
        });
    });

    return Array.from(uniqueHackathons.values());
}
