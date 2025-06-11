import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Center | Paystup",
  description:
    "Get help with your Paystup account and money transfers. Contact our support team via live chat, email, or phone. Find answers to frequently asked questions.",
  keywords: [
    "support",
    "help center",
    "customer service",
    "paystup support",
    "contact us",
    "live chat",
    "FAQ",
    "help",
  ],
  openGraph: {
    title: "Paystup Support Center",
    description: "Get help with your money transfers and account questions",
    type: "website",
  },
};

export default function SupportPage() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "24/7",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: "Response within 2 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM",
    },
  ];

  const faqs = [
    {
      question: "How long does a transfer take?",
      answer:
        "Most transfers are completed within 30 minutes to 3 hours, depending on your plan and destination country.",
    },
    {
      question: "What are the transfer limits?",
      answer:
        "Limits vary by plan: Personal ($1,000), Premium ($10,000), Business (unlimited). You can upgrade anytime.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes, we use bank-level security and all funds are held in regulated financial institutions.",
    },
    {
      question: "Which countries do you support?",
      answer:
        "We currently support transfers to over 50 countries across Africa, Asia, Europe, and the Americas.",
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
            <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600">
              We&apos;re here to help you with any questions
            </p>
          </div>
        </div>

        {/* Support options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {option.description}
                </p>
                <p className="text-xs text-gray-500 mb-4">{option.available}</p>
                <Button className="w-full">{option.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <Button asChild variant="outline">
                <Link href="/support/contact">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
