"use client";

import { useState, useEffect } from "react";
import { useSendStore } from "@/lib/stores/send-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CurrencySelector from "./CurrencySelector";
import {
  calculateFees,
  formatCurrency,
  getCurrencyByCountry,
} from "@/lib/currencies";
import { convertCurrencyLive } from "@/lib/services/exchange-rate-service";
import { useTranslations } from "next-intl";

export default function AmountStep() {
  const {
    amount,
    recipient,
    updateAmount,
    setCurrentStep,
    validateAmount,
    errors,
    clearError,
  } = useSendStore();

  const t = useTranslations("Send");
  const tCommon = useTranslations("Common");

  const [sendAmount, setSendAmount] = useState(amount.sendAmount);
  const [sendCurrency, setSendCurrency] = useState(amount.sendCurrency);
  const [receiveCurrency, setReceiveCurrency] = useState(
    amount.receiveCurrency
  );
  const [isConverting, setIsConverting] = useState(false);

  // Auto-populate receive currency based on recipient's country
  useEffect(() => {
    if (recipient.countryCode) {
      const recipientCurrency = getCurrencyByCountry(recipient.countryCode);
      console.log(
        "Country:",
        recipient.countryCode,
        "Currency found:",
        recipientCurrency
      );
      if (recipientCurrency && recipientCurrency.code !== receiveCurrency) {
        setReceiveCurrency(recipientCurrency.code);
        console.log("Set receive currency to:", recipientCurrency.code);
      }
    }
  }, [recipient.countryCode, receiveCurrency, setReceiveCurrency]);

  // Real-time conversion with live exchange rates
  useEffect(() => {
    const performConversion = async () => {
      if (
        sendAmount &&
        parseFloat(sendAmount) > 0 &&
        sendCurrency &&
        receiveCurrency
      ) {
        setIsConverting(true);
        try {
          const numericAmount = parseFloat(sendAmount);
          const { convertedAmount, rate } = await convertCurrencyLive(
            numericAmount,
            sendCurrency,
            receiveCurrency
          );
          const fees = calculateFees(numericAmount, sendCurrency);
          const totalAmount = numericAmount + fees;

          updateAmount({
            sendAmount,
            sendCurrency,
            receiveAmount: convertedAmount.toFixed(2),
            receiveCurrency,
            exchangeRate: rate,
            fees,
            totalAmount,
          });
        } catch (error) {
          console.error("Conversion error:", error);
          // Fallback to showing 0 if conversion fails
          updateAmount({
            sendAmount,
            sendCurrency,
            receiveAmount: "0",
            receiveCurrency,
            exchangeRate: 0,
            fees: 0,
            totalAmount: parseFloat(sendAmount) || 0,
          });
        } finally {
          setIsConverting(false);
        }
      } else {
        updateAmount({
          sendAmount,
          sendCurrency,
          receiveAmount: "0",
          receiveCurrency,
          exchangeRate: 0,
          fees: 0,
          totalAmount: 0,
        });
      }
    };

    // Debounce the conversion to avoid too many API calls
    const timeoutId = setTimeout(performConversion, 500);
    return () => clearTimeout(timeoutId);
  }, [sendAmount, sendCurrency, receiveCurrency, updateAmount]);

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    setSendAmount(numericValue);
    if (errors.sendAmount) {
      clearError("sendAmount");
    }
  };

  const handleSendCurrencyChange = (currency: string) => {
    setSendCurrency(currency);
    if (errors.sendCurrency) {
      clearError("sendCurrency");
    }
  };

  const handleReceiveCurrencyChange = (currency: string) => {
    setReceiveCurrency(currency);
    if (errors.receiveCurrency) {
      clearError("receiveCurrency");
    }
  };

  const handleNext = () => {
    if (validateAmount()) {
      setCurrentStep("review");
    }
  };

  const handleBack = () => {
    setCurrentStep("recipient");
  };

  // Currency data for potential future use
  // const sendCurrencyData = getCurrencyByCode(sendCurrency);
  // const receiveCurrencyData = getCurrencyByCode(receiveCurrency);

  return (
    <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
          {t("amount.title")}
        </h1>
      </div>

      <div className="space-y-6 overflow-visible">
        {/* Send Amount */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Label className="text-[#4B5563] font-medium">
            {t("amount.sendAmount")}
          </Label>
          <div className="relative mt-1 overflow-visible">
            <Input
              type="text"
              value={sendAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              className={`pr-32 text-lg ${
                errors.sendAmount ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <CurrencySelector
                selectedCurrency={sendCurrency}
                onCurrencyChange={handleSendCurrencyChange}
                showFlag={true}
              />
            </div>
          </div>
          {errors.sendAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.sendAmount}</p>
          )}
        </div>

        {/* Receive Amount */}
        <div className="relative" style={{ zIndex: 1 }}>
          <Label className="text-[#4B5563] font-medium">
            {t("amount.receiveAmount")}
          </Label>
          <div className="relative mt-1 overflow-visible ">
            <Input
              type="text"
              value={isConverting ? "Converting..." : amount.receiveAmount}
              readOnly
              className={`pr-32 text-lg bg-gray-50 ${
                isConverting ? "text-gray-500" : ""
              }`}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <CurrencySelector
                selectedCurrency={receiveCurrency}
                onCurrencyChange={handleReceiveCurrencyChange}
                showFlag={true}
              />
            </div>
          </div>
          {amount.exchangeRate > 0 && !isConverting && (
            <p className="text-xs text-gray-500 mt-1">
              1 {sendCurrency} = {amount.exchangeRate.toFixed(4)}{" "}
              {receiveCurrency}
            </p>
          )}
        </div>

        {/* Transfer Details */}
        {parseFloat(sendAmount) > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-[#4B5563]">Estimated time</span>
              <span className="text-[#111827] font-medium">3 hours</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4B5563]">{t("amount.fees")}</span>
              <span className="text-[#111827] font-medium">
                {formatCurrency(amount.fees, sendCurrency)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4B5563]">{t("amount.total")}</span>
              <span className="text-[#111827] font-medium">
                {formatCurrency(amount.totalAmount, sendCurrency)}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6"
          style={{ zIndex: 1 }}
        >
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
            disabled={!sendAmount || parseFloat(sendAmount) <= 0}
          >
            {tCommon("buttons.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
