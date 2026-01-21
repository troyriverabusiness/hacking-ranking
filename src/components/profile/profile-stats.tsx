import { TrendingUp, Trophy, Award, Target } from "lucide-react";
import { StatCard } from "./stat-card";

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Global Rank"
        value={`#${currentRank}`}
        icon={TrendingUp}
        gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        iconColor="text-blue-600 bg-blue-50"
      />
      <StatCard
        label="Hackathons"
        value={totalHackathons}
        icon={Trophy}
        gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        iconColor="text-purple-600 bg-purple-50"
      />
      <StatCard
        label="Wins"
        value={totalWins}
        icon={Award}
        gradient="bg-gradient-to-br from-yellow-500 to-orange-600"
        iconColor="text-yellow-600 bg-yellow-50"
      />
      <StatCard
        label="Top 3 Finishes"
        value={topThreeFinishes}
        icon={Target}
        gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        iconColor="text-green-600 bg-green-50"
      />
    </div>
  );
}
