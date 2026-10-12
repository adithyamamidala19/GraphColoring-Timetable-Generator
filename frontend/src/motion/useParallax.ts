import { useRef, useEffect } from "react";
import { gsap, prefersReducedMotion } from "./index";

interface ParallaxOptions {
  depth?: number; // max movement in px (e.g. 20)
  invert?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(options: ParallaxOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const { depth = 24, invert = true } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const factor = invert ? -1 : 1;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;
      xTo(xNorm * depth * factor);
      yTo(yNorm * depth * factor);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [depth, invert]);

  return elementRef;
}
