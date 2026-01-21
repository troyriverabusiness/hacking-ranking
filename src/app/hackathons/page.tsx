import { HackathonList } from "@/components/hackathons/hackathon-list";
import { HackathonMap } from "@/components/hackathons/hackathon-map";
import { mockHackathons } from "@/lib/mock-data";

export default function HackathonsPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-start">
        <div className="px-6 sm:px-8 lg:px-10 py-8">
          <HackathonList hackathons={mockHackathons} />
        </div>
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <HackathonMap hackathons={mockHackathons} />
        </div>
      </div>
    </div>
  );
}
