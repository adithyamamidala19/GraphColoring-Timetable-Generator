import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/motion";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (cursor.style.opacity !== "1") {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-7 h-7 rounded-full border border-[#10B981]/50 pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block"
      style={{ backgroundColor: "rgba(16, 185, 129, 0.08)" }}
    />
  );
};
