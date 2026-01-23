import { Hackathon } from "@/models/hackathon";
import { supabase } from "../../supabaseClient";

// All Hackathons Saved 
// Used in: Hackathons grid & list view (+ map)

export async function getAllHackathons(): Promise<Hackathon[]> {
    const { data, error } = await supabase
        .from('Hackathons')
        .select('*')
        .order('start_timestamp', { ascending: false });

    if (error) {
        console.error('Error fetching hackathons:', error);
        return [];
    }

    return data;
}