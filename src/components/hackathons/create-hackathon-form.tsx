import { cn } from "@/lib/utils"


import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import Calendar26 from "../calendar-26"

import { locations, Topic, Location } from "@/models/enums"
import { useState } from "react"
import { TopicsSelection } from "@/components/hackathons/topics-selection"

export type HackathonFormData = Omit<import("@/models/hackathon").Hackathon, "id" | "created_by">;

interface CreateHackathonFormProps {
    className?: string;
    onFormSubmit?: (data: HackathonFormData) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    initialData?: HackathonFormData;
    mode?: "create" | "edit";
}

export function CreateHackathonForm({
    className,
    onFormSubmit,
    onCancel,
    isLoading = false,
    initialData,
    mode = "create",
}: CreateHackathonFormProps) {
    // Parse initial data if provided
    const parseInitialDateTime = (timestamp?: string) => {
        if (!timestamp) return undefined;
        return new Date(timestamp);
    };

    const parseInitialTime = (timestamp?: string) => {
        if (!timestamp) return "10:30:00";
        const date = new Date(timestamp);
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    };

    const [selectedTopics, setSelectedTopics] = useState<Topic[]>(initialData?.topics || []);
    const [selectedLocation, setSelectedLocation] = useState<Location | "">(initialData?.location || "");
    const [dateFrom, setDateFrom] = useState<Date | undefined>(parseInitialDateTime(initialData?.start_timestamp) || new Date("2025-06-01"));
    const [dateTo, setDateTo] = useState<Date | undefined>(parseInitialDateTime(initialData?.end_timestamp) || new Date("2025-06-03"));
    const [timeFrom, setTimeFrom] = useState<string>(parseInitialTime(initialData?.start_timestamp) || "10:30:00");
    const [timeTo, setTimeTo] = useState<string>(parseInitialTime(initialData?.end_timestamp) || "12:30:00");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        if (!selectedLocation || !dateFrom || !dateTo) {
            return;
        }

        // Combine date and time into ISO timestamp
        const startDate = new Date(dateFrom);
        const [startHour, startMinute, startSecond] = timeFrom.split(':').map(Number);
        startDate.setHours(startHour, startMinute, startSecond);

        const endDate = new Date(dateTo);
        const [endHour, endMinute, endSecond] = timeTo.split(':').map(Number);
        endDate.setHours(endHour, endMinute, endSecond);

        const data: HackathonFormData = {
            name,
            description,
            location: selectedLocation as Location,
            start_timestamp: startDate.toISOString(),
            end_timestamp: endDate.toISOString(),
            topics: selectedTopics,
        };

        onFormSubmit?.(data);
    };

    return (
        <form className={cn("flex flex-col h-full", className)} onSubmit={handleSubmit}>
            <FieldGroup className="flex flex-col h-full">
                <FieldSet className="flex-1 flex flex-col justify-center">
                    <FieldLegend>{mode === "edit" ? "Edit Hackathon" : "Create Hackathon"}</FieldLegend>
                    <FieldDescription>
                        Fill in the details of your hackathon.
                    </FieldDescription>
                    <FieldGroup>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Name
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    name="name"
                                    placeholder="e.g. Blau Tech Hacks"
                                    required
                                    defaultValue={initialData?.name}
                                    className="bg-white border-blue-300 focus:border-blue-400 focus:ring-blue-400"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="checkout-exp-month-ts6">
                                    Location
                                </FieldLabel>
                                <Select value={selectedLocation} onValueChange={(value) => setSelectedLocation(value as Location)} required>
                                    <SelectTrigger id="checkout-exp-month-ts6" className="bg-white border-blue-300 focus:border-blue-400 focus:ring-blue-400">
                                        <SelectValue placeholder="Select a location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* Map the enum locations */}
                                            {locations.map((location) => (
                                                <SelectItem key={location} value={location}>{location}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                        
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-optional-comments">
                                Description
                            </FieldLabel>
                            <Textarea
                                id="checkout-7j9-optional-comments"
                                name="description"
                                placeholder="Describe your hackathon"
                                defaultValue={initialData?.description}
                                className="resize-none bg-white border-blue-300 focus:border-blue-400 focus:ring-blue-400"
                            />
                            <FieldDescription>
                                Brief description of your hackathon.
                            </FieldDescription>
                        </Field>
                        <Calendar26
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            timeFrom={timeFrom}
                            timeTo={timeTo}
                            onDateFromChange={setDateFrom}
                            onDateToChange={setDateTo}
                            onTimeFromChange={setTimeFrom}
                            onTimeToChange={setTimeTo}
                        />

                        {/* TODO: Add a gray divider */}


                        <TopicsSelection
                            value={selectedTopics}
                            onChange={setSelectedTopics}
                        />
                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal" className="mt-auto pt-6">
                    {mode === "create" && (
                        <Button variant="outline" type="button" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading
                            ? (mode === "edit" ? "Updating..." : "Creating...")
                            : (mode === "edit" ? "Update" : "Submit")
                        }
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}
