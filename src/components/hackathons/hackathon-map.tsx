"use client";

import type { Hackathon } from "@/lib/mock-data";
import dynamic from "next/dynamic";

type HackathonMapProps = {
  hackathons: Hackathon[];
};

const HackathonMapClient = dynamic<HackathonMapProps>(
  () =>
    import("@/components/hackathons/hackathon-map-client").then(
      (mod) => mod.HackathonMapClient,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[60vh] w-full lg:h-full bg-sky-100" />
    ),
  },
);

export function HackathonMap({ hackathons }: HackathonMapProps) {
  return <HackathonMapClient hackathons={hackathons} />;
}
