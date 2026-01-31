"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/models";
import { getProfile, getAllProfiles } from "@/lib/supabase";
import { getCurrentUser, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, UserX } from "lucide-react";
import {
  ProfileHeader,
  ProfileStats,
  ProfileEloChart,
  ProfileHackathonHistory,
} from "@/components/profile";
import { Loading } from "@/components/loading";
import { Empty } from "@/components/empty";
import { Boxes } from "@/components/ui/background-boxes";

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
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [participations, setParticipations] = useState<HackathonParticipation[]>([]);
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [profileData, allProfilesData, currentUser] = await Promise.all([
          getProfile(id),
          getAllProfiles(),
          getCurrentUser(),
        ]);

        if (!profileData) {
          setProfile(null);
        } else {
          setProfile(profileData);
        }

        setParticipations([]); // TODO: Implement getHackathonParticipations
        setAllProfiles(allProfilesData || []);
        setCurrentUserId(currentUser?.id || null);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setProfile(null);
        setParticipations([]);
        setAllProfiles([]);
        setCurrentUserId(null);
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

  // Check if this is the current user's profile
  const isOwnProfile = currentUserId === id;

  async function handleSignOut() {
    try {
      await signOut();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <Loading size="lg" text="Loading profile..." />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty
          icon={UserX}
          title="Profile not found"
          description="The profile you are looking for does not exist or has been removed."
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Boxes />

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
        <ProfileEloChart userId={id} />
      </div>

      {/* Hackathon History */}
      <ProfileHackathonHistory userId={id} />

      {/* Logout button - only shown for current user's profile */}
      {isOwnProfile && (
        <div className="mb-8 pt-8 flex justify-end">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}
