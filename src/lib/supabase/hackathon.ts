import { supabase } from "../supabaseClient";
import type { Hackathon, Location, Topic } from "@/models/";


// ===============================
// POSTs
// ===============================

export interface CreateHackathonRequest {
    name: string;
    description: string;
    location: Location;
    start_timestamp: string;
    end_timestamp: string;
    topics: Topic[];
}

export async function createHackathon(hackathonData: CreateHackathonRequest): Promise<Hackathon | null> {
    const { data, error } = await supabase
        .from('Hackathons')
        .insert(hackathonData)
        .select()
        .single();

    if (error) {
        console.error('Error creating hackathon:', error);
        return null;
    }

    return data;
}


// ===============================
// PUTs
// ===============================

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


// ===============================
// GETs
// ===============================

// Get every single hackathon saved in the database
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