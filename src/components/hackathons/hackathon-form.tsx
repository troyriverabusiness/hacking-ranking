"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { type Hackathon } from "@/models";
import { locations, topics, type Location, type Topic } from "@/models/enums";
import { cn } from "@/lib/utils";

interface HackathonFormProps {
  initialData?: Partial<Hackathon>;
  onSubmit: (data: Omit<Hackathon, "id">) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function HackathonForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}: HackathonFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [location, setLocation] = useState<Location | "">(initialData?.location || "");
  const [startDate, setStartDate] = useState(
    initialData?.start_timestamp ? new Date(initialData.start_timestamp).toISOString().slice(0, 16) : ""
  );
  const [endDate, setEndDate] = useState(
    initialData?.end_timestamp ? new Date(initialData.end_timestamp).toISOString().slice(0, 16) : ""
  );
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>(initialData?.topics || []);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleTopic = (topic: Topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!location) newErrors.location = "Location is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (selectedTopics.length === 0) newErrors.topics = "At least one topic is required";

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      name,
      description,
      location: location as Location,
      start_timestamp: new Date(startDate).toISOString(),
      end_timestamp: new Date(endDate).toISOString(),
      topics: selectedTopics,
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter hackathon name"
            aria-invalid={!!errors.name}
            className="border-blue-200 focus-visible:border-blue-400 focus-visible:ring-blue-200/50"
          />
          {errors.name && <FieldError>{errors.name}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your hackathon"
            rows={4}
            aria-invalid={!!errors.description}
            className={cn(
              "w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none",
              "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              "border-blue-200 focus-visible:border-blue-400 focus-visible:ring-blue-200/50",
              "md:text-sm"
            )}
          />
          {errors.description && <FieldError>{errors.description}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Select value={location} onValueChange={(value) => setLocation(value as Location)}>
            <SelectTrigger
              id="location"
              aria-invalid={!!errors.location}
              className="border-blue-200 data-[state=open]:border-blue-400"
            >
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc} className="hover:bg-accent">
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.location && <FieldError>{errors.location}</FieldError>}
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <Field>
            <FieldLabel htmlFor="startDate">Start Date & Time</FieldLabel>
            <Input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              aria-invalid={!!errors.startDate}
              className="border-blue-200 focus-visible:border-blue-400 focus-visible:ring-blue-200/50"
            />
            {errors.startDate && <FieldError>{errors.startDate}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="endDate">End Date & Time</FieldLabel>
            <Input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              aria-invalid={!!errors.endDate}
              className="border-blue-200 focus-visible:border-blue-400 focus-visible:ring-blue-200/50"
            />
            {errors.endDate && <FieldError>{errors.endDate}</FieldError>}
          </Field>
        </div>

        <Field>
          <FieldLabel>Topics</FieldLabel>
          <FieldDescription>
            Select all topics that apply to your hackathon
          </FieldDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {topics.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
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
          {errors.topics && <FieldError>{errors.topics}</FieldError>}
        </Field>

        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData?.id ? "Update Hackathon" : "Create Hackathon"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
