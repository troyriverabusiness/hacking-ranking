"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HackathonForm } from "@/components/hackathons/hackathon-form";
import { createNewHackathon } from "@/lib/supabase/createNewHackathon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Hackathon } from "@/models";

export default function CreateHackathonPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Omit<Hackathon, "id">) => {
    setError(null);
    setIsLoading(true);

    try {
      const newHackathon = await createNewHackathon(data as Hackathon);

      if (!newHackathon) {
        setError("Failed to create hackathon. Please try again.");
        setIsLoading(false);
        return;
      }

      // Redirect to the newly created hackathon's detail page
      router.push(`/hackathons/${newHackathon.id}`);
      router.refresh();
    } catch (err) {
      console.error("Error creating hackathon:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/hackathons");
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto border-blue-200">
        <CardHeader>
          <CardTitle>Create New Hackathon</CardTitle>
          <CardDescription>
            Fill in the details to create a new hackathon event
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
              {error}
            </div>
          )}
          <HackathonForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
