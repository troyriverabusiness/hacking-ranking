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
    <div className="relative h-[450px] overflow-hidden rounded-xl">
      {/* Parallax Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=900&fit=crop')`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
            filter: 'brightness(0.9)',
          }}
        />

        {/* Overlay gradient for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/30" />

        {/* Floating elements overlay */}
        <TropicalFloaters />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-8">
        {children}
      </div>
    </div>
  );
}
