"use client";

import React from "react";
import { AnimatePresence } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

interface CanvasRevealBackgroundProps {
  /**
   * Animation speed for the canvas effect
   * @default 3
   */
  animationSpeed?: number;

  /**
   * Background color for the container
   * @default "bg-transparent"
   */
  containerClassName?: string;

  /**
   * Array of RGB colors for the canvas effect
   * @default [[236, 72, 153], [232, 121, 249]] (pink/purple gradient)
   */
  colors?: number[][];

  /**
   * Size of the dots in the effect
   * @default 2
   */
  dotSize?: number;

  /**
   * Show dark gradient overlay
   * @default false
   */
  showGradient?: boolean;

  /**
   * Children to render on top of the background
   */
  children?: React.ReactNode;

  /**
   * Additional className for the wrapper div
   */
  className?: string;
}

/**
 * Canvas Reveal Background Component
 *
 * A reusable background component using the canvas-reveal-effect.
 * Can be used as a full-page background or within a specific container.
 *
 * @example
 * ```tsx
 * <CanvasRevealBackground>
 *   <YourContent />
 * </CanvasRevealBackground>
 * ```
 *
 * @example Custom colors
 * ```tsx
 * <CanvasRevealBackground
 *   colors={[[59, 130, 246], [147, 51, 234]]}
 *   animationSpeed={5}
 * >
 *   <YourContent />
 * </CanvasRevealBackground>
 * ```
 */
export function CanvasRevealBackground({
  animationSpeed = 5,
  containerClassName = "bg-gradient-to-br from-blue-100 via-cyan-50 to-sky-100",
  colors = [
    [255, 255, 255],
    [59, 130, 246],   // Blue
    [255, 255, 255],
    [14, 165, 233],   // Sky blue
  ],
  dotSize = 3,
  showGradient = false,
  children,
  className = "",
}: CanvasRevealBackgroundProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Canvas Effect Background */}
      <AnimatePresence>
        <div className="h-full w-full absolute inset-0">
          <CanvasRevealEffect
            animationSpeed={animationSpeed}
            containerClassName={containerClassName}
            colors={colors}
            dotSize={dotSize}
            showGradient={showGradient}
          />
        </div>
      </AnimatePresence>

      {/* Content Layer */}
      {children && (
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
}
