import { supabase } from "../supabase";
import { Hackathon } from "@/models/hackathon";

// Create a new hackathon
export async function createNewHackathon(hackathon: Hackathon): Promise<Hackathon | null> {
    const { data, error } = await supabase
        .from('Hackathons')
        .insert(hackathon)
        .select()
        .single();

    if (error) {
        console.error('Error creating hackathon:', error);
        return null;
    }

    return data;
}