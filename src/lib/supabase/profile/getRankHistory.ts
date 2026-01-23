import { supabase } from "../../supabaseClient";
import { RankHistory } from "@/models/rankHistory";

// Fetch the rank history for a given profile (latest first)
export async function getRankHistory(profileId: string): Promise<RankHistory[]> {
    const { data, error } = await supabase
        .from('rank_history')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching rank history:', error);
        return [];
    }

    return data;
}