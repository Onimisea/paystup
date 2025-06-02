
import SignupClient from "@/components/auth/SignupClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Paystup",
  description:
    "Join thousands sending money globally with Paystup. Create your free account to start transferring money internationally with low fees and fast delivery.",
  keywords: [
    "signup",
    "create account",
    "register",
    "paystup",
    "money transfer",
    "remittance",
    "p2p payments",
    "international transfer",
    "send money",
    "low fees",
  ],
  openGraph: {
    title: "Create Your Paystup Account",
    description:
      "Join thousands sending money globally with low fees and fast delivery",
    type: "website",
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
