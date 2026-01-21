import { Trophy, Medal, Award, Hash } from "lucide-react";

interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  if (rank === 1) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 font-semibold text-sm shadow-sm">
        <Trophy className="w-4 h-4" />
        <span>1st</span>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-semibold text-sm shadow-sm">
        <Medal className="w-4 h-4" />
        <span>2nd</span>
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900 font-semibold text-sm shadow-sm">
        <Award className="w-4 h-4" />
        <span>3rd</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm">
      <Hash className="w-3.5 h-3.5" />
      <span>{rank}</span>
    </div>
  );
}
