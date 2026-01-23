"use client";

import { Trophy, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Team } from "@/models";
import { TeamMembersList } from "./TeamMembersList";

interface TeamWithCount extends Team {
  participantCount: number;
}

interface LeaderboardRowProps {
  team: TeamWithCount;
}

export function LeaderboardRow({ team }: LeaderboardRowProps) {
  const topRank = team.rank <= 3;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="border-0 bg-transparent px-2 py-3 shadow-none transition hover:bg-gray-50 cursor-pointer">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(200px,1fr)_minmax(200px,1fr)_minmax(180px,1fr)] md:items-center">
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
                {team.participantCount}
              </div>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {topRank && <Trophy className="h-5 w-5 text-blue-600" />}
            {team.name}
          </DialogTitle>
        </DialogHeader>
        <TeamMembersList teamId={team.id} />
      </DialogContent>
    </Dialog>
  );
}

export type { TeamWithCount };
