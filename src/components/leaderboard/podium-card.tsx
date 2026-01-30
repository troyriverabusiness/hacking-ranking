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

const podiumHeights = {
  1: "h-48",
  2: "h-36",
  3: "h-32",
};

const podiumColors = {
  1: "from-amber-400 via-yellow-500 to-amber-600",
  2: "from-slate-300 via-gray-400 to-slate-500",
  3: "from-amber-600 via-orange-700 to-amber-800",
};

export function PodiumCard({ profile, rank }: { profile: Profile; rank: number }) {
  const orderClass = rank === 1 ? "md:order-2" : rank === 2 ? "md:order-1" : "md:order-3";
  const { Icon, className } = podiumIconMap[rank as 1 | 2 | 3];
  const height = podiumHeights[rank as 1 | 2 | 3];
  const gradient = podiumColors[rank as 1 | 2 | 3];

  return (
    <div className={`${orderClass} flex flex-col items-center relative`}>
      <Link href={`/profile/${profile.id}`} className="w-full flex flex-col items-center">
        {/* Profile Card - Floating Above Podium */}
        <div className="relative z-10 mb-4 animate-float" style={{
          animation: `float ${3 + rank * 0.5}s ease-in-out infinite`,
          animationDelay: `${rank * 0.2}s`
        }}>
          <Card className="p-6 hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-xl">
            <div className="text-center">
              <div className="flex justify-center mb-2 animate-bounce" style={{
                animationDuration: `${2 + rank * 0.3}s`,
                animationDelay: `${rank * 0.1}s`
              }}>
                <Icon className={`h-10 w-10 ${className} drop-shadow-lg`} />
              </div>
              <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-white shadow-lg">
                <AvatarImage src="" alt={profile.full_name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white text-xl font-bold">
                  {profile.full_name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-gray-900 text-lg">{profile.full_name}</h3>
              <p className="text-sm text-gray-600">@{profile.username}</p>
              <p className="text-blue-600 font-bold text-xl mt-2 drop-shadow">
                {profile.elo.toFixed(0)} ELO
              </p>
              {profile.university && (
                <Badge variant="secondary" className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                  {profile.university}
                </Badge>
              )}
            </div>
          </Card>
        </div>

        {/* 3D Podium Platform */}
        <div
          className={`${height} w-full relative`}
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1000px) rotateX(5deg)",
          }}
        >
          {/* Top Surface */}
          <div
            className={`absolute inset-x-0 top-0 h-8 bg-gradient-to-r ${gradient} rounded-t-lg shadow-lg`}
            style={{
              transform: "translateZ(20px)",
              boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-t-lg" />
            {/* Rank Number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white drop-shadow-lg">{rank}</span>
            </div>
          </div>

          {/* Front Face */}
          <div
            className={`absolute inset-x-0 top-8 bottom-0 bg-gradient-to-b ${gradient} shadow-2xl`}
            style={{
              transformOrigin: "top",
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
            {/* Decorative Lines */}
            <div className="absolute inset-x-4 top-4 space-y-2">
              <div className="h-px bg-white/30" />
              <div className="h-px bg-white/20" />
            </div>
          </div>

          {/* Side Shadow */}
          <div
            className="absolute -right-2 top-8 bottom-0 w-2 bg-black/30 blur-sm"
            style={{
              transform: "skewY(-5deg)",
            }}
          />
        </div>
      </Link>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}
