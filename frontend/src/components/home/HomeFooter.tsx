import React from "react";

export const HomeFooter: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E8E2D2] text-[#5B6B63] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Capstone Credit */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-[#10B981] flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <div>
            <span className="font-bold text-[#14201B]">AutoSched AI</span>
            <span className="mx-2">•</span>
            <span>DAA Capstone Project by Adithya Mamidala</span>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          {["React 19", "GSAP 3", "DSatur Algorithm", "FastAPI", "Tailwind CSS", "jsPDF"].map(
            (tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#E8E2D2] text-[#5B6B63]"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </footer>
  );
};
