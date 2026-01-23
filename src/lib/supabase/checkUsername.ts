import { supabase } from "../supabaseClient";

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
