"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
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

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Select>
          <SelectTrigger className="w-full sm:w-[200px] bg-white">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location.toLowerCase()}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full sm:w-[200px] bg-white">
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {popularTopics.map((topic) => (
              <SelectItem key={topic} value={topic.toLowerCase().replace(" ", "-")}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Hackathon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
    </div>
  );
}
