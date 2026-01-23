"use client";

import Link from "next/link";
import { ChevronDown, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Hidden on mobile, shown on desktop */}
          <Link href="/leaderboard" className="hidden md:flex items-center">
            <span className="text-xl font-semibold text-gray-900">
              Hackathon Leaderboard
            </span>
          </Link>

          {/* Mobile Navigation */}
          <MobileNavigation />

          {/* Desktop Navigation - Centered Part */}
          <DesktopNavigation />

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

function MobileNavigation() {
  return (
    <div className="flex md:hidden items-center justify-between w-full gap-2">
      <NavigationMenu className="max-w-none justify-start">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/leaderboard" className={navigationMenuTriggerStyle()}>
                Leaderboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/hackathons" className={navigationMenuTriggerStyle()}>
                Hackathons
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link href="/profile/1">
        <Avatar className="h-8 w-8 hover:ring-2 hover:ring-blue-200 transition-all">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
            JD
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}

function DesktopNavigation() {
  return (
    <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <Link href="/leaderboard" className="group">
                Leaderboard
                <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-cols-[140px_1fr] gap-2 w-[380px] p-2">
                <li className="row-span-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/leaderboard?filter=top"
                      className="relative flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 p-4 no-underline outline-none shadow-md overflow-hidden group"
                    >
                      <div className="absolute inset-0 -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 ease-out bg-gradient-to-br from-transparent via-white/30 to-transparent" />
                      <Trophy className="h-6 w-6 text-white mb-2 relative z-10" />
                      <div className="text-base font-bold text-white relative z-10">
                        Top 100
                      </div>
                      <div className="text-xs text-white/90 mt-1 relative z-10">
                        Elite performers
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/leaderboard?tab=city">
                      <div className="text-sm font-medium leading-none">By City</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View rankings organized by city
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/leaderboard?tab=topic">
                      <div className="text-sm font-medium leading-none">By Topic</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View rankings organized by topic
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <Link href="/hackathons" className="group">
                Hackathons
                <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent align="start">
              <ul className="flex flex-col w-[300px] p-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/hackathons?view=grid">
                      <div className="text-sm font-medium leading-none">Grid View</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Browse hackathons in a grid view
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/hackathons?view=list">
                      <div className="text-sm font-medium leading-none">List View</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Browse hackathons in a list view
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
