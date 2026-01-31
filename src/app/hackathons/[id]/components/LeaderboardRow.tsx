"use client";

import { Trophy, Users, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Team } from "@/models";
import { TeamDetailsDialog } from "./TeamDetailsDialog";

export function LeaderboardRow({ team }: { team: Team }) {
  const topRank = team.rank <= 3;

  return (
    <TeamDetailsDialog team={team}>
      <Card className="border-0 bg-transparent px-2 py-3 shadow-none transition hover:bg-gray-50 cursor-pointer">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(180px,1fr)_auto] md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant={topRank ? "default" : "secondary"}>#{team.rank}</Badge>
              {topRank && (
                <span className="flex h-7 w-7 items-center justify-center bg-blue-100 text-blue-700 rounded-md">
                  <Trophy className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Team</p>
            <p className="text-base font-semibold text-gray-900">{team.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Participants</p>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Users className="h-4 w-4 text-gray-400" />
              {team.members.length}
            </div>
          </div>

          <div className="flex items-center justify-end min-w-[60px]">
            {team.status === "verified" && (
              <div className="flex flex-col items-center gap-0.5">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-[10px] text-green-600 font-medium">verified</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </TeamDetailsDialog>
  );
}

