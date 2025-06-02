import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Check, DollarSign } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Paystup",
  description:
    "Transparent, low-cost pricing for international money transfers. Compare our Personal, Premium, and Business plans. Save up to 90% compared to traditional banks.",
  keywords: [
    "pricing",
    "transfer fees",
    "money transfer cost",
    "low fees",
    "paystup pricing",
    "international transfer rates",
    "remittance fees",
    "compare prices",
  ],
  openGraph: {
    title: "Paystup Pricing - Low-Cost International Transfers",
    description:
      "Save up to 90% on transfer fees compared to traditional banks",
    type: "website",
  },
};

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Personal",
      price: "1.5%",
      description:
        "Perfect for individuals sending money to family and friends",
      features: [
        "Transfers up to $1,000",
        "Standard processing (1-3 hours)",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      name: "Premium",
      price: "1.0%",
      description: "Best for frequent senders with higher transfer amounts",
      features: [
        "Transfers up to $10,000",
        "Priority processing (30 minutes)",
        "24/7 phone support",
        "Rate alerts",
        "Transaction history",
      ],
      popular: true,
    },
    {
      name: "Business",
      price: "0.5%",
      description:
        "Designed for businesses with regular international payments",
      features: [
        "Unlimited transfer amounts",
        "Instant processing",
        "Dedicated account manager",
        "API access",
        "Bulk transfers",
        "Custom reporting",
      ],
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
            <h1 className="text-3xl font-bold text-gray-900">Pricing</h1>
            <p className="text-gray-600">
              Transparent, low-cost international transfers
            </p>
          </div>
        </div>

        {/* Pricing comparison */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Save up to 90% compared to traditional banks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our peer-to-peer model eliminates expensive intermediary banks,
            passing the savings directly to you.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${
                tier.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-1">
                  {tier.price}
                  <span className="text-sm text-gray-500 font-normal">fee</span>
                </div>
                <p className="text-gray-600 text-sm">{tier.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Fee Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Calculate exactly how much you&apos;ll save with Paystup
              </p>
              <p className="text-sm text-gray-500">
                Coming soon: Interactive fee calculator to compare costs with
                traditional providers
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
