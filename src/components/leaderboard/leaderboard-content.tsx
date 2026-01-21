"use client";

import { mockProfiles } from "@/lib/mock-data";
import { LeaderboardRow } from "@/components/leaderboard/leaderboard-row";
import { PodiumCard } from "@/components/leaderboard/podium-card";

export function LeaderboardContent() {
  const podium = mockProfiles.slice(0, 3);
  const rest = mockProfiles.slice(3);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {podium.map((profile, index) => (
          <PodiumCard key={profile.id} profile={profile} rank={index + 1} />
        ))}
      </div>

      <div className="space-y-3">
        {rest.map((profile, index) => (
          <LeaderboardRow key={profile.id} profile={profile} rank={index + 4} />
        ))}
      </div>
    </div>
  );
}
