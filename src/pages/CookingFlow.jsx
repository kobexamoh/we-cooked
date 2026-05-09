import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CookingStep from "../components/CookingStep";
import { currentChallenge } from "../data/challenges";

export default function CookingFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const steps = currentChallenge.steps;
  const isLast = stepIndex === steps.length - 1;

  const next = () => {
    if (isLast) {
      navigate("/complete");
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const back = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const progress = ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="px-5 pb-10 flex flex-col min-h-[calc(100dvh-64px)]">
      {/* Progress bar */}
      <div className="w-full h-2 bg-progress-track rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-progress rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-muted mb-8 text-center">
        {currentChallenge.title}
      </p>

      {/* Step content — centered */}
      <div className="flex-1 flex items-center justify-center">
        <CookingStep
          step={steps[stepIndex]}
          stepNumber={stepIndex + 1}
          totalSteps={steps.length}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={back}
          disabled={stepIndex === 0}
          className="flex-1 py-3 rounded-2xl border border-theme text-heading font-medium
                     transition-all hover:bg-accent active:scale-[0.98]
                     disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          ← Back
        </button>
        <button
          onClick={next}
          className="flex-1 py-3 rounded-2xl bg-primary text-white font-semibold
                     transition-all hover:bg-primary-dark active:scale-[0.98] cursor-pointer"
        >
          {isLast ? "I Cooked It! 🎉" : "Next →"}
        </button>
      </div>
    </div>
  );
}
