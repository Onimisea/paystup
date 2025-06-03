import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    "en",
    "fr",
    "pt",
    "ar",
    "sw",
    "hi",
    "zh-CN",
    "ur",
    "bn",
    "id",
    "pa",
    "ja",
    "vi",
    "mr",
  ],

  // Used when no locale matches
  defaultLocale: "en",
});
