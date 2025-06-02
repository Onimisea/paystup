import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Wallet } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Receive Money | Paystup",
  description:
    "Set up your Paystup account to receive money transfers from anywhere in the world. Connect your bank account or mobile money for easy payouts.",
  keywords: [
    "receive money",
    "money transfer",
    "receive payments",
    "international transfer",
    "bank account",
    "mobile money",
    "paystup receive",
    "payout",
  ],
  openGraph: {
    title: "Receive Money - Paystup",
    description:
      "Set up your account to receive money transfers from anywhere in the world",
    type: "website",
  },
};

export default function ReceiveMoneyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="outline" size="icon">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Receive Money</h1>
            <p className="text-gray-600">
              Set up your account to receive transfers
            </p>
          </div>
        </div>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Receive Money Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                This is where users will set up their receiving preferences.
              </p>
              <p className="text-sm text-gray-500">
                Coming soon: Bank account setup, mobile money integration, and
                payout preferences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
