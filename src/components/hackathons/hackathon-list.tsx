"use client";

import { useState, useMemo, useEffect } from "react";
import { Calendar } from "lucide-react";
import { HackathonCard } from "@/components/hackathons/hackathon-card";
import { HackathonListItem } from "@/components/hackathons/hackathon-list-item";
import { HackathonSearch } from "@/components/hackathons/hackathon-search";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Loading } from "@/components/loading";
import { Empty } from "@/components/empty";

// Verified imports
import { type Hackathon } from "@/models";
import { type Topic } from "@/models/enums";

type HackathonListProps = {
  hackathons: Hackathon[];
  initialView?: "grid" | "list";
  loading?: boolean;
};

export function HackathonList({ hackathons, initialView = "grid", loading = false }: HackathonListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  // Filter logic
  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      const matchesSearch = hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hackathon.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedLocation === "all" || hackathon.location === selectedLocation;
      const matchesTopic = selectedTopic === "all" || hackathon.topics.includes(selectedTopic as Topic);
 
      return matchesSearch && matchesLocation && matchesTopic;
    });
  }, [hackathons, searchQuery, selectedLocation, selectedTopic]);
 
  const clearFilters = () => {
    setSearchQuery("");

    setSelectedLocation("all");
    setSelectedTopic("all");
  };
 
  const hasActiveFilters = searchQuery !== "" || selectedLocation !== "all" || selectedTopic !== "all";
 
  return (
    <Tabs value={view} onValueChange={(value) => setView(value as "grid" | "list")} className="w-full space-y-8">
      <HackathonSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {loading ? (
        <div className="py-12">
          <Loading size="lg" text="Loading hackathons..." />
        </div>
      ) : filteredHackathons.length === 0 ? (
        <Empty
          icon={Calendar}
          title="No hackathons found"
          description="No hackathons match your current filters. Try adjusting your search criteria or clearing the filters."
          action={{
            label: "Clear filters",
            onClick: clearFilters,
          }}
        />
      ) : (
        // Actual Card/Grid View
        <>
          <TabsContent value="grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 lg:gap-8">
              {filteredHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="divide-y divide-gray-200">
              {filteredHackathons.map((hackathon) => (
                <HackathonListItem key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
