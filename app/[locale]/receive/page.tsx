import { Metadata } from "next";
import ReceiveClient from "@/components/receive/ReceiveClient";

export const metadata: Metadata = {
  title: "Request Money - Paystup",
  description:
    "Create payment requests and receive money from friends and family worldwide with Paystup",
  keywords: [
    "request money",
    "payment request",
    "receive money",
    "international transfer",
    "QR code payment",
    "payment link",
    "paystup receive",
    "money request",
  ],
  openGraph: {
    title: "Request Money - Paystup",
    description:
      "Create payment requests and receive money from anywhere in the world",
    type: "website",
  },
};

export default function ReceivePage() {
  return <ReceiveClient />;
}
