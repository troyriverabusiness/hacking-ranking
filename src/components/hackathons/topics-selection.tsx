"use client";

import { X } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { topics, type Topic } from "@/models/enums";
import { cn } from "@/lib/utils";

export interface TopicsSelectionProps {
  value: Topic[];
  onChange: (value: Topic[]) => void;
  error?: string;
}

export function TopicsSelection({ value, onChange, error }: TopicsSelectionProps) {
  const toggleTopic = (topic: Topic) => {
    onChange(
      value.includes(topic)
        ? value.filter((t) => t !== topic)
        : [...value, topic]
    );
  };

  return (
    <Field>
      <div className="flex items-start justify-between gap-4">
        <div>
          <FieldLabel>Topics</FieldLabel>
          <FieldDescription>
            Select all topics that apply to your hackathon
          </FieldDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([])}
          disabled={value.length === 0}
        >
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {topics.map((topic) => {
          const isSelected = value.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              onClick={() => toggleTopic(topic)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                isSelected
                  ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              )}
            >
              {topic}
              {isSelected && <X className="h-3 w-3" />}
            </button>
          );
        })}
      </div>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
