import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import { Empty } from "@/components/empty";
import { Hackathon } from "@/models/hackathon";
import { getHackathonParticipations } from "@/lib/supabase/profile/getHackathonParticipations";


export function ProfileHackathonHistory({
  userId,
}: { userId: string }) {
  const [participations, setParticipations] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipations() {
      setLoading(true);
      try {
        const hackathons = await getHackathonParticipations(userId);
        setParticipations(hackathons);
      } catch (error) {
        console.error('Error fetching hackathon participations:', error);
        setParticipations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchParticipations();
  }, [userId]);

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
        {loading ? (
          <Loading size="lg" text="Loading hackathon history..." className="py-12" />
        ) : participations.length === 0 ? (
          <Empty
            title="No hackathon participations yet"
            description="Join a hackathon to start building your history."
            className="py-12"
          />
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200" />

            {/* Timeline items */}
            <div className="space-y-6">
              {participations.map((hackathon) => (
                <Link
                  key={hackathon.id}
                  href={`/hackathons/${hackathon.id}`}
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
                              {hackathon.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1.5 text-sm text-gray-600">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{hackathon.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(hackathon.start_timestamp).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span>
                            {new Date(hackathon.end_timestamp).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                          {hackathon.description}
                        </p>
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
