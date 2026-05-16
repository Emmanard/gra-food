import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/products";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "GRA Foods | Good, Rich, Affordable Nutrition",
    template: "%s | GRA Foods",
  },
  description:
    "GRA Foods — Good, Rich, Affordable Nutrition for All. Wholesome Nigerian breakfast cereals, snacks, staples, and freshly baked goods.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: "GRA Foods",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="bg-brand-bg text-brand-text font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
