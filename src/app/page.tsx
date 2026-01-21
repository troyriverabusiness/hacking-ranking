"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockProfiles, type Profile } from "@/lib/mock-data";

function PodiumCard({ profile, rank }: { profile: Profile; rank: number }) {
  const rankEmoji = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉";
  const orderClass = rank === 1 ? "md:order-2" : rank === 2 ? "md:order-1" : "md:order-3";
  const heightClass = rank === 1 ? "md:pt-0" : "md:pt-8";

  return (
    <div className={`${orderClass} ${heightClass}`}>
      <Link href={`/profile/${profile.id}`}>
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <div className="text-4xl mb-2">{rankEmoji}</div>
            <Avatar className="w-16 h-16 mx-auto mb-3">
              <AvatarImage src="" alt={profile.full_name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                {profile.full_name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-gray-900">{profile.full_name}</h3>
            <p className="text-sm text-gray-500">@{profile.username}</p>
            <p className="text-blue-600 font-bold text-lg mt-1">
              {profile.elo.toFixed(0)} ELO
            </p>
            {profile.university && (
              <Badge variant="secondary" className="mt-2">
                {profile.university}
              </Badge>
            )}
          </div>
        </Card>
      </Link>
    </div>
  );
}

function LeaderboardRow({ profile, rank }: { profile: Profile; rank: number }) {
  return (
    <Link href={`/profile/${profile.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-500 w-8">
                #{rank}
              </span>
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={profile.full_name} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {profile.full_name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{profile.full_name}</p>
                <p className="text-sm text-gray-500">
                  @{profile.username}
                  {profile.company && ` · ${profile.company}`}
                </p>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              {profile.university && (
                <Badge variant="outline" className="hidden sm:inline-flex">
                  {profile.university}
                </Badge>
              )}
              <p className="text-blue-600 font-bold">
                {profile.elo.toFixed(0)} ELO
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function LeaderboardContent() {
  const podium = mockProfiles.slice(0, 3);
  const rest = mockProfiles.slice(3);

  return (
    <div>
      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {podium.map((profile, index) => (
          <PodiumCard key={profile.id} profile={profile} rank={index + 1} />
        ))}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {rest.map((profile, index) => (
          <LeaderboardRow key={profile.id} profile={profile} rank={index + 4} />
        ))}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600 mt-1">
          Top performers across all hackathons
        </p>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="city">By City</TabsTrigger>
          <TabsTrigger value="topic">By Topic</TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <LeaderboardContent />
        </TabsContent>

        <TabsContent value="city">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>City Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">
                Filter by: Munich, Paris, London, Berlin, Zurich
              </p>
              <LeaderboardContent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topic">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>Topic Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">
                Filter by: AI, Blockchain, Healthcare, Fintech, and more
              </p>
              <LeaderboardContent />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
