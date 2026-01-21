"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  getHackathonById,
  getTeamsByHackathonId,
  mockHackathons,
  mockTeams,
  formatDateRangeLong,
  type Team,
} from "@/lib/mock-data";

function TeamMembersList({ team }: { team: Team }) {
  return (
    <div className="space-y-4 mt-4">
      <p className="text-sm text-gray-500">Team Members</p>
      {team.members.map((member) => (
        <Link
          key={member.id}
          href={`/profile/${member.id}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
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

function TeamCard({ team }: { team: Team }) {
  const rankEmoji =
    team.rank === 1 ? "🥇" : team.rank === 2 ? "🥈" : team.rank === 3 ? "🥉" : "🏅";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{rankEmoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-sm text-gray-500">
                    {team.members.length} members
                  </p>
                </div>
              </div>
              <Badge variant={team.rank <= 3 ? "default" : "secondary"}>
                #{team.rank}
              </Badge>
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
                <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                  +{team.members.length - 4}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{rankEmoji}</span>
            {team.name}
          </DialogTitle>
        </DialogHeader>
        <TeamMembersList team={team} />
      </DialogContent>
    </Dialog>
  );
}

function PodiumCard({ team }: { team: Team }) {
  const rankEmoji =
    team.rank === 1 ? "🥇" : team.rank === 2 ? "🥈" : "🥉";
  const orderClass =
    team.rank === 1 ? "md:order-2" : team.rank === 2 ? "md:order-1" : "md:order-3";
  const heightClass = team.rank === 1 ? "md:pt-0" : "md:pt-8";

  return (
    <div className={`${orderClass} ${heightClass}`}>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-3">{rankEmoji}</div>
              <h3 className="font-semibold text-gray-900 text-lg">{team.name}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {team.members.length} members
              </p>
              <div className="flex justify-center -space-x-2">
                {team.members.slice(0, 3).map((member) => (
                  <Avatar
                    key={member.id}
                    className="h-10 w-10 border-2 border-white"
                  >
                    <AvatarImage src="" alt={member.full_name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                      {member.full_name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">{rankEmoji}</span>
              {team.name}
            </DialogTitle>
          </DialogHeader>
          <TeamMembersList team={team} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // In real app, fetch by id. For now, use mock data
  const hackathon = getHackathonById(id) || mockHackathons[0];
  const teams = getTeamsByHackathonId(id);
  
  // If no teams found for this hackathon, use default mock teams
  const displayTeams = teams.length > 0 ? teams : mockTeams;
  const podiumTeams = displayTeams.filter((t) => t.rank <= 3);
  const otherTeams = displayTeams.filter((t) => t.rank > 3);

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
              <span className="flex items-center gap-1">
                📅{" "}
                {formatDateRangeLong(
                  hackathon.start_timestamp,
                  hackathon.end_timestamp
                )}
              </span>
              <span className="flex items-center gap-1">
                📍 {hackathon.location}
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

        {/* Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {podiumTeams.map((team) => (
            <PodiumCard key={team.id} team={team} />
          ))}
        </div>

        {/* Other Teams */}
        {otherTeams.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Other Participants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Debug info - hidden, just for verification */}
      <p className="text-xs text-gray-400">Hackathon ID: {id}</p>
    </div>
  );
}
