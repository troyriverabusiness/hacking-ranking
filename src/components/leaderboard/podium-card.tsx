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
  1: "h-16",
  2: "h-12",
  3: "h-10",
};

const podiumColors = {
  1: { top: "#F4E4C1", side: "#D4AF37", shadow: "#B8942A" }, // Gold/Sandy
  2: { top: "#E8E8E8", side: "#C0C0C0", shadow: "#A0A0A0" }, // Silver/Stone
  3: { top: "#E6C9A8", side: "#CD7F32", shadow: "#A86428" }, // Bronze/Rock
};

export function PodiumCard({ profile, rank }: { profile: Profile; rank: number }) {
  const orderClass = rank === 1 ? "md:order-2" : rank === 2 ? "md:order-1" : "md:order-3";
  const { Icon, className } = podiumIconMap[rank as 1 | 2 | 3];
  const height = podiumHeights[rank as 1 | 2 | 3];
  const colors = podiumColors[rank as 1 | 2 | 3];

  return (
    <div className={`${orderClass} flex flex-col items-center relative`}>
      <Link href={`/profile/${profile.id}`} className="w-full flex flex-col items-center">
        {/* Profile Card - Compact */}
        <div className="relative z-10 mb-2 animate-float" style={{
          animation: `float ${3 + rank * 0.5}s ease-in-out infinite`,
          animationDelay: `${rank * 0.2}s`
        }}>
          <Card className="p-3 hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-xl max-w-[180px]">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Icon className={`h-6 w-6 ${className} drop-shadow-lg`} />
              </div>
              <Avatar className="w-12 h-12 mx-auto mb-2 ring-2 ring-white shadow-lg">
                <AvatarImage src="" alt={profile.full_name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white text-sm font-bold">
                  {profile.full_name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-gray-900 text-sm">{profile.full_name}</h3>
              <p className="text-xs text-gray-600">@{profile.username}</p>
              <p className="text-blue-600 font-bold text-base mt-1">
                {profile.elo.toFixed(0)}
              </p>
              {profile.university && (
                <Badge variant="secondary" className="mt-1 text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                  {profile.university}
                </Badge>
              )}
            </div>
          </Card>
        </div>

        {/* Island-style Platform */}
        <div
          className={`${height} w-40 relative animate-shifty`}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            animationDelay: `${rank * 0.3}s`,
          }}
        >
          {/* Top surface - flat like island */}
          <div
            className="absolute inset-x-0 top-0 h-4 shadow-2xl overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at center, ${colors.top} 20%, ${colors.side} 100%)`,
              transform: "rotateX(65deg)",
              borderRadius: "50%",
              boxShadow: `0 8px 24px rgba(0,0,0,0.4), inset 0 -1px 4px rgba(0,0,0,0.2), inset 0 1px 4px rgba(255,255,255,0.4)`,
            }}
          >
            {/* Rank number badge */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotateX(-65deg) translateY(-2px)" }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.side}, ${colors.shadow})`,
                  transform: "scaleY(1.5)",
                }}
              >
                <span className="text-xl font-bold text-white drop-shadow-lg" style={{ transform: "scaleY(0.67)" }}>
                  {rank}
                </span>
              </div>
            </div>

            {/* Organic texture overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Platform edge/side - very short */}
          <div
            className="absolute inset-x-2 top-4 bottom-0 shadow-xl overflow-hidden"
            style={{
              background: `linear-gradient(to bottom, ${colors.side} 0%, ${colors.shadow} 100%)`,
              borderRadius: "4px 4px 50% 50%",
              boxShadow: "0 6px 20px rgba(0,0,0,0.4), inset -2px 0 4px rgba(0,0,0,0.3), inset 2px 0 4px rgba(255,255,255,0.2)",
            }}
          >
            {/* Subtle rock/sand texture */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-black/30"
                  style={{ top: `${(i + 1) * 25}%` }}
                />
              ))}
            </div>
          </div>

          {/* Water ripple/shadow at base */}
          <div
            className="absolute -bottom-1 left-0 right-0 h-3 rounded-full blur-sm animate-water-ripple"
            style={{
              background: `radial-gradient(ellipse at center, rgba(6, 182, 212, 0.3) 0%, transparent 70%)`,
              animationDelay: `${rank * 0.4}s`,
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
            transform: translateY(-8px);
          }
        }

        @keyframes shifty {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-2px) rotate(-0.5deg);
          }
          75% {
            transform: translateX(2px) rotate(0.5deg);
          }
        }

        @keyframes water-ripple {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        .animate-shifty {
          animation: shifty 6s ease-in-out infinite;
        }

        .animate-water-ripple {
          animation: water-ripple 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

