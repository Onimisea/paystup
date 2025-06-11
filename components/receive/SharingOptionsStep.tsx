"use client";

import { useState, useEffect } from "react";
import { useReceiveStore } from "@/lib/stores/receive-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Link2,
  Mail,
  Copy,
  Check,
  MessageCircle,
  Send as SendIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import EmailInviteList from "./EmailInviteList";
import { formatCurrency } from "@/lib/currencies";

export default function SharingOptionsStep() {
  const {
    requestDetails,
    setCurrentStep,
    updateSharingOptions,
    setCurrentRequestId,
    addPaymentRequest,
  } = useReceiveStore();

  const t = useTranslations("Receive");
  const tCommon = useTranslations("Common");

  const [isCreating, setIsCreating] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);

  // Auto-generate payment link when component mounts
  useEffect(() => {
    if (!paymentLink) {
      generatePaymentRequest();
    }
  }, []);

  // Function to generate payment request automatically
  const generatePaymentRequest = async () => {
    try {
      // Generate mock data
      const requestId = `req_${Date.now()}`;

      // Get current site origin dynamically
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_APP_URL || "https://paystup.com";

      const mockPaymentLink = `${origin}/pay/${requestId}`;

      // Create mock payment request
      const paymentRequest = {
        id: requestId,
        status: "pending" as const,
        amountRequested: parseFloat(requestDetails.amount),
        amountReceived: 0,
        currency: requestDetails.currency,
        description: requestDetails.description,
        createdAt: new Date().toISOString(),
        expiresAt: requestDetails.dueDate
          ? new Date(requestDetails.dueDate).toISOString()
          : undefined,
        payments: [],
        paymentLink: mockPaymentLink,
      };

      // Update store
      setPaymentLink(mockPaymentLink);
      setCurrentRequestId(requestId);
      addPaymentRequest(paymentRequest);

      updateSharingOptions({
        qrCode: "",
        paymentLink: mockPaymentLink,
        emailInvitations: emailList,
        socialSharing: {
          whatsapp: false,
          telegram: false,
          twitter: false,
        },
      });

      console.log("💰 Payment Request Created:", {
        id: requestId,
        amount: requestDetails.amount,
        currency: requestDetails.currency,
        description: requestDetails.description,
        dueDate: requestDetails.dueDate,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to create payment request:", error);
    }
  };

  // Function to proceed to tracking
  const handleProceedToTracking = () => {
    setCurrentStep("tracking");
  };

  const handleCopyLink = async () => {
    if (paymentLink) {
      try {
        await navigator.clipboard.writeText(paymentLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    }
  };

  const handleSocialShare = (platform: string) => {
    if (!paymentLink) return;

    const shareText = `Payment request: ${
      requestDetails.description
    } - ${formatCurrency(
      parseFloat(requestDetails.amount),
      requestDetails.currency
    )}`;

    let shareUrl = "";
    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${shareText}\n${paymentLink}`
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          paymentLink
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(paymentLink)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  const handleBack = () => {
    setCurrentStep("details");
  };

  return (
    <div className="max-w-md mx-auto w-full px-4 sm:px-0">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
          {t("sharing.title")}
        </h1>
        <p className="text-[#4B5563]">{t("sharing.subtitle")}</p>
      </div>

      {/* Request Summary */}
      <div className="bg-[#F9FAFB] rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#4B5563] text-sm">{t("details.amount")}</span>
          <span className="text-[#111827] font-semibold">
            {formatCurrency(
              parseFloat(requestDetails.amount),
              requestDetails.currency
            )}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-[#4B5563] text-sm">
            {t("details.description")}
          </span>
          <span className="text-[#111827] text-sm text-right max-w-[60%]">
            {requestDetails.description}
          </span>
        </div>
        {requestDetails.dueDate && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-[#4B5563] text-sm">
              {t("details.dueDate")}
            </span>
            <span className="text-[#111827] text-sm">
              {new Date(requestDetails.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Payment Link Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Link2 className="w-5 h-5 text-[#0BAB7C]" />
              {t("sharing.paymentLink.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#4B5563] mb-4">
              {t("sharing.paymentLink.description")}
            </p>
            {paymentLink ? (
              <div className="flex gap-2">
                <Input
                  value={paymentLink}
                  readOnly
                  className="text-sm bg-gray-50"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className="min-w-[80px]"
                >
                  {linkCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      {t("sharing.paymentLink.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      {t("sharing.paymentLink.copy")}
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <Link2 className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Payment link will be generated
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Invitations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="w-5 h-5 text-[#0BAB7C]" />
              {t("sharing.email.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#4B5563] mb-4">
              {t("sharing.email.description")}
            </p>
            <EmailInviteList emails={emailList} onEmailsChange={setEmailList} />
          </CardContent>
        </Card>

        {/* Social Sharing (only show if payment link exists) */}
        {paymentLink && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <SendIcon className="w-5 h-5 text-[#0BAB7C]" />
                {t("sharing.social.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => handleSocialShare("whatsapp")}
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-3"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
                <Button
                  onClick={() => handleSocialShare("telegram")}
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-3"
                >
                  <SendIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-xs">Telegram</span>
                </Button>
                <Button
                  onClick={() => handleSocialShare("twitter")}
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-3"
                >
                  <SendIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-xs">Twitter</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full">
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full sm:w-auto sm:flex-1 py-3 rounded-lg cursor-pointer min-h-touch"
          >
            {tCommon("buttons.back")}
          </Button>
          <Button
            onClick={handleProceedToTracking}
            className="w-full sm:w-auto sm:flex-1 bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white font-medium py-3 rounded-lg cursor-pointer min-h-touch"
          >
            {t("tracking.title")}
          </Button>
        </div>
      </div>
    </div>
  );
}
