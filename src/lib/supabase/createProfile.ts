import { supabase } from "../supabaseClient";
import { University, Role } from "@/models/enums";

interface CreateProfileData {
    id: string;
    username: string;
    full_name: string;
    linkedin_url: string | null;
    company: string | null;
    university: University | null;
}

/**
 * Create a new profile in the Profiles table
 * @param profileData - The profile data to insert
 * @returns The created profile or error
 */
export async function createProfile(profileData: CreateProfileData) {
    // Insert with default role and elo
    const { data, error } = await supabase
        .from('Profiles')
        .insert({
            id: profileData.id,
            username: profileData.username,
            full_name: profileData.full_name,
            linkedin_url: profileData.linkedin_url,
            company: profileData.company,
            university: profileData.university,
            role: 'user' as Role,
            elo: 1000, // Default ELO
        })
        .select()
        .single();

    return { data, error };
}
