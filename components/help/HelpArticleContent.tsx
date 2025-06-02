"use client";

import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/common/Header";
import AuthFooter from "@/components/layout/AuthFooter";
import EmailSupportModal from "./EmailSupportModal";
import LiveChatWidget from "./LiveChatWidget";

const helpTopics = [
  { title: "Send money", slug: "send-money", isActive: false },
  { title: "Transfer times", slug: "transfer-times", isActive: false },
  { title: "Supported countries", slug: "supported-countries", isActive: false },
  { title: "Fees and rates", slug: "fees-and-rates", isActive: false },
  { title: "Transfer delays", slug: "transfer-delays", isActive: false },
  { title: "Security", slug: "security", isActive: false },
  { title: "Identity (KYC)", slug: "kyc", isActive: false },
  { title: "Change Account Info", slug: "account-info", isActive: false },
  { title: "Report a problem", slug: "report-problem", isActive: false },
];

interface HelpArticleContentProps {
  slug: string;
}

export default function HelpArticleContent({ slug }: HelpArticleContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Update active topic based on current slug
  const topicsWithActive = helpTopics.map(topic => ({
    ...topic,
    isActive: topic.slug === slug
  }));

  // Get article content based on slug
  const getArticleContent = (slug: string) => {
    switch (slug) {
      case "send-money":
        return {
          title: "How Do I Send Money?",
          description: "Learn the step-by-step process for sending money securely and easily using our platform.",
          steps: [
            {
              step: 1,
              title: "Log in to your account",
              description: "Make sure you're signed in with your verified email and password"
            },
            {
              step: 2,
              title: "Click on 'Send Money'",
              description: "You'll find this button on your dashboard or homepage."
            },
            {
              step: 3,
              title: "Enter recipient details",
              description: "Full name, Account number or email, Destination country"
            },
            {
              step: 4,
              title: "Enter transfer amount",
              description: "Specify how much you want to send. The platform will automatically calculate the exchange rate and fees."
            },
            {
              step: 5,
              title: "Review transfer summary",
              description: "Confirm all details including the exchange rate, fee, and delivery time."
            },
            {
              step: 6,
              title: "Transfer to the company account",
              description: "You'll be shown a company account number to transfer the exact amount to."
            },
            {
              step: 7,
              title: "Enter your transaction password",
              description: "This is a final layer of security to confirm your transaction."
            },
            {
              step: 8,
              title: "Done!",
              description: "You and the recipient will receive a confirmation once the money has been sent."
            }
          ],
          tips: [
            "Double-check recipient details to avoid failed transactions",
            "Always ensure you're using your verified bank account to make the transfer",
            "For large transfers, consider contacting support for quicker processing"
          ],
          relatedArticles: [
            { title: "How do I get a password?", slug: "password-help" },
            { title: "What is my transaction password?", slug: "transaction-password" }
          ]
        };

      case "transfer-times":
        return {
          title: "How Long Does a Transfer Take?",
          description: "Understanding transfer processing times and what affects delivery speed.",
          steps: [
            {
              step: 1,
              title: "Instant Transfers",
              description: "Most transfers within the same country are processed instantly during business hours."
            },
            {
              step: 2,
              title: "International Transfers",
              description: "Cross-border transfers typically take 30 minutes to 3 hours depending on the destination."
            },
            {
              step: 3,
              title: "Bank Processing Times",
              description: "Some banks may take additional time to process incoming transfers, especially during weekends."
            },
            {
              step: 4,
              title: "Verification Delays",
              description: "First-time transfers or large amounts may require additional verification, adding 1-24 hours."
            }
          ],
          tips: [
            "Transfers sent during business hours are typically faster",
            "Weekend transfers may experience slight delays",
            "Complete your KYC verification to avoid processing delays"
          ],
          relatedArticles: [
            { title: "Why was my transfer delayed?", slug: "transfer-delays" },
            { title: "How to track my transfer", slug: "track-transfer" }
          ]
        };

      case "supported-countries":
        return {
          title: "What Countries Can I Send Money To?",
          description: "View our comprehensive list of supported countries and regions for money transfers.",
          steps: [
            {
              step: 1,
              title: "Africa",
              description: "Nigeria, Kenya, Ghana, South Africa, Uganda, Tanzania, Rwanda, and 15+ more countries."
            },
            {
              step: 2,
              title: "Asia",
              description: "India, Philippines, Bangladesh, Pakistan, Sri Lanka, Nepal, and other major destinations."
            },
            {
              step: 3,
              title: "Europe",
              description: "United Kingdom, France, Germany, Spain, Italy, and most EU countries."
            },
            {
              step: 4,
              title: "Americas",
              description: "United States, Canada, Mexico, Brazil, and other Latin American countries."
            }
          ],
          tips: [
            "New countries are added regularly - check back for updates",
            "Some countries may have specific requirements or limits",
            "Contact support if your destination country isn't listed"
          ],
          relatedArticles: [
            { title: "Country-specific requirements", slug: "country-requirements" },
            { title: "Currency availability", slug: "currencies" }
          ]
        };

      case "fees-and-rates":
        return {
          title: "What Are the Fees and Exchange Rates?",
          description: "Transparent pricing information for all your money transfer needs.",
          steps: [
            {
              step: 1,
              title: "Transfer Fees",
              description: "Our fees start from as low as $2.99 for transfers up to $500, with competitive rates for larger amounts."
            },
            {
              step: 2,
              title: "Exchange Rates",
              description: "We offer real-time exchange rates with a small margin to ensure competitive pricing."
            },
            {
              step: 3,
              title: "No Hidden Charges",
              description: "All fees are displayed upfront before you confirm your transfer - no surprises."
            },
            {
              step: 4,
              title: "Premium Plans",
              description: "Upgrade to Premium or Business plans for reduced fees and better exchange rates."
            }
          ],
          tips: [
            "Compare our rates with traditional banks to see your savings",
            "Larger transfers often have better rate margins",
            "Premium members get exclusive rate discounts"
          ],
          relatedArticles: [
            { title: "How to upgrade your plan", slug: "upgrade-plan" },
            { title: "Fee calculator", slug: "fee-calculator" }
          ]
        };

      case "transfer-delays":
        return {
          title: "Why Was My Transfer Delayed?",
          description: "Common reasons for transfer delays and how to resolve them quickly.",
          steps: [
            {
              step: 1,
              title: "Verification Required",
              description: "Your account or transfer may need additional verification for security purposes."
            },
            {
              step: 2,
              title: "Bank Processing",
              description: "The receiving bank may be experiencing delays or require additional processing time."
            },
            {
              step: 3,
              title: "Compliance Checks",
              description: "Large transfers or certain destinations may trigger additional security checks."
            },
            {
              step: 4,
              title: "Technical Issues",
              description: "Rare technical problems with payment networks can cause temporary delays."
            }
          ],
          tips: [
            "Complete your profile and KYC verification to minimize delays",
            "Ensure all recipient details are accurate and complete",
            "Contact support if your transfer is delayed more than expected"
          ],
          relatedArticles: [
            { title: "How to complete KYC verification", slug: "kyc-verification" },
            { title: "Transfer status tracking", slug: "track-transfer" }
          ]
        };

      case "security":
        return {
          title: "How Secure Is My Information?",
          description: "Learn about our comprehensive security measures to protect your data and funds.",
          steps: [
            {
              step: 1,
              title: "Bank-Level Encryption",
              description: "All data is encrypted using 256-bit SSL encryption, the same standard used by major banks."
            },
            {
              step: 2,
              title: "Regulatory Compliance",
              description: "We're licensed and regulated by financial authorities in all countries where we operate."
            },
            {
              step: 3,
              title: "Fraud Protection",
              description: "Advanced AI monitors all transactions for suspicious activity and fraud prevention."
            },
            {
              step: 4,
              title: "Secure Storage",
              description: "Your funds are held in segregated accounts with tier-1 financial institutions."
            }
          ],
          tips: [
            "Never share your login credentials with anyone",
            "Enable two-factor authentication for extra security",
            "Report any suspicious activity immediately"
          ],
          relatedArticles: [
            { title: "How to enable 2FA", slug: "two-factor-auth" },
            { title: "Privacy policy", slug: "privacy-policy" }
          ]
        };

      default:
        return {
          title: "Help Article Not Found",
          description: "The requested help article could not be found.",
          steps: [],
          tips: [],
          relatedArticles: []
        };
    }
  };

  const articleContent = getArticleContent(slug);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              {/* Back Button */}
              <Link
                href="/help"
                className="flex items-center gap-2 text-[#4B5563] hover:text-[#0BAB7C] mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </Link>

              {/* Topics Sidebar */}
              <div className="bg-white rounded-lg border border-gray-100 p-4">
                <h3 className="font-semibold text-[#111827] mb-4">Topics</h3>
                <nav className="space-y-1">
                  {topicsWithActive.map((topic, index) => (
                    <Link
                      key={index}
                      href={`/help/${topic.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        topic.isActive
                          ? "bg-[#0BAB7C] text-white font-medium"
                          : "text-[#4B5563] hover:bg-gray-50 hover:text-[#0BAB7C]"
                      }`}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#111827] mb-2">Need a hand?</h1>
                <p className="text-[#4B5563] mb-6">Search our FAQs or get personal support</p>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4B5563]" />
                  <Input
                    type="text"
                    placeholder="Tell us what you are looking for"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-3 bg-white border-gray-200 focus:border-[#0BAB7C] focus:ring-[#0BAB7C] text-base"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0BAB7C] hover:bg-[#0BAB7C]/90 text-white px-4"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-white rounded-lg border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-[#111827] mb-4">{articleContent.title}</h2>
                <p className="text-[#4B5563] mb-6">{articleContent.description}</p>

                {articleContent.steps.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-[#111827] mb-4">{articleContent.title}</h3>

                    {/* Steps */}
                    <div className="space-y-6 mb-8">
                      {articleContent.steps.map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#0BAB7C] text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-medium text-[#111827] mb-1">{item.title}</h4>
                            <p className="text-[#4B5563] text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Tips Section */}
                {articleContent.tips.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h4 className="font-semibold text-[#111827] mb-3">Tips:</h4>
                    <ul className="space-y-2">
                      {articleContent.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-[#4B5563] text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Articles */}
                {articleContent.relatedArticles.length > 0 && (
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-semibold text-[#111827] mb-4">Related Articles:</h4>
                    <ul className="space-y-2">
                      {articleContent.relatedArticles.map((article, index) => (
                        <li key={index}>
                          <Link
                            href={`/help/${article.slug}`}
                            className="text-[#0BAB7C] hover:text-[#059669] text-sm underline transition-colors"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Support Actions */}
                <div className="border-t border-gray-100 pt-6 mt-8">
                  <p className="text-[#4B5563] text-sm mb-4">
                    Was this article helpful? If you need more assistance, feel free to contact our support team.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setIsChatOpen(true)}
                      variant="outline"
                      className="border-[#0BAB7C] text-[#0BAB7C] hover:bg-[#0BAB7C] hover:text-white"
                    >
                      Start Live Chat
                    </Button>
                    <Button
                      onClick={() => setIsEmailModalOpen(true)}
                      className="bg-[#0BAB7C] hover:bg-[#059669] text-white"
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <AuthFooter />

        {/* Email Support Modal */}
        <EmailSupportModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
        />

        {/* Live Chat Widget */}
        <LiveChatWidget
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </AuthGuard>
  );
}
