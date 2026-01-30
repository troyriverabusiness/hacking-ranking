"use client";

import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  rotation: number;
  type: 'leaf' | 'palm' | 'flower' | 'bubble';
}

export function TropicalFloaters() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const floaters: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      rotation: Math.random() * 360,
      type: ['leaf', 'palm', 'flower', 'bubble'][Math.floor(Math.random() * 4)] as FloatingElement['type']
    }));
    setElements(floaters);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute animate-float-drift"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        >
          {element.type === 'leaf' && (
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              className="opacity-40 drop-shadow-lg"
              style={{
                animation: `spin ${element.duration}s linear infinite`,
                animationDelay: `${element.delay}s`
              }}
            >
              <path
                d="M15 2C15 2 5 10 5 18C5 23 9 28 15 28C15 28 15 15 15 2Z"
                fill="url(#leafGradient1)"
                transform={`rotate(${element.rotation} 15 15)`}
              />
              <path
                d="M15 2C15 2 25 10 25 18C25 23 21 28 15 28C15 28 15 15 15 2Z"
                fill="url(#leafGradient2)"
                transform={`rotate(${element.rotation} 15 15)`}
              />
              <defs>
                <linearGradient id="leafGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="leafGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {element.type === 'palm' && (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              className="opacity-30 drop-shadow-lg"
              style={{
                animation: `spin ${element.duration * 1.5}s linear infinite`,
                animationDelay: `${element.delay}s`
              }}
            >
              <g transform={`rotate(${element.rotation} 20 20)`}>
                <path d="M20 20 L25 5 L22 20 Z" fill="#059669" opacity="0.8" />
                <path d="M20 20 L15 5 L18 20 Z" fill="#10b981" opacity="0.8" />
                <path d="M20 20 L30 10 L20 18 Z" fill="#059669" opacity="0.7" />
                <path d="M20 20 L10 10 L20 18 Z" fill="#10b981" opacity="0.7" />
                <path d="M20 20 L35 20 L22 20 Z" fill="#34d399" opacity="0.6" />
                <path d="M20 20 L5 20 L18 20 Z" fill="#6ee7b7" opacity="0.6" />
              </g>
            </svg>
          )}

          {element.type === 'flower' && (
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              className="opacity-50 drop-shadow-lg"
              style={{
                animation: `pulse ${element.duration * 0.5}s ease-in-out infinite`,
                animationDelay: `${element.delay}s`
              }}
            >
              <g transform={`rotate(${element.rotation} 12.5 12.5)`}>
                <circle cx="12.5" cy="5" r="3" fill="#f472b6" />
                <circle cx="20" cy="12.5" r="3" fill="#ec4899" />
                <circle cx="12.5" cy="20" r="3" fill="#f472b6" />
                <circle cx="5" cy="12.5" r="3" fill="#ec4899" />
                <circle cx="12.5" cy="12.5" r="3" fill="#fbbf24" />
              </g>
            </svg>
          )}

          {element.type === 'bubble' && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="opacity-40"
              style={{
                animation: `float ${element.duration * 0.7}s ease-in-out infinite`,
                animationDelay: `${element.delay}s`
              }}
            >
              <circle cx="10" cy="10" r="8" fill="url(#bubbleGradient)" opacity="0.6" />
              <circle cx="7" cy="7" r="2" fill="white" opacity="0.8" />
              <defs>
                <radialGradient id="bubbleGradient">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </radialGradient>
              </defs>
            </svg>
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes float-drift {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translate(50px, -100vh) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .animate-float-drift {
          animation: float-drift linear infinite;
        }
      `}</style>
    </div>
  );
}
