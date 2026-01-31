import { supabase } from '../supabaseClient';
import type { Profile } from '@/models';

export async function searchProfilesByUsername(query: string): Promise<Profile[]> {
  if (!query.trim()) {
    return [];
  }

  const { data, error } = await supabase
    .from('Profiles')
    .select('*')
    .ilike('username', `%${query}%`)
    .limit(10);

  if (error) {
    console.error('Error searching profiles:', error);
    return [];
  }

  return data || [];
}
