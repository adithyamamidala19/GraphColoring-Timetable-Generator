import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";

// Register GSAP plugins once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, Draggable);
}

// Re-export core gsap utilities
export { gsap, ScrollTrigger, Flip, Draggable };
export { useGSAP } from "@gsap/react";

// Motion Tokens
export const MOTION = {
  durations: {
    fast: 0.25,
    base: 0.6,
    slow: 1.1,
  },
  easings: {
    out: "power3.out",
    inOut: "power3.inOut",
    expo: "expo.out",
    smooth: "power2.out",
  },
} as const;

// Helper to check prefers-reduced-motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Export Reusable Motion Hooks
export { useReveal } from "./useReveal";
export { useParallax } from "./useParallax";
export { useMagnetic } from "./useMagnetic";
export { useCountUp } from "./useCountUp";
export { usePinnedStory } from "./usePinnedStory";
export { useSmoothScroll } from "./useSmoothScroll";
export { PageTransition } from "./PageTransition";
