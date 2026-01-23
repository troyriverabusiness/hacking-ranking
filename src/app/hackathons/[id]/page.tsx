"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Users,
  Building2,
  GraduationCap,
  Calendar,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getHackathonById as getMockHackathonById,
  getTeamsByHackathonId as getMockTeamsByHackathonId,
  mockHackathons,
  formatDateRangeLong,
  type Team,
  type Hackathon,
} from "@/lib/mock-data";
import {
  getHackathonById,
  getTeamsByHackathonId,
} from "@/lib/supabase-queries";

function TeamMembersList({ team }: { team: Team }) {
  return (
    <div className="space-y-4 mt-4">
      <p className="text-sm text-gray-500">Team Members</p>
      {team.members.map((member) => (
        <Link
          key={member.id}
          href={`/profile/${member.id}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="" alt={member.full_name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {member.full_name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{member.full_name}</p>
            <p className="text-sm text-gray-500">
              @{member.username}
              {member.company && ` · ${member.company}`}
            </p>
          </div>
          {member.university && (
            <Badge variant="outline">{member.university}</Badge>
          )}
        </Link>
      ))}
    </div>
  );
}

function LeaderboardRow({ team }: { team: Team }) {
  const topRank = team.rank <= 3;
  const uniqueUniversities = new Set(
    team.members.map((member) => member.university).filter(Boolean)
  );
  const uniqueCompanies = new Set(
    team.members.map((member) => member.company).filter(Boolean)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="border-0 bg-transparent px-2 py-3 shadow-none transition hover:bg-gray-50">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(240px,1.2fr)_minmax(200px,0.9fr)_minmax(200px,0.9fr)_auto] md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant={topRank ? "default" : "secondary"}>#{team.rank}</Badge>
                {topRank && (
                  <span className="flex h-7 w-7 items-center justify-center bg-blue-100 text-blue-700">
                    <Trophy className="h-4 w-4" />
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Team</p>
                <p className="text-base font-semibold text-gray-900">{team.name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-start">
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Users className="h-4 w-4 text-gray-400" />
                  {team.members.length}
                </div>
              </div>
              <div className="flex -space-x-2">
                {team.members.slice(0, 4).map((member) => (
                  <Avatar
                    key={member.id}
                    className="h-8 w-8 border-2 border-white"
                  >
                    <AvatarImage src="" alt={member.full_name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                      {member.full_name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {team.members.length > 4 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs text-gray-600">
                    +{team.members.length - 4}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-gray-500" />
                {uniqueCompanies.size} companies
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-gray-500" />
                {uniqueUniversities.size} universities
              </Badge>
            </div>

            <div className="text-sm text-gray-500 md:text-right">
              View roster
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {topRank && <Trophy className="h-5 w-5 text-blue-600" />}
            {team.name}
          </DialogTitle>
        </DialogHeader>
        <TeamMembersList team={team} />
      </DialogContent>
    </Dialog>
  );
}

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
          getHackathonById(id),
          getTeamsByHackathonId(id),
        ]);

        // Use mock data if no data from Supabase
        if (!hackathonData) {
          setHackathon(getMockHackathonById(id) || mockHackathons[0]);
        } else {
          setHackathon(hackathonData);
        }

        if (teamsData.length === 0) {
          setTeams(getMockTeamsByHackathonId(id));
        } else {
          setTeams(teamsData);
        }
      } catch (error) {
        console.error('Error fetching hackathon details:', error);
        // Fallback to mock data on error
        setHackathon(getMockHackathonById(id) || mockHackathons[0]);
        setTeams(getMockTeamsByHackathonId(id));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const leaderboardTeams = [...teams].sort((a, b) => a.rank - b.rank);

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
        <Link href="/hackathons">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hackathons
          </Button>
        </Link>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Hackathon not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link href="/hackathons">
        <Button variant="ghost" className="mb-6 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Hackathons
        </Button>
      </Link>

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

      {/* Results Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
        <div className="border-y border-gray-200">
          <div className="hidden md:grid md:grid-cols-[minmax(240px,1.2fr)_minmax(200px,0.9fr)_minmax(200px,0.9fr)_auto] md:items-center md:bg-gray-50 md:px-2 md:py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <span>Team</span>
            <span>Members</span>
            <span>Representation</span>
            <span className="text-right">Details</span>
          </div>
          {leaderboardTeams.map((team) => (
            <div key={team.id} className="border-t border-gray-200">
              <LeaderboardRow team={team} />
            </div>
          ))}
        </div>
      </div>

      {/* Debug info - hidden, just for verification */}
      <p className="text-xs text-gray-400">Hackathon ID: {id}</p>
    </div>
  );
}
