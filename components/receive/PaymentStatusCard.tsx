"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  TrendingUp,
  Calendar
} from "lucide-react";
import { PaymentRequestStatus } from "@/lib/stores/receive-store";
import { formatCurrency } from "@/lib/currencies";
import { useTranslations } from "next-intl";

interface PaymentStatusCardProps {
  request: PaymentRequestStatus;
  className?: string;
}

export default function PaymentStatusCard({ 
  request, 
  className = "" 
}: PaymentStatusCardProps) {
  const t = useTranslations("Receive");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'partially_paid':
        return <AlertCircle className="w-6 h-6 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'expired':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-gray-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
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

    return (
      <Badge 
        variant="outline" 
        className={variants[status as keyof typeof variants] || variants.pending}
      >
        {t(`tracking.status.${status}`)}
      </Badge>
    );
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return "Waiting for payment from recipients";
      case 'partially_paid':
        return "Partial payment received, waiting for remaining amount";
      case 'completed':
        return "Payment request completed successfully";
      case 'expired':
        return "Payment request has expired";
      case 'cancelled':
        return "Payment request was cancelled";
      default:
        return "Payment request status unknown";
    }
  };

  const getCardBorderColor = (status: string) => {
    switch (status) {
      case 'pending':
        return "border-l-yellow-500";
      case 'partially_paid':
        return "border-l-blue-500";
      case 'completed':
        return "border-l-green-500";
      case 'expired':
        return "border-l-red-500";
      case 'cancelled':
        return "border-l-gray-500";
      default:
        return "border-l-gray-300";
    }
  };

  const progressPercentage = (request.amountReceived / request.amountRequested) * 100;
  const isExpiringSoon = request.expiresAt && 
    new Date(request.expiresAt).getTime() - Date.now() < 24 * 60 * 60 * 1000; // 24 hours

  return (
    <Card className={`border-l-4 ${getCardBorderColor(request.status)} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon(request.status)}
            <div>
              <h3 className="text-lg font-semibold text-[#111827]">
                Payment Request
              </h3>
              <p className="text-sm text-[#4B5563] font-normal">
                {getStatusMessage(request.status)}
              </p>
            </div>
          </CardTitle>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Amount Display */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#111827]">
                {formatCurrency(request.amountReceived, request.currency)}
              </p>
              <p className="text-sm text-[#4B5563]">
                of {formatCurrency(request.amountRequested, request.currency)} requested
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-[#0BAB7C]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <p className="text-xs text-[#4B5563]">
                {request.payments.length} payment{request.payments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  request.status === 'completed' 
                    ? 'bg-green-500' 
                    : request.status === 'partially_paid'
                    ? 'bg-blue-500'
                    : 'bg-[#0BAB7C]'
                }`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Expiry Warning */}
          {isExpiringSoon && request.status === 'pending' && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Expires Soon
                </p>
                <p className="text-xs text-yellow-700">
                  This request expires on {new Date(request.expiresAt!).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* Request Info */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-[#4B5563] uppercase tracking-wide">
                Request ID
              </p>
              <p className="text-sm font-mono text-[#111827]">
                {request.id.slice(-8)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#4B5563] uppercase tracking-wide">
                Created
              </p>
              <p className="text-sm text-[#111827] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
