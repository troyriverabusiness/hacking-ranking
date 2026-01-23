"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs";
import { LeaderboardContent } from "@/components/leaderboard/leaderboard-content";
import { SkyBackground } from "@/components/sky-bg";
import { getLocations, getTopics } from "@/lib/supabase-queries";
import { locations as fallbackLocations, popularTopics as fallbackTopics } from "@/lib/mock-data";

import type { Location, Topic } from "@/lib/mock-data";

function LeaderboardPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [tab, setTab] = React.useState<"leaderboard" | "city" | "topic">(
    (tabParam === "city" || tabParam === "topic") ? tabParam : "leaderboard"
  );

  const [locations, setLocations] = React.useState<Location[]>(fallbackLocations);
  const [topics, setTopics] = React.useState<Topic[]>(fallbackTopics);

  // Update tab when URL query parameter changes
  React.useEffect(() => {
    if (tabParam === "city" || tabParam === "topic") {
      setTab(tabParam);
    } else if (tabParam === null) {
      setTab("leaderboard");
    }
  }, [tabParam]);

  // Fetch locations and topics from Supabase
  React.useEffect(() => {
    async function fetchFilters() {
      const [fetchedLocations, fetchedTopics] = await Promise.all([
        getLocations(),
        getTopics(),
      ]);

      if (fetchedLocations.length > 0) {
        setLocations(fetchedLocations);
      }

      if (fetchedTopics.length > 0) {
        setTopics(fetchedTopics);
      }
    }

    fetchFilters();
  }, []);

  const [selectedCity, setSelectedCity] = React.useState<Location>(locations[0]);
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>(topics[0]);

  return (
    <div className="relative min-h-screen">
      {tab === "leaderboard"}
      {tab === "leaderboard" && (
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-full max-w-7xl bg-[#FAFBFC]"></div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600 mt-1">
            Top performers across all hackathons
          </p>
        </div>

        {/* Tabs for leaderboard, city, and topic */}
        <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)} className="w-full">
          <LeaderboardTabs
            value={tab}
            onValueChange={setTab}
            cities={locations}
            topics={topics}
            cityValue={selectedCity}
            onCityValueChange={setSelectedCity}
            topicValue={selectedTopic}
            onTopicValueChange={setSelectedTopic}
          />

          <TabsContent value="leaderboard">
            <LeaderboardContent />
          </TabsContent>

        <TabsContent value="city">
          <LeaderboardContent location={selectedCity} />
        </TabsContent>

        <TabsContent value="topic">
          <LeaderboardContent topic={selectedTopic} />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-gray-500">Loading...</div></div>}>
      <LeaderboardPageContent />
    </Suspense>
  );
}
