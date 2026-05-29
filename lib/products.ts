// ─── Constants ───────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = "2348148778669";
export const SITE_URL = "https://www.grafoods.com";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  category: "Breakfast" | "Snacks" | "Staples" | "Add-ins";
  size: string;
  price: number | null;
  image: string;
  alt: string;
  featured?: boolean;
}

export interface BakeryItem {
  id: string;
  name: string;
  category: "Savoury" | "Sweet";
  image: string;
  alt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Price on request";
  return `₦${price.toLocaleString("en-NG")}`;
}

// ─── Products Data ────────────────────────────────────────────────────────────

export const products: Product[] = [
  // Breakfast
  {
    id: "wholemeal-pap-multigrain",
    name: "Wholemeal Pap Multi-Grain",
    category: "Breakfast",
    size: "250g",
    price: 1700,
    image: "/images/wholemeal-pap-1.jpg",
    alt: "Wholemeal Pap Multi-Grain 250g pack",
    featured: true,
  },
  {
    id: "wholemeal-pap-yellow-corn",
    name: "Wholemeal Pap Yellow Corn",
    category: "Breakfast",
    size: "250g",
    price: 1200,
    image: "/images/wholemeal-pap-2.jpg",
    alt: "Wholemeal Pap Yellow Corn 250g pack",
    featured: true,
  },
  {
    id: "tom-brown-cereals",
    name: "Tom Brown Cereals",
    category: "Breakfast",
    size: "1kg",
    price: 7000,
    image: "/tombrown.webp",
    alt: "Tom Brown Cereals 1kg pack",
  },
  {
    id: "granola-cereals",
    name: "Granola Cereals",
    category: "Breakfast",
    size: "per kg",
    price: 7000,
    image: "/granola%20image.jpeg",
    alt: "Granola Cereals per kg",
  },
  // Snacks
  {
    id: "milco-biscuits",
    name: "Milco Biscuits",
    category: "Snacks",
    size: "per sachet",
    price: 300,
    image: "/milco-biscuit.jpeg",
    alt: "Milco Biscuits sachet",
  },
  {
    id: "baked-chin-chin",
    name: "Baked Chin-Chin",
    category: "Snacks",
    size: "150g",
    price: 1500,
    image: "/Baked%20Chin-Chin.jpeg",
    alt: "Baked Chin-Chin 150g pack",
  },
  // Staples
  {
    id: "fibre-up-swallow",
    name: "Fibre-Up Swallow",
    category: "Staples",
    size: "per kg",
    price: 3000,
    image: "/fiberup.jpeg",
    alt: "Fibre-Up Swallow 1kg pack",
  },
  // Add-ins
  {
    id: "naturefill-250g",
    name: "Naturefill Mix Soy Powder",
    category: "Add-ins",
    size: "250g",
    price: 2000,
    image: "/images/naturefill.jpg",
    alt: "Naturefill Mix Soy Powder 250g pack",
    featured: true,
  },
  {
    id: "naturefill-500g",
    name: "Naturefill Mix Soy Powder",
    category: "Add-ins",
    size: "500g",
    price: 4500,
    image: "/images/naturefill.jpg",
    alt: "Naturefill Mix Soy Powder 500g pack",
  },
  {
    id: "naturefill-1kg",
    name: "Naturefill Mix Soy Powder",
    category: "Add-ins",
    size: "1kg",
    price: 8500,
    image: "/images/naturefill.jpg",
    alt: "Naturefill Mix Soy Powder 1kg pack",
  },
];

// ─── Bakery Items Data ────────────────────────────────────────────────────────

export const bakeryItems: BakeryItem[] = [
  // Savoury
  {
    id: "meat-pie",
    name: "Meat Pie",
    category: "Savoury",
    image: "/Meat%20Pie.jpeg",
    alt: "Freshly baked meat pie",
  },
  {
    id: "chicken-pie",
    name: "Chicken Pie",
    category: "Savoury",
    image: "/Chicken%20Pie.jpeg",
    alt: "Freshly baked chicken pie",
  },
  {
    id: "sausage-roll",
    name: "Sausage Roll",
    category: "Savoury",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
    alt: "Freshly baked sausage roll",
  },
  {
    id: "egg-roll",
    name: "Egg Roll",
    category: "Savoury",
    image: "/Egg%20Roll.webp",
    alt: "Freshly baked egg roll",
  },
  {
    id: "sandwich",
    name: "Sandwich",
    category: "Savoury",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    alt: "Freshly made sandwich",
  },
  {
    id: "burger",
    name: "Burger",
    category: "Savoury",
    image: "/images/bakery-burger.jpg",
    alt: "GRA Foods burger",
  },
  {
    id: "shawarma",
    name: "Shawarma",
    category: "Savoury",
    image: "/Shawarma.jpeg",
    alt: "Freshly made shawarma wrap",
  },
  {
    id: "pizza",
    name: "Pizza",
    category: "Savoury",
    image: "/images/bakery-pizza-1.jpg",
    alt: "GRA Foods pizza",
  },
  // Sweet
  {
    id: "jam-donut",
    name: "Jam Donut",
    category: "Sweet",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    alt: "Jam-filled donut",
  },
  {
    id: "donut",
    name: "Donut",
    category: "Sweet",
    image: "/DONUT.jpeg",
    alt: "GRA Foods donut",
  },
  {
    id: "celebration-cake",
    name: "Celebration Cake",
    category: "Sweet",
    image: "/images/bakery-cake-large.jpg",
    alt: "GRA Foods celebration cake",
  },
];

// ─── Query Helpers ────────────────────────────────────────────────────────────

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured === true);
}

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return products.filter((p) => p.category === category);
}

export function getBakeryByCategory(
  category: BakeryItem["category"]
): BakeryItem[] {
  return bakeryItems.filter((item) => item.category === category);
}
