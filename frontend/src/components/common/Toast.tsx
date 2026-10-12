import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-[#E8E2D2] px-4 py-3 rounded-2xl shadow-soft animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="w-6 h-6 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#065F46]" />
      </div>
      <p className="text-xs font-semibold text-[#14201B] pr-2">{message}</p>
      <button
        onClick={onClose}
        className="text-[#5B6B63] hover:text-[#14201B] p-1 rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
