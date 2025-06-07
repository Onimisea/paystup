import { Metadata } from "next";
import PaymentLinkClient from "@/components/pay/PaymentLinkClient";

interface PaymentPageProps {
  params: Promise<{
    locale: string;
    requestId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Payment Request - Paystup",
  description: "Complete your payment request securely with Paystup",
  keywords: [
    "payment request",
    "pay money",
    "secure payment",
    "international transfer",
    "paystup payment",
  ],
  openGraph: {
    title: "Payment Request - Paystup",
    description: "Complete your payment request securely",
    type: "website",
  },
};

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { requestId } = await params;
  return <PaymentLinkClient requestId={requestId} />;
}
