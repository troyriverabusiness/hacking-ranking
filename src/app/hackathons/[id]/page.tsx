"use client";

import { use, useState, useEffect } from "react";
import {
  Trophy,
  Calendar,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { type Hackathon } from "@/models";
import { getHackathon, getHackathonTeams, getTeamParticipants } from "@/lib/supabase/index";
import { formatDateRangeLong } from "@/lib/mock-data";
import { LeaderboardRow, type TeamWithCount, BackButton } from "./components";

export default function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [teamsWithCounts, setTeamsWithCounts] = useState<TeamWithCount[]>([]);
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

        // Fetch participant counts for each team
        if (teamsData && teamsData.length > 0) {
          const teamsWithCountsData = await Promise.all(
            teamsData.map(async (team) => {
              const participants = await getTeamParticipants(team.id);
              return {
                ...team,
                participantCount: participants.length,
              };
            })
          );
          setTeamsWithCounts(teamsWithCountsData);
        }
      } catch (error) {
        console.error('Error fetching hackathon details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const leaderboardTeams = [...teamsWithCounts].sort((a, b) => a.rank - b.rank);

  // Check if hackathon has ended
  const hasEnded = hackathon ? new Date() > new Date(hackathon.end_timestamp) : false;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading hackathon details...</div>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton />
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Hackathon not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {hackathon.name}
            </h1>
            <p className="text-gray-600 max-w-2xl mb-4">
              {hackathon.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                {formatDateRangeLong(
                  hackathon.start_timestamp,
                  hackathon.end_timestamp
                )}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                {hackathon.location}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {hackathon.topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="bg-white/80">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section - Only show if hackathon has ended */}
      {hasEnded && leaderboardTeams.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
          <div className="border-y border-gray-200">
            <div className="hidden md:grid md:grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(180px,1fr)] md:items-center md:bg-gray-50 md:px-2 md:py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <span>Rank</span>
              <span>Team</span>
              <span>Participants</span>
            </div>
            {leaderboardTeams.map((team) => (
              <div key={team.id} className="border-t border-gray-200">
                <LeaderboardRow team={team} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message if hackathon hasn't ended */}
      {!hasEnded && (
        <div className="mb-8">
          <Card className="p-8 text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hackathon In Progress
            </h3>
            <p className="text-gray-600">
              Results will be available after the hackathon ends on{" "}
              {new Date(hackathon.end_timestamp).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
