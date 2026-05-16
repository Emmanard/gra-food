import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, SITE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products | GRA Foods",
  description:
    "Browse GRA Foods' range of nutritious breakfast cereals, snacks, staples, and add-ins. Order via WhatsApp.",
  openGraph: {
    title: "Products | GRA Foods",
    description:
      "Browse GRA Foods' range of nutritious breakfast cereals, snacks, staples, and add-ins. Order via WhatsApp.",
    url: `${SITE_URL}/products`,
    siteName: "GRA Foods",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
};

const CATEGORIES = ["Breakfast", "Snacks", "Staples", "Add-ins"] as const;

export default function ProductsPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="flex items-center justify-center bg-[#8B0000] px-6 py-20 text-white">
        <h1 className="font-serif text-4xl font-bold md:text-6xl">
          Our Products
        </h1>
      </section>

      {/* ── Product Categories ────────────────────────────────────────────── */}
      {CATEGORIES.map((category) => {
        const items = getProductsByCategory(category);
        return (
          <section key={category} className="bg-[#FFF8F0] py-16 px-6">
            <div className="mx-auto max-w-6xl">
              <AnimatedSection>
                <SectionHeading title={category} />
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })}
    </main>
  );
}
