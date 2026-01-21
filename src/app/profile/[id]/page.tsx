"use client";

import { use } from "react";
import {
  getProfileById,
  getRankHistoryByUserId,
  mockProfiles,
  mockParticipations,
  mockRankHistory,
} from "@/lib/mock-data";
import {
  ProfileHeader,
  ProfileStats,
  ProfileEloChart,
  ProfileHackathonHistory,
} from "@/components/profile";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // In real app, fetch by id. For now, use mock data
  const profile = getProfileById(id) || mockProfiles[0];
  const rankHistory = getRankHistoryByUserId(id);
  const displayRankHistory = rankHistory.length > 0 ? rankHistory : mockRankHistory;

  // Stats calculations
  const stats = {
    totalHackathons: mockParticipations.length,
    totalWins: mockParticipations.filter((p) => p.rank === 1).length,
    topThreeFinishes: mockParticipations.filter((p) => p.rank <= 3).length,
    currentRank: mockProfiles.findIndex((p) => p.id === id) + 1 || 1,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <ProfileHeader profile={profile} />
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <ProfileStats
          currentRank={stats.currentRank}
          totalHackathons={stats.totalHackathons}
          totalWins={stats.totalWins}
          topThreeFinishes={stats.topThreeFinishes}
        />
      </div>

      {/* ELO Chart */}
      <div className="mb-8">
        <ProfileEloChart rankHistory={displayRankHistory} />
      </div>

      {/* Hackathon History */}
      <ProfileHackathonHistory participations={mockParticipations} />

      {/* Debug info - hidden, just for verification */}
      <p className="text-xs text-gray-400 mt-4">Profile ID: {id}</p>
    </div>
  );
}
