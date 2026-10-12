import React from "react";
import { useSearchParams } from "react-router-dom";
import { TopNav, WorkspaceStep } from "@/components/common/TopNav";
import { Toast } from "@/components/common/Toast";
import { CustomCursor } from "@/components/common/CustomCursor";
import { SetupView } from "./StepSetup/SetupView";
import { GenerateView } from "./StepGenerate/GenerateView";
import { ReviewView } from "./StepReview/ReviewView";
import { ExportView } from "./StepExport/ExportView";
import { useTimetable } from "@/context/TimetableContext";

export const WorkspaceShell: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = (searchParams.get("step") as WorkspaceStep) || "setup";
  const { toastMessage, clearToast } = useTimetable();

  const handleStepSelect = (step: WorkspaceStep) => {
    setSearchParams({ step });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#14201B] flex flex-col pb-20 md:pb-12 selection:bg-[#D1FAE5] selection:text-[#065F46]">
      <CustomCursor />
      <Toast message={toastMessage} onClose={clearToast} />

      {/* Top Navbar with 4-Step Stepper & Flip Pill */}
      <TopNav
        currentStep={currentStep}
        onStepSelect={handleStepSelect}
        isWorkspace={true}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === "setup" && <SetupView />}

        {currentStep === "generate" && (
          <GenerateView onProceedToReview={() => handleStepSelect("review")} />
        )}

        {currentStep === "review" && <ReviewView />}

        {currentStep === "export" && <ExportView />}
      </main>
    </div>
  );
};
