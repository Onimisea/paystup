"use client";

import { useKYCStore, KYCStep } from "@/lib/stores/kyc-store";

const steps: { key: KYCStep; label: string }[] = [
  { key: "personal-details", label: "Personal details" },
  { key: "verification", label: "Verification" },
  { key: "address", label: "Address" },
];

export default function KYCProgressHeader() {
  const { currentStep } = useKYCStore();

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      {/* Progress Bar */}
      <div className="relative mb-3">
        {/* Background bar */}
        <div className="w-full h-0.5 bg-white rounded-full overflow-hidden">
          {/* Progress fill */}
          <div
            className="h-full bg-[#0BAB7C] rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center">
            <span
              className={`text-xs font-medium transition-colors ${
                index <= currentStepIndex
                  ? "text-[#0BAB7C]"
                  : "text-[#111827]"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
