"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { Location, Topic } from "@/models";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const ScrollableTabsList = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(function ScrollableTabsList({ children, className }, ref) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const updateButtonVisibility = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateButtonVisibility();

    const handleScroll = () => updateButtonVisibility();
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateButtonVisibility);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateButtonVisibility);
    };
  }, [updateButtonVisibility, children]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      {showLeftButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto scrollbar-hide"
      >
        {children}
      </div>
      {showRightButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
});

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
    "h-9 w-fit rounded-none bg-transparent p-0";
  const triggerClassName =
    "relative z-10 flex-none rounded-none border-0 bg-transparent px-4 text-sm font-medium text-slate-500 shadow-none transition-colors duration-300 data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none";

  return (
    <div className="flex flex-col gap-6 w-full mb-10">
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
          <ScrollableTabsList>
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
          </ScrollableTabsList>
        </Tabs>
      )}
    </div>
  );
}
