import Hero from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paystup - Send Money Globally with Low Fees",
  description:
    "Send money internationally using local payments with Paystup. Our peer-to-peer platform offers low fees, fast transfers, and bank-level security. Skip expensive international banking fees.",
  keywords: [
    "money transfer",
    "international transfer",
    "remittance",
    "p2p payments",
    "send money",
    "low fees",
    "paystup",
    "global payments",
    "peer to peer",
    "local payments",
  ],
  openGraph: {
    title: "Paystup - Send Money Globally with Low Fees",
    description:
      "Skip expensive international banking fees. Send money using local payments in both countries.",
    type: "website",
  },
};

export default function HomePage() {
  return <Hero />;
}
