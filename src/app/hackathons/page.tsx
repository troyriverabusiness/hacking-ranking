"use client";

import * as React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { HackathonList } from "@/components/hackathons/hackathon-list";

import { Loading } from "@/components/loading";

import { type Hackathon } from "@/models";

import { getAllHackathons } from "@/lib/supabase/index";


const HackathonMap = dynamic(
  () => import("@/components/hackathons/hackathon-map").then((mod) => mod.HackathonMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full bg-[#cfe9f6]">
        <Loading size="lg" text="Loading map..." className="py-12" />
      </div>
    )
  }
);

function HackathonsPageContent() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const normalizedView = viewParam === "grid" || viewParam === "list" ? viewParam : undefined;

  const [hackathons, setHackathons] = React.useState<Hackathon[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchHackathons() {
      setLoading(true);
      try {
        const hackathons = await getAllHackathons();
        setHackathons(hackathons);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHackathons();
  }, []);

  return (
    <div className="w-full" suppressHydrationWarning>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-start">
        <div className="px-6 sm:px-8 lg:px-10 py-8 sm:pr-10">
          <HackathonList hackathons={hackathons} initialView={normalizedView} loading={loading} />
        </div>
        <div className="hidden sm:block sm:sticky sm:top-16 sm:h-[calc(100vh-4rem)] sm:overflow-hidden">
          <HackathonMap hackathons={hackathons} />
        </div>
      </div>
    </div>
  );
}

export default function HackathonsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-gray-500">Loading...</div></div>}>
      <HackathonsPageContent />
    </Suspense>
  );
}
