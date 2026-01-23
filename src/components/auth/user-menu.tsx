'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Verified imports
import type { Profile } from '@/models/profile';

interface UserMenuProps {
  user: {
    id: string;
    email: string;
  } | null;
  profile: Profile | null;
}

export function UserMenu({ user, profile }: UserMenuProps) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  const initials = profile
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  return (
    <Link href={profile ? `/profile/${profile.id}` : '/profile/setup'}>
      <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-blue-200">
        <AvatarImage src="" alt={profile?.full_name || user.email} />
        <AvatarFallback className="bg-blue-100 text-blue-600">
          {initials}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
