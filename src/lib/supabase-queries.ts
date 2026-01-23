import { supabase } from './supabase';
import type { Profile, Hackathon, Team, RankHistory, Location, Topic } from './mock-data';

// =============================================================================
// Profile Queries
// =============================================================================

export async function getAllProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('Profiles')
    .select('*')
    .order('elo', { ascending: false });

  if (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }

  return data || [];
}

export async function getProfileById(id: string): Promise<Profile | null> {
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

export async function getProfilesByLocation(location: Location): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('Profiles')
    .select(`
      *,
      team_members (
        teams (
          hackathons (
            location
          )
        )
      )
    `)
    .order('elo', { ascending: false });

  if (error) {
    console.error('Error fetching profiles by location:', error);
    return [];
  }

  // Filter profiles that have participated in hackathons at the specified location
  const filtered = (data || []).filter((profile: any) => {
    return profile.team_members?.some((tm: any) =>
      tm.teams?.hackathons?.location === location
    );
  });

  return filtered;
}

export async function getProfilesByTopic(topic: Topic): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('Profiles')
    .select(`
      *,
      team_members (
        teams (
          hackathons (
            topics
          )
        )
      )
    `)
    .order('elo', { ascending: false });

  if (error) {
    console.error('Error fetching profiles by topic:', error);
    return [];
  }

  // Filter profiles that have participated in hackathons with the specified topic
  const filtered = (data || []).filter((profile: any) => {
    return profile.team_members?.some((tm: any) =>
      tm.teams?.hackathons?.topics?.includes(topic)
    );
  });

  return filtered;
}

// =============================================================================
// Hackathon Queries
// =============================================================================

export async function getAllHackathons(): Promise<Hackathon[]> {
  const { data, error } = await supabase
    .from('Hackathons')
    .select('*')
    .order('start_timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching hackathons:', error);
    return [];
  }

  return data || [];
}

export async function getHackathonById(id: string): Promise<Hackathon | null> {
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

export async function getHackathonsByLocation(location: Location): Promise<Hackathon[]> {
  const { data, error } = await supabase
    .from('Hackathons')
    .select('*')
    .eq('location', location)
    .order('start_timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching hackathons by location:', error);
    return [];
  }

  return data || [];
}

export async function getHackathonsByTopic(topic: Topic): Promise<Hackathon[]> {
  const { data, error } = await supabase
    .from('Hackathons')
    .select('*')
    .contains('topics', [topic])
    .order('start_timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching hackathons by topic:', error);
    return [];
  }

  return data || [];
}

export async function getHackathonsByFilters(
  locations?: Location[],
  topics?: Topic[]
): Promise<Hackathon[]> {
  let query = supabase.from('Hackathons').select('*');

  if (locations && locations.length > 0) {
    query = query.in('location', locations);
  }

  if (topics && topics.length > 0) {
    // For array contains with multiple values, we need to filter on the client side
    // or use a more complex query
    const { data, error } = await query.order('start_timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching filtered hackathons:', error);
      return [];
    }

    if (topics.length > 0) {
      return (data || []).filter((hackathon: Hackathon) =>
        topics.some((topic) => hackathon.topics.includes(topic))
      );
    }

    return data || [];
  }

  const { data, error } = await query.order('start_timestamp', { ascending: false });

  if (error) {
    console.error('Error fetching filtered hackathons:', error);
    return [];
  }

  return data || [];
}

// =============================================================================
// Team Queries
// =============================================================================

export async function getTeamsByHackathonId(hackathonId: string): Promise<Team[]> {
  const { data: teams, error } = await supabase
    .from('Teams')
    .select(`
      *,
      team_members (
        profiles (
          id,
          username,
          full_name,
          company,
          university
        )
      )
    `)
    .eq('hackathon_id', hackathonId)
    .order('rank', { ascending: true });

  if (error) {
    console.error('Error fetching teams:', error);
    return [];
  }

  // Transform the data to match the Team type
  const transformedTeams: Team[] = (teams || []).map((team: any) => ({
    id: team.id,
    name: team.name,
    hackathon_id: team.hackathon_id,
    rank: team.rank,
    members: team.team_members?.map((tm: any) => ({
      id: tm.profiles.id,
      username: tm.profiles.username,
      full_name: tm.profiles.full_name,
      company: tm.profiles.company,
      university: tm.profiles.university,
    })) || [],
  }));

  return transformedTeams;
}

export async function getTeamById(id: string): Promise<Team | null> {
  const { data: team, error } = await supabase
    .from('Teams')
    .select(`
      *,
      team_members (
        profiles (
          id,
          username,
          full_name,
          company,
          university
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching team:', error);
    return null;
  }

  if (!team) return null;

  // Transform the data to match the Team type
  const transformedTeam: Team = {
    id: team.id,
    name: team.name,
    hackathon_id: team.hackathon_id,
    rank: team.rank,
    members: team.team_members?.map((tm: any) => ({
      id: tm.profiles.id,
      username: tm.profiles.username,
      full_name: tm.profiles.full_name,
      company: tm.profiles.company,
      university: tm.profiles.university,
    })) || [],
  };

  return transformedTeam;
}

// =============================================================================
// Rank History Queries
// =============================================================================

export async function getRankHistoryByUserId(userId: string): Promise<RankHistory[]> {
  const { data, error } = await supabase
    .from('Rank History')
    .select('*')
    .eq('user', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching rank history:', error);
    return [];
  }

  return data || [];
}

// =============================================================================
// Hackathon Participations
// =============================================================================

export async function getHackathonParticipationsByUserId(userId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      teams (
        id,
        name,
        rank,
        hackathon_id,
        hackathons (
          id,
          name,
          start_timestamp
        )
      )
    `)
    .eq('profile_id', userId);

  if (error) {
    console.error('Error fetching participations:', error);
    return [];
  }

  // Transform to match HackathonParticipation type
  const participations = (data || [])
    .filter((item: any) => item.teams && item.teams.hackathons)
    .map((item: any) => ({
      hackathon_id: item.teams.hackathons.id,
      hackathon_name: item.teams.hackathons.name,
      team_name: item.teams.name,
      rank: item.teams.rank,
      date: new Date(item.teams.hackathons.start_timestamp).toISOString().split('T')[0],
    }));

  return participations;
}

// =============================================================================
// Utility Functions
// =============================================================================

export async function getLocations(): Promise<Location[]> {
  const { data, error } = await supabase
    .from('Hackathons')
    .select('location');

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  // Get unique locations
  const locations = [...new Set((data || []).map((h: any) => h.location))];
  return locations as Location[];
}

export async function getTopics(): Promise<Topic[]> {
  const { data, error } = await supabase
    .from('Hackathons')
    .select('topics');

  if (error) {
    console.error('Error fetching topics:', error);
    return [];
  }

  // Get unique topics from all hackathons
  const allTopics = (data || []).flatMap((h: any) => h.topics || []);
  const uniqueTopics = [...new Set(allTopics)];
  return uniqueTopics as Topic[];
}

// =============================================================================
// Profile Mutations
// =============================================================================

export async function createProfile(profileData: {
  id: string;
  username: string;
  full_name: string;
  linkedin_url?: string | null;
  company?: string | null;
  university?: string | null;
  role?: string;
  elo?: number;
}): Promise<{ data: Profile | null; error: any }> {
  const { data, error } = await supabase
    .from('Profiles')
    .insert([
      {
        id: profileData.id,
        username: profileData.username,
        full_name: profileData.full_name,
        linkedin_url: profileData.linkedin_url || null,
        company: profileData.company || null,
        university: profileData.university || null,
        role: profileData.role || 'user',
        elo: profileData.elo || 1500,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateProfile(
  id: string,
  updates: Partial<Omit<Profile, 'id' | 'created_at'>>
): Promise<{ data: Profile | null; error: any }> {
  const { data, error } = await supabase
    .from('Profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    return { data: null, error };
  }

  return { data, error: null };
}
