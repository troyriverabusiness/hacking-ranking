"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar } from "lucide-react";
import type { RankHistory } from "@/models";
import { getRankHistory } from "@/lib/supabase/getRankHistory";


export function ProfileEloChart({ userId }: { userId: string }) {
  const [rankHistory, setRankHistory] = useState<RankHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRankHistory() {
      setLoading(true);
      try {
        const data = await getRankHistory(userId);
        setRankHistory(data);
      } catch (error) {
        console.error('Error fetching rank history:', error);
        setRankHistory([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRankHistory();
  }, [userId]);

  const startElo = rankHistory[0]?.elo || 0;
  const endElo = rankHistory[rankHistory.length - 1]?.elo || 0;
  const eloChange = endElo - startElo;
  const isPositive = eloChange >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">ELO History</h3>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600">
                {rankHistory.length} data points
              </span>
              <span className="text-gray-400">•</span>
              <span className={`font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}{eloChange} ELO
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              30D
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              90D
            </Button>
            <Button variant="secondary" size="sm" className="text-xs">
              1Y
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              All
            </Button>
          </div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="p-6">
        <div className="h-72 relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">ELO Chart Coming Soon</p>
            <p className="text-sm text-gray-600 mb-1">Interactive chart will be rendered with Recharts</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                Tracking from {startElo} to {endElo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
