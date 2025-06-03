"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

// Language flag emojis for better UX
const languageFlags: Record<string, string> = {
  en: "🇺🇸",
  fr: "🇫🇷",
  pt: "🇧🇷",
  ar: "🇸🇦",
  sw: "🇹🇿",
  hi: "🇮🇳",
  "zh-CN": "🇨🇳",
  ur: "🇵🇰",
  bn: "🇧🇩",
  id: "🇮🇩",
  pa: "🇮🇳",
  ja: "🇯🇵",
  vi: "🇻🇳",
  mr: "🇮🇳",
};

export default function LanguageSelector() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Navigate to the same page but with the new locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <Select value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-auto min-w-[120px] border-none shadow-none bg-transparent hover:bg-gray-50 transition-colors focus-visible:ring-0">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span className="text-sm">{languageFlags[locale]}</span>
              <span className="text-sm font-medium">
                {t(`languages.${locale}`)}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {routing.locales.map((lang) => (
            <SelectItem key={lang} value={lang}>
              <div className="flex items-center gap-2">
                <span>{languageFlags[lang]}</span>
                <span>{t(`languages.${lang}`)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
