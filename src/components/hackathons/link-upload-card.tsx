"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { scrapeHackathon } from "@/lib/scrapeHackathon";



export function LinkUploadCard() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) return;

    setIsLoading(true);

    try {
      const data = await scrapeHackathon(url);
      console.log("Success:", data);

      // Reset the form on success
      setUrl("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white border-blue-200">
      <CardHeader>
        <CardTitle>Upload Link</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="fieldgroup-url">Hackathon WebsiteURL</FieldLabel>
                    <Input
                          id="fieldgroup-url"
                          type="url"
                          placeholder="https://example.com"
                      />
                      <FieldDescription>
                          We&apos;ll use this website to automatically fill in the fields.
                      </FieldDescription>
                  </Field>
                  <Field orientation="horizontal">
                      <Button type="submit">Submit</Button>
                  </Field>
              </FieldGroup>
      </CardContent>
    </Card>
  );
}
