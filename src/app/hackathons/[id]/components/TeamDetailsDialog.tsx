"use client";

import { useState, useEffect } from "react";
import { Trophy, Search, UserPlus, X } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { type Team, type Profile } from "@/models";
import { getTeamParticipants, searchProfilesByUsername, addTeamMember } from "@/lib/supabase/index";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface TeamDetailsDialogProps {
  team: Team;
  children: React.ReactNode;
}

export function TeamDetailsDialog({ team, children }: TeamDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const topRank = team.rank <= 3;
  const isTeamCreator = currentUserId === team.created_by;

  useEffect(() => {
    async function getCurrentUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (open) {
      async function fetchParticipants() {
        setLoading(true);
        const data = await getTeamParticipants(team.id);
        setProfiles(data);
        setLoading(false);
      }
      fetchParticipants();
    }
  }, [open, team.id]);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        const results = await searchProfilesByUsername(searchQuery);
        const memberIds = profiles.map(p => p.id);
        const filteredResults = results.filter(r => !memberIds.includes(r.id));
        setSearchResults(filteredResults);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [searchQuery, profiles]);

  const handleAddMember = async (userId: string, username: string) => {
    setIsAddingMember(true);
    const result = await addTeamMember(team.id, userId);

    if (result.success) {
      toast.success(`Added @${username} to the team`);
      const updatedProfiles = await getTeamParticipants(team.id);
      setProfiles(updatedProfiles);
      setSearchQuery("");
      setSearchResults([]);
    } else {
      toast.error(result.error || "Failed to add team member");
    }
    setIsAddingMember(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white border-blue-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            {topRank && <Trophy className="h-5 w-5 text-blue-600" />}
            {team.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <p className="text-sm text-gray-500">Team Members ({profiles.length})</p>

          {loading ? (
            <Loading size="sm" text="Loading team members..." className="mt-4" />
          ) : (
            <div className="space-y-2">
              {profiles.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No team members found</p>
              ) : (
                profiles.map((profile, index) => (
                  <div key={profile.username || profile.id || index}>
                    <Link
                      href={`/profile/${profile.username}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{profile.full_name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          @{profile.username}
                          {profile.company && ` · ${profile.company}`}
                        </p>
                      </div>
                      {profile.university && (
                        <Badge variant="outline" className="text-gray-700 bg-white border-gray-300 shrink-0">
                          {profile.university}
                        </Badge>
                      )}
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}

          {isTeamCreator && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-3">Add Team Member</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {isSearching && (
                <div className="mt-3">
                  <Loading size="sm" text="Searching..." />
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="mt-3 space-y-2">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{result.full_name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          @{result.username}
                          {result.company && ` · ${result.company}`}
                        </p>
                      </div>
                      {result.university && (
                        <Badge variant="outline" className="text-gray-700 bg-white border-gray-300 shrink-0">
                          {result.university}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleAddMember(result.id, result.username)}
                        disabled={isAddingMember}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {!isSearching && searchQuery.trim() && searchResults.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4 mt-3">
                  No profiles found matching &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
