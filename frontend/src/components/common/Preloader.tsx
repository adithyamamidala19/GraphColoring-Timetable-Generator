import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoPathRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onComplete();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      if (logoPathRef.current) {
        const length = logoPathRef.current.getTotalLength?.() || 200;
        gsap.set(logoPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        tl.to(logoPathRef.current, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "-=0.2"
        );
      }

      // Wipe container upwards cleanly
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.45,
        ease: "power3.inOut",
        delay: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#FAF7F0] flex flex-col items-center justify-center pointer-events-none select-none"
    >
      <div className="flex flex-col items-center gap-3">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="overflow-visible">
          <circle cx="30" cy="30" r="26" stroke="#E8E2D2" strokeWidth="2" />
          <path
            ref={logoPathRef}
            d="M 18 38 L 30 18 L 42 38 M 22 32 L 38 32"
            stroke="#10B981"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div ref={textRef} className="font-display font-bold text-sm tracking-tight text-[#14201B]">
          AutoSched AI
        </div>
      </div>
    </div>
  );
};
