"use client";

import { useKYCStore, KYCStep } from "@/lib/stores/kyc-store";

const steps: { key: KYCStep; label: string }[] = [
  { key: 'personal-details', label: 'Personal details' },
  { key: 'verification', label: 'Verification' },
  { key: 'address', label: 'Address' },
];

export default function KYCStepIndicator() {
  const { currentStep } = useKYCStore();

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div key={step.key} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0BAB7C] text-white'
                      : isCompleted
                      ? 'bg-[#0BAB7C] text-white'
                      : 'bg-gray-200 text-[#111827]'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isActive ? 'text-[#0BAB7C]' : 'text-[#111827]'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 transition-colors ${
                    index < currentStepIndex ? 'bg-[#0BAB7C]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
