import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HackathonInProgressProps {
  endTimestamp: string;
}

export function HackathonInProgress({ endTimestamp }: HackathonInProgressProps) {
  return (
    <div className="mb-8">
      <Card className="p-8 text-center">
        <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Hackathon In Progress
        </h3>
        <p className="text-gray-600">
          Results will be available after the hackathon ends on{" "}
          {new Date(endTimestamp).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </Card>
    </div>
  );
}
