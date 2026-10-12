import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, MOTION, prefersReducedMotion } from "./index";

interface UseRevealOptions {
  triggerOnce?: boolean;
  yOffset?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
  selector?: string; // child selector to reveal, e.g. ".reveal-item"
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(options: UseRevealOptions = {}) {
  const containerRef = useRef<T | null>(null);
  const {
    triggerOnce = true,
    yOffset = 36,
    stagger = 0.08,
    duration = MOTION.durations.base,
    delay = 0,
    scrollTrigger = true,
    selector,
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const reduced = prefersReducedMotion();
      const targets = selector ? containerRef.current.querySelectorAll(selector) : containerRef.current;

      if (reduced) {
        gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            delay,
            ease: "power2.out",
          }
        );
        return;
      }

      const tweenVars: gsap.TweenVars = {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: MOTION.easings.out,
        stagger: selector ? stagger : 0,
        clearProps: "transform,opacity",
      };

      if (scrollTrigger) {
        tweenVars.scrollTrigger = {
          trigger: containerRef.current,
          start: "top 85%",
          once: triggerOnce,
        };
      }

      gsap.fromTo(
        targets,
        {
          y: yOffset,
          opacity: 0,
        },
        tweenVars
      );
    },
    { scope: containerRef, dependencies: [selector, yOffset, duration, delay] }
  );

  return containerRef;
}
