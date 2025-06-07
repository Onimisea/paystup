"use client";

import { useReceiveStore, ReceiveStep } from "@/lib/stores/receive-store";
import { useTranslations } from "next-intl";

export default function ReceiveProgressHeader() {
  const { currentStep } = useReceiveStore();
  const t = useTranslations("Receive");

  const steps: { key: ReceiveStep; label: string }[] = [
    { key: "details", label: t("steps.details") },
    { key: "sharing", label: t("steps.sharing") },
    { key: "tracking", label: t("steps.tracking") },
    { key: "completed", label: t("steps.completed") },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Progress Bar */}
      <div className="relative mb-2 sm:mb-3">
        {/* Background bar */}
        <div className="w-full h-0.5 sm:h-1 bg-white rounded-full overflow-hidden">
          {/* Progress fill */}
          <div
            className="h-full bg-primary-green rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center">
            <span
              className={`text-xs sm:text-sm font-medium transition-colors ${
                index <= currentStepIndex
                  ? "text-primary-green"
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
