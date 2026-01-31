"use client";

import { use, useState, useEffect } from "react";
import {
  Trophy,
  Calendar,
  Pencil,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { type Team, type Hackathon } from "@/models";
import { getHackathon, getHackathonTeams, getTeamParticipants } from "@/lib/supabase/index";
import { getCurrentUser } from "@/lib/auth";
import { LeaderboardTable, BackButtonHackathons, HackathonInProgress, HackathonHero, RegisterTeamDialog } from "./components";
import { Loading } from "@/components/loading";
import { Empty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [hackathonData, teamsData, user] = await Promise.all([
          getHackathon(id),
          getHackathonTeams(id),
          getCurrentUser(),
        ]);

        setHackathon(hackathonData);
        setTeams(teamsData);
        setUserId(user?.id || null);

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

  // Check if hackathon has started (start_date is not in the future)
  const hasStarted = hackathon ? new Date() >= new Date(hackathon.start_timestamp) : false;

  // Handler for successful team registration
  const handleTeamRegistrationSuccess = async () => {
    // Refresh teams list
    const updatedTeams = await getHackathonTeams(id);
    setTeams(updatedTeams);
  };

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

  const isCreator = userId && hackathon?.created_by && userId === hackathon.created_by;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <BackButtonHackathons />
        {isCreator && (
          <Button
            onClick={() => router.push(`/hackathons/${id}/edit`)}
            variant="outline"
            size="sm"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Hackathon
          </Button>
        )}
      </div>

      {/* Hero Section */}
      <HackathonHero hackathon={hackathon} />

      {/* Team Registration Section - Show if authenticated and hackathon has started */}
      {userId && hasStarted && (
        <div className="mb-6">
          <RegisterTeamDialog
            hackathonId={id}
            onSuccess={handleTeamRegistrationSuccess}
          />
        </div>
      )}

      {/* Info message for unauthenticated users */}
      {!userId && hasStarted && (
        <Card className="mb-6">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Want to register your team?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Please log in to register your team for this hackathon.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
