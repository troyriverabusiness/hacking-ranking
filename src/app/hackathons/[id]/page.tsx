"use client";

import { use, useState, useEffect } from "react";
import {
  Trophy,
  Calendar,
} from "lucide-react";

import { type Team, type Hackathon } from "@/models";
import { getHackathon, getHackathonTeams, getTeamParticipants } from "@/lib/supabase/index";
import { LeaderboardTable, BackButtonHackathons, HackathonInProgress, HackathonHero } from "./components";
import { Loading } from "@/components/loading";
import { Empty } from "@/components/empty";

export default function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [hackathonData, teamsData] = await Promise.all([
          getHackathon(id),
          getHackathonTeams(id),
        ]);

        setHackathon(hackathonData);
        setTeams(teamsData);
        
      } catch (error) {
        console.error('Error fetching hackathon details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const leaderboardTeams = [...teams].sort((a, b) => a.rank - b.rank);

  // Check if hackathon has ended
  const hasEnded = hackathon ? new Date() > new Date(hackathon.end_timestamp) : false;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading size="lg" text="Loading hackathon details..." className="py-12" />
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButtonHackathons />
        <Empty
          icon={Calendar}
          title="Hackathon not found"
          description="The hackathon you're looking for doesn't exist or has been removed."
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButtonHackathons />

      {/* Hero Section */}
      <HackathonHero hackathon={hackathon} />

      {/* Results Section - Only show if hackathon has ended */}
      {hasEnded && leaderboardTeams.length > 0 && (
        <LeaderboardTable teams={teams} />
      )}

      {/* Empty state if hackathon has ended but no teams */}
      {hasEnded && leaderboardTeams.length === 0 && (
        <Empty
          icon={Trophy}
          title="No teams participated"
          description="This hackathon has ended, but no teams were registered for the competition."
        />
      )}

      {/* Message if hackathon hasn't ended */}
      {!hasEnded && (
        <HackathonInProgress endTimestamp={hackathon.end_timestamp} />
      )}
    </div>
  );
}
