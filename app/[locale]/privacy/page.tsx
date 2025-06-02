import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Paystup",
  description:
    "Learn how Paystup protects and handles your personal data. Our comprehensive privacy policy explains data collection, usage, security measures, and your rights.",
  keywords: [
    "privacy policy",
    "data protection",
    "paystup privacy",
    "personal data",
    "data security",
    "user privacy",
    "GDPR compliance",
  ],
  openGraph: {
    title: "Paystup Privacy Policy",
    description: "How we protect and handle your personal data",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you create an account, make a transaction, or contact us for support. This includes your name, email address, phone number, and financial information necessary for money transfers.",
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content:
        "We use your information to provide our money transfer services, verify your identity, prevent fraud, comply with legal requirements, and improve our services. We never sell your personal information to third parties.",
    },
    {
      icon: Lock,
      title: "Data Security",
      content:
        "We implement industry-standard security measures including encryption, secure servers, and regular security audits. Your financial data is protected with bank-level security protocols.",
    },
    {
      icon: Shield,
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. You can also opt out of marketing communications and request a copy of your data at any time.",
    },
  ];

  return (
    <div className="min-h-screen page-bg">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="outline" size="icon">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold heading-color">Privacy Policy</h1>
            <p className="text-gray-600">How we protect and handle your data</p>
          </div>
        </div>

        {/* Last updated */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Last updated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">
              At Paystup, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our peer-to-peer money transfer platform.
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              application.
            </p>
          </CardContent>
        </Card>

        {/* Privacy sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Email:</strong> privacy@paystup.com
              </p>
              <p>
                <strong>Address:</strong> Paystup Privacy Office, 123 Financial
                District, Global City
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to auth */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
