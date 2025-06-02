import { Metadata } from "next";
import { notFound } from "next/navigation";
import HelpArticleContent from "@/components/help/HelpArticleContent";

// Define valid help article slugs
const validSlugs = [
  "send-money",
  "transfer-times", 
  "supported-countries",
  "fees-and-rates",
  "transfer-delays",
  "security",
  "kyc",
  "account-info",
  "report-problem"
];

// Generate metadata for each help article
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  const getMetadata = (slug: string) => {
    switch (slug) {
      case "send-money":
        return {
          title: "How Do I Send Money? - Help Center - Paystup",
          description: "Learn the step-by-step process for sending money securely and easily using Paystup."
        };
      case "transfer-times":
        return {
          title: "How Long Does a Transfer Take? - Help Center - Paystup", 
          description: "Understanding transfer processing times and what affects delivery speed with Paystup."
        };
      case "supported-countries":
        return {
          title: "Supported Countries - Help Center - Paystup",
          description: "View our comprehensive list of supported countries and regions for money transfers."
        };
      case "fees-and-rates":
        return {
          title: "Fees and Exchange Rates - Help Center - Paystup",
          description: "Transparent pricing information for all your money transfer needs with Paystup."
        };
      case "transfer-delays":
        return {
          title: "Why Was My Transfer Delayed? - Help Center - Paystup",
          description: "Common reasons for transfer delays and how to resolve them quickly."
        };
      case "security":
        return {
          title: "Security Information - Help Center - Paystup", 
          description: "Learn about our comprehensive security measures to protect your data and funds."
        };
      default:
        return {
          title: "Help Center - Paystup",
          description: "Get help with your Paystup account, transfers, and more."
        };
    }
  };

  return getMetadata(slug);
}

// Generate static params for all valid slugs
export function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug: slug,
  }));
}

interface HelpArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params;
  
  // Check if the slug is valid
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return <HelpArticleContent slug={slug} />;
}
