"use client";

import { use, useState, useEffect } from "react";
import type { Profile, RankHistory } from "@/models";
import { getProfile, getRankHistory, getAllProfiles } from "@/lib/supabase";
import {
  ProfileHeader,
  ProfileStats,
  ProfileEloChart,
  ProfileHackathonHistory,
} from "@/components/profile";

interface HackathonParticipation {
  hackathon_id: string;
  hackathon_name: string;
  team_name: string;
  rank: number;
  date: string;
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rankHistory, setRankHistory] = useState<RankHistory[]>([]);
  const [participations, setParticipations] = useState<HackathonParticipation[]>([]);
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [profileData, rankHistoryData, allProfilesData] = await Promise.all([
          getProfile(id),
          getRankHistory(id),
          getAllProfiles(),
        ]);

        if (!profileData) {
          setProfile(null);
        } else {
          setProfile(profileData);
        }

        setRankHistory(rankHistoryData || []);
        setParticipations([]); // TODO: Implement getHackathonParticipations
        setAllProfiles(allProfilesData || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setProfile(null);
        setRankHistory([]);
        setParticipations([]);
        setAllProfiles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // Stats calculations
  const stats = {
    totalHackathons: participations.length,
    totalWins: participations.filter((p) => p.rank === 1).length,
    topThreeFinishes: participations.filter((p) => p.rank <= 3).length,
    currentRank: allProfiles.findIndex((p) => p.id === id) + 1 || 1,
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Profile not found</p>
        </div>
      </div>
    );
  }

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
        <ProfileEloChart rankHistory={rankHistory} />
      </div>

      {/* Hackathon History */}
      <ProfileHackathonHistory participations={participations} />

      {/* Debug info - hidden, just for verification */}
      <p className="text-xs text-gray-400 mt-4">Profile ID: {id}</p>
    </div>
  );
}
