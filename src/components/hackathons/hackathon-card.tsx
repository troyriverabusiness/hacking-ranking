"use client";

import Link from "next/link";
import { Trophy, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateRange, type Hackathon } from "@/lib/mock-data";

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Link href={`/hackathons/${hackathon.id}`}>
      <Card className="cursor-pointer hover:shadow-lg h-full">
        <CardHeader className="pb-3">
          <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
            <Trophy className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-lg">{hackathon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {hackathon.description}
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDateRange(hackathon.start_timestamp, hackathon.end_timestamp)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
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
