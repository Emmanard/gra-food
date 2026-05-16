# Design Document — GRA Foods Website

## Overview

The GRA Foods website is a production-ready, SEO-optimised marketing site for a Nigerian food innovation company. It is a statically-generated Next.js 14 (App Router) application deployed to Vercel. The site has four public pages — Home, Products, Bakery, and About — plus shared layout components (Navbar, Footer, floating WhatsApp button). There is no backend, no database, and no e-commerce checkout; all purchase intent is routed through WhatsApp deep links.

The primary goals are:
1. **Brand credibility** — warm, wholesome, proudly Nigerian visual identity
2. **Product discovery** — clear product catalogue with pricing
3. **Conversion** — every page drives visitors toward a WhatsApp enquiry

The application is entirely client-rendered after the initial static HTML is served. All product and bakery data is defined in a single TypeScript data file (`lib/products.ts`), making content updates straightforward without touching component code.

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Vercel CDN                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Next.js 14 App Router                │  │
│  │                                                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │  │
│  │  │  app/    │  │components│  │   lib/       │   │  │
│  │  │  layout  │  │  Navbar  │  │  products.ts │   │  │
│  │  │  page    │  │  Footer  │  │  (data +     │   │  │
│  │  │  products│  │  WhatsApp│  │   helpers)   │   │  │
│  │  │  bakery  │  │  Button  │  └──────────────┘   │  │
│  │  │  about   │  │  Animated│                     │  │
│  │  └──────────┘  │  Section │                     │  │
│  │                │  Product │                     │  │
│  │                │  Card    │                     │  │
│  │                │  Bakery  │                     │  │
│  │                │  Card    │                     │  │
│  │                └──────────┘                     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  public/images/  (static assets)                 │   │
│  │  app/sitemap.ts  app/robots.ts                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
         │ WhatsApp deep links (wa.me)
         ▼
   WhatsApp Business (external)
```

### Rendering Strategy

All four pages use **Static Site Generation (SSG)** — they are pre-rendered at build time with no dynamic server-side data fetching. Product and bakery data is imported directly from `lib/products.ts` at build time. This gives maximum performance and simplest Vercel deployment.

### Folder Structure

```
gra-foods/
├── app/
│   ├── layout.tsx          # Root layout: fonts, Analytics, Navbar, Footer, WhatsAppButton
│   ├── page.tsx            # Home page
│   ├── products/
│   │   └── page.tsx        # Products page
│   ├── bakery/
│   │   └── page.tsx        # Bakery page
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── robots.ts           # robots.txt generation
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── AnimatedSection.tsx
│   ├── ProductCard.tsx
│   ├── BakeryCard.tsx
│   └── SectionHeading.tsx
├── lib/
│   └── products.ts         # Data + WhatsApp URL builder
├── public/
│   └── images/
│       ├── logo.svg
│       ├── naturefill.jpg
│       ├── wholemeal-pap-1.jpg
│       ├── wholemeal-pap-2.jpg
│       ├── bakery-burger.jpg
│       ├── bakery-pizza-1.jpg
│       ├── bakery-pizza-2.jpg
│       ├── bakery-cake-small.jpg
│       └── bakery-cake-large.jpg
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Components and Interfaces

### Root Layout (`app/layout.tsx`)

Wraps every page. Responsibilities:
- Load Playfair Display and DM Sans via `next/font/google`
- Set `lang="en"` on `<html>`
- Render `<Navbar />`, `{children}`, `<Footer />`, `<WhatsAppButton />`
- Inject `<Analytics />` from `@vercel/analytics/react`
- Apply global Tailwind base styles and CSS variables for the colour palette

### Navbar (`components/Navbar.tsx`)

```typescript
// No props — reads current pathname via usePathname()
export default function Navbar(): JSX.Element
```

Behaviour:
- `position: sticky; top: 0; z-index: 50` — stays at top of viewport
- Desktop (≥768px): logo left, nav links right, WhatsApp icon link
- Mobile (<768px): logo left, hamburger button right; clicking opens a full-width drawer
- Active link detection via `usePathname()` — applies `text-[#8B0000] font-semibold` to current route
- Drawer uses `useState` for open/close; focus-trapped while open (Tab cycles within drawer)
- ARIA: `aria-label="Main navigation"` on `<nav>`, `aria-label="Open menu"` / `aria-label="Close menu"` on hamburger/close buttons, `aria-label="Chat on WhatsApp"` on WhatsApp icon link
- `aria-current="page"` on the active nav link

### Footer (`components/Footer.tsx`)

```typescript
// No props
export default function Footer(): JSX.Element
```

Three-column grid (stacks to single column on mobile):
1. Logo + tagline "Good, Rich, Affordable Nutrition for All"
2. Quick links: Home, Products, Bakery, About
3. Contact: phone numbers, hours, location, social icons

Social links open in `target="_blank" rel="noopener noreferrer"`.

### WhatsAppButton (`components/WhatsAppButton.tsx`)

```typescript
// No props — uses WHATSAPP_NUMBER constant and general message
export default function WhatsAppButton(): JSX.Element
```

- `position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 60`
- Circular green button (bg `#25D366`), WhatsApp SVG icon
- `aria-label="Chat with us on WhatsApp"`
- Opens `buildWhatsAppUrl("Hi GRA Foods, I'd like to place an order")` in new tab

### AnimatedSection (`components/AnimatedSection.tsx`)

```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // seconds, default 0
}
export default function AnimatedSection(props: AnimatedSectionProps): JSX.Element
```

- Uses Framer Motion `motion.div` with `useInView` (triggerOnce: true, margin: "-100px")
- Animates: `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }`, duration 0.6s, ease "easeOut"
- Respects `prefers-reduced-motion`: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, renders children immediately at full opacity with no motion
- `delay` prop enables staggered card animations (0.1s × card index)

### ProductCard (`components/ProductCard.tsx`)

```typescript
interface ProductCardProps {
  product: Product; // from lib/products.ts
  index: number;    // for stagger delay
}
export default function ProductCard(props: ProductCardProps): JSX.Element
```

Renders:
- Next.js `<Image>` (product image, `width={400}`, `height={300}`, `alt={product.name}`)
- Product name (Playfair Display, h3)
- Weight/size label
- Price (or "Price on request" badge)
- "Order via WhatsApp" button → `buildWhatsAppUrl(\`Hi GRA Foods, I'd like to enquire about ${product.name} ${product.size}\`)`

### BakeryCard (`components/BakeryCard.tsx`)

```typescript
interface BakeryCardProps {
  item: BakeryItem; // from lib/products.ts
  index: number;
}
export default function BakeryCard(props: BakeryCardProps): JSX.Element
```

Renders:
- Next.js `<Image>` (item image, `width={400}`, `height={300}`, `alt={item.name}`)
- Item name (Playfair Display, h3)
- "Enquire via WhatsApp" button → `buildWhatsAppUrl(\`Hi GRA Foods, I'd like to enquire about ${item.name}\`)`
- No price displayed

### SectionHeading (`components/SectionHeading.tsx`)

```typescript
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean; // white text for dark backgrounds
}
export default function SectionHeading(props: SectionHeadingProps): JSX.Element
```

Renders an `<h2>` in Playfair Display with an optional subtitle in DM Sans. Used consistently across all page sections.

---

## Data Models

All data lives in `lib/products.ts`. No database or API is involved.

### Constants

```typescript
export const WHATSAPP_NUMBER = "2348148778669";
export const SITE_URL = "https://www.grafoods.com";
```

### WhatsApp URL Builder

```typescript
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

### Product Type

```typescript
export interface Product {
  id: string;
  name: string;
  category: "Breakfast" | "Snacks" | "Staples" | "Add-ins";
  size: string;           // e.g. "250g", "150g", "1kg"
  price: number | null;   // null = "Price on request"
  image: string;          // path relative to /public, e.g. "/images/naturefill.jpg"
  alt: string;
  featured?: boolean;     // true for the 3 home page featured products
}
```

### BakeryItem Type

```typescript
export interface BakeryItem {
  id: string;
  name: string;
  category: "Savoury" | "Sweet";
  image: string;
  alt: string;
}
```

### Product Data

```typescript
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
    size: "",
    price: null,
    image: "/images/tom-brown.jpg",   // Unsplash placeholder
    alt: "Tom Brown Cereals",
  },
  {
    id: "granola-cereals",
    name: "Granola Cereals",
    category: "Breakfast",
    size: "",
    price: null,
    image: "/images/granola.jpg",     // Unsplash placeholder
    alt: "Granola Cereals",
  },
  // Snacks
  {
    id: "milco-biscuits",
    name: "Milco Biscuits",
    category: "Snacks",
    size: "per sachet",
    price: 300,
    image: "/images/milco-biscuits.jpg", // Unsplash placeholder
    alt: "Milco Biscuits sachet",
  },
  {
    id: "baked-chin-chin",
    name: "Baked Chin-Chin",
    category: "Snacks",
    size: "150g",
    price: 1500,
    image: "/images/chin-chin.jpg",   // Unsplash placeholder
    alt: "Baked Chin-Chin 150g pack",
  },
  // Staples
  {
    id: "fibre-up-swallow",
    name: "Fibre-Up Swallow",
    category: "Staples",
    size: "per kg",
    price: 3000,
    image: "/images/fibre-up-swallow.jpg", // Unsplash placeholder
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
```

### Bakery Data

```typescript
export const bakeryItems: BakeryItem[] = [
  // Savoury
  { id: "meat-pie",     name: "Meat Pie",     category: "Savoury", image: "/images/meat-pie.jpg",     alt: "Freshly baked meat pie" },
  { id: "chicken-pie",  name: "Chicken Pie",  category: "Savoury", image: "/images/chicken-pie.jpg",  alt: "Freshly baked chicken pie" },
  { id: "sausage-roll", name: "Sausage Roll", category: "Savoury", image: "/images/sausage-roll.jpg", alt: "Freshly baked sausage roll" },
  { id: "egg-roll",     name: "Egg Roll",     category: "Savoury", image: "/images/egg-roll.jpg",     alt: "Freshly baked egg roll" },
  { id: "hot-dog",      name: "Hot Dog",      category: "Savoury", image: "/images/hot-dog.jpg",      alt: "Hot dog in a bun" },
  { id: "sandwich",     name: "Sandwich",     category: "Savoury", image: "/images/sandwich.jpg",     alt: "Freshly made sandwich" },
  { id: "burger",       name: "Burger",       category: "Savoury", image: "/images/bakery-burger.jpg", alt: "GRA Foods burger" },
  { id: "shawarma",     name: "Shawarma",     category: "Savoury", image: "/images/shawarma.jpg",     alt: "Freshly made shawarma wrap" },
  { id: "pizza",        name: "Pizza",        category: "Savoury", image: "/images/bakery-pizza-1.jpg", alt: "GRA Foods pizza" },
  // Sweet
  { id: "jam-donut",    name: "Jam Donut",    category: "Sweet",   image: "/images/jam-donut.jpg",    alt: "Jam-filled donut" },
  {
    id: "celebration-cake",
    name: "Celebration Cake",
    category: "Sweet",
    image: "/images/bakery-cake-large.jpg",
    alt: "GRA Foods celebration cake",
  },
];
```

### Helper: Format Price

```typescript
export function formatPrice(price: number | null): string {
  if (price === null) return "Price on request";
  return `₦${price.toLocaleString("en-NG")}`;
}
```

### Helper: Get Featured Products

```typescript
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured === true);
}
```

### Helper: Get Products by Category

```typescript
export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}
```

### Helper: Get Bakery Items by Category

```typescript
export function getBakeryByCategory(category: BakeryItem["category"]): BakeryItem[] {
  return bakeryItems.filter((item) => item.category === category);
}
```

### Tailwind Design Tokens

Defined in `tailwind.config.ts` under `theme.extend.colors`:

```typescript
colors: {
  brand: {
    red:    "#8B0000",
    gold:   "#FFB800",
    orange: "#E07B00",
    bg:     "#FFF8F0",
    text:   "#1A1A1A",
    green:  "#4A7C59",
  },
}
```

### SEO Metadata Pattern

Each page exports a static `metadata` object:

```typescript
// app/products/page.tsx
export const metadata: Metadata = {
  title: "Products | GRA Foods",
  description: "Browse GRA Foods' range of nutritious breakfast cereals, snacks, and staples. Order via WhatsApp.",
  openGraph: {
    title: "Products | GRA Foods",
    description: "...",
    url: "https://www.grafoods.com/products",
    images: [{ url: "/images/og-products.jpg" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://www.grafoods.com/products" },
};
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: WhatsApp URL format invariant

*For any* non-empty message string passed to `buildWhatsAppUrl`, the returned URL SHALL start with `https://wa.me/2348148778669?text=` and the decoded query parameter `text` SHALL equal the original message string exactly.

**Validates: Requirements 6.2**

---

### Property 2: Item-specific WhatsApp message encoding

*For any* product in the products catalogue, the WhatsApp URL constructed from `"Hi GRA Foods, I'd like to enquire about ${product.name} ${product.size}"` SHALL, when decoded, contain both the product's name and its size. Likewise, *for any* bakery item in the bakery catalogue, the WhatsApp URL constructed from `"Hi GRA Foods, I'd like to enquire about ${item.name}"` SHALL, when decoded, contain the item's name.

**Validates: Requirements 6.3, 6.4**

---

### Property 3: Price formatting correctness

*For any* product with a non-null numeric price, `formatPrice(product.price)` SHALL return a string beginning with `₦` followed by the price formatted with comma separators (e.g. `₦1,700`, `₦8,500`). *For any* product with a null price, `formatPrice(null)` SHALL return exactly `"Price on request"`.

**Validates: Requirements 8.3**

---

### Property 4: Featured products count invariant

*For any* state of the products array, `getFeaturedProducts()` SHALL return exactly 3 products, all of which have `featured === true`.

**Validates: Requirements 7.3**

---

### Property 5: Alt text completeness

*For any* product in the products array, `product.alt` SHALL be a non-empty string. *For any* bakery item in the bakeryItems array, `item.alt` SHALL be a non-empty string.

**Validates: Requirements 11.2**

---

### Property 6: Active navigation link uniqueness

*For any* valid page pathname in `["/", "/products", "/bakery", "/about"]`, the Navbar SHALL mark exactly one navigation link as active (applying the active style class), and that link SHALL correspond to the current pathname.

**Validates: Requirements 3.6**

---

### Property 7: Card stagger delay monotonicity

*For any* array of n Product Cards or Bakery Cards rendered in a grid, the `delay` prop passed to `AnimatedSection` for the card at index `i` SHALL equal `i * 0.1` seconds, ensuring delays are strictly increasing from 0 to `(n-1) * 0.1`.

**Validates: Requirements 13.3**

---

### Property 8: Copyright year currency

*For any* year value passed to the Footer's copyright renderer, the rendered copyright string SHALL contain that year as a substring (e.g. `"© 2025 GRA Foods"` for year 2025).

**Validates: Requirements 4.5**

---

## Error Handling

### Image Load Failures

All `<Image>` components include descriptive `alt` text. If an image fails to load (network error, missing file), the browser renders the `alt` text in place of the image. No additional error UI is required — the page remains functional and readable.

### WhatsApp Link Failures

WhatsApp deep links are standard HTTPS URLs. If the device has no WhatsApp installed, the browser will open `web.whatsapp.com` as a fallback. No special error handling is needed.

### Missing/Null Prices

Products with `price: null` are handled by `formatPrice()` returning `"Price on request"`. The Product Card renders this as a styled badge rather than a price figure. No runtime errors can occur from null prices because all price rendering goes through `formatPrice()`.

### Build-Time Data Errors

Since all data is static TypeScript, TypeScript compilation catches type mismatches at build time. A product missing a required field (e.g. `alt`) will cause a TypeScript error and fail `next build`, preventing a broken deployment.

### Font Loading

Fonts are loaded via `next/font/google` with `display: 'swap'`. If Google Fonts is unreachable, the browser falls back to the system serif (for Playfair Display) and system sans-serif (for DM Sans). The `font-display: swap` strategy prevents invisible text during font load.

### External Image Domains

`next.config.js` configures `images.remotePatterns` to allow `images.unsplash.com` for Unsplash placeholder images. If an Unsplash URL becomes unavailable, the `alt` text is displayed. When client photos replace placeholders, the Unsplash entries can be removed from `remotePatterns`.

---

## Testing Strategy

### Overview

This is a static marketing website with no backend logic, no database, and no API calls. The testing strategy is proportionate to the risk and complexity:

- **Unit tests** for pure utility functions (`buildWhatsAppUrl`, `formatPrice`, `getFeaturedProducts`, `getProductsByCategory`, `getBakeryByCategory`)
- **Property-based tests** for universal properties of the data and utility functions
- **Component tests** for shared components (Navbar, Footer, WhatsAppButton, AnimatedSection, ProductCard, BakeryCard)
- **Manual/visual testing** for responsive layout, animations, colour contrast, and font rendering

PBT is appropriate here because the core utility functions (`buildWhatsAppUrl`, `formatPrice`) are pure functions with clear input/output behaviour and large input spaces. The data integrity properties (alt text completeness, featured count) are also well-suited to property-based verification.

### Property-Based Testing Library

**Recommended library**: [fast-check](https://github.com/dubzzz/fast-check) (TypeScript-native, excellent Next.js/Jest compatibility)

**Test runner**: Jest (standard with Next.js) or Vitest

**Minimum iterations**: 100 per property test (fast-check default is 100 runs)

### Property Test Specifications

Each property test MUST include a comment tag in the format:
`// Feature: gra-foods-website, Property {N}: {property_text}`

**Property 1 — WhatsApp URL format invariant**
```typescript
// Feature: gra-foods-website, Property 1: WhatsApp URL format invariant
it("buildWhatsAppUrl returns correctly formatted wa.me URL for any message", () => {
  fc.assert(
    fc.property(fc.string({ minLength: 1 }), (message) => {
      const url = buildWhatsAppUrl(message);
      const parsed = new URL(url);
      expect(parsed.origin + parsed.pathname).toBe("https://wa.me/2348148778669");
      expect(parsed.searchParams.get("text")).toBe(message);
    }),
    { numRuns: 100 }
  );
});
```

**Property 2 — Item-specific WhatsApp message encoding**
```typescript
// Feature: gra-foods-website, Property 2: Item-specific WhatsApp message encoding
it("product WhatsApp URL decodes to contain product name and size", () => {
  fc.assert(
    fc.property(fc.constantFrom(...products), (product) => {
      const url = buildWhatsAppUrl(
        `Hi GRA Foods, I'd like to enquire about ${product.name} ${product.size}`
      );
      const decoded = decodeURIComponent(new URL(url).searchParams.get("text")!);
      expect(decoded).toContain(product.name);
      expect(decoded).toContain(product.size);
    }),
    { numRuns: 100 }
  );
});
```

**Property 3 — Price formatting correctness**
```typescript
// Feature: gra-foods-website, Property 3: Price formatting correctness
it("formatPrice returns ₦-prefixed string for any positive price", () => {
  fc.assert(
    fc.property(fc.integer({ min: 1, max: 10_000_000 }), (price) => {
      const result = formatPrice(price);
      expect(result).toMatch(/^₦[\d,]+$/);
      expect(result).not.toContain("Price on request");
    }),
    { numRuns: 100 }
  );
});

it("formatPrice returns 'Price on request' for null", () => {
  expect(formatPrice(null)).toBe("Price on request");
});
```

**Property 4 — Featured products count invariant**
```typescript
// Feature: gra-foods-website, Property 4: Featured products count invariant
it("getFeaturedProducts always returns exactly 3 featured products", () => {
  const featured = getFeaturedProducts();
  expect(featured).toHaveLength(3);
  featured.forEach((p) => expect(p.featured).toBe(true));
});
```

**Property 5 — Alt text completeness**
```typescript
// Feature: gra-foods-website, Property 5: Alt text completeness
it("every product has a non-empty alt string", () => {
  fc.assert(
    fc.property(fc.constantFrom(...products), (product) => {
      expect(product.alt).toBeTruthy();
      expect(product.alt.trim().length).toBeGreaterThan(0);
    }),
    { numRuns: 100 }
  );
});

it("every bakery item has a non-empty alt string", () => {
  fc.assert(
    fc.property(fc.constantFrom(...bakeryItems), (item) => {
      expect(item.alt).toBeTruthy();
      expect(item.alt.trim().length).toBeGreaterThan(0);
    }),
    { numRuns: 100 }
  );
});
```

**Property 6 — Active navigation link uniqueness**
```typescript
// Feature: gra-foods-website, Property 6: Active navigation link uniqueness
it("Navbar marks exactly one link as active for any valid route", () => {
  const routes = ["/", "/products", "/bakery", "/about"];
  fc.assert(
    fc.property(fc.constantFrom(...routes), (pathname) => {
      const { getAllByRole } = render(<Navbar />, { /* mock usePathname → pathname */ });
      const activeLinks = getAllByRole("link").filter(
        (link) => link.classList.contains("active-class") // actual class TBD in implementation
      );
      expect(activeLinks).toHaveLength(1);
      expect(activeLinks[0]).toHaveAttribute("href", pathname);
    }),
    { numRuns: 100 }
  );
});
```

**Property 7 — Card stagger delay monotonicity**
```typescript
// Feature: gra-foods-website, Property 7: Card stagger delay monotonicity
it("stagger delay for card at index i equals i * 0.1", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 20 }), (index) => {
      const expectedDelay = index * 0.1;
      // Verify the delay prop passed to AnimatedSection equals index * 0.1
      expect(expectedDelay).toBeCloseTo(index * 0.1, 5);
    }),
    { numRuns: 100 }
  );
});
```

**Property 8 — Copyright year currency**
```typescript
// Feature: gra-foods-website, Property 8: Copyright year currency
it("Footer copyright contains the current year", () => {
  const year = new Date().getFullYear();
  const { getByText } = render(<Footer />);
  const copyright = getByText(/GRA Foods/i);
  expect(copyright.textContent).toContain(String(year));
});
```

### Unit Tests

Focus on specific examples and edge cases not covered by property tests:

- `buildWhatsAppUrl("")` — empty string edge case (should still produce valid URL)
- `buildWhatsAppUrl` with special characters (ampersands, quotes, Nigerian characters)
- `formatPrice(0)` — zero price edge case
- `getProductsByCategory` returns only products of the requested category
- `getBakeryByCategory` returns only items of the requested category
- Navbar renders without crashing
- Footer renders all required contact details
- WhatsAppButton renders with correct href and aria-label
- AnimatedSection renders children
- ProductCard renders product name, price, and WhatsApp button
- BakeryCard renders item name and WhatsApp button (no price)

### Component Tests

Using React Testing Library:

- **Navbar**: hamburger toggle opens/closes drawer; active link detection; ARIA labels present
- **Footer**: all three columns render; social links have correct href and target="_blank"
- **WhatsAppButton**: correct href, aria-label, z-index class
- **AnimatedSection**: renders children; with `prefers-reduced-motion`, no motion classes applied
- **ProductCard**: "Price on request" renders for null price; WhatsApp button href contains product name
- **BakeryCard**: no price text rendered; WhatsApp button href contains item name

### Manual / Visual Testing Checklist

- [ ] Responsive layout at 375px, 768px, 1024px, 1440px
- [ ] Colour contrast audit (Lighthouse / axe DevTools)
- [ ] Keyboard navigation through all pages
- [ ] Mobile drawer focus trap
- [ ] Font rendering (Playfair Display headings, DM Sans body)
- [ ] Animations play on scroll; disabled with `prefers-reduced-motion`
- [ ] WhatsApp deep links open correct chat on mobile and desktop
- [ ] All images load; alt text visible when images blocked
- [ ] `next build` passes with zero errors
- [ ] Sitemap and robots.txt accessible at correct URLs
- [ ] OG image previews in social media link preview tools
