import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Hackathon } from "@/models";
import { formatDateRangeLong } from "@/lib/date-formatting";

interface HackathonHeroProps {
  hackathon: Hackathon;
}

export function HackathonHero({ hackathon }: HackathonHeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {hackathon.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mb-4">
            {hackathon.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              {formatDateRangeLong(
                hackathon.start_timestamp,
                hackathon.end_timestamp
              )}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              {hackathon.location}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {hackathon.topics.map((topic) => (
            <Badge key={topic} variant="secondary" className="bg-white/80">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
