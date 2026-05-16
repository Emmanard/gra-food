import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import BakeryCard from "@/components/BakeryCard";
import WhatsAppLinkButton from "@/components/WhatsAppLinkButton";
import { getBakeryByCategory, buildWhatsAppUrl, SITE_URL } from "@/lib/products";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Bakery | GRA Foods",
  description:
    "Explore GRA Foods' freshly baked savoury and sweet items — meat pies, burgers, pizza, celebration cakes, and more. Enquire via WhatsApp.",
  openGraph: {
    title: "Bakery | GRA Foods",
    description:
      "Explore GRA Foods' freshly baked savoury and sweet items — meat pies, burgers, pizza, celebration cakes, and more. Enquire via WhatsApp.",
    url: `${SITE_URL}/bakery`,
    siteName: "GRA Foods",
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE_URL}/bakery` },
};

// ─── Bakery Page ─────────────────────────────────────────────────────────────

export default function BakeryPage() {
  const savouryItems = getBakeryByCategory("Savoury");
  const sweetItems = getBakeryByCategory("Sweet");

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="flex items-center justify-center bg-[#8B0000] px-6 py-20 text-white">
        <h1 className="font-serif text-4xl font-bold md:text-6xl">
          Our Bakery
        </h1>
      </section>

      {/* ── Savoury Section ──────────────────────────────────────────────── */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading title="Savoury" />
            <p className="mb-6 font-sans text-brand-text/70">
              Prices vary by size and customisation — chat with us to place your order.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {savouryItems.map((item, index) => (
                <BakeryCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Sweet Section ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading title="Sweet" />
            <p className="mb-6 font-sans text-brand-text/70">
              Prices vary by size and customisation — chat with us to place your order.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sweetItems.map((item, index) => (
                <BakeryCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WhatsApp CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[#8B0000] py-16 px-6 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Ready to Order?
          </h2>
          <p className="mt-4 font-sans text-lg text-white/80">
            Chat with us on WhatsApp to place your bakery order.
          </p>
          <WhatsAppLinkButton
            href={buildWhatsAppUrl("Hi GRA Foods, I'd like to enquire about your bakery items")}
            label="Enquire via WhatsApp"
            variant="white"
            className="mt-8"
          />
        </AnimatedSection>
      </section>
    </main>
  );
}
