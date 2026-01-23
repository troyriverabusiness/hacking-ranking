import { supabase } from "../../supabaseClient";
import { University } from "@/models/enums";

interface UpdateProfileData {
    full_name?: string;
    linkedin_url?: string | null;
    company?: string | null;
    university?: University | null;
}

/**
 * Update an existing profile in the Profiles table
 * @param userId - The user ID of the profile to update
 * @param profileData - The profile data to update
 * @returns The updated profile or error
 */
export async function updateProfile(userId: string, profileData: UpdateProfileData) {
    const { data, error } = await supabase
        .from('Profiles')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();

    return { data, error };
}
