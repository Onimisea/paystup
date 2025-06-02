import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  FileText,
  Users,
  Shield,
  AlertTriangle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Paystup",
  description:
    "Read Paystup's terms of service and user agreement. Understand your rights and responsibilities when using our peer-to-peer money transfer platform.",
  keywords: [
    "terms of service",
    "user agreement",
    "paystup terms",
    "legal terms",
    "service conditions",
    "user responsibilities",
    "platform rules",
  ],
  openGraph: {
    title: "Paystup Terms of Service",
    description:
      "User agreement and terms for using our money transfer platform",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content:
        "By accessing and using Paystup, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      icon: FileText,
      title: "Use License",
      content:
        "Permission is granted to temporarily use Paystup for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.",
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Uses",
      content:
        "You may not use our service for any illegal or unauthorized purpose. You must not transmit any worms or viruses or any code of a destructive nature.",
    },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">
              Terms of Service
            </h1>
            <p className="text-gray-600">Please read these terms carefully</p>
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
              Welcome to Paystup. These Terms of Service (&quot;Terms&quot;)
              govern your use of our peer-to-peer money transfer platform and
              services. By using our services, you agree to these terms. Please
              read them carefully.
            </p>
          </CardContent>
        </Card>

        {/* Terms sections */}
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

        {/* Additional terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Financial Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Paystup provides money transfer services subject to applicable
              laws and regulations. We reserve the right to refuse service,
              terminate accounts, or cancel transactions at our discretion.
            </p>
            <p className="text-gray-700">
              All transactions are subject to our fees and exchange rates, which
              may change without notice. You are responsible for understanding
              all applicable fees before completing a transaction.
            </p>
          </CardContent>
        </Card>

        {/* Contact information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Email:</strong> legal@paystup.com
              </p>
              <p>
                <strong>Address:</strong> Paystup Legal Department, 123
                Financial District, Global City
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
            <Link href="/auth/signup">Back to Signup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
