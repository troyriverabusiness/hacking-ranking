import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, ExternalLink, Sparkles } from "lucide-react";
import type { Profile } from "@/models";

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Background gradient banner */}
      <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-t-xl" />

      {/* Profile content */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 -mt-16 relative">
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src="" alt={profile.full_name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl font-semibold">
                  {profile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {profile.role !== "user" && (
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1.5 shadow-md">
                  <Sparkles className="w-4 h-4 text-yellow-900" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 pt-2">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {profile.full_name}
                  </h1>
                  <p className="text-gray-500 text-lg mb-3">@{profile.username}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.university && (
                      <Badge variant="secondary" className="px-3 py-1">
                        {profile.university}
                      </Badge>
                    )}
                    {profile.role !== "user" && (
                      <Badge className="px-3 py-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 capitalize">
                        {profile.role}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    {profile.company && (
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{profile.company}</span>
                      </span>
                    )}
                    {profile.linkedin_url && (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>

                {/* ELO Rating - Prominent display */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 min-w-[160px]">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">ELO Rating</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {profile.elo.toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
