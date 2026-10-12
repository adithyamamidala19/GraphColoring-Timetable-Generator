import React from "react";
import { useReveal } from "@/motion";

export const HomeWhyManualFails: React.FC = () => {
  const containerRef = useReveal<HTMLDivElement>({
    selector: ".stat-strip-item",
    yOffset: 24,
    stagger: 0.12,
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E8E2D2]">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E8E2D2]">
          {/* Metric 1 */}
          <div className="stat-strip-item flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0 md:px-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#5B6B63] line-through decoration-[#991B1B]/40">
                14 Days
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#10B981] font-mono">
                → 50ms
              </span>
            </div>
            <div className="text-sm font-semibold text-[#14201B] mt-2">
              Turnaround compression
            </div>
            <div className="text-xs text-[#5B6B63] mt-0.5">
              From manual committee deadlock to instant deterministic graph coloring.
            </div>
          </div>

          {/* Metric 2 */}
          <div className="stat-strip-item flex flex-col items-center md:items-start text-center md:text-left pt-6 md:pt-0 md:px-6">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#14201B] font-mono">
              100%
            </div>
            <div className="text-sm font-semibold text-[#14201B] mt-2">
              Explainable constraint proof
            </div>
            <div className="text-xs text-[#5B6B63] mt-0.5">
              Every period assignment backed by an explicit chromatic theorem proof.
            </div>
          </div>

          {/* Metric 3 */}
          <div className="stat-strip-item flex flex-col items-center md:items-start text-center md:text-left pt-6 md:pt-0 md:px-6">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#065F46] font-mono">
              0 Violations
            </div>
            <div className="text-sm font-semibold text-[#14201B] mt-2">
              Zero double-booking tolerance
            </div>
            <div className="text-xs text-[#5B6B63] mt-0.5">
              Brooks' Theorem bounds strictly satisfied across all sections and faculty.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
