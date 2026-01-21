"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockHackathons,
  locations,
  popularTopics,
  formatDateRange,
  type Hackathon,
} from "@/lib/mock-data";

function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Link href={`/hackathons/${hackathon.id}`}>
      <Card className="cursor-pointer hover:shadow-lg h-full">
        <CardHeader className="pb-3">
          <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-4xl">🏆</span>
          </div>
          <CardTitle className="text-lg">{hackathon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {hackathon.description}
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <span>📅</span>
              {formatDateRange(hackathon.start_timestamp, hackathon.end_timestamp)}
            </p>
            <p className="flex items-center gap-2">
              <span>📍</span>
              {hackathon.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {hackathon.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function HackathonsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hackathons</h1>
        <p className="text-gray-600 mt-1">
          Browse and explore hackathon events
        </p>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="leaderboard" className="mb-8">
        <div className="overflow-x-auto">
          <TabsList className="mb-6 w-max">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="city">City</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="leaderboard" />
        <TabsContent value="city">
          <Tabs defaultValue={locations[0] ?? "all"} className="gap-0">
            <div className="overflow-x-auto">
              <TabsList className="w-max">
                {locations.map((location) => (
                  <TabsTrigger key={location} value={location}>
                    {location}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {locations.map((location) => (
              <TabsContent key={`${location}-content`} value={location} />
            ))}
          </Tabs>
        </TabsContent>
        <TabsContent value="topics">
          <Tabs defaultValue={popularTopics[0] ?? "all"} className="gap-0">
            <div className="overflow-x-auto">
              <TabsList className="w-max">
                {popularTopics.map((topic) => (
                  <TabsTrigger key={topic} value={topic}>
                    {topic}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {popularTopics.map((topic) => (
              <TabsContent key={`${topic}-content`} value={topic} />
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Hackathon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
    </div>
  );
}
