"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateRange, type Hackathon } from "@/lib/mock-data";

const STATUS_STYLES = {
  upcoming: "border-emerald-100 bg-emerald-50 text-emerald-700",
  ongoing: "border-blue-100 bg-blue-50 text-blue-700",
  completed: "border-slate-200 bg-slate-50 text-slate-600",
} as const;

type StatusKey = keyof typeof STATUS_STYLES;

type StatusMeta = {
  label: string;
  tone: StatusKey;
};

function getStatus(start: string, end: string): StatusMeta {
  const now = new Date();
  const startsAt = new Date(start);
  const endsAt = new Date(end);

  if (now < startsAt) {
    return { label: "Upcoming", tone: "upcoming" };
  }
  if (now >= startsAt && now <= endsAt) {
    return { label: "In progress", tone: "ongoing" };
  }
  return { label: "Completed", tone: "completed" };
}

function getDurationInDays(start: string, end: string) {
  const diffMs = new Date(end).getTime() - new Date(start).getTime();
  const days = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  return `${days} day${days > 1 ? "s" : ""}`;
}

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const status = getStatus(hackathon.start_timestamp, hackathon.end_timestamp);
  const durationLabel = getDurationInDays(hackathon.start_timestamp, hackathon.end_timestamp);
  const extraTopics = Math.max(0, hackathon.topics.length - 3);

  return (
    <Link href={`/hackathons/${hackathon.id}`} className="block h-full">
      <Card className="group h-full border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <Badge
              variant="outline"
              className={cn(
                "text-[11px] font-semibold uppercase tracking-wide",
                STATUS_STYLES[status.tone]
              )}
            >
              {status.label}
            </Badge>
            <span className="text-xs font-medium text-slate-500">
              {durationLabel}
            </span>
          </div>
          <CardTitle className="text-xl text-slate-900 leading-snug">
            {hackathon.name}
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 line-clamp-2">
            {hackathon.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2 font-medium text-slate-900">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{formatDateRange(hackathon.start_timestamp, hackathon.end_timestamp)}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span>{hackathon.location}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>Teams focus on {hackathon.topics[0]}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {hackathon.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary" className="rounded-full border-slate-200 bg-slate-50 text-slate-700">
                {topic}
              </Badge>
            ))}
            {extraTopics > 0 && (
              <Badge variant="outline" className="rounded-full border-dashed text-slate-500">
                +{extraTopics} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-100 pt-4">
          <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
            Explore details
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
