"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs";
import { LeaderboardContent } from "@/components/leaderboard/leaderboard-content";
import { SkyBackground } from "@/components/sky-bg";

import {
  locations,
  mockHackathons,
  type Location,
  type Topic,
} from "@/lib/mock-data";

export default function LeaderboardPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [tab, setTab] = React.useState<"leaderboard" | "city" | "topic">(
    (tabParam === "city" || tabParam === "topic") ? tabParam : "leaderboard"
  );

  // Update tab when URL query parameter changes
  React.useEffect(() => {
    if (tabParam === "city" || tabParam === "topic") {
      setTab(tabParam);
    } else if (tabParam === null) {
      setTab("leaderboard");
    }
  }, [tabParam]);

  const topics = React.useMemo(() => {
    const seen = new Set<Topic>();
    const ordered: Topic[] = [];
    mockHackathons.forEach((hackathon) => {
      hackathon.topics.forEach((topic) => {
        if (!seen.has(topic)) {
          seen.add(topic);
          ordered.push(topic);
        }
      });
    });
    return ordered;
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
          <LeaderboardContent />
        </TabsContent>

        <TabsContent value="topic">
          <LeaderboardContent />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
