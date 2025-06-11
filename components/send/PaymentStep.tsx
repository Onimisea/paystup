"use client";

import { useState } from "react";
import { useSendStore } from "@/lib/stores/send-store";
import { useTransactionsStore } from "@/lib/stores/transactions-store";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  X,
  Building2,
  CreditCard,
  Hash,
  User,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Paystup account details for transfers
const PAYSTUP_ACCOUNT_DETAILS = {
  bankName: "First Bank of Nigeria",
  accountNumber: "3012345678",
  accountName: "Paystup Limited",
  sortCode: "011",
  routingNumber: "011152303",
};

export default function PaymentStep() {
  const { setCurrentStep, resetSend, recipient, amount } = useSendStore();
  const { addTransaction } = useTransactionsStore();
  const router = useRouter();

  const t = useTranslations("Send");
  const tCommon = useTranslations("Common");

  const [showModal, setShowModal] = useState<"error" | "success" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Generate transaction reference
  const transactionReference = `PAY${Date.now()
    .toString()
    .slice(-8)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

  // Copy to clipboard function
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Handle transfer completion confirmation
  const handleTransferCompleted = async () => {
    setIsProcessing(true);

    console.log("💳 Transfer Completion Confirmed:", {
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
      paystupAccount: PAYSTUP_ACCOUNT_DETAILS,
      reference: transactionReference,
      timestamp: new Date().toISOString(),
    });

    // Simulate transfer verification processing
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.2; // 80% success rate

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
          reference: transactionReference,
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
          reference: transactionReference,
          timestamp: new Date().toISOString(),
          reason: "Transfer verification failed",
        });
      }

      setShowModal(isSuccess ? "success" : "error");
    }, 3000);
  };

  const handleBack = () => {
    setCurrentStep("review");
  };

  const handleRetry = () => {
    setShowModal(null);
  };

  const handleGoToTransactions = () => {
    resetSend();
    router.push("/transactions");
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
            Complete Your Transfer
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563] mb-2">
            Transfer the exact amount to the Paystup account below
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#0BAB7C]">
            <AlertCircle className="w-4 h-4" />
            <span>Your bank account must be linked to your BVN</span>
          </div>
        </div>

        {/* Transfer Amount */}
        <div className="md:bg-white rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-[#4B5563] mb-1">
              Total Amount to Transfer
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-[#111827]">
              {amount.sendCurrency} {amount.totalAmount.toLocaleString()}
            </p>

            {/* Amount Breakdown */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[#4B5563]">Send Amount:</span>
                  <span className="font-medium text-[#111827]">
                    {amount.sendCurrency}{" "}
                    {parseFloat(amount.sendAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#4B5563]">Paystup Fees:</span>
                  <span className="font-medium text-[#111827]">
                    {amount.sendCurrency} {amount.fees.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="font-medium text-[#111827]">Total:</span>
                  <span className="font-bold text-[#0BAB7C]">
                    {amount.sendCurrency} {amount.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Paystup Account Details */}
        <div className="md:bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#0BAB7C]" />
            <h2 className="text-lg font-semibold text-[#111827]">
              Transfer to Paystup Account
            </h2>
          </div>

          <div className="space-y-4">
            {/* Bank Name */}
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#4B5563]" />
                <div>
                  <p className="text-xs text-[#4B5563]">Bank Name</p>
                  <p className="font-medium text-[#111827]">
                    {PAYSTUP_ACCOUNT_DETAILS.bankName}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Number */}
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-[#4B5563]" />
                <div>
                  <p className="text-xs text-[#4B5563]">Account Number</p>
                  <p className="font-medium text-[#111827]">
                    {PAYSTUP_ACCOUNT_DETAILS.accountNumber}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    PAYSTUP_ACCOUNT_DETAILS.accountNumber,
                    "accountNumber"
                  )
                }
                className="h-8 px-3"
              >
                {copiedField === "accountNumber" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Account Name */}
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#4B5563]" />
                <div>
                  <p className="text-xs text-[#4B5563]">Account Name</p>
                  <p className="font-medium text-[#111827]">
                    {PAYSTUP_ACCOUNT_DETAILS.accountName}
                  </p>
                </div>
              </div>
            </div>

            {/* Sort Code */}
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-[#4B5563]" />
                <div>
                  <p className="text-xs text-[#4B5563]">Sort Code</p>
                  <p className="font-medium text-[#111827]">
                    {PAYSTUP_ACCOUNT_DETAILS.sortCode}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(PAYSTUP_ACCOUNT_DETAILS.sortCode, "sortCode")
                }
                className="h-8 px-3"
              >
                {copiedField === "sortCode" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Transaction Reference */}
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-[#4B5563]" />
                <div>
                  <p className="text-xs text-[#4B5563]">Reference/Memo</p>
                  <p className="font-medium text-[#111827]">
                    {transactionReference}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(transactionReference, "reference")
                }
                className="h-8 px-3"
              >
                {copiedField === "reference" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Transfer Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-[#111827] mb-3">
            Transfer Instructions
          </h3>
          <ol className="space-y-2 text-sm text-[#4B5563]">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-[#0BAB7C] text-white rounded-full flex items-center justify-center text-xs font-medium">
                1
              </span>
              <span>Open your banking app or visit your bank</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-[#0BAB7C] text-white rounded-full flex items-center justify-center text-xs font-medium">
                2
              </span>
              <span>
                Transfer the total amount ({amount.sendCurrency}{" "}
                {amount.totalAmount.toLocaleString()}) which includes your send
                amount plus Paystup fees
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-[#0BAB7C] text-white rounded-full flex items-center justify-center text-xs font-medium">
                3
              </span>
              <span>
                Include the reference number:{" "}
                <strong>{transactionReference}</strong>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-[#0BAB7C] text-white rounded-full flex items-center justify-center text-xs font-medium">
                4
              </span>
              <span>
                Click "Transfer Completed" below once your transfer is
                successful
              </span>
            </li>
          </ol>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">
                Important Requirements
              </p>
              <ul className="text-yellow-700 space-y-1">
                <li>
                  • Your bank account must be linked to your BVN (Bank
                  Verification Number)
                </li>
                <li>• Transfer must be made from your registered account</li>
                <li>• Include the exact reference number for tracking</li>
                <li>
                  • Transfer the exact total amount ({amount.sendCurrency}{" "}
                  {amount.totalAmount.toLocaleString()}) including fees
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={handleBack}
            variant="outline"
            className="flex-1 py-3 rounded-lg cursor-pointer"
            disabled={isProcessing}
          >
            {tCommon("buttons.back")}
          </Button>
          <Button
            onClick={handleTransferCompleted}
            className="flex-1 bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-lg cursor-pointer"
            disabled={isProcessing}
          >
            {isProcessing ? "Verifying Transfer..." : "Transfer Completed"}
          </Button>
        </div>
      </div>

      {/* Error Modal */}
      {showModal === "error" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full mx-4 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-red-500">
              <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
              Transfer Verification Failed
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] mb-6 sm:mb-8">
              We couldn't verify your transfer. Please check your transfer
              details and try again.
            </p>
            <Button
              onClick={handleRetry}
              className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-xl cursor-pointer min-h-touch"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showModal === "success" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-sm w-full mx-4 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 border-[#0BAB7C]">
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-[#0BAB7C]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
              Transfer Successful!
            </h3>
            <p className="text-sm sm:text-base text-[#4B5563] mb-6 sm:mb-8">
              Your money transfer has been processed successfully. The recipient
              will receive the funds shortly.
            </p>
            <Button
              onClick={handleGoToTransactions}
              className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-xl cursor-pointer min-h-touch"
            >
              View Transactions
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
