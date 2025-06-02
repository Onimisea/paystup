"use client";

import { useState, useEffect } from "react";
import { useSendStore } from "@/lib/stores/send-store";
import { useTransactionsStore } from "@/lib/stores/transactions-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeClosed, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  processPassword,
  PasswordValidationResult,
  validatePassword,
} from "@/lib/password-validation";

// Zod schema for payment password validation
const paymentPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .refine(
      (password) => {
        const validation = validatePassword(password.trim());
        return validation.isValid;
      },
      {
        message: "Password does not meet security requirements",
      }
    ),
});

type PaymentPasswordFormData = z.infer<typeof paymentPasswordSchema>;

export default function PaymentStep() {
  const { setCurrentStep, resetSend, recipient, amount } = useSendStore();

  const { addTransaction } = useTransactionsStore();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState<"error" | "success" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidationResult | null>(null);

  const form = useForm<PaymentPasswordFormData>({
    resolver: zodResolver(paymentPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Watch password field for real-time validation
  const watchedPassword = form.watch("password");

  // Update password validation when password changes
  useEffect(() => {
    if (watchedPassword) {
      const { validation } = processPassword(watchedPassword);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation(null);
    }
  }, [watchedPassword]);

  const onSubmit = async (data: PaymentPasswordFormData) => {
    setIsProcessing(true);

    // Process password for validation and trimming
    const { trimmed: trimmedPassword, validation } = processPassword(
      data.password
    );

    console.log("💳 Payment Form Submitted:", {
      passwordStrength: validation.strength,
      recipient: {
        name: recipient.accountName,
        account: recipient.accountNumber,
        bank: recipient.bank,
        country: recipient.country,
      },
      amount: {
        send: amount.sendAmount,
        sendCurrency: amount.sendCurrency,
        receive: amount.receiveAmount,
        receiveCurrency: amount.receiveCurrency,
        fees: amount.fees,
        total: amount.totalAmount,
      },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      formValidation: "passed",
    });

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.3; // 70% success rate

      if (isSuccess) {
        // Create transaction record
        const transaction = {
          id: `txn_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 11)}`,
          date: new Date().toISOString(),
          description: `Transfer to ${recipient.accountName}`,
          amount: parseFloat(amount.sendAmount) || 0,
          currency: amount.sendCurrency as
            | "NGN"
            | "INR"
            | "USD"
            | "EUR"
            | "GBP",
          status: "successful" as const,
          type: "send" as const,
          recipient: recipient.accountName,
          reference: `REF${Date.now()}`,
          icon: "↗",
          iconColor: "#0BAB7C",
        };

        // Add transaction to store
        addTransaction(transaction);

        console.log("✅ Send Transaction Success:", {
          id: transaction.id,
          recipient: transaction.recipient,
          amount: transaction.amount,
          currency: transaction.currency,
          reference: transaction.reference,
          timestamp: new Date().toISOString(),
        });
      } else {
        console.log("❌ Send Transaction Failed:", {
          recipient: recipient.accountName,
          amount: amount.sendAmount,
          currency: amount.sendCurrency,
          timestamp: new Date().toISOString(),
          reason: "Simulated failure for demo",
        });
      }

      setShowModal(isSuccess ? "success" : "error");
    }, 2000);
  };

  const handleBack = () => {
    setCurrentStep("review");
  };

  const handleRetry = () => {
    setShowModal(null);
    form.reset();
  };

  const handleGoToTransactions = () => {
    resetSend();
    router.push("/transactions");
  };

  // Modal close handler for potential future use
  // const handleModalClose = () => {
  //   setShowModal(null);
  // };

  return (
    <>
      <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
            Enter your password
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] mb-2">
            This security check is to keep your account safe
          </p>
          <a
            href="#"
            className="text-[#0BAB7C] text-xs sm:text-sm hover:underline"
          >
            Learn more
          </a>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#4B5563] font-medium">
                    Enter Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-12"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeClosed className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {passwordValidation &&
                    !passwordValidation.isValid &&
                    field.value && (
                      <div className="mt-2 space-y-1">
                        {passwordValidation.errors.map((error, index) => (
                          <p key={index} className="text-red-500 text-xs">
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                </FormItem>
              )}
            />

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="flex-1 py-3 rounded-lg cursor-pointer"
                disabled={isProcessing}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-lg cursor-pointer"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Error Modal */}
      {showModal === "error" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full mx-4 text-center shadow-xl">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-red-500">
              <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
              Your transaction was not successful
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] mb-6 sm:mb-8">
              Please try again
            </p>
            <Button
              onClick={handleRetry}
              className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-xl cursor-pointer min-h-touch"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showModal === "success" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full mx-4 text-center shadow-xl">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-[#0BAB7C]">
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-[#0BAB7C]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
              Your transaction was successful
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] mb-6 sm:mb-8">
              View your transaction history
            </p>
            <Button
              onClick={handleGoToTransactions}
              className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-xl cursor-pointer min-h-touch"
            >
              View transactions
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
