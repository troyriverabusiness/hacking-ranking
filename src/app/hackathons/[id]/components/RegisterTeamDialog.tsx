"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerTeam } from "@/lib/supabase";

interface RegisterTeamDialogProps {
  hackathonId: string;
  onSuccess: () => void;
}

export function RegisterTeamDialog({ hackathonId, onSuccess }: RegisterTeamDialogProps) {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [rank, setRank] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }

    const rankNumber = parseInt(rank, 10);
    if (isNaN(rankNumber) || rankNumber < 1) {
      toast.error("Please enter a valid rank (positive number)");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await registerTeam({
        name: teamName.trim(),
        rank: rankNumber,
        hackathon_id: hackathonId,
      });

      if (result) {
        setTeamName("");
        setRank("");
        setOpen(false);
        toast.success("Your team has been successfully registered!");
        onSuccess();
      } else {
        toast.error("Failed to register team. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred while registering the team.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white">
          <Users className="h-5 w-5 mr-2" />
          Register Your Team
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-blue-200">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-gray-900">Register Your Team</DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter your team details to register for this hackathon.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="teamName" className="text-gray-700">Team Name</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
                disabled={isSubmitting}
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rank" className="text-gray-700">Rank</Label>
              <Input
                id="rank"
                type="number"
                min="1"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                placeholder="Enter your final rank"
                disabled={isSubmitting}
                className="bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isSubmitting ? "Registering..." : "Register Team"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
