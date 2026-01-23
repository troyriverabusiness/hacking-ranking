'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { University } from '@/models';
import { createProfile } from '@/lib/supabase';

interface ProfileCreationFormProps {
  userId: string;
}

export function ProfileCreationForm({ userId }: ProfileCreationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [university, setUniversity] = useState<University | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const fullName = formData.get('full_name') as string;
    const linkedinUrl = formData.get('linkedin_url') as string;
    const company = formData.get('company') as string;

    // Validate required fields
    if (!username || !fullName) {
      setError('Username and full name are required');
      setLoading(false);
      return;
    }

    const { data, error: createError } = await createProfile({
      id: userId,
      username,
      full_name: fullName,
      linkedin_url: linkedinUrl || null,
      company: company || null,
      university: university || null,
    });

    if (createError) {
      setError(createError.message || 'Failed to create profile');
      setLoading(false);
      return;
    }

    // Redirect to home page after successful profile creation
    router.push('/');
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Tell us a bit about yourself to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="your_username"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="full_name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Your company"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Select
              value={university || ''}
              onValueChange={(value) => setUniversity(value as University)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TUM">TUM</SelectItem>
                <SelectItem value="LMU">LMU</SelectItem>
                <SelectItem value="HM">HM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating profile...' : 'Complete Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
