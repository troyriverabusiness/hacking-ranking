import { HackathonCard } from "@/components/hackathons/hackathon-card";
import type { Hackathon } from "@/lib/mock-data";

type HackathonListProps = {
  hackathons: Hackathon[];
};

export function HackathonList({ hackathons }: HackathonListProps) {
  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Hackathons</h1>
        <p className="text-gray-600 mt-1">
          Browse and explore hackathon events
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 lg:gap-8">
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
    </section>
  );
}
