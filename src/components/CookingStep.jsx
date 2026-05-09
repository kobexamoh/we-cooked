import Timer from "./Timer";

export default function CookingStep({ step, stepNumber, totalSteps }) {
  return (
    <div className="flex flex-col items-center text-center px-6">
      <p className="text-muted text-sm mb-2">
        Step {stepNumber} of {totalSteps}
      </p>
      <p className="text-2xl font-semibold text-heading leading-relaxed max-w-md">
        {step.instruction}
      </p>
      {step.timer && <Timer seconds={step.timer} />}
    </div>
  );
}
