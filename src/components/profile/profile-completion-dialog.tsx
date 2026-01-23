'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { University } from '@/models';

// TODO: Import createProfile and updateProfile from supabase queries when implemented

interface ProfileCompletionDialogProps {
  userId: string;
  isNewProfile?: boolean;
  currentProfile?: {
    username?: string | null;
    full_name?: string | null;
    linkedin_url?: string | null;
    company?: string | null;
    university?: University | null;
  };
}

export function ProfileCompletionDialog({
  userId,
  isNewProfile = false,
  currentProfile = {}
}: ProfileCompletionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [university, setUniversity] = useState<University | null>(currentProfile.university || null);
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
    if (!fullName) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    if (isNewProfile && !username) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    let result;
    if (isNewProfile) {
      result = await createProfile({
        id: userId,
        username: username,
        full_name: fullName,
        linkedin_url: linkedinUrl || null,
        company: company || null,
        university: university || null,
      });
    } else {
      result = await updateProfile(userId, {
        full_name: fullName,
        linkedin_url: linkedinUrl || null,
        company: company || null,
        university: university || null,
      });
    }

    if (result.error) {
      setError(result.error.message || `Failed to ${isNewProfile ? 'create' : 'update'} profile`);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide your information to continue
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isNewProfile && (
            <div className="space-y-2">
              <Label htmlFor="username">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="your_username"
                defaultValue={currentProfile?.username || ''}
                required
                disabled={loading}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="full_name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="John Doe"
              defaultValue={currentProfile?.full_name || ''}
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
              defaultValue={currentProfile?.linkedin_url || ''}
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
              defaultValue={currentProfile?.company || ''}
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
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Complete Profile'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
