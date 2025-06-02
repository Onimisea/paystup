import LoginClient from "@/components/auth/LoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Paystup",
  description:
    "Sign in to your Paystup account to send and receive money globally with low fees. Secure peer-to-peer money transfers using local payments.",
  keywords: [
    "login",
    "sign in",
    "paystup",
    "money transfer",
    "remittance",
    "p2p payments",
    "international transfer",
  ],
  openGraph: {
    title: "Sign In to Paystup",
    description:
      "Access your Paystup account to send money globally with low fees",
    type: "website",
  },
};

export default function SignInPage() {
  return <LoginClient />;
}
