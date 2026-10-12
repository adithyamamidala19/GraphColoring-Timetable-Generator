import React, { useRef, useLayoutEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sparkles, ShieldCheck, Check, Layers, Cpu, Eye, Share2 } from "lucide-react";
import { gsap, Flip, prefersReducedMotion } from "@/motion";
import { useTimetable } from "@/context/TimetableContext";

export type WorkspaceStep = "setup" | "generate" | "review" | "export";

interface TopNavProps {
  currentStep?: WorkspaceStep;
  onStepSelect?: (step: WorkspaceStep) => void;
  isWorkspace?: boolean;
}

const STEPS: { id: WorkspaceStep; label: string; number: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "setup", label: "Setup", number: "1", icon: Layers },
  { id: "generate", label: "Generate", number: "2", icon: Cpu },
  { id: "review", label: "Review", number: "3", icon: Eye },
  { id: "export", label: "Export", number: "4", icon: Share2 },
];

export const TopNav: React.FC<TopNavProps> = ({
  currentStep = "setup",
  onStepSelect,
  isWorkspace = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { runSolver, isSolving, solveResult } = useTimetable();
  const activePillRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  // Flip animation for active stepper pill
  useLayoutEffect(() => {
    if (!isWorkspace || !activePillRef.current || prefersReducedMotion()) return;
    const state = Flip.getState(activePillRef.current);
    Flip.from(state, {
      duration: 0.35,
      ease: "power2.out",
    });
  }, [currentStep, isWorkspace]);

  const handleStepClick = (step: WorkspaceStep) => {
    if (onStepSelect) {
      onStepSelect(step);
    } else {
      navigate(`/app?step=${step}`);
    }
  };

  const handleGenerateClick = async () => {
    await runSolver();
    if (onStepSelect) {
      onStepSelect("review");
    } else {
      navigate("/app?step=review");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#E8E2D2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl p-1"
        >
          <div className="w-8 h-8 rounded-xl bg-[#10B981] flex items-center justify-center text-white font-display font-extrabold text-base shadow-sm transition-transform group-hover:scale-105">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-[#14201B] flex items-center gap-2">
              AutoSched AI
              <span className="text-[11px] font-mono font-medium text-[#065F46] bg-[#D1FAE5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                DSatur
              </span>
            </span>
          </div>
        </Link>

        {/* 4-Step Stepper (Desktop/Tablet) */}
        {isWorkspace ? (
          <nav
            ref={navContainerRef}
            className="hidden md:flex items-center gap-1 bg-[#F3EFE4] p-1 rounded-2xl border border-[#E8E2D2] relative"
            aria-label="Workspace Progress Rail"
          >
            {STEPS.map((step) => {
              const isActive = currentStep === step.id;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`relative z-10 px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                    isActive
                      ? "text-[#14201B] font-bold"
                      : "text-[#5B6B63] hover:text-[#14201B]"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      isActive
                        ? "bg-[#10B981] text-white font-bold"
                        : "bg-[#E8E2D2] text-[#5B6B63]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span>{step.label}</span>

                  {isActive && (
                    <div
                      ref={activePillRef}
                      className="absolute inset-0 bg-white rounded-xl shadow-subtle border border-[#E8E2D2] -z-10"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#5B6B63]">
            <a href="#how-it-works" className="hover:text-[#14201B] transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-[#14201B] transition-colors">
              Features
            </a>
            <a href="#demo" className="hover:text-[#14201B] transition-colors">
              Interactive Demo
            </a>
          </nav>
        )}

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Status Pill */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold"
            title="Hard conflicts guaranteed zero"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>0 conflicts</span>
          </div>

          {/* Persistent Generate or Launch CTA */}
          {isWorkspace ? (
            <button
              onClick={handleGenerateClick}
              disabled={isSolving}
              className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-2xl text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-102 active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isSolving ? "animate-spin" : ""}`} />
              <span>{isSolving ? "Solving..." : "Generate"}</span>
            </button>
          ) : (
            <Link
              to="/app"
              className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold rounded-2xl text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102"
            >
              <span>Open workspace</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Bottom Navigation Rail */}
      {isWorkspace && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E8E2D2] px-4 py-2 flex items-center justify-around shadow-soft">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[11px] font-semibold transition-colors ${
                  isActive ? "text-[#10B981] font-bold" : "text-[#5B6B63]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#10B981]" : "text-[#5B6B63]"}`} />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
