"use client";

import { useReceiveStore } from "@/lib/stores/receive-store";
import { useTransactionsStore } from "@/lib/stores/transactions-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Download,
  Plus,
  Receipt,
  Calendar,
  User,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/currencies";
import { useRouter } from "next/navigation";

export default function CompletionStep() {
  const { currentRequestId, activeRequests, resetReceive, setCurrentStep } =
    useReceiveStore();

  const { addTransaction } = useTransactionsStore();
  const router = useRouter();

  const t = useTranslations("Receive");
  const tCommon = useTranslations("Common");

  // Find completed request
  const completedRequest = activeRequests.find(
    (req) => req.id === currentRequestId
  );

  const handleNewRequest = () => {
    resetReceive();
    setCurrentStep("details");
  };

  const handleViewTransactions = () => {
    // Add completed request to transactions store
    if (completedRequest) {
      const transaction = {
        id: `txn_${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        description: `Received: ${completedRequest.description}`,
        amount: completedRequest.amountReceived,
        currency: completedRequest.currency as any,
        status: "successful" as const,
        type: "receive" as const,
        reference: completedRequest.id,
        icon: "💰",
        iconColor: "text-green-600",
      };

      addTransaction(transaction);
    }

    router.push("/transactions");
  };

  const handleDownloadReceipt = () => {
    if (!completedRequest) return;

    // Create a simple receipt content
    const receiptContent = `
PAYMENT RECEIPT
===============

Request ID: ${completedRequest.id}
Description: ${completedRequest.description}
Amount Requested: ${formatCurrency(
      completedRequest.amountRequested,
      completedRequest.currency
    )}
Amount Received: ${formatCurrency(
      completedRequest.amountReceived,
      completedRequest.currency
    )}
Status: Completed
Date: ${new Date(completedRequest.createdAt).toLocaleDateString()}

PAYMENTS RECEIVED:
${completedRequest.payments
  .map(
    (payment) =>
      `- ${payment.paidBy.name}: ${formatCurrency(
        payment.amount,
        payment.currency
      )} (${new Date(payment.paidAt).toLocaleDateString()})`
  )
  .join("\n")}

Thank you for using Paystup!
    `.trim();

    // Create and download the receipt
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `paystup-receipt-${completedRequest.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!completedRequest) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-[#111827] mb-2">
          No Completed Request Found
        </h3>
        <p className="text-[#4B5563] mb-6">
          Unable to find the completed payment request.
        </p>
        <Button
          onClick={handleNewRequest}
          className="bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white"
        >
          Create New Request
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-0">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-2">
          {t("completed.title")}
        </h1>
        <p className="text-[#4B5563] text-lg">{t("completed.subtitle")}</p>
      </div>

      <div className="space-y-6">
        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              {t("completed.summary")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Amount Display */}
              <div className="text-center py-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600 mb-1">
                  {formatCurrency(
                    completedRequest.amountReceived,
                    completedRequest.currency
                  )}
                </p>
                <p className="text-sm text-green-700">
                  Payment Received Successfully
                </p>
              </div>

              {/* Request Details */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-[#4B5563]">Description</span>
                  <span className="text-[#111827] font-medium text-right max-w-[60%]">
                    {completedRequest.description}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#4B5563]">Request ID</span>
                  <span className="text-[#111827] font-mono text-sm">
                    {completedRequest.id}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#4B5563] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Completed Date
                  </span>
                  <span className="text-[#111827]">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#4B5563]">Total Payments</span>
                  <span className="text-[#111827] font-medium">
                    {completedRequest.payments.length} payment
                    {completedRequest.payments.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#0BAB7C]" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
              {completedRequest.payments
                .sort(
                  (a, b) =>
                    new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
                )
                .map((payment, index) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#111827]">
                          {payment.paidBy.name}
                        </p>
                        <p className="text-sm text-[#4B5563]">
                          {new Date(payment.paidAt).toLocaleDateString()} •{" "}
                          {payment.reference}
                        </p>
                        {payment.paidBy.email && (
                          <p className="text-xs text-[#808080]">
                            {payment.paidBy.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600 text-lg">
                        +{formatCurrency(payment.amount, payment.currency)}
                      </p>
                      <p className="text-xs text-[#4B5563]">
                        Payment #{index + 1}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-3 min-h-touch"
          >
            <Download className="w-4 h-4" />
            {t("tracking.actions.downloadReceipt")}
          </Button>

          <Button
            onClick={handleViewTransactions}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-3 min-h-touch"
          >
            <Receipt className="w-4 h-4" />
            {t("completed.viewTransactions")}
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleNewRequest}
            className="w-full bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white flex items-center justify-center gap-2 py-3 min-h-touch"
          >
            <Plus className="w-4 h-4" />
            {t("completed.newRequest")}
          </Button>
        </div>

        {/* Success Message */}
        <div className="text-center py-6 bg-green-50 rounded-lg">
          <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-3" />
          <h3 className="font-semibold text-green-800 mb-2">
            Payment Request Completed Successfully!
          </h3>
          <p className="text-sm text-green-700">
            All requested funds have been received. You can now create a new
            payment request or view your transaction history.
          </p>
        </div>
      </div>
    </div>
  );
}
