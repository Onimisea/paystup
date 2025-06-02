import { Metadata } from "next";
import KYCSuccessClient from "@/components/kyc/KYCSuccessClient";

export const metadata: Metadata = {
  title: "KYC Verification Complete | Paystup",
  description: "Your identity verification has been completed successfully. Welcome to Paystup!",
};

export default function KYCSuccessPage() {
  return <KYCSuccessClient />;
}
