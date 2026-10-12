import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION, prefersReducedMotion } from "./index";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });
        return;
      }

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: MOTION.easings.out,
          clearProps: "transform",
        }
      );
    },
    { scope: containerRef, dependencies: [location.pathname] }
  );

  return (
    <div ref={containerRef} className="w-full min-h-screen">
      {children}
    </div>
  );
};
