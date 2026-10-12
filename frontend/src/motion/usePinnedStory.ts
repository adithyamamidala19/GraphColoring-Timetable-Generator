import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./index";

interface PinnedStoryOptions {
  totalSteps: number;
  pinDuration?: string; // e.g. "+=3000" or "+=400%"
  onStepChange?: (stepIndex: number) => void;
}

export function usePinnedStory(options: PinnedStoryOptions) {
  const { totalSteps, pinDuration = "+=3500", onStepChange } = options;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (prefersReducedMotion()) {
      setActiveStep(0);
      setProgress(1);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: pinDuration,
      pin: true,
      scrub: 0.5,
      snap: 1 / (totalSteps - 1),
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const step = Math.min(
          totalSteps - 1,
          Math.floor(p * (totalSteps - 0.05))
        );
        setActiveStep(step);
        onStepChange?.(step);
      },
    });

    return () => {
      st.kill();
    };
  }, [totalSteps, pinDuration, onStepChange]);

  return { stageRef, activeStep, progress };
}
