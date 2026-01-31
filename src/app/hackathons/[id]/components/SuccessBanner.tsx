"use client";

import { CheckCircle2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SuccessBannerProps {
  message: string;
  onClose: () => void;
}

export function SuccessBanner({ message, onClose }: SuccessBannerProps) {
  return (
    <Card className="border-green-500/50 bg-green-500/10 mb-6">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            {message}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
