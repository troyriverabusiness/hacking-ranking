
import { supabase } from "../supabaseClient";

import type { University, RankHistory, Profile, Role } from "@/models/";

// ===============================
// POSTs
// ===============================

interface CreateProfileData {
    id: string;
    username: string;
    full_name: string;
    linkedin_url: string | null;
    company: string | null;
    university: University | null;
}

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

// ===============================
// PUTs
// ===============================

interface UpdateProfileData {
    full_name?: string;
    linkedin_url?: string | null;
    company?: string | null;
    university?: University | null;
}

export async function updateProfile(userId: string, profileData: UpdateProfileData) {
    const { data, error } = await supabase
        .from('Profiles')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();

    return { data, error };
}


// ===============================
// GETs
// ===============================

// Fetch all profiles (sorted by Elo)
// Used in: Leaderboard page
export async function getAllProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .order('elo', { ascending: false });

    if (error) {
        console.error('Error fetching all profiles:', error);
        return [];
    }

    return data;
}

// Fetch a single profile
export async function getProfile(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data;
}


// Fetch the rank history for a given profile (sorted)
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

/**
 * Check if a username is available
 * @param username - The username to check
 * @returns true if available, false if taken
 */
export async function checkUsernameAvailability(username: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('Profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

    if (error) {
        console.error('Error checking username:', error);
        throw error;
    }

    // If data is null, username is available
    return data === null;
}


