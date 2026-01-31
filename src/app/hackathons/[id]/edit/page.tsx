"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateHackathonForm } from "@/components/hackathons/create-hackathon-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { getHackathon } from "@/lib/supabase/getHackathon";
import { updateHackathon } from "@/lib/supabase/updateHackathon";
import type { Hackathon } from "@/models/hackathon";
import type { HackathonFormData } from "@/components/hackathons/create-hackathon-form";

import { ChallengeTracksOverview } from "@/components/hackathons/challenge-tracks-overview";


export default function EditHackathonPage() {
  const router = useRouter();
  const params = useParams();
  const hackathonId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);

  // Fetch hackathon data on mount
  useEffect(() => {
    const fetchHackathon = async () => {
      setIsFetching(true);
      try {
        const data = await getHackathon(hackathonId);
        if (data) {
          setHackathon(data);
        } else {
          setError("Hackathon not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch hackathon");
      } finally {
        setIsFetching(false);
      }
    };

    fetchHackathon();
  }, [hackathonId]);

  // Update hackathon
  const handleSubmit = async (data: HackathonFormData) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await updateHackathon(hackathonId, data);

      if (result) {
        console.log("Hackathon updated successfully!", result);
        setHackathon(result);
        setSuccess("Hackathon updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        setError("Failed to update hackathon");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update hackathon");
    } finally {
      setIsLoading(false);
    }
  };

  // Return to hackathon detail page
  const handleCancel = () => {
    router.push(`/hackathons/${hackathonId}`);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-gray-600">Loading hackathon...</p>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <p className="text-red-600">Hackathon not found</p>
        </div>
      </div>
    );
  }

  const initialData: HackathonFormData = {
    name: hackathon.name,
    description: hackathon.description,
    location: hackathon.location,
    start_timestamp: hackathon.start_timestamp,
    end_timestamp: hackathon.end_timestamp,
    topics: hackathon.topics,
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] lg:grid-cols-2 relative">

      {/* Left side = Edit form */}
      <div className="flex flex-col p-6 md:p-10 bg-white">
        <Link href={`/hackathons/${hackathonId}`}>
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hackathon
          </Button>
        </Link>
        <div className="flex flex-1 justify-center">
          <div className="w-full h-full">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                {success}
              </div>
            )}
            <CreateHackathonForm
              onFormSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
              initialData={initialData}
              mode="edit"
            />
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <Separator orientation="vertical" className="absolute left-1/2 top-0 bottom-0 hidden lg:block bg-gray-300 w-px" />

      {/* Right side = Challenge Tracks */}
      <ChallengeTracksOverview />

    </div>
  );
}
