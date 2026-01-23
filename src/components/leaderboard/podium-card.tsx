"use client";

import Link from "next/link";
import { Award, Medal, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/models/profile";

const podiumIconMap = {
  1: { Icon: Trophy, className: "text-amber-500" },
  2: { Icon: Medal, className: "text-slate-400" },
  3: { Icon: Award, className: "text-amber-700" },
};

export function PodiumCard({ profile, rank }: { profile: Profile; rank: number }) {
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
