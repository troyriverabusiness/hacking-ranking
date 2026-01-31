import { TrendingUp, Trophy, Award, Target } from "lucide-react";
import { ProfileStatCard } from "./profile-stat-card";

interface ProfileStatsProps {
  currentRank: number;
  totalHackathons: number;
  totalWins: number;
  topThreeFinishes: number;
}

export function ProfileStats({
  currentRank,
  totalHackathons,
  totalWins,
  topThreeFinishes,
}: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <ProfileStatCard
        label="Global Rank"
        value={`#${currentRank}`}
        icon={TrendingUp}
        color="#3b82f6"
        gradientFrom="from-blue-500"
        gradientTo="to-indigo-600"
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />
      <ProfileStatCard
        label="Hackathons"
        value={totalHackathons}
        icon={Trophy}
        color="#a855f7"
        gradientFrom="from-purple-500"
        gradientTo="to-pink-600"
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
      />
      <ProfileStatCard
        label="Wins"
        value={totalWins}
        icon={Award}
        color="#f59e0b"
        gradientFrom="from-yellow-500"
        gradientTo="to-orange-600"
        iconBg="bg-yellow-50"
        iconColor="text-yellow-600"
      />
      <ProfileStatCard
        label="Top 3 Finishes"
        value={topThreeFinishes}
        icon={Target}
        color="#10b981"
        gradientFrom="from-green-500"
        gradientTo="to-emerald-600"
        iconBg="bg-green-50"
        iconColor="text-green-600"
      />
    </div>
  );
}
