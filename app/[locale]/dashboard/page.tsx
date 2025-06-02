import DashboardClient from "@/components/dashboard/DashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Paystup",
  description:
    "Welcome to your Paystup dashboard. Send money globally, receive transfers, view transaction history, and manage your account settings.",
  keywords: [
    "dashboard",
    "paystup dashboard",
    "money transfer dashboard",
    "send money",
    "receive money",
    "transaction history",
    "account management",
  ],
  openGraph: {
    title: "Paystup Dashboard",
    description: "Manage your money transfers and account settings",
    type: "website",
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
