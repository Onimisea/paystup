"use client";

import { useState } from "react";
import { Search, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import MobileMenu from "@/components/common/MobileMenu";
import AuthFooter from "@/components/layout/AuthFooter";
import EmailSupportModal from "./EmailSupportModal";
import LiveChatWidget from "./LiveChatWidget";
import { useTranslations } from "next-intl";

export default function HelpCenterClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const t = useTranslations("Help");

  const helpCategories = [
    {
      title: t("categories.sendMoney.title"),
      description: t("categories.sendMoney.description"),
      slug: "send-money",
      topics: [
        "Step-by-step sending process",
        "Required recipient information",
        "Payment methods",
        "Transfer limits",
      ],
    },
    {
      title: t("categories.transferTimes.title"),
      description: t("categories.transferTimes.description"),
      slug: "transfer-times",
      topics: [
        "Instant transfers",
        "Bank processing times",
        "Weekend and holiday delays",
        "International transfer times",
      ],
    },
    {
      title: t("categories.supportedCountries.title"),
      description: t("categories.supportedCountries.description"),
      slug: "supported-countries",
      topics: [
        "Supported countries",
        "Regional restrictions",
        "Currency availability",
        "Local payment methods",
      ],
    },
    {
      title: t("categories.feesAndRates.title"),
      description: t("categories.feesAndRates.description"),
      slug: "fees-and-rates",
      topics: [
        "Transfer fees",
        "Exchange rate margins",
        "Fee calculator",
        "Premium rates",
      ],
    },
    {
      title: t("categories.transferDelays.title"),
      description: t("categories.transferDelays.description"),
      slug: "transfer-delays",
      topics: [
        "Verification requirements",
        "Bank processing delays",
        "Compliance checks",
        "Technical issues",
      ],
    },
    {
      title: t("categories.security.title"),
      description: t("categories.security.description"),
      slug: "security",
      topics: [
        "Data encryption",
        "Account security",
        "Fraud protection",
        "Privacy policy",
      ],
    },
    {
      title: t("categories.kyc.title"),
      description: t("categories.kyc.description"),
      slug: "kyc",
      topics: [
        "Identity verification",
        "Document requirements",
        "Verification process",
        "Account limits",
      ],
    },
    {
      title: t("categories.accountInfo.title"),
      description: t("categories.accountInfo.description"),
      slug: "account-info",
      topics: [
        "Profile settings",
        "Password management",
        "Notification preferences",
        "Account closure",
      ],
    },
    {
      title: t("categories.reportProblem.title"),
      description: t("categories.reportProblem.description"),
      slug: "report-problem",
      topics: [
        "Transaction issues",
        "Technical problems",
        "Account access",
        "Dispute resolution",
      ],
    },
  ];

  const filteredCategories = helpCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-6 md:pb-0">
        {/* Header */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-row md:gap-4 lg:gap-6 xl:gap-8">
            {/* Sidebar - Hidden on mobile */}
            <div className="flex-shrink-0">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 w-full md:w-auto">
              {/* Page Header */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111827] mb-2">
                  {t("title")}
                </h1>
                <p className="text-sm sm:text-base text-[#4B5563] mb-4 sm:mb-6">
                  {t("subtitle")}
                </p>

                {/* Search Bar */}
                <div className="relative mb-4 sm:mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4B5563]" />
                  <Input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 sm:pl-12 py-2 sm:py-3 bg-white border-gray-200 focus:border-[#0BAB7C] focus:ring-[#0BAB7C] text-sm sm:text-base min-h-touch"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white px-3 sm:px-4 min-h-touch"
                  >
                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                {/* Support Options */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {/* Live Chat */}
                  <div className="flex-1 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      <h3 className="text-sm sm:text-base font-semibold text-[#111827]">
                        {t("liveChat.title")}
                      </h3>
                    </div>
                    <p className="text-[#4B5563] text-xs sm:text-sm mb-3 sm:mb-4">
                      {t("liveChat.description")}
                    </p>
                    <Button
                      onClick={() => setIsChatOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm min-h-touch w-full sm:w-auto"
                    >
                      {t("liveChat.button")}
                    </Button>
                  </div>

                  {/* Email Support */}
                  <div className="flex-1 bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      <h3 className="text-sm sm:text-base font-semibold text-[#111827]">
                        {t("email.title")}
                      </h3>
                    </div>
                    <p className="text-[#4B5563] text-xs sm:text-sm mb-3 sm:mb-4">
                      {t("email.description")}
                    </p>
                    <Button
                      onClick={() => setIsEmailModalOpen(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm min-h-touch w-full sm:w-auto"
                    >
                      {t("email.button")}
                    </Button>
                  </div>
                </div>
              </div>

              {/* FAQ Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCategories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/help/${category.slug}`}
                    className="bg-white rounded-lg p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer group block"
                  >
                    <h3 className="text-sm sm:text-base font-semibold text-[#111827] mb-2 group-hover:text-[#0BAB7C] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-[#4B5563] text-xs sm:text-sm mb-3 sm:mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#4B5563]">
                        {category.topics.length} articles
                      </span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#0BAB7C] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* No Results */}
              {searchQuery && filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-[#111827] mb-2">
                    {t("noResults.title")}
                  </h3>
                  <p className="text-[#4B5563]">{t("noResults.subtitle")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <AuthFooter />

        {/* Mobile Menu - Only visible on mobile */}
        <MobileMenu />

        {/* Email Support Modal */}
        <EmailSupportModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
        />

        {/* Live Chat Widget */}
        <LiveChatWidget
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </AuthGuard>
  );
}
