import { supabase } from "../supabaseClient";
import { Hackathon } from "@/models/hackathon";
import { getCurrentUser } from "./auth";

// Create a new hackathon
export async function createNewHackathon(hackathon: Hackathon): Promise<Hackathon | null> {
    const user = await getCurrentUser();

    if (!user) {
        console.error('User must be authenticated to create a hackathon');
        return null;
    }

    const hackathonWithCreator = {
        ...hackathon,
        created_by: user.id
    };

    const { data, error } = await supabase
        .from('Hackathons')
        .insert(hackathonWithCreator)
        .select()
        .single();

    if (error) {
        console.error('Error creating hackathon:', error);
        return null;
    }

    return data;
}