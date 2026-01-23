"use client";

import * as React from "react";
import { mockProfiles, type Location, type Topic, type Profile } from "@/lib/mock-data";
import { getAllProfiles, getProfilesByLocation, getProfilesByTopic } from "@/lib/supabase-queries";
import { LeaderboardRow } from "@/components/leaderboard/leaderboard-row";
import { PodiumCard } from "@/components/leaderboard/podium-card";

interface LeaderboardContentProps {
  location?: Location;
  topic?: Topic;
}

export function LeaderboardContent({ location, topic }: LeaderboardContentProps) {
  const [profiles, setProfiles] = React.useState<Profile[]>(mockProfiles);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      try {
        let data: Profile[] = [];

        if (location) {
          data = await getProfilesByLocation(location);
        } else if (topic) {
          data = await getProfilesByTopic(topic);
        } else {
          data = await getAllProfiles();
        }

        // Use mock data if no data from Supabase
        if (data.length === 0) {
          setProfiles(mockProfiles);
        } else {
          setProfiles(data);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
        // Fallback to mock data on error
        setProfiles(mockProfiles);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [location, topic]);

  const podium = profiles.slice(0, 3);
  const rest = profiles.slice(3);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No profiles found</p>
          <p className="text-gray-400 text-sm mt-2">
            {location && `No profiles found for ${location}`}
            {topic && `No profiles found for ${topic}`}
            {!location && !topic && 'No profiles available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {podium.map((profile, index) => (
          <PodiumCard key={profile.id} profile={profile} rank={index + 1} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-[72px_minmax(0,1fr)_96px] items-center px-4 sm:px-6 py-2 text-xs uppercase tracking-wide text-gray-500 border-b border-blue-200">
            <span>Pos</span>
            <span>Name</span>
            <span className="text-right">Elo</span>
          </div>
          <div className="divide-y divide-gray-100">
            {rest.map((profile, index) => (
              <LeaderboardRow key={profile.id} profile={profile} rank={index + 4} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
