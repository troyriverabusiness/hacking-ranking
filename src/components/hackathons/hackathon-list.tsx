"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, List, Search, X } from "lucide-react";
import { HackathonCard } from "@/components/hackathons/hackathon-card";
import { HackathonListItem } from "@/components/hackathons/hackathon-list-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { locations, popularTopics, type Hackathon, type Topic } from "@/lib/mock-data";

type HackathonListProps = {
  hackathons: Hackathon[];
};

export function HackathonList({ hackathons }: HackathonListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

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

  const hasActiveFilters = searchQuery || selectedLocation !== "all" || selectedTopic !== "all";

  return (
    <Tabs defaultValue="grid" className="w-full space-y-8">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hackathons</h1>
          <p className="text-gray-600 mt-1">
            Browse and explore hackathon events
          </p>
        </div>
        <TabsList>
          <TabsTrigger value="grid">
            <LayoutGrid className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
      </header>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search hackathons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all" className="hover:bg-accent">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location} className="hover:bg-accent">
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all" className="hover:bg-accent">All Topics</SelectItem>
            {popularTopics.map((topic) => (
              <SelectItem key={topic} value={topic} className="hover:bg-accent">
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={clearFilters}
            title="Clear filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {filteredHackathons.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No hackathons found matching your filters.</p>
          <Button variant="outline" onClick={clearFilters} className="mt-4">
            Clear filters
          </Button>
        </div>
      ) : (
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
