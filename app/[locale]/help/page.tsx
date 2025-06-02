import { Metadata } from "next";
import HelpCenterClient from "@/components/help/HelpCenterClient";

export const metadata: Metadata = {
  title: "Help Center - Paystup",
  description: "Get help with your Paystup account, transfers, and more. Search our FAQs or contact our support team.",
};

export default function HelpPage() {
  return <HelpCenterClient />;
}
