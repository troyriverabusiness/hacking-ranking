"use client";

import { useState, useEffect } from "react";
import { Plus, Trophy, Loader2 } from "lucide-react";
import { getHackathonTracks } from "@/lib/supabase/getHackathonTracks";
import { createHackathonTrack } from "@/lib/supabase/createHackathonTrack";
import { ChallengeTrack } from "@/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function AddTrackDialog({
  hackathonId,
  onAdded,
}: {
  hackathonId: string;
  onAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [prize, setPrize] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      const created = await createHackathonTrack({
        name: name.trim(),
        challenge_description: challengeDescription.trim(),
        hackathon_id: hackathonId,
        ...(prize.trim() && { prize: prize.trim() }),
      });
      if (created) {
        onAdded();
        setName("");
        setChallengeDescription("");
        setPrize("");
        setOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Add challenge track
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add challenge track</DialogTitle>
          <DialogDescription>
            Add a new challenge or track for this hackathon.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4 py-4">
            <Field>
              <FieldLabel asChild>
                <Label htmlFor="track-name">Name</Label>
              </FieldLabel>
              <Input
                id="track-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Track name"
                required
              />
            </Field>
            <Field>
              <FieldLabel asChild>
                <Label htmlFor="track-description">Description</Label>
              </FieldLabel>
              <Textarea
                id="track-description"
                value={challengeDescription}
                onChange={(e) => setChallengeDescription(e.target.value)}
                placeholder="Challenge description"
                rows={3}
              />
            </Field>
            <Field>
              <FieldLabel asChild>
                <Label htmlFor="track-prize">Prize (optional)</Label>
              </FieldLabel>
              <Input
                id="track-prize"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                placeholder="e.g. $500, MacBook Pro"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add track"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ChallengeTracksOverview({ hackathonId }: { hackathonId: string }) {
  const [challengeTracks, setChallengeTracks] = useState<ChallengeTrack[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChallengeTracks = async () => {
    setIsFetching(true);
    try {
      const data = await getHackathonTracks(hackathonId);
      setChallengeTracks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch challenge tracks");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchChallengeTracks();
  }, [hackathonId]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="space-y-1.5">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Challenge tracks
          </h2>
          <p className="text-sm text-muted-foreground">
            Challenges and tracks for this hackathon
          </p>
        </div>
        <AddTrackDialog hackathonId={hackathonId} onAdded={fetchChallengeTracks} />
      </div>

      {isFetching && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          <span>Loading tracks...</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isFetching && !error && challengeTracks.length > 0 && (
        <ul className="grid list-none gap-4 p-0 m-0 sm:grid-cols-2 lg:grid-cols-3">
          {challengeTracks.map((track) => (
            <li key={track.id}>
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{track.name}</CardTitle>
                  {track.challenge_description && (
                    <CardDescription className="mt-1.5 line-clamp-3">
                      {track.challenge_description}
                    </CardDescription>
                  )}
                </CardHeader>
                {track.prize ? (
                  <>
                    <Separator className="mb-3" />
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <Badge variant="secondary" className="font-normal">
                          {track.prize}
                        </Badge>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="mt-auto flex-1 min-h-[1px]" aria-hidden />
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}

      {!isFetching && !error && challengeTracks.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No tracks or challenges have been added yet.
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              Use the button above to add your first track.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}