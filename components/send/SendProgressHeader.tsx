"use client";

import { useSendStore, SendStep } from "@/lib/stores/send-store";
import { useTranslations } from "next-intl";

export default function SendProgressHeader() {
  const { currentStep } = useSendStore();
  const t = useTranslations("Send");

  const steps: { key: SendStep; label: string }[] = [
    { key: "recipient", label: t("steps.recipient") },
    { key: "amount", label: t("steps.amount") },
    { key: "review", label: t("steps.review") },
    { key: "payment", label: t("steps.payment") },
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
