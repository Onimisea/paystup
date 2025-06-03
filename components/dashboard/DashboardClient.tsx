"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Send,
  ArrowUpDown,
  ArrowDownToLine,
  ArrowUp,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import AuthFooter from "@/components/layout/AuthFooter";
import AuthGuard from "@/components/auth/AuthGuard";
import { useKYCStore } from "@/lib/stores/kyc-store";
import { useTranslations } from "next-intl";

interface Transaction {
  id: string;
  type: "send" | "receive" | "convert" | "failed";
  title: string;
  subtitle: string;
  amount: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function DashboardClient() {
  const router = useRouter();
  const kycStore = useKYCStore();
  const t = useTranslations("Dashboard");
  const {
    isCompleted: isKYCCompleted,
    completedAt,
    personalDetails,
    verification,
    address,
  } = kycStore;

  // Log complete KYC store state for debugging
  console.log("📊 Dashboard KYC Store State:", {
    isKYCCompleted,
    completedAt,
    personalDetails,
    verification: {
      selectedDocumentType: verification.selectedDocumentType,
      frontSideStatus: verification.frontSide.status,
      backSideStatus: verification.backSide.status,
    },
    address,
    timestamp: new Date().toISOString(),
    willShowKYCCard: !isKYCCompleted,
    willShowVerifiedCard: isKYCCompleted,
  });

  // Check sessionStorage directly
  if (typeof window !== "undefined") {
    const storedData = sessionStorage.getItem("kyc-storage");
    console.log("🗄️ Raw sessionStorage data:", storedData);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        console.log("📦 Parsed sessionStorage KYC data:", parsed);
      } catch (e) {
        console.error("❌ Error parsing sessionStorage:", e);
      }
    }
  }

  // // For testing purposes - reset KYC status
  // const handleResetKYC = () => {
  //   if (
  //     confirm(
  //       "Are you sure you want to reset KYC status? This is for testing purposes only."
  //     )
  //   ) {
  //     resetKYC();
  //     // Also clear sessionStorage to test migration
  //     if (typeof window !== "undefined") {
  //       sessionStorage.removeItem("kyc-storage");
  //       console.log("🗑️ Cleared sessionStorage for fresh start");
  //     }
  //     console.log("🔄 KYC Status Reset for Testing");
  //     // Reload to trigger rehydration
  //     setTimeout(() => window.location.reload(), 500);
  //   }
  // };

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "send",
      title: "Money sent to Vivian",
      subtitle: "Sending request",
      amount: "12,000 NGN",
      icon: <ArrowUp className="w-4 h-4 text-white" />,
      iconBg: "bg-orange-500",
    },
    {
      id: "2",
      type: "send",
      title: "Money sent to Samuel",
      subtitle: "Sent • Today",
      amount: "12,000 NGN",
      icon: <ArrowUp className="w-4 h-4 text-white" />,
      iconBg: "bg-primary-green",
    },
    {
      id: "3",
      type: "convert",
      title: "Converted NGN to INR",
      subtitle: "Vivian • Today",
      amount: "12,000 NGN",
      icon: <ArrowUpDown className="w-4 h-4 text-white" />,
      iconBg: "bg-primary-green",
    },
    {
      id: "4",
      type: "failed",
      title: "Money sent to Matthew",
      subtitle: "Sending failed",
      amount: "13,000 NGN",
      icon: <ArrowUp className="w-4 h-4 text-white" />,
      iconBg: "bg-red-500",
    },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Sidebar */}
            <div className="flex-shrink-0">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Page Title */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t("title")}
                </h1>
              </div>

              {/* Account Section - White Container */}
              <div className="bg-white rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                {/* Action Buttons */}
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
                  <div
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => router.push("/send")}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-green rounded-full flex items-center justify-center mb-2 sm:mb-3 hover:bg-primary-green/90 group-hover:scale-105 transition-all duration-200 min-h-touch">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                      {t("actions.send")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-green rounded-full flex items-center justify-center mb-2 sm:mb-3 hover:bg-primary-green/90 group-hover:scale-105 transition-all duration-200 min-h-touch">
                      <ArrowUpDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                      {t("actions.convert")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-primary-green rounded-full flex items-center justify-center mb-2 sm:mb-3 hover:bg-primary-green/10 group-hover:scale-105 transition-all duration-200 min-h-touch">
                      <ArrowDownToLine className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary-green" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                      {t("actions.receive")}
                    </span>
                  </div>
                </div>

                {/* Transactions */}
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                      {t("transactions.title")}
                    </h3>
                    <button className="text-xs sm:text-sm text-primary-green hover:underline font-medium min-h-touch">
                      {t("transactions.seeAll")}
                    </button>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between py-2 sm:py-3 hover:bg-gray-50 rounded-lg px-2 sm:px-3 transition-colors"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 ${transaction.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            {transaction.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              {transaction.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {transaction.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <span className="text-xs sm:text-sm font-medium text-gray-900">
                            {transaction.amount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Cards */}
              <div
                className={`grid grid-cols-1 ${
                  !isKYCCompleted
                    ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                    : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                } gap-4 sm:gap-6 mb-6 sm:mb-8`}
              >
                {/* KYC Completed Card - Only show if KYC is completed */}
                {isKYCCompleted && (
                  <Card className="bg-[#D1FAE5] border-0">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#0BAB7C] rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {t("kyc.profileVerified")}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        {t("kyc.profileVerifiedDesc")}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {t("kyc.verificationComplete")}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Complete Profile Card - Only show if KYC not completed */}
                {!isKYCCompleted && (
                  <Card className="bg-[#E1D9FC] border-0">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        {t("kyc.completeProfile")}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        {t("kyc.completeProfileDesc")}
                      </p>
                      <Button
                        onClick={() => router.push("/kyc")}
                        className="bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 text-white rounded-full cursor-pointer transition-colors w-full sm:w-fit min-h-touch"
                      >
                        {t("kyc.completeProfileBtn")}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Refer a Friend Card */}
                <Card className="bg-[#CEEEE5] border-0">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {t("referral.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                      {t("referral.description")}
                    </p>
                    <Button className="bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 text-white rounded-full cursor-pointer transition-colors w-full sm:w-fit min-h-touch">
                      {t("referral.button")}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Exchange Rate Section */}
              {/* <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 mb-1">
                      Exchange rate
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      1 USD = 1,650 NGN
                    </p>
                    <p className="text-xs text-gray-400">Today</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary-green hover:bg-primary-green/90 focus:bg-primary-green/90 text-white rounded-full px-4 sm:px-6 py-2 cursor-pointer transition-colors w-full sm:w-fit min-h-touch"
                  >
                    View rates
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <AuthFooter />
      </div>
    </AuthGuard>
  );
}
