"use client";

import { useSendStore } from "@/lib/stores/send-store";
import Header from "@/components/common/Header";
import AuthGuard from "@/components/auth/AuthGuard";
import Sidebar from "@/components/common/Sidebar";
import MobileMenu from "@/components/common/MobileMenu";
import AuthFooter from "@/components/layout/AuthFooter";
import SendProgressHeader from "./SendProgressHeader";
import RecipientStep from "./RecipientStep";
import AmountStep from "./AmountStep";
import ReviewStep from "./ReviewStep";
import PaymentStep from "./PaymentStep";

export default function SendClient() {
  const { currentStep } = useSendStore();

  const renderStep = () => {
    switch (currentStep) {
      case "recipient":
        return <RecipientStep />;
      case "amount":
        return <AmountStep />;
      case "review":
        return <ReviewStep />;
      case "payment":
        return <PaymentStep />;
      default:
        return <RecipientStep />;
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-6 md:pb-0">
        {/* Header */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-row md:gap-4 lg:gap-6 xl:gap-8 overflow-visible">
            {/* Sidebar - Hidden on mobile */}
            <div className="flex-shrink-0">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 overflow-visible w-full md:w-auto">
              {/* Progress Header */}
              <div className="mb-4 sm:mb-6">
                <SendProgressHeader />
              </div>

              {/* Send Form Content */}
              <div className="md:bg-white rounded-lg p-4 sm:p-6 lg:p-8 overflow-visible">
                {renderStep()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <AuthFooter />

        {/* Mobile Menu - Only visible on mobile */}
        <MobileMenu />
      </div>
    </AuthGuard>
  );
}
