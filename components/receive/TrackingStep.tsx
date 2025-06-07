"use client";

import { useState, useEffect } from "react";
import { useReceiveStore } from "@/lib/stores/receive-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Share2,
  Download,
  RefreshCw,
  Calendar,
  User,
  CreditCard,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/currencies";
import PaymentStatusCard from "./PaymentStatusCard";

export default function TrackingStep() {
  const {
    currentRequestId,
    activeRequests,
    updatePaymentRequest,
    setCurrentStep,
  } = useReceiveStore();

  const t = useTranslations("Receive");
  const tCommon = useTranslations("Common");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Find current request
  const currentRequest = activeRequests.find(
    (req) => req.id === currentRequestId
  );

  // Mock function to simulate status updates
  const simulateStatusUpdate = () => {
    if (!currentRequest) return;

    // Simulate receiving a payment (for demo purposes)
    const mockPayment = {
      id: `pay_${Date.now()}`,
      amount: Math.min(
        50,
        currentRequest.amountRequested - currentRequest.amountReceived
      ),
      currency: currentRequest.currency,
      paidBy: {
        name: "John Doe",
        email: "john@example.com",
        country: "US",
      },
      paidAt: new Date().toISOString(),
      reference: `REF${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };

    const newAmountReceived =
      currentRequest.amountReceived + mockPayment.amount;
    const newStatus =
      newAmountReceived >= currentRequest.amountRequested
        ? "completed"
        : "partially_paid";

    updatePaymentRequest(currentRequestId, {
      amountReceived: newAmountReceived,
      status: newStatus,
      payments: [...currentRequest.payments, mockPayment],
    });

    if (newStatus === "completed") {
      setTimeout(() => {
        setCurrentStep("completed");
      }, 2000);
    }
  };

  // Auto-refresh simulation
  useEffect(() => {
    if (!currentRequest || currentRequest.status === "completed") return;

    const interval = setInterval(() => {
      // 20% chance of receiving a payment (for demo)
      if (Math.random() < 0.2) {
        simulateStatusUpdate();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [currentRequest]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleCopyLink = async () => {
    if (currentRequest?.paymentLink) {
      try {
        await navigator.clipboard.writeText(currentRequest.paymentLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    }
  };

  const handleShare = () => {
    if (
      currentRequest?.paymentLink &&
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      navigator.share({
        title: "Payment Request",
        text: currentRequest.description,
        url: currentRequest.paymentLink,
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "partially_paid":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "expired":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      partially_paid: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge
        className={
          variants[status as keyof typeof variants] || variants.pending
        }
      >
        {t(`tracking.status.${status}`)}
      </Badge>
    );
  };

  if (!currentRequest) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-[#111827] mb-2">
          No Payment Request Found
        </h3>
        <p className="text-[#4B5563] mb-6">
          Unable to find the payment request details.
        </p>
        <Button
          onClick={() => setCurrentStep("details")}
          className="bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white"
        >
          Create New Request
        </Button>
      </div>
    );
  }

  const progressPercentage =
    (currentRequest.amountReceived / currentRequest.amountRequested) * 100;
  const remainingAmount =
    currentRequest.amountRequested - currentRequest.amountReceived;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
          {t("tracking.title")}
        </h1>
        <p className="text-[#4B5563]">{t("tracking.subtitle")}</p>
      </div>

      <div className="space-y-6">
        {/* Status Overview */}
        <PaymentStatusCard request={currentRequest} />

        {/* Payment Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg">Payment Progress</span>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#4B5563]">
                    {formatCurrency(
                      currentRequest.amountReceived,
                      currentRequest.currency
                    )}{" "}
                    received
                  </span>
                  <span className="text-[#4B5563]">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0BAB7C] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Amount Summary */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#4B5563]">
                    {t("tracking.summary.requested")}
                  </p>
                  <p className="text-lg font-semibold text-[#111827]">
                    {formatCurrency(
                      currentRequest.amountRequested,
                      currentRequest.currency
                    )}
                  </p>
                </div>
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#4B5563]">
                    {t("tracking.summary.remaining")}
                  </p>
                  <p className="text-lg font-semibold text-[#111827]">
                    {formatCurrency(remainingAmount, currentRequest.currency)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4B5563] flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Description
                </span>
                <span className="text-[#111827] font-medium text-right max-w-[60%]">
                  {currentRequest.description}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#4B5563] flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t("tracking.summary.createdAt")}
                </span>
                <span className="text-[#111827]">
                  {new Date(currentRequest.createdAt).toLocaleDateString()}
                </span>
              </div>

              {currentRequest.expiresAt && (
                <div className="flex justify-between items-center">
                  <span className="text-[#4B5563] flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {t("tracking.summary.dueDate")}
                  </span>
                  <span className="text-[#111827]">
                    {new Date(currentRequest.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-[#4B5563]">Status</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(currentRequest.status)}
                  {getStatusBadge(currentRequest.status)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Received Payments */}
        <Card>
          <CardHeader>
            <CardTitle>{t("tracking.payments.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentRequest.payments.length > 0 ? (
              <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
                {currentRequest.payments
                  .sort(
                    (a, b) =>
                      new Date(b.paidAt).getTime() -
                      new Date(a.paidAt).getTime()
                  )
                  .map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">
                            {payment.paidBy.name}
                          </p>
                          <p className="text-sm text-[#4B5563]">
                            {new Date(payment.paidAt).toLocaleDateString()} •{" "}
                            {payment.reference}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          +{formatCurrency(payment.amount, payment.currency)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-[#4B5563]">{t("tracking.payments.empty")}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {linkCopied ? "Link Copied!" : "Copy Link"}
          </Button>

          {typeof navigator !== "undefined" &&
            typeof navigator.share === "function" && (
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                {t("tracking.actions.shareAgain")}
              </Button>
            )}

          <Button
            onClick={() => setCurrentStep("details")}
            className="flex-1 bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white"
          >
            Create New Request
          </Button>
        </div>
      </div>
    </div>
  );
}
