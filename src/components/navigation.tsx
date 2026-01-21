"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/hackathons", label: "Hackathons" },
];

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Hidden on mobile, shown on desktop */}
          <Link href="/leaderboard" className="hidden md:flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">
              Hackathon Leaderboard
            </span>
          </Link>

          {/* Mobile Navigation - All 3 items inline */}
          <div className="flex md:hidden items-center justify-between w-full gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/profile/1">
              <Avatar className="h-8 w-8 hover:ring-2 hover:ring-blue-200 transition-all">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  isActive(link.href)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Avatar */}
          <div className="hidden md:flex items-center">
            <Link href="/profile/1">
              <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-blue-200">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  JD
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
