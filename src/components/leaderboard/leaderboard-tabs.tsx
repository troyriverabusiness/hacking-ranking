"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Location, Topic } from "@/lib/mock-data";

type PrimaryTab = "leaderboard" | "city" | "topic";

type LeaderboardTabsProps = {
  value: PrimaryTab;
  onValueChange: (value: PrimaryTab) => void;
  cities: Location[];
  topics: Topic[];
  cityValue: Location;
  onCityValueChange: (value: Location) => void;
  topicValue: Topic;
  onTopicValueChange: (value: Topic) => void;
};

export function LeaderboardTabs({
  value,
  onValueChange,
  cities,
  topics,
  cityValue,
  onCityValueChange,
  topicValue,
  onTopicValueChange,
}: LeaderboardTabsProps) {
  const listClassName =
    "mb-6 h-9 w-fit rounded-none border-b border-slate-200 bg-transparent p-0";
  const triggerClassName =
    "flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 text-sm font-medium text-slate-500 shadow-none data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-slate-900 data-[state=active]:shadow-none";

  return (
    <div className="flex flex-col gap-2 w-full">
      <TabsList className={listClassName}>
        <TabsTrigger className={triggerClassName} value="leaderboard">
          Leaderboard
        </TabsTrigger>
        <TabsTrigger className={triggerClassName} value="city">
          City
        </TabsTrigger>
        <TabsTrigger className={triggerClassName} value="topic">
          Topic
        </TabsTrigger>
      </TabsList>

      {value === "city" && (
        <Tabs
          value={cityValue}
          onValueChange={(nextValue) => onCityValueChange(nextValue as Location)}
          className="w-full"
        >
          <div className="w-full overflow-x-auto">
            <TabsList className={`${listClassName} min-w-max`}>
              {cities.map((city) => (
                <TabsTrigger
                  key={city}
                  value={city}
                  className={triggerClassName}
                >
                  {city}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      )}

      {value === "topic" && (
        <Tabs
          value={topicValue}
          onValueChange={(nextValue) => onTopicValueChange(nextValue as Topic)}
          className="w-full"
        >
          <div className="w-full overflow-x-auto">
            <TabsList className={`${listClassName} min-w-max`}>
              {topics.map((topic) => (
                <TabsTrigger
                  key={topic}
                  value={topic}
                  className={triggerClassName}
                >
                  {topic}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      )}
    </div>
  );
}
