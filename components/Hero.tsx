"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Shield,
  Zap,
  DollarSign,
  Globe,
  Send,
  Wallet,
  HelpCircle,
  CreditCard,
  Users,
  Menu,
  X,
} from "lucide-react";

export default function Hero() {
  const t = useTranslations("HomePage");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const features = [
    {
      icon: DollarSign,
      title: t("features.items.lowFees.title"),
      description: t("features.items.lowFees.description"),
    },
    {
      icon: Zap,
      title: t("features.items.fastTransfers.title"),
      description: t("features.items.fastTransfers.description"),
    },
    {
      icon: Shield,
      title: t("features.items.secure.title"),
      description: t("features.items.secure.description"),
    },
    {
      icon: Globe,
      title: t("features.items.global.title"),
      description: t("features.items.global.description"),
    },
  ];

  const navigationLinks = [
    {
      href: "/send",
      label: t("navigation.sendMoney"),
      icon: Send,
      variant: "default" as const,
    },
    {
      href: "/receive",
      label: t("navigation.receiveMoney"),
      icon: Wallet,
      variant: "outline" as const,
    },
    {
      href: "/how-it-works",
      label: t("navigation.howItWorks"),
      icon: HelpCircle,
      variant: "outline" as const,
    },
    {
      href: "/pricing",
      label: t("navigation.pricing"),
      icon: CreditCard,
      variant: "outline" as const,
    },
  ];

  return (
    <div className="min-h-screen page-bg">
      {/* Navigation Header */}
      <header className="w-full px-4 py-4 sm:py-6 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">
                P
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-primary-green">
              Paystup
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("navigation.howItWorks")}
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("navigation.pricing")}
            </Link>
            <Link
              href="/support"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("navigation.support")}
            </Link>
            <Link
              href="/auth/signin"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("navigation.login")}
            </Link>
            <Button asChild>
              <Link href="/auth/signup">{t("navigation.signup")}</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-touch min-w-touch"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <nav className="px-4 py-4 space-y-3">
              <Link
                href="/how-it-works"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navigation.howItWorks")}
              </Link>
              <Link
                href="/pricing"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navigation.pricing")}
              </Link>
              <Link
                href="/support"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navigation.support")}
              </Link>
              <Link
                href="/auth/signin"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navigation.login")}
              </Link>
              <div className="pt-2">
                <Button asChild className="w-full min-h-touch">
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("navigation.signup")}
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-20">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold heading-color leading-tight">
              {t("hero.title")}{" "}
              <span className="text-primary-green">{t("hero.brand")}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto px-2">
              {t("hero.subtitle")}
            </p>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-2">
              {t("hero.description")}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button
              asChild
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto min-h-touch"
            >
              <Link
                href="/send"
                className="flex items-center justify-center gap-2"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto min-h-touch"
            >
              <Link href="/how-it-works">{t("hero.cta.secondary")}</Link>
            </Button>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 px-2">
            {navigationLinks.map((link, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <Button
                    asChild
                    variant={link.variant}
                    className="w-full min-h-touch"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {link.label}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
              {t("features.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-green" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold heading-color mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mt-16 sm:mt-24 text-center px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                Trusted by 100,000+ users
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                Available in 50+ countries
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
