"use client";

import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { formatDateRangeCompact, type Hackathon } from "@/lib/mock-data";

export function HackathonListItem({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Link href={`/hackathons/${hackathon.id}`} className="block">
      <div className="group grid grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:px-6 py-4 text-sm transition-colors hover:bg-[#E0EFFB] gap-8">
        <div className="min-w-0">
          <p className="text-gray-900 font-medium truncate mb-2">
            {hackathon.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="truncate">{hackathon.topics.join(", ")}</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="whitespace-nowrap">{hackathon.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="whitespace-nowrap">
              {formatDateRangeCompact(hackathon.start_timestamp, hackathon.end_timestamp)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
