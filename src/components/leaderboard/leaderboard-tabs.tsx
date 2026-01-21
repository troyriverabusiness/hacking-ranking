"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Location, Topic } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type ElementRef,
} from "react";

const INDICATOR_INSET = 8;

const TabsListWithIndicator = forwardRef<
  ElementRef<typeof TabsList>,
  ComponentProps<typeof TabsList> & { activeValue?: string }
>(function TabsListWithIndicator(
  { className, children, activeValue, ...props },
  forwardedRef,
) {
  const localRef = useRef<ElementRef<typeof TabsList>>(null);
  const setRefs = useCallback(
    (node: ElementRef<typeof TabsList> | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  const [indicator, setIndicator] = useState({
    width: 0,
    left: 0,
    visible: false,
  });

  const updateIndicator = useCallback(() => {
    const listEl = localRef.current;
    if (!listEl) return;
    const activeTrigger = listEl.querySelector(
      '[data-state="active"]',
    ) as HTMLElement | null;
    if (!activeTrigger) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const listRect = listEl.getBoundingClientRect();
    const triggerRect = activeTrigger.getBoundingClientRect();

    setIndicator({
      width: Math.max(triggerRect.width - INDICATOR_INSET * 2, 0),
      left: triggerRect.left - listRect.left + INDICATOR_INSET,
      visible: true,
    });
  }, []);

  useLayoutEffect(() => {
    updateIndicator();
  }, [children, activeValue, updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <TabsList
      ref={setRefs}
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-blue-500 transition-[transform,width,opacity] duration-300 ease-out",
          indicator.visible ? "opacity-100" : "opacity-0",
        )}
        style={{
          width: indicator.visible ? indicator.width : 0,
          transform: `translateX(${indicator.left}px)`
        }}
      />
    </TabsList>
  );
});

type PrimaryTab = "leaderboard" | "city" | "topic";


type LeaderboardTabsProps = {
  value: PrimaryTab;
  onValueChange: (value: PrimaryTab) => void;
  cities: Location[];
  topics: Topic[];
  cityValue: Location;
  onCityValueChange: (value: Location) => void;
  topicValue: Topic;
  onTopicValueChange: (value: Topic) => void;
};

export function LeaderboardTabs({
  value,
  onValueChange,
  cities,
  topics,
  cityValue,
  onCityValueChange,
  topicValue,
  onTopicValueChange,
}: LeaderboardTabsProps) {
  const listClassName =
    "mb-6 h-9 w-fit rounded-none bg-transparent p-0";
  const triggerClassName =
    "relative z-10 flex-none rounded-none border-0 bg-transparent px-4 text-sm font-medium text-slate-500 shadow-none transition-colors duration-300 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-slate-900 data-[state=active]:shadow-none";

  return (
    <div className="flex flex-col gap-2 w-full">
      <TabsListWithIndicator className={listClassName} activeValue={value}>
        <TabsTrigger className={triggerClassName} value="leaderboard">
          Leaderboard
        </TabsTrigger>
        <TabsTrigger className={triggerClassName} value="city">
          City
        </TabsTrigger>
        <TabsTrigger className={triggerClassName} value="topic">
          Topic
        </TabsTrigger>
      </TabsListWithIndicator>

      {value === "city" && (
        <Tabs
          value={cityValue}
          onValueChange={(nextValue) => onCityValueChange(nextValue as Location)}
          className="w-full"
        >
          <div className="w-full overflow-x-auto">
            <TabsListWithIndicator
              className={`${listClassName} min-w-max`}
              activeValue={cityValue}
            >
              {cities.map((city) => (
                <TabsTrigger
                  key={city}
                  value={city}
                  className={triggerClassName}
                >
                  {city}
                </TabsTrigger>
              ))}
            </TabsListWithIndicator>
          </div>
        </Tabs>
      )}

      {value === "topic" && (
        <Tabs
          value={topicValue}
          onValueChange={(nextValue) => onTopicValueChange(nextValue as Topic)}
          className="w-full"
        >
          <div className="w-full overflow-x-auto">
            <TabsListWithIndicator
              className={`${listClassName} min-w-max`}
              activeValue={topicValue}
            >
              {topics.map((topic) => (
                <TabsTrigger
                  key={topic}
                  value={topic}
                  className={triggerClassName}
                >
                  {topic}
                </TabsTrigger>
              ))}
            </TabsListWithIndicator>
          </div>
        </Tabs>
      )}
    </div>
  );
}
