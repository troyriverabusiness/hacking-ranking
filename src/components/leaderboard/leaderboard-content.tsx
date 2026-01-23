"use client";

import * as React from "react";

import { LeaderboardRow } from "@/components/leaderboard/leaderboard-row";
import { PodiumCard } from "@/components/leaderboard/podium-card";

import { getAllProfiles } from "@/lib/supabase/index";

// Verified imports
import type { Location, Topic } from "@/models/enums";
import type { Profile } from "@/models/profile";
import { Loading } from "@/components/loading";
import { Empty } from "@/components/empty";

interface LeaderboardContentProps {
  location?: Location;
  topic?: Topic;
}

export function LeaderboardContent({ location, topic }: LeaderboardContentProps) {
  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      try {
        let data: Profile[] = [];

        if (location) {
          // TODO: Implement location filter
          data = await getAllProfiles();
        } else if (topic) {
          // TODO: Implement topic filter
          data = await getAllProfiles();
        } else {
          data = await getAllProfiles();
        }

        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
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
        <Loading size="lg" text="Loading leaderboard..." className="py-12" />
      </div>
    );
  }

  if (profiles.length === 0) {
    const description =
      location ? `No profiles found for ${location}` :
      topic ? `No profiles found for ${topic}` :
      'No profiles available';

    return (
      <div className="flex items-center justify-center py-12">
        <Empty
          title="No profiles found"
          description={description}
        />
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
