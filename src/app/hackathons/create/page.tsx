"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateHackathonForm } from "@/components/hackathons/create-hackathon-form";
import { GalleryVerticalEnd } from "lucide-react";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { LinkUploadCard } from "@/components/hackathons/link-upload-card";


export default function CreateHackathonImprovedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Create hackathon and redirect to hackathon page
  // TODO: Implement this
  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
  };

  // Return to hackathons page
  const handleCancel = () => {
    router.push("/hackathons");
  };

  return(
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* Left side = background + link input */}
      <div className="bg-muted relative hidden lg:block">
        <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
          <div className="w-full max-w-md">
            <LinkUploadCard />
          </div>
        </div>
        <BackgroundBeams />
      </div>

      {/* Right side = Actual form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Powered by Blau Tech©
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <CreateHackathonForm />
          </div>
        </div>
      </div>

      
      
    </div>
  );
}