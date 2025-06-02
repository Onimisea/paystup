"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSelector from "@/components/common/LanguageSelector";

export default function AuthFooter() {
  const t = useTranslations("Common");

  return (
    <footer className="w-full py-6 mt-auto">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left side - Language selector and Privacy Policy */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <LanguageSelector />
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors hover:underline"
            >
              {t("footer.privacyPolicy")}
            </Link>
          </div>

          {/* Right side - Copyright */}
          <div className="text-xs auth-footer-text">
            © {new Date().getFullYear()} Paystup. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
