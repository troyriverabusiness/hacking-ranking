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

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-[72px_minmax(0,1fr)_96px] items-center px-4 sm:px-6 py-2 text-xs uppercase tracking-wide text-gray-500 border-b border-gray-900">
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
    </div>
  );
}
