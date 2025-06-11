"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSelector from "@/components/common/LanguageSelector";

export default function AuthFooter() {
  const t = useTranslations("Common");

  return (
    <footer className="w-full py-6 mt-auto">
      <div className="w-[90%] mx-auto">
        {/* Mobile Layout (< 480px): Stacked with top row having space-between */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Top row on mobile: Language selector and Privacy Policy with space-between */}
          <div className="flex flex-row items-center justify-between sm:justify-start sm:gap-4 w-full sm:w-auto">
            <LanguageSelector />

            {/* Desktop divider - hidden on mobile */}
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />

            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors hover:underline"
            >
              {t("footer.privacyPolicy")}
            </Link>
          </div>

          {/* Copyright - centered on mobile, right-aligned on desktop */}
          <div className="text-xs auth-footer-text text-center sm:text-left">
            © {new Date().getFullYear()} Paystup. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
