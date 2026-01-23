import { supabase } from "../supabase";
import { Hackathon } from "@/models/hackathon";

// Fetch a single Hackathon 
export async function getHackathon(id: string): Promise<Hackathon | null> {
    const { data, error } = await supabase
        .from('Hackathons')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching hackathon:', error);
        return null;
    }

    return data;

}