"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/lib/mock-data";

export function LeaderboardRow({ profile, rank }: { profile: Profile; rank: number }) {
  return (
    <Link href={`/profile/${profile.id}`} className="block">
      <div className="group grid grid-cols-[72px_minmax(0,1fr)_96px] items-center px-4 sm:px-6 py-3 text-sm transition-colors hover:bg-[#E0EFFB]">
        <span className="font-medium text-gray-500 tabular-nums">#{rank}</span>
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={profile.full_name} />
            <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
              {profile.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-gray-900 font-medium truncate">
              {profile.full_name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              @{profile.username}
              {profile.company && ` · ${profile.company}`}
            </p>
          </div>
        </div>
        <p className="text-right font-semibold text-gray-900 tabular-nums">
          {profile.elo.toFixed(0)}
        </p>
      </div>
    </Link>
  );
}
