"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateHackathonForm } from "@/components/hackathons/create-hackathon-form";
import { GalleryVerticalEnd } from "lucide-react";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { LinkUploadCard } from "@/components/hackathons/link-upload-card";
import { Separator } from "@/components/ui/separator";


export default function CreateHackathonImprovedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Create hackathon and redirect to hackathon page
  // TODO: Implement this
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Dummy call - simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful creation and redirect
      console.log("Hackathon created successfully!");
      router.push("/hackathons");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create hackathon");
    } finally {
      setIsLoading(false);
    }
  };

  // Return to hackathons page
  const handleCancel = () => {
    router.push("/hackathons");
  };

  return(
    <div className="grid h-[calc(100vh-4rem)] lg:grid-cols-2 relative">

      {/* Left side = background + link input */}
      <div className="bg-blue-50 relative hidden lg:block">
        <div className="relative z-10 flex items-center justify-center h-full p-6">
          <div className="w-full max-w-md">
            <LinkUploadCard />
          </div>
        </div>
        <BackgroundBeams />
      </div>

      {/* Vertical Divider */}
      <Separator orientation="vertical" className="absolute left-1/2 top-0 bottom-0 hidden lg:block bg-gray-300 w-px" />

      {/* Right side = Actual form */}
      <div className="flex flex-col p-6 md:p-10 bg-white">
        <div className="flex flex-1 justify-center">
          <div className="w-full h-full">
            <CreateHackathonForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </div>
      </div>
      
    </div>
  );
}
