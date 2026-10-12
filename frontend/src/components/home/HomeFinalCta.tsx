import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Database, Sparkles } from "lucide-react";
import { useTimetable } from "@/context/TimetableContext";

export const HomeFinalCta: React.FC = () => {
  const navigate = useNavigate();
  const { loadDemoData } = useTimetable();

  const handleDemoClick = () => {
    loadDemoData();
    navigate("/app?step=generate");
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0] relative overflow-hidden">
      {/* Subtle Moving Emerald Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D1FAE5]/50 rounded-full blur-[140px] pointer-events-none animate-pulse duration-1000" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D2] text-[#065F46] text-xs font-semibold shadow-subtle">
          <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Production-Ready Academic Scheduling</span>
        </div>

        <h2 className="fluid-hero-headline font-display font-bold text-[#14201B] tracking-tight">
          Generate your timetable in{" "}
          <span className="font-serif italic font-normal text-[#10B981]">one</span>{" "}
          click.
        </h2>

        <p className="text-base sm:text-lg text-[#5B6B63] max-w-xl mx-auto font-normal">
          Zero double-booking guarantee backed by Brooks' Theorem and degree-of-saturation graph heuristics.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/app"
            className="px-7 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-2xl text-sm flex items-center gap-2.5 shadow-soft transition-transform hover:scale-102"
          >
            <span>Open workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleDemoClick}
            className="px-7 py-4 bg-white hover:bg-[#F3EFE4] text-[#14201B] border border-[#E8E2D2] font-semibold rounded-2xl text-sm flex items-center gap-2.5 shadow-subtle transition-colors cursor-pointer"
          >
            <Database className="w-4 h-4 text-[#10B981]" />
            <span>Load demo dataset</span>
          </button>
        </div>
      </div>
    </section>
  );
};
