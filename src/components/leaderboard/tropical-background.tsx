"use client";

import { useEffect, useState } from "react";
import { TropicalFloaters } from "./tropical-floaters";

export function TropicalBackground({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0">
        {/* Sky Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-400 to-blue-500"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Mountains/Island - Far Background */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <svg
            viewBox="0 0 1200 600"
            className="absolute bottom-0 w-full h-full opacity-30"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            {/* Mountain/Island silhouette */}
            <path
              d="M0 400 Q200 300 400 350 T800 300 Q1000 250 1200 400 L1200 600 L0 600 Z"
              fill="url(#mountainGrad)"
            />
          </svg>
        </div>

        {/* Ocean/Water */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-cyan-500/40 to-blue-600/60"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          {/* Animated waves */}
          <svg
            viewBox="0 0 1200 150"
            className="absolute bottom-0 w-full animate-wave"
            preserveAspectRatio="none"
          >
            <path
              d="M0,75 Q300,25 600,75 T1200,75 L1200,150 L0,150 Z"
              fill="rgba(6, 182, 212, 0.3)"
            />
          </svg>
          <svg
            viewBox="0 0 1200 150"
            className="absolute bottom-0 w-full animate-wave-slow"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 Q300,50 600,100 T1200,100 L1200,150 L0,150 Z"
              fill="rgba(8, 145, 178, 0.4)"
            />
          </svg>
        </div>

        {/* Palm Trees - Foreground Left */}
        <div
          className="absolute left-0 bottom-0 w-64 h-96 opacity-50"
          style={{
            transform: `translateY(${scrollY * 0.15}px) translateX(-20px)`,
          }}
        >
          <svg viewBox="0 0 200 400" className="w-full h-full">
            <defs>
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <linearGradient id="palmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Trunk */}
            <ellipse cx="100" cy="320" rx="12" ry="80" fill="url(#trunkGrad)" />
            {/* Palm leaves */}
            <path d="M100 260 Q60 200 40 180 Q50 185 100 250 Z" fill="url(#palmGrad)" />
            <path d="M100 260 Q140 200 160 180 Q150 185 100 250 Z" fill="url(#palmGrad)" />
            <path d="M100 260 Q70 210 50 195 Q60 200 100 250 Z" fill="url(#palmGrad)" opacity="0.8" />
            <path d="M100 260 Q130 210 150 195 Q140 200 100 250 Z" fill="url(#palmGrad)" opacity="0.8" />
            <path d="M100 260 Q100 180 100 160 Q100 170 100 250 Z" fill="url(#palmGrad)" />
          </svg>
        </div>

        {/* Palm Trees - Foreground Right */}
        <div
          className="absolute right-0 bottom-0 w-64 h-96 opacity-50"
          style={{
            transform: `translateY(${scrollY * 0.15}px) translateX(20px) scaleX(-1)`,
          }}
        >
          <svg viewBox="0 0 200 400" className="w-full h-full">
            <use xlinkHref="#palmTree" />
            <ellipse cx="100" cy="320" rx="12" ry="80" fill="url(#trunkGrad)" />
            <path d="M100 260 Q60 200 40 180 Q50 185 100 250 Z" fill="url(#palmGrad)" />
            <path d="M100 260 Q140 200 160 180 Q150 185 100 250 Z" fill="url(#palmGrad)" />
            <path d="M100 260 Q70 210 50 195 Q60 200 100 250 Z" fill="url(#palmGrad)" opacity="0.8" />
            <path d="M100 260 Q130 210 150 195 Q140 200 100 250 Z" fill="url(#palmGrad)" opacity="0.8" />
            <path d="M100 260 Q100 180 100 160 Q100 170 100 250 Z" fill="url(#palmGrad)" />
          </svg>
        </div>

        {/* Sun/Light rays */}
        <div
          className="absolute top-10 right-20 w-32 h-32 rounded-full bg-yellow-300/40 blur-2xl animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
            animationDuration: '4s'
          }}
        />

        {/* Floating elements overlay */}
        <TropicalFloaters />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-12 pb-24">
        {children}
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes wave-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-30%);
          }
        }

        .animate-wave {
          animation: wave 10s linear infinite;
        }

        .animate-wave-slow {
          animation: wave-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
