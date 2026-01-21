"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
  const router = useRouter();

  return (
    <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <Link href="/leaderboard" onClick={(e) => {
                e.stopPropagation();
                router.push('/leaderboard');
              }} className="group">
                Leaderboard
                <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-0 p-2 md:w-[500px] md:grid-cols-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/leaderboard">
                      <div className="text-sm font-medium leading-none">All Hackers</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View the complete ranking of all participants
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/leaderboard?filter=top">
                      <div className="text-sm font-medium leading-none">Top 100</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        See the highest ranked participants
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/leaderboard?filter=rising">
                      <div className="text-sm font-medium leading-none">Rising Stars</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Hackers with the fastest growing scores
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/leaderboard?filter=recent">
                      <div className="text-sm font-medium leading-none">Recent Activity</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Latest score updates and changes
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <Link href="/hackathons" onClick={(e) => {
                e.stopPropagation();
                router.push('/hackathons');
              }} className="group">
                Hackathons
                <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[300px] p-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/hackathons?status=active">
                      <div className="text-sm font-medium leading-none">Grid View</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Browse hackathons in a grid view
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/hackathons?status=completed">
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