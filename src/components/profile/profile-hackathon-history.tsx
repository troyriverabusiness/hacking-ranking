import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { RankBadge } from "./rank-badge";
import { HackathonParticipation } from "@/lib/mock-data";

interface ProfileHackathonHistoryProps {
  participations: HackathonParticipation[];
}

export function ProfileHackathonHistory({
  participations,
}: ProfileHackathonHistoryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Hackathon History</h3>
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {participations.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {participations.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No hackathon participations yet</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200" />

            {/* Timeline items */}
            <div className="space-y-6">
              {participations.map((participation, index) => (
                <Link
                  key={participation.hackathon_id}
                  href={`/hackathons/${participation.hackathon_id}`}
                  className="block group"
                >
                  <div className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center group-hover:border-blue-600 group-hover:shadow-md transition-all">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 pb-2">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 group-hover:border-blue-300 group-hover:bg-blue-50 transition-all">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {participation.hackathon_name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1.5 text-sm text-gray-600">
                              <Users className="w-3.5 h-3.5" />
                              <span>{participation.team_name}</span>
                            </div>
                          </div>
                          <RankBadge rank={participation.rank} />
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(participation.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
