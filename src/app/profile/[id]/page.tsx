"use client";

import { use, useState, useEffect } from "react";
import {
  getProfileById as getMockProfileById,
  getRankHistoryByUserId as getMockRankHistoryByUserId,
  mockProfiles,
  mockParticipations,
  mockRankHistory,
  type Profile,
  type RankHistory,
  type HackathonParticipation,
} from "@/lib/mock-data";
import {
  getProfileById,
  getRankHistoryByUserId,
  getHackathonParticipationsByUserId,
  getAllProfiles,
} from "@/lib/supabase-queries";
import {
  ProfileHeader,
  ProfileStats,
  ProfileEloChart,
  ProfileHackathonHistory,
} from "@/components/profile";
import { ProfileCompletionDialog } from "@/components/profile/profile-completion-dialog";
import { getUser } from "@/app/actions/auth";

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
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [isNewProfile, setIsNewProfile] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [profileData, rankHistoryData, participationsData, allProfilesData, currentUser] =
          await Promise.all([
            getProfileById(id),
            getRankHistoryByUserId(id),
            getHackathonParticipationsByUserId(id),
            getAllProfiles(),
            getUser(),
          ]);

        // Set current user ID
        setCurrentUserId(currentUser?.id || null);
        const isOwnProfile = currentUser?.id === id;

        // Use mock data if no data from Supabase
        if (!profileData) {
          // Check if this is the user's own profile
          if (isOwnProfile) {
            // Show dialog to create profile
            setIsNewProfile(true);
            setShowCompletionDialog(true);
            // Create a placeholder profile for display
            setProfile({
              id,
              username: '',
              full_name: '',
              linkedin_url: null,
              company: null,
              university: null,
              role: 'user',
              elo: 1500,
              created_at: new Date().toISOString(),
            });
          } else {
            setProfile(getMockProfileById(id) || mockProfiles[0]);
          }
        } else {
          setProfile(profileData);

          // Check if profile is incomplete and user is viewing their own profile
          const isIncomplete = !profileData.full_name;
          setShowCompletionDialog(isOwnProfile && isIncomplete);
          setIsNewProfile(false);
        }

        if (rankHistoryData.length === 0) {
          setRankHistory(getMockRankHistoryByUserId(id));
        } else {
          setRankHistory(rankHistoryData);
        }

        if (participationsData.length === 0) {
          setParticipations(mockParticipations);
        } else {
          setParticipations(participationsData);
        }

        if (allProfilesData.length === 0) {
          setAllProfiles(mockProfiles);
        } else {
          setAllProfiles(allProfilesData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Fallback to mock data on error
        setProfile(getMockProfileById(id) || mockProfiles[0]);
        setRankHistory(getMockRankHistoryByUserId(id));
        setParticipations(mockParticipations);
        setAllProfiles(mockProfiles);
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

  const displayRankHistory =
    rankHistory.length > 0 ? rankHistory : mockRankHistory;

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
      {/* Show completion dialog if profile is incomplete */}
      {showCompletionDialog && (
        <ProfileCompletionDialog
          userId={id}
          isNewProfile={isNewProfile}
          currentProfile={{
            username: profile.username,
            full_name: profile.full_name,
            linkedin_url: profile.linkedin_url,
            company: profile.company,
            university: profile.university,
          }}
        />
      )}

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
      <ProfileHackathonHistory participations={participations} />

      {/* Debug info - hidden, just for verification */}
      <p className="text-xs text-gray-400 mt-4">Profile ID: {id}</p>
    </div>
  );
}
