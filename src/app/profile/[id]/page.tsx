"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getProfileById,
  getRankHistoryByUserId,
  mockProfiles,
  mockParticipations,
  mockRankHistory,
} from "@/lib/mock-data";

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getRankBadge(rank: number) {
  if (rank === 1)
    return (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        🥇 1st
      </Badge>
    );
  if (rank === 2)
    return (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
        🥈 2nd
      </Badge>
    );
  if (rank === 3)
    return (
      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
        🥉 3rd
      </Badge>
    );
  return <Badge variant="outline">#{rank}</Badge>;
}

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
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt={profile.full_name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                {profile.full_name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.full_name}
                </h1>
                <div className="flex gap-2">
                  {profile.university && (
                    <Badge variant="secondary">{profile.university}</Badge>
                  )}
                  {profile.role !== "user" && (
                    <Badge variant="outline" className="capitalize">
                      {profile.role}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-gray-500 mb-2">@{profile.username}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {profile.company && (
                  <span className="flex items-center gap-1">
                    🏢 {profile.company}
                  </span>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    🔗 LinkedIn
                  </a>
                )}
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold text-blue-600">
                {profile.elo.toFixed(0)}
              </p>
              <p className="text-sm text-gray-500">ELO Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Global Rank"
          value={`#${stats.currentRank}`}
          icon="🌍"
        />
        <StatCard label="Hackathons" value={stats.totalHackathons} icon="🏆" />
        <StatCard label="Wins" value={stats.totalWins} icon="🥇" />
        <StatCard
          label="Top 3 Finishes"
          value={stats.topThreeFinishes}
          icon="🎯"
        />
      </div>

      {/* ELO Chart Placeholder */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>ELO History</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                30D
              </Button>
              <Button variant="outline" size="sm">
                90D
              </Button>
              <Button variant="secondary" size="sm">
                1Y
              </Button>
              <Button variant="outline" size="sm">
                All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">📈 ELO Chart</p>
              <p className="text-sm">Chart will be rendered here with Recharts</p>
              <p className="text-xs mt-2">
                Data points: {displayRankHistory.length} | Range:{" "}
                {displayRankHistory[0]?.elo} →{" "}
                {displayRankHistory[displayRankHistory.length - 1]?.elo}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hackathon History */}
      <Card>
        <CardHeader>
          <CardTitle>Hackathon History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockParticipations.map((participation) => (
              <Link
                key={participation.hackathon_id}
                href={`/hackathons/${participation.hackathon_id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border">
                  <div>
                    <p className="font-medium text-gray-900">
                      {participation.hackathon_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Team: {participation.team_name} ·{" "}
                      {new Date(participation.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {getRankBadge(participation.rank)}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Debug info - hidden, just for verification */}
      <p className="text-xs text-gray-400 mt-4">Profile ID: {id}</p>
    </div>
  );
}
