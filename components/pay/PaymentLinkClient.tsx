"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  CreditCard,
  Building2,
  Copy,
  Check,
} from "lucide-react";
import { formatCurrency } from "@/lib/currencies";
import CountdownTimer from "./CountdownTimer";

interface PaymentRequest {
  id: string;
  requestorName: string;
  requestorEmail: string;
  amount: number;
  currency: string;
  description: string;
  status: "pending" | "partially_paid" | "completed" | "expired" | "cancelled";
  amountReceived: number;
  createdAt: string;
  expiresAt?: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
    swiftCode: string;
  };
}

interface PaymentLinkClientProps {
  requestId: string;
}

export default function PaymentLinkClient({
  requestId,
}: PaymentLinkClientProps) {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mock data - in real implementation, this would fetch from API
  useEffect(() => {
    const fetchPaymentRequest = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock payment request data
        const mockRequest: PaymentRequest = {
          id: requestId,
          requestorName: "John Smith",
          requestorEmail: "john.smith@example.com",
          amount: 250.0,
          currency: "USD",
          description: "Freelance web development work - Project Alpha",
          status: "pending",
          amountReceived: 0,
          createdAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(), // 2 days ago
          expiresAt: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toISOString(), // 5 days from now
          bankDetails: {
            accountName: "John Smith",
            accountNumber: "1234567890",
            bankName: "Chase Bank",
            routingNumber: "021000021",
            swiftCode: "CHASUS33",
          },
        };

        setPaymentRequest(mockRequest);
      } catch (err) {
        setError("Failed to load payment request");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentRequest();
  }, [requestId]);

  const handleCopyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
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
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      partially_paid: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      expired: "bg-red-100 text-red-800 border-red-200",
      cancelled: "bg-gray-100 text-gray-800 border-gray-200",
    };

    const labels = {
      pending: "Pending Payment",
      partially_paid: "Partially Paid",
      completed: "Payment Completed",
      expired: "Request Expired",
      cancelled: "Request Cancelled",
    };

    return (
      <Badge
        variant="outline"
        className={
          variants[status as keyof typeof variants] || variants.pending
        }
      >
        {labels[status as keyof typeof labels] || "Unknown"}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0BAB7C] mx-auto mb-4"></div>
          <p className="text-[#4B5563]">Loading payment request...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentRequest) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-[#111827] mb-2">
            Payment Request Not Found
          </h1>
          <p className="text-[#4B5563] mb-6">
            {error ||
              "The payment request you're looking for doesn't exist or has been removed."}
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  const isExpired =
    paymentRequest.expiresAt && new Date(paymentRequest.expiresAt) < new Date();
  const remainingAmount = paymentRequest.amount - paymentRequest.amountReceived;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">
                Payment Request
              </h1>
              <p className="text-[#4B5563] mt-1">
                Complete your payment securely
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(paymentRequest.status)}
              {getStatusBadge(paymentRequest.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Details */}
          <div className="space-y-6">
            {/* Amount Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#0BAB7C]" />
                  Payment Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-[#111827] mb-2">
                    {formatCurrency(remainingAmount, paymentRequest.currency)}
                  </p>
                  {paymentRequest.amountReceived > 0 && (
                    <p className="text-sm text-[#4B5563]">
                      {formatCurrency(
                        paymentRequest.amountReceived,
                        paymentRequest.currency
                      )}{" "}
                      already received
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Request Details */}
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#4B5563]">
                      Description
                    </label>
                    <p className="text-[#111827] mt-1">
                      {paymentRequest.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#4B5563]">
                        Request ID
                      </label>
                      <p className="text-[#111827] font-mono text-sm mt-1">
                        {paymentRequest.id}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#4B5563]">
                        Created
                      </label>
                      <p className="text-[#111827] mt-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(
                          paymentRequest.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  {paymentRequest.expiresAt && !isExpired && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">
                          Time Remaining
                        </span>
                      </div>
                      <CountdownTimer expiresAt={paymentRequest.expiresAt} />
                    </div>
                  )}

                  {isExpired && (
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-800">
                          Request Expired
                        </span>
                      </div>
                      <p className="text-red-700 text-sm mt-1">
                        This payment request expired on{" "}
                        {new Date(
                          paymentRequest.expiresAt!
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Requestor Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0BAB7C]" />
                  Requested by
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0BAB7C] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#111827]">
                      {paymentRequest.requestorName}
                    </p>
                    <p className="text-sm text-[#4B5563]">
                      {paymentRequest.requestorEmail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bank Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#0BAB7C]" />
                  Bank Transfer Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#4B5563] mb-6">
                  Use the following bank details to complete your payment via
                  bank transfer.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      label: "Account Name",
                      value: paymentRequest.bankDetails.accountName,
                      field: "accountName",
                    },
                    {
                      label: "Account Number",
                      value: paymentRequest.bankDetails.accountNumber,
                      field: "accountNumber",
                    },
                    {
                      label: "Bank Name",
                      value: paymentRequest.bankDetails.bankName,
                      field: "bankName",
                    },
                    {
                      label: "Routing Number",
                      value: paymentRequest.bankDetails.routingNumber,
                      field: "routingNumber",
                    },
                    {
                      label: "SWIFT Code",
                      value: paymentRequest.bankDetails.swiftCode,
                      field: "swiftCode",
                    },
                  ].map((detail) => (
                    <div
                      key={detail.field}
                      className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg"
                    >
                      <div>
                        <label className="text-sm font-medium text-[#4B5563]">
                          {detail.label}
                        </label>
                        <p className="text-[#111827] font-mono">
                          {detail.value}
                        </p>
                      </div>
                      <Button
                        onClick={() =>
                          handleCopyToClipboard(detail.value, detail.field)
                        }
                        variant="outline"
                        size="sm"
                        className="ml-2"
                      >
                        {copiedField === detail.field ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Payment Instructions
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Include the Request ID ({paymentRequest.id}) in your
                      transfer reference
                    </li>
                    <li>
                      • Transfer the exact amount:{" "}
                      {formatCurrency(remainingAmount, paymentRequest.currency)}
                    </li>
                    <li>• Allow 1-3 business days for processing</li>
                    <li>
                      • You will receive a confirmation once payment is received
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">
                      Secure Payment
                    </h4>
                    <p className="text-sm text-green-700">
                      This payment request is secured by Paystup. Your bank
                      details are protected and never shared.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
