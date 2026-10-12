import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./index";

interface CountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  scrollTrigger?: boolean;
}

export function useCountUp(options: CountUpOptions) {
  const {
    end,
    start = 0,
    duration = 1.4,
    decimals = 0,
    prefix = "",
    suffix = "",
    scrollTrigger = true,
  } = options;

  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${start.toFixed(decimals)}${suffix}`
  );
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayValue(`${prefix}${end.toFixed(decimals)}${suffix}`);
      return;
    }

    const obj = { val: start };

    const animate = () => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(`${prefix}${obj.val.toFixed(decimals)}${suffix}`);
        },
      });
    };

    if (scrollTrigger && triggerRef.current) {
      const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top 85%",
        once: true,
        onEnter: animate,
      });

      return () => {
        st.kill();
      };
    } else {
      animate();
    }
  }, [end, start, duration, decimals, prefix, suffix, scrollTrigger]);

  return { displayValue, triggerRef };
}
