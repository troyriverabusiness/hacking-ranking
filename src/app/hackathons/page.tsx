import { HackathonList } from "@/components/hackathons/hackathon-list";
import { HackathonMap } from "@/components/hackathons/hackathon-map";
import { mockHackathons } from "@/lib/mock-data";

export default function HackathonsPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start">
        <div className="px-6 sm:px-8 lg:px-10 py-8 md:pr-10">
          <HackathonList hackathons={mockHackathons} />
        </div>
        <div className="hidden md:block md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-hidden">
          <HackathonMap hackathons={mockHackathons} />
        </div>
      </div>
    </div>
  );
}
