"use client";

import dynamic from "next/dynamic";
import { HackathonList } from "@/components/hackathons/hackathon-list";
import { mockHackathons } from "@/lib/mock-data";

const HackathonMap = dynamic(
  () => import("@/components/hackathons/hackathon-map").then((mod) => mod.HackathonMap),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full">Loading map...</div>
  }
);

export default function HackathonsPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-start">
        <div className="px-6 sm:px-8 lg:px-10 py-8 sm:pr-10">
          <HackathonList hackathons={mockHackathons} />
        </div>
        <div className="hidden sm:block sm:sticky sm:top-16 sm:h-[calc(100vh-4rem)] sm:overflow-hidden">
          <HackathonMap hackathons={mockHackathons} />
        </div>
      </div>
    </div>
  );
}
