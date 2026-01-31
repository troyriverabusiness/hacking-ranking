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

import { locations, Topic } from "@/models/enums"
import { useState } from "react"
import { TopicsSelection } from "@/components/hackathons/topics-selection"



interface CreateHackathonFormProps extends React.ComponentProps<"form"> {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel?: () => void;
}

export function CreateHackathonForm({
    className,
    onSubmit,
    onCancel,
    ...props
}: CreateHackathonFormProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);

    return (
        <form className={cn("flex flex-col h-full", className)} onSubmit={handleSubmit} {...props}>
            <FieldGroup className="flex flex-col h-full">
                <FieldSet className="flex-1 flex flex-col justify-center">
                    <FieldLegend>Create Hackathon</FieldLegend>
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
                                    placeholder="e.g. Blau Tech Hacks"
                                    required
                                    className="bg-white border-blue-300 focus:border-blue-400 focus:ring-blue-400"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="checkout-exp-month-ts6">
                                    Location
                                </FieldLabel>
                                <Select defaultValue="">
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
                                placeholder="Describe your hackathon"
                                className="resize-none bg-white border-blue-300 focus:border-blue-400 focus:ring-blue-400"
                            />
                            <FieldDescription>
                                Brief description of your hackathon.
                            </FieldDescription>
                        </Field>
                        <Calendar26 />

                        {/* TODO: Add a gray divider */}


                        <TopicsSelection
                            value={selectedTopics}
                            onChange={setSelectedTopics}
                        />
                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal" className="mt-auto pt-6">
                    <Button variant="outline" type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </Field>
            </FieldGroup>
        </form>
    )
}
