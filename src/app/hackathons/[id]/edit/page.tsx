"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HackathonForm } from "@/components/hackathons/hackathon-form";
import { getHackathon, updateHackathon } from "@/lib/supabase/index";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/loading";
import { Empty } from "@/components/empty";
import { AlertCircle } from "lucide-react";
import type { Hackathon } from "@/models";

export default function EditHackathonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const [hackathonData, user] = await Promise.all([
          getHackathon(id),
          getCurrentUser(),
        ]);

        if (!hackathonData) {
          setError("Hackathon not found");
          setIsFetching(false);
          return;
        }

        if (!user) {
          setError("You must be logged in to edit a hackathon");
          setIsFetching(false);
          return;
        }

        if (hackathonData.created_by !== user.id) {
          setError("You are not authorized to edit this hackathon");
          setIsFetching(false);
          return;
        }

        setHackathon(hackathonData);
        setIsAuthorized(true);
      } catch (err) {
        console.error("Error fetching hackathon:", err);
        setError("Failed to load hackathon details");
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (data: Omit<Hackathon, "id">) => {
    setError(null);
    setIsLoading(true);

    try {
      const updatedHackathon = await updateHackathon(id, data);

      if (!updatedHackathon) {
        setError("Failed to update hackathon. Please try again.");
        setIsLoading(false);
        return;
      }

      // Redirect back to the hackathon detail page
      router.push(`/hackathons/${id}`);
      router.refresh();
    } catch (err) {
      console.error("Error updating hackathon:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/hackathons/${id}`);
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-10">
        <Loading size="lg" text="Loading hackathon..." className="py-12" />
      </div>
    );
  }

  if (!isAuthorized || error) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-3xl mx-auto border-red-200">
          <CardContent className="pt-6">
            <Empty
              icon={AlertCircle}
              title="Access Denied"
              description={error || "You don't have permission to edit this hackathon."}
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={() => router.push(`/hackathons/${id}`)}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Go back to hackathon
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto border-blue-200">
        <CardHeader>
          <CardTitle>Edit Hackathon</CardTitle>
          <CardDescription>
            Update the details of your hackathon event
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
              {error}
            </div>
          )}
          {hackathon && (
            <HackathonForm
              initialData={hackathon}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
