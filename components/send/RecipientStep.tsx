"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendStore } from "@/lib/stores/send-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CountrySelector from "./CountrySelector";
import BankSelector from "./BankSelector";
import { getCountryByCode } from "@/lib/countries-banks";
import { useTranslations } from "next-intl";

// Zod validation schema
const recipientSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  bank: z.string().min(1, "Bank is required"),
  country: z.string().min(1, "Country is required"),
  countryCode: z.string().min(1, "Country is required"),
});

type RecipientFormData = z.infer<typeof recipientSchema>;

export default function RecipientStep() {
  const { recipient, updateRecipient, setCurrentStep } = useSendStore();
  const t = useTranslations("Send");
  const tCommon = useTranslations("Common");

  const form = useForm<RecipientFormData>({
    resolver: zodResolver(recipientSchema),
    defaultValues: {
      accountName: recipient.accountName,
      accountNumber: recipient.accountNumber,
      bank: recipient.bank,
      country: recipient.country,
      countryCode: recipient.countryCode,
    },
  });

  const onSubmit = (data: RecipientFormData) => {
    updateRecipient(data);
    setCurrentStep("amount");
  };

  const handleCountryChange = (countryCode: string) => {
    const country = getCountryByCode(countryCode);
    if (country) {
      form.setValue("countryCode", countryCode);
      form.setValue("country", country.name);
      form.setValue("bank", ""); // Reset bank when country changes
      updateRecipient({
        countryCode,
        country: country.name,
        bank: "",
      });
    }
  };

  const handleBankChange = (bankName: string) => {
    form.setValue("bank", bankName);
    updateRecipient({ bank: bankName });
  };

  return (
    <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
          {t("recipient.title")}
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563]">
          {t("recipient.subtitle")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Account Name */}
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B5563] font-medium">
                  {t("recipient.accountName")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("recipient.accountNamePlaceholder")}
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Number */}
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B5563] font-medium">
                  {t("recipient.accountNumber")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("recipient.accountNumberPlaceholder")}
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B5563] font-medium">
                  {t("recipient.country")}
                </FormLabel>
                <FormControl>
                  <CountrySelector
                    selectedCountry={field.value}
                    onCountryChange={handleCountryChange}
                    error={form.formState.errors.countryCode?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bank */}
          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4B5563] font-medium">
                  {t("recipient.bank")}
                </FormLabel>
                <FormControl>
                  <BankSelector
                    selectedBank={field.value}
                    countryCode={form.watch("countryCode")}
                    onBankChange={handleBankChange}
                    error={form.formState.errors.bank?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Next Button */}
          <Button
            type="submit"
            className="w-full sm:w-fit bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 focus:bg-[#0BAB7C]/90 text-white font-medium py-3 px-6 sm:px-8 rounded-full cursor-pointer transition-colors min-h-touch"
          >
            {tCommon("buttons.next")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
