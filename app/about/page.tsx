import type { Metadata } from "next";
import {
  Lightbulb,
  Users,
  ShieldCheck,
  BadgeDollarSign,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import WhatsAppLinkButton from "@/components/WhatsAppLinkButton";
import { buildWhatsAppUrl, SITE_URL } from "@/lib/products";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About | GRA Foods",
  description:
    "Learn about GRA Foods — a Nigerian food innovation company transforming locally sourced millet into affordable, nutritious breakfast and bakery products.",
  openGraph: {
    title: "About | GRA Foods",
    description:
      "Learn about GRA Foods — a Nigerian food innovation company transforming locally sourced millet into affordable, nutritious breakfast and bakery products.",
    url: `${SITE_URL}/about`,
    siteName: "GRA Foods",
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: `${SITE_URL}/about` },
};

// ─── Core Values Data ─────────────────────────────────────────────────────────

const coreValues = [
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description:
      "We constantly explore new ways to process local grains into better, more nutritious products.",
  },
  {
    icon: Users,
    title: "Customer Satisfaction",
    description:
      "Every product we make is designed with our customers' health and happiness in mind.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "We maintain rigorous quality standards from sourcing to packaging so you get the best every time.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordability",
    description:
      "Nutritious food should be accessible to everyone. We keep our prices fair without compromising quality.",
  },
];

// ─── About Page ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="flex min-h-[50vh] items-center justify-center bg-[#8B0000] px-6 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-6xl">
            About GRA Foods
          </h1>
          <p className="max-w-xl font-sans text-lg text-white/80">
            Our story, mission, and values
          </p>
        </div>
      </section>

      {/* ── Brand Narrative & Timeline ───────────────────────────────────── */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <SectionHeading title="Our Story" centered />
            <p className="font-sans text-lg leading-relaxed text-brand-text/80">
              We are a Nigerian food innovation company transforming locally
              sourced millet into affordable nutritious breakfast and bakery
              products. We started as a regular confectionery, today our vision
              has grown into processing our locally produced grains into
              nutritious, affordable products that are better alternative to
              imported breakfast cereals and foods.
            </p>

            {/* Visual Timeline */}
            <div className="mt-12">
              <h3 className="mb-8 font-serif text-2xl font-bold text-brand-text">
                Our Journey
              </h3>
              <ol className="relative border-l-2 border-[#8B0000]">
                <li className="mb-10 ml-8">
                  <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-[#8B0000] ring-4 ring-[#FFF8F0]" />
                  <time className="mb-1 block font-sans text-sm font-semibold uppercase tracking-wide text-[#8B0000]">
                    6+ Years Ago
                  </time>
                  <h4 className="font-serif text-xl font-bold text-brand-text">
                    Founded
                  </h4>
                  <p className="mt-1 font-sans text-brand-text/70">
                    GRA Foods began as a regular confectionery in Lagos, Nigeria,
                    with a passion for good, wholesome food.
                  </p>
                </li>
                <li className="mb-10 ml-8">
                  <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-[#FFB800] ring-4 ring-[#FFF8F0]" />
                  <time className="mb-1 block font-sans text-sm font-semibold uppercase tracking-wide text-[#8B0000]">
                    The Pivot
                  </time>
                  <h4 className="font-serif text-xl font-bold text-brand-text">
                    Grain Innovation
                  </h4>
                  <p className="mt-1 font-sans text-brand-text/70">
                    We shifted focus to processing locally sourced millet and
                    grains into nutritious breakfast cereals and bakery products.
                  </p>
                </li>
                <li className="ml-8">
                  <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-[#4A7C59] ring-4 ring-[#FFF8F0]" />
                  <time className="mb-1 block font-sans text-sm font-semibold uppercase tracking-wide text-[#8B0000]">
                    Today
                  </time>
                  <h4 className="font-serif text-xl font-bold text-brand-text">
                    Lagos, Nigeria
                  </h4>
                  <p className="mt-1 font-sans text-brand-text/70">
                    A growing brand offering affordable, nutritious alternatives
                    to imported breakfast cereals — proudly made in Nigeria.
                  </p>
                </li>
              </ol>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <SectionHeading title="Mission & Vision" centered />
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Mission */}
              <div className="rounded-2xl border border-[#8B0000]/20 bg-[#FFF8F0] p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#8B0000]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-text">
                  Our Mission
                </h3>
                <p className="mt-3 font-sans text-lg leading-relaxed text-brand-text/80">
                  To process local foods into affordable, nutritious products.
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-2xl border border-[#FFB800]/40 bg-[#FFF8F0] p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFB800]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-text">
                  Our Vision
                </h3>
                <p className="mt-3 font-sans text-lg leading-relaxed text-brand-text/80">
                  To be a leading brand for affordable nutrition across Africa.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────── */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading title="Our Core Values" centered />
          </AnimatedSection>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={index * 0.1} className="h-full">
                  <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm h-full">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#8B0000]/10">
                      <Icon
                        className="h-7 w-7 text-[#8B0000]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-brand-text">
                      {value.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-brand-text/70">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Strip ────────────────────────────────────────────────── */}
      <section className="bg-[#8B0000] py-16 px-6 text-white">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <SectionHeading title="Get in Touch" centered light />
            <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#FFB800]" aria-hidden="true" />
                <div className="font-sans">
                  <a
                    href="tel:+2348148778669"
                    className="block text-white hover:text-[#FFB800] transition-colors"
                  >
                    08148778669
                  </a>
                  <a
                    href="tel:+2348068003788"
                    className="block text-white hover:text-[#FFB800] transition-colors"
                  >
                    08068003788
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-[#FFB800]" aria-hidden="true" />
                <p className="font-sans text-white/90">7:30 am – 8:45 pm</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#FFB800]" aria-hidden="true" />
                <p className="font-sans text-white/90">Lagos, Nigeria</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10 text-center">
              <WhatsAppLinkButton
                href={buildWhatsAppUrl("Hi GRA Foods, I'd like to place an order")}
                label="Order via WhatsApp"
                variant="white"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
