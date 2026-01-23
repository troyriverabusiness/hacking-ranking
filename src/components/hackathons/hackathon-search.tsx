import { LayoutGrid, List, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { locations, popularTopics } from "@/models/enums";

type HackathonSearchProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedTopic: string;
  onTopicChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

function SearchHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Hackathons</h1>
      <p className="text-gray-600 mt-1">
        Browse and explore hackathon events
      </p>
    </div>
  );
}

function ViewToggle() {
  return (
    <TabsList>
      <TabsTrigger value="grid">
        <LayoutGrid className="h-4 w-4" />
      </TabsTrigger>
      <TabsTrigger value="list">
        <List className="h-4 w-4" />
      </TabsTrigger>
    </TabsList>
  );
}

function SearchInput({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <Input
        type="text"
        placeholder="Search hackathons..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 border-blue-200 focus-visible:border-blue-400 focus-visible:ring-blue-200/50"
      />
    </div>
  );
}

function LocationFilter({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] border-blue-200 data-[state=open]:border-blue-400">
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
  );
}

function TopicFilter({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] border-blue-200 data-[state=open]:border-blue-400">
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
  );
}

function ClearFiltersButton({
  show,
  onClick
}: {
  show: boolean;
  onClick: () => void;
}) {
  if (!show) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      title="Clear filters"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}

export function HackathonSearch({
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedTopic,
  onTopicChange,
  hasActiveFilters,
  onClearFilters,
}: HackathonSearchProps) {
  return (
    <>
      <header className="flex items-start justify-between">
        <SearchHeader />
        <ViewToggle />
      </header>

      <div className="flex flex-wrap gap-3">
        <SearchInput value={searchQuery} onChange={onSearchChange} />
        <LocationFilter value={selectedLocation} onChange={onLocationChange} />
        <TopicFilter value={selectedTopic} onChange={onTopicChange} />
        <ClearFiltersButton show={hasActiveFilters} onClick={onClearFilters} />
      </div>
    </>
  );
}
