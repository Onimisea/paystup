import { Metadata } from "next";
import KYCClient from "@/components/kyc/KYCClient";

export const metadata: Metadata = {
  title: "KYC Verification | Paystup",
  description: "Complete your identity verification to unlock full access to Paystup services",
};

export default function KYCPage() {
  return <KYCClient />;
}
