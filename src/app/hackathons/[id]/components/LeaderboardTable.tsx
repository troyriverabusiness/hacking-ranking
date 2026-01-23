"use client";

import { Team } from "@/models";
import { LeaderboardRow } from "./LeaderboardRow";


export function LeaderboardTable({ teams }: { teams: Team[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
      <div className="border-y border-gray-200">
        <div className="hidden md:grid md:grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(180px,1fr)] md:items-center md:bg-gray-50 md:px-2 md:py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <span>Rank</span>
          <span>Team</span>
          <span>Participants</span>
        </div>
        {teams.map((team) => (
          <div key={team.id} className="border-t border-gray-200">
            <LeaderboardRow team={team} />
          </div>
        ))}
      </div>
    </div>
  );
}
