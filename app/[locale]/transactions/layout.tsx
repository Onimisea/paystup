import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions - Paystup",
  description: "View and manage your transaction history with Paystup. Track your money transfers, conversions, and payment activities.",
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
