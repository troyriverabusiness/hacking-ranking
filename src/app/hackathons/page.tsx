"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { HackathonList } from "@/components/hackathons/hackathon-list";
import { mockHackathons } from "@/lib/mock-data";

const HackathonMap = dynamic(
  () => import("@/components/hackathons/hackathon-map").then((mod) => mod.HackathonMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full bg-[#cfe9f6]">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }
);

export default function HackathonsPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const normalizedView = viewParam === "grid" || viewParam === "list" ? viewParam : undefined;

  return (
    <div className="w-full" suppressHydrationWarning>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-start">
        <div className="px-6 sm:px-8 lg:px-10 py-8 sm:pr-10">
          <HackathonList hackathons={mockHackathons} initialView={normalizedView} />
        </div>
        <div className="hidden sm:block sm:sticky sm:top-16 sm:h-[calc(100vh-4rem)] sm:overflow-hidden">
          <HackathonMap hackathons={mockHackathons} />
        </div>
      </div>
    </div>
  );
}
