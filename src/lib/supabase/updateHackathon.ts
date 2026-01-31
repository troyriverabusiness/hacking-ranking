import { supabase } from "../supabaseClient";
import { Hackathon } from "@/models/hackathon";

// Update an existing hackathon
export async function updateHackathon(id: string, hackathon: Partial<Hackathon>): Promise<Hackathon | null> {
    const { data, error } = await supabase
        .from('Hackathons')
        .update(hackathon)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating hackathon:', error);
        return null;
    }

    return data;
}
