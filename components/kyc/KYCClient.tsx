"use client";

import { useKYCStore } from "@/lib/stores/kyc-store";
import Header from "@/components/common/Header";
import AuthGuard from "@/components/auth/AuthGuard";
import KYCProgressHeader from "./KYCProgressHeader";
import PersonalDetailsStep from "./steps/PersonalDetailsStep";
import VerificationStep from "./steps/VerificationStep";
import AddressStep from "./steps/AddressStep";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/common/Sidebar";

export default function KYCClient() {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useKYCStore();

  const handleBack = () => {
    if (currentStep === "personal-details") {
      router.push("/dashboard");
    } else if (currentStep === "verification") {
      setCurrentStep("personal-details");
    } else if (currentStep === "address") {
      setCurrentStep("verification");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "personal-details":
        return <PersonalDetailsStep />;
      case "verification":
        return <VerificationStep />;
      case "address":
        return <AddressStep />;
      default:
        return <PersonalDetailsStep />;
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
        <Header />

        {/* Progress Header */}
        <div className="flex-shrink-0 pt-4 pb-2">
          <KYCProgressHeader />
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8">
              {/* Sidebar */}
              <div className="flex-shrink-0">
                <Sidebar />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-[#111827] hover:text-[#0BAB7C] focus:text-[#0BAB7C] transition-colors mb-4 sm:mb-6 lg:mb-8 cursor-pointer min-h-touch"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">Back</span>
                </button>

                {/* Step Content */}
                <div className="mt-2 sm:mt-4">{renderStep()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
