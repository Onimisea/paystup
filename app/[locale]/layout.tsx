import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import { QueryProvider } from "@/lib/api";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const brico = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--brico",
});

export const metadata: Metadata = {
  title:
    "Paystup | A web-based peer-to-peer (P2P) money transfer platform that uses local payments in both the sender and receiver countries — no direct international banking involved.",
  description:
    "A web-based peer-to-peer (P2P) money transfer platform that uses local payments in both the sender and receiver countries — no direct international banking involved.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${brico.variable} antialiased font-inter`}
      >
        <QueryProvider>
          <NextIntlClientProvider>
            <section className="min-h-screen relative">{children}</section>

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
