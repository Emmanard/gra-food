import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import {
  getFeaturedProducts,
  bakeryItems,
  buildWhatsAppUrl,
} from "@/lib/products";
import { Leaf, PiggyBank, ShieldCheck, Lightbulb, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "GRA Foods | Good, Rich, Affordable Nutrition",
  description:
    "GRA Foods transforms locally sourced Nigerian grains into nutritious, affordable breakfast cereals, snacks, and bakery products. Order via WhatsApp.",
  openGraph: {
    title: "GRA Foods | Good, Rich, Affordable Nutrition",
    description:
      "Nutritious, affordable food products made from locally sourced Nigerian grains.",
    url: "https://www.grafoods.com",
    siteName: "GRA Foods",
    images: [
      {
        url: "https://www.grafoods.com/images/naturefill.jpg",
        width: 1200,
        height: 630,
        alt: "GRA Foods products",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRA Foods | Good, Rich, Affordable Nutrition",
    description:
      "Nutritious, affordable food products made from locally sourced Nigerian grains.",
    images: ["https://www.grafoods.com/images/naturefill.jpg"],
  },
  alternates: {
    canonical: "https://www.grafoods.com",
  },
};

const whatsappOrderUrl = buildWhatsAppUrl(
  "Hi GRA Foods, I'd like to place an order"
);

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
          alt="Assorted nutritious food spread"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl max-w-3xl">
            Good, Rich, Affordable Nutrition for All
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="rounded-full bg-[#8B0000] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#6e0000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Shop Products
            </Link>
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#8B0000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <ChevronDown className="h-8 w-8 animate-bounce text-white/60" aria-hidden="true" />
        </div>
      </section>

      {/* ── Brand Story Strip ─────────────────────────────────────────────── */}
      <section className="bg-[#FFF8F0] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/naturefill.jpg"
                  alt="GRA Foods products on display"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-6">
                <SectionHeading
                  title="Our Story"
                  subtitle="From local grains to nutritious tables"
                />
                <p className="font-sans text-lg leading-relaxed text-brand-text/80">
                  We started as a regular confectionery, today our vision has
                  grown into processing our locally produced grains into
                  nutritious, affordable products that are better alternative to
                  imported breakfast cereals and foods.
                </p>
                <Link
                  href="/about"
                  className="self-start rounded-full bg-[#8B0000] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-[#6e0000]"
                >
                  Our Full Story
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Featured Products"
            subtitle="Our most loved nutritious picks"
            centered
          />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="rounded-full bg-[#8B0000] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#6e0000]"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bakery Teaser ─────────────────────────────────────────────────── */}
      <section className="bg-[#8B0000] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Our Bakery"
            subtitle="Freshly baked savoury and sweet treats made with care"
            centered
            light
          />

          {/* Horizontally scrollable row of bakery images */}
          <div className="relative">
            <div className="overflow-x-auto pb-4">
              <div className="flex flex-row gap-4" style={{ minWidth: "max-content" }}>
                {bakeryItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-52 w-52 flex-shrink-0 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="208px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-3 left-3 right-3 font-sans text-sm font-semibold text-white">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right fade edge hints at scrollable content */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#8B0000] to-transparent" />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/bakery"
              className="rounded-full bg-white px-8 py-3 font-semibold text-[#8B0000] transition-colors hover:bg-[#FFF8F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View All Bakery Items
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="bg-[#FFF8F0] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Why Choose GRA Foods"
            centered
          />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Leaf className="h-8 w-8 text-[#4A7C59]" />,
                title: "Locally Sourced",
                description:
                  "We use Nigerian-grown grains, supporting local farmers and communities.",
              },
              {
                icon: <PiggyBank className="h-8 w-8 text-[#8B0000]" />,
                title: "Affordable",
                description:
                  "Nutritious food shouldn't be a luxury. Our prices are accessible to all.",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-[#8B0000]" />,
                title: "Quality Assured",
                description:
                  "Every product is carefully processed to meet high nutritional standards.",
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-[#FFB800]" />,
                title: "Continuously Innovating",
                description:
                  "We keep improving our recipes and expanding our product range.",
              },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1} className="h-full">
                <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-sm h-full">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF8F0]">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-text">
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-brand-text/70">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof Banner ───────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] py-16 px-6 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Follow Our Journey
            </h2>
            <p className="mt-4 font-sans text-lg text-white/70">
              Stay connected with us on social media for recipes, updates, and
              behind-the-scenes content.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="https://www.instagram.com/foods.gra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#1A1A1A] sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@grafoodsng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#1A1A1A] sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
                TikTok
              </a>
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:border-[#1da851] hover:bg-[#1da851] sm:w-auto"
              >
                Order via WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
