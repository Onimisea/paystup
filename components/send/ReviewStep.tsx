"use client";

import { useSendStore } from "@/lib/stores/send-store";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currencies";
import { useTranslations } from "next-intl";

export default function ReviewStep() {
  const { recipient, amount, setCurrentStep } = useSendStore();
  const t = useTranslations("Send");
  const tCommon = useTranslations("Common");

  const handleNext = () => {
    setCurrentStep("payment");
  };

  const handleBack = () => {
    setCurrentStep("amount");
  };

  return (
    <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
          {t("review.title")}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Transfer Details Card */}
        <div className="md:bg-white rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#111827] mb-4">
            Transfer details
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-[#4B5563] text-sm sm:text-base">
                {t("review.amountSent")}
              </span>
              <span className="text-[#111827] font-medium text-sm sm:text-base text-right">
                {formatCurrency(
                  parseFloat(amount.sendAmount),
                  amount.sendCurrency
                )}
              </span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-[#4B5563] text-sm sm:text-base">
                {t("review.paystupCharges")}
              </span>
              <span className="text-[#111827] font-medium text-sm sm:text-base text-right">
                {formatCurrency(amount.fees, amount.sendCurrency)}
              </span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-[#4B5563] text-sm sm:text-base">
                {t("review.recipientGets")}
              </span>
              <span className="text-[#111827] font-medium text-sm sm:text-base text-right">
                {formatCurrency(
                  parseFloat(amount.receiveAmount),
                  amount.receiveCurrency
                )}
              </span>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <h3 className="text-lg font-medium text-[#111827] mb-4">
            Recipient details
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#4B5563]">Account name</span>
              <span className="text-[#111827] font-medium">
                {recipient.accountName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#4B5563]">Account number</span>
              <span className="text-[#111827] font-medium">
                {recipient.accountNumber}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#4B5563]">Bank</span>
              <span className="text-[#111827] font-medium">
                {recipient.bank}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#4B5563]">Country</span>
              <span className="text-[#111827] font-medium">
                {recipient.country}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-sm text-[#4B5563]">
            Take a moment to review your transfer details. We want to make sure
            everything looks perfect before we process it.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full sm:flex-1 py-3 rounded-lg cursor-pointer min-h-touch"
          >
            {tCommon("buttons.back")}
          </Button>
          <Button
            onClick={handleNext}
            className="w-full sm:flex-1 bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-lg cursor-pointer min-h-touch"
          >
            {t("review.makePayment")}
          </Button>
        </div>
      </div>
    </div>
  );
}
