import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Paystup",
  description:
    "Learn how Paystup's peer-to-peer money transfer platform works. Discover how we use local payments to provide fast, low-cost international transfers.",
  keywords: [
    "how it works",
    "paystup process",
    "p2p transfer",
    "peer to peer",
    "local payments",
    "money transfer process",
    "international transfer",
    "how to send money",
  ],
  openGraph: {
    title: "How Paystup Works",
    description:
      "Learn how our peer-to-peer platform provides fast, low-cost international transfers",
    type: "website",
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Users,
      title: "1. Create Account",
      description: "Sign up and verify your identity in minutes",
    },
    {
      icon: CreditCard,
      title: "2. Add Payment Method",
      description: "Connect your bank account or mobile money",
    },
    {
      icon: ArrowRight,
      title: "3. Send Money",
      description: "Enter recipient details and amount",
    },
    {
      icon: CheckCircle,
      title: "4. Money Delivered",
      description: "Recipient gets money in their local currency",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="outline" size="icon">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              How Paystup Works
            </h1>
            <p className="text-gray-600">
              Simple, fast, and secure money transfers
            </p>
          </div>
        </div>

        {/* How it works steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed explanation */}
        <Card>
          <CardHeader>
            <CardTitle>The Paystup Advantage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Peer-to-Peer Network
              </h3>
              <p className="text-gray-600">
                Instead of using expensive international banking networks,
                Paystup connects you with local payment networks in both
                countries. This means faster transfers and lower fees.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Local Payments</h3>
              <p className="text-gray-600">
                You pay locally in your country, and the recipient receives
                money locally in their country. No international wire transfers
                needed.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Real-time Processing
              </h3>
              <p className="text-gray-600">
                Our platform matches senders and receivers in real-time,
                ensuring your money reaches its destination quickly and
                securely.
              </p>
            </div>

            <div className="pt-4">
              <Button asChild>
                <Link href="/send" className="flex items-center gap-2">
                  Try It Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
