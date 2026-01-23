"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { type Profile } from "@/models";
import { getTeamParticipants } from "@/lib/supabase/index";
import { Loading } from "@/components/loading";


export function TeamMembersList({ teamId }: { teamId: string }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipants() {
      setLoading(true);
      const data = await getTeamParticipants(teamId);
      setProfiles(data);
      setLoading(false);
    }
    fetchParticipants();
  }, [teamId]);

  if (loading) {
    return <Loading size="sm" text="Loading team members..." className="mt-4" />;
  }

  return (
    <div className="space-y-4 mt-4">
      <p className="text-sm text-gray-500">Team Members ({profiles.length})</p>
      {profiles.map((profile) => (
        <Link
          key={profile.id}
          href={`/profile/${profile.username}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
        >
          <div className="flex-1">
            <p className="font-medium text-gray-900">{profile.full_name}</p>
            <p className="text-sm text-gray-500">
              @{profile.username}
              {profile.company && ` · ${profile.company}`}
            </p>
          </div>
          {profile.university && (
            <Badge variant="outline">{profile.university}</Badge>
          )}
        </Link>
      ))}
    </div>
  );
}
