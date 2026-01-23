"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/models/profile";

// COMPONENT
export function LeaderboardRow({ profile, rank }: { profile: Profile; rank: number }) {
  return (
    <Link href={`/profile/${profile.id}`} className="block">
      <div className="group grid grid-cols-[72px_minmax(0,1fr)_96px] items-center px-4 sm:px-6 py-3 text-sm transition-colors hover:bg-[#E0EFFB]">
        <LeaderboardRank rank={rank} />
        <div className="flex items-center gap-3 min-w-0">
          <LeaderboardAvatar fullName={profile.full_name} />
          <LeaderboardUserInfo
            fullName={profile.full_name}
            username={profile.username}
            company={profile.company}
          />
        </div>
        <LeaderboardScore elo={profile.elo} />
      </div>
    </Link>
  );
}

// =============================================================================
// Sub-components
// =============================================================================
function LeaderboardRank({ rank }: { rank: number }) {
  return (
    <span className="font-medium text-gray-500 tabular-nums">#{rank}</span>
  );
}

function LeaderboardAvatar({ fullName }: { fullName: string }) {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="" alt={fullName} />
      <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
        {fullName
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

function LeaderboardUserInfo({
  fullName,
  username,
  company
}: {
  fullName: string;
  username: string;
  company?: string | null;
}) {
  return (
    <div className="min-w-0">
      <p className="text-gray-900 font-medium truncate">
        {fullName}
      </p>
      <p className="text-xs text-gray-500 truncate">
        @{username}
        {company && ` · ${company}`}
      </p>
    </div>
  );
}

function LeaderboardScore({ elo }: { elo: number }) {
  return (
    <p className="text-right font-semibold text-gray-900 tabular-nums">
      {elo.toFixed(0)}
    </p>
  );
}


