import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/motion";

interface SlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const SlideOverDrawer: React.FC<SlideOverDrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    if (prefersReducedMotion()) {
      if (panelRef.current) panelRef.current.style.transform = "translateX(0)";
      if (backdropRef.current) backdropRef.current.style.opacity = "1";
      return;
    }

    if (panelRef.current && backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.35, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-[#14201B]/20 backdrop-blur-[2px] transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={panelRef}
          className="w-screen max-w-md bg-white border-l border-[#E8E2D2] shadow-float flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D2] flex items-start justify-between bg-[#FAF7F0]/50">
            <div>
              <h3 className="font-display font-bold text-lg text-[#14201B] tracking-tight">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-[#5B6B63] mt-1 font-sans">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#5B6B63] hover:text-[#14201B] hover:bg-[#F3EFE4] transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};
