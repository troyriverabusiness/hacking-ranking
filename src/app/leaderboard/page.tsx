"use client";

import * as React from "react";
import Link from "next/link";
import { Award, Medal, Trophy } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs";
import {
  locations,
  mockHackathons,
  mockProfiles,
  type Location,
  type Profile,
  type Topic,
} from "@/lib/mock-data";

const podiumIconMap = {
  1: { Icon: Trophy, className: "text-amber-500" },
  2: { Icon: Medal, className: "text-slate-400" },
  3: { Icon: Award, className: "text-amber-700" },
};

function PodiumCard({ profile, rank }: { profile: Profile; rank: number }) {
  const orderClass = rank === 1 ? "md:order-2" : rank === 2 ? "md:order-1" : "md:order-3";
  const heightClass = rank === 1 ? "md:pt-0" : "md:pt-8";
  const { Icon, className } = podiumIconMap[rank as 1 | 2 | 3];

  return (
    <div className={`${orderClass} ${heightClass}`}>
      <Link href={`/profile/${profile.id}`}>
        <Card className="p-6 hover:shadow-lg cursor-pointer">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Icon className={`h-8 w-8 ${className}`} />
            </div>
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
      <Card className="hover:shadow-md cursor-pointer">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {podium.map((profile, index) => (
          <PodiumCard key={profile.id} profile={profile} rank={index + 1} />
        ))}
      </div>

      <div className="space-y-3">
        {rest.map((profile, index) => (
          <LeaderboardRow key={profile.id} profile={profile} rank={index + 4} />
        ))}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [tab, setTab] = React.useState<"leaderboard" | "city" | "topic">(
    "leaderboard"
  );

  const topics = React.useMemo(() => {
    const seen = new Set<Topic>();
    const ordered: Topic[] = [];
    mockHackathons.forEach((hackathon) => {
      hackathon.topics.forEach((topic) => {
        if (!seen.has(topic)) {
          seen.add(topic);
          ordered.push(topic);
        }
      });
    });
    return ordered;
  }, []);

  const [selectedCity, setSelectedCity] = React.useState<Location>(locations[0]);
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>(topics[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600 mt-1">
          Top performers across all hackathons
        </p>
      </div>

      <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)} className="w-full">
        <LeaderboardTabs
          value={tab}
          onValueChange={setTab}
          cities={locations}
          topics={topics}
          cityValue={selectedCity}
          onCityValueChange={setSelectedCity}
          topicValue={selectedTopic}
          onTopicValueChange={setSelectedTopic}
        />

        <TabsContent value="leaderboard">
          <LeaderboardContent />
        </TabsContent>

        <TabsContent value="city">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedCity} Rankings</h2>
              <p className="text-gray-500 mt-1">Showing rankings for {selectedCity}.</p>
            </div>
            <LeaderboardContent />
          </div>
        </TabsContent>

        <TabsContent value="topic">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedTopic} Rankings</h2>
              <p className="text-gray-500 mt-1">Showing rankings for {selectedTopic}.</p>
            </div>
            <LeaderboardContent />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
