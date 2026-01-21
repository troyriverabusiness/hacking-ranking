"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/mock-data";

export function LeaderboardRow({ profile, rank }: { profile: Profile; rank: number }) {
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
