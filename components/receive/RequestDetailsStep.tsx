"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useReceiveStore } from "@/lib/stores/receive-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CurrencySelector from "@/components/send/CurrencySelector";
import { useTranslations } from "next-intl";

// Zod validation schema
const requestDetailsSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(
    (val) => parseFloat(val) > 0,
    "Amount must be greater than 0"
  ),
  currency: z.string().min(1, "Currency is required"),
  description: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
  dueDate: z.string().optional(),
});

type RequestDetailsFormData = z.infer<typeof requestDetailsSchema>;

export default function RequestDetailsStep() {
  const {
    requestDetails,
    updateRequestDetails,
    setCurrentStep,
    validateRequestDetails,
    errors,
    clearError,
  } = useReceiveStore();

  const t = useTranslations("Receive");
  const tCommon = useTranslations("Common");

  const [amount, setAmount] = useState(requestDetails.amount);
  const [currency, setCurrency] = useState(requestDetails.currency);

  const form = useForm<RequestDetailsFormData>({
    resolver: zodResolver(requestDetailsSchema),
    defaultValues: {
      amount: requestDetails.amount,
      currency: requestDetails.currency,
      description: requestDetails.description,
      dueDate: requestDetails.dueDate,
    },
  });

  // Update store when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateRequestDetails({
        amount: value.amount || "",
        currency: value.currency || "USD",
        description: value.description || "",
        dueDate: value.dueDate || "",
      });
    });
    return () => subscription.unsubscribe();
  }, [form, updateRequestDetails]);

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    setAmount(numericValue);
    form.setValue("amount", numericValue);
    if (errors.amount) {
      clearError("amount");
    }
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    form.setValue("currency", newCurrency);
    if (errors.currency) {
      clearError("currency");
    }
  };

  const onSubmit = (data: RequestDetailsFormData) => {
    updateRequestDetails(data);
    if (validateRequestDetails()) {
      setCurrentStep("sharing");
    }
  };

  const handleNext = () => {
    if (validateRequestDetails()) {
      setCurrentStep("sharing");
    }
  };

  // Get today's date for minimum date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
          {t("details.title")}
        </h1>
        <p className="text-[#4B5563]">{t("details.subtitle")}</p>
      </div>

      <div className="space-y-6 overflow-visible">
        {/* Amount Input with Currency Selector */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Label className="text-[#4B5563] font-medium">
            {t("details.amount")}
          </Label>
          <div className="relative mt-1 overflow-visible">
            <Input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              className={`pr-32 text-lg ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <CurrencySelector
                selectedCurrency={currency}
                onCurrencyChange={handleCurrencyChange}
                showFlag={true}
              />
            </div>
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label className="text-[#4B5563] font-medium">
            {t("details.description")}
          </Label>
          <Textarea
            value={form.watch("description")}
            onChange={(e) => {
              form.setValue("description", e.target.value);
              if (errors.description) {
                clearError("description");
              }
            }}
            placeholder={t("details.descriptionPlaceholder")}
            maxLength={200}
            className={`mt-1 resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
            <p className="text-sm text-[#4B5563] ml-auto">
              {form.watch("description")?.length || 0}/200
            </p>
          </div>
        </div>

        {/* Due Date (Optional) */}
        <div>
          <Label className="text-[#4B5563] font-medium">
            {t("details.dueDate")} ({tCommon("optional")})
          </Label>
          <Input
            type="date"
            value={form.watch("dueDate")}
            onChange={(e) => form.setValue("dueDate", e.target.value)}
            min={today}
            className="mt-1"
          />
        </div>

        {/* Navigation Button */}
        <div className="pt-4 sm:pt-6">
          <Button
            onClick={handleNext}
            className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-lg cursor-pointer min-h-touch"
            disabled={!amount || parseFloat(amount) <= 0 || !form.watch("description")}
          >
            {t("details.continue")}
          </Button>
        </div>
      </div>
    </div>
  );
}
