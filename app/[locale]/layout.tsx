import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-inter`}
      >
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
      </body>
    </html>
  );
}
