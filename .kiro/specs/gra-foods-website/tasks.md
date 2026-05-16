# Implementation Plan: GRA Foods Website

## Overview

Build a production-ready, statically-generated Next.js 14 (App Router) marketing website for GRA Foods. The site has four pages (Home, Products, Bakery, About) with shared layout components, all data defined in a single TypeScript file (`lib/products.ts`), and all purchase intent routed through WhatsApp deep links. No backend, no e-commerce checkout.

Stack: Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion, Lucide React, `next/font/google`, `@vercel/analytics`, `fast-check` (property tests).

---

## Tasks

- [x] 1. Project scaffolding and configuration
  - Initialise a Next.js 14 App Router project with TypeScript and Tailwind CSS v3 (or verify the existing project structure matches the spec)
  - Install required dependencies: `framer-motion`, `lucide-react`, `@vercel/analytics`, and `fast-check`
  - Create `tailwind.config.ts` with brand colour tokens under `theme.extend.colors.brand`: `red: "#8B0000"`, `gold: "#FFB800"`, `orange: "#E07B00"`, `bg: "#FFF8F0"`, `text: "#1A1A1A"`, `green: "#4A7C59"`
  - Create `next.config.js` configuring `images.remotePatterns` to allow `images.unsplash.com` for placeholder images
  - Create `tsconfig.json` with strict mode enabled
  - Copy the following files from the workspace root to `public/images/` with the renamed filenames (do not rename originals):
    - `WhatsApp Image 2026-05-06 at 20.09.47.svg` → `logo.svg`
    - `WhatsApp Image 2026-05-06 at 20.08.51.jpeg` → `naturefill.jpg`
    - `WhatsApp Image 2026-05-06 at 20.15.25.jpeg` → `wholemeal-pap-1.jpg`
    - `WhatsApp Image 2026-05-06 at 20.16.52.jpeg` → `wholemeal-pap-2.jpg`
    - `WhatsApp Image 2026-05-13 at 16.27.49.jpeg` → `bakery-burger.jpg`
    - `WhatsApp Image 2026-05-13 at 16.27.50.jpeg` → `bakery-pizza-1.jpg`
    - `WhatsApp Image 2026-05-13 at 16.27.51 (1).jpeg` → `bakery-cake-small.jpg`
    - `WhatsApp Image 2026-05-13 at 16.27.51.jpeg` → `bakery-pizza-2.jpg`
    - `WhatsApp Image 2026-05-13 at 16.27.52.jpeg` → `bakery-cake-large.jpg`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 11.4, 11.6, 15.1, 15.2_

- [x] 2. Data layer — `lib/products.ts`
  - [x] 2.1 Create `lib/products.ts` with all constants, types, data, and helpers
    - Define `WHATSAPP_NUMBER = "2348148778669"` and `SITE_URL = "https://www.grafoods.com"`
    - Define `Product` interface: `id`, `name`, `category` (`"Breakfast" | "Snacks" | "Staples" | "Add-ins"`), `size`, `price: number | null`, `image`, `alt`, `featured?: boolean`
    - Define `BakeryItem` interface: `id`, `name`, `category` (`"Savoury" | "Sweet"`), `image`, `alt`
    - Implement `buildWhatsAppUrl(message: string): string` using `encodeURIComponent`
    - Implement `formatPrice(price: number | null): string` — returns `"₦N,NNN"` (using `toLocaleString("en-NG")`) or `"Price on request"`
    - Populate `products` array with all 10 products (Breakfast × 4, Snacks × 2, Staples × 1, Add-ins × 3) with correct `featured` flags, prices, sizes, and image paths; use Unsplash URLs for items without client photos (Tom Brown, Granola, Milco Biscuits, Baked Chin-Chin, Fibre-Up Swallow)
    - Populate `bakeryItems` array with all 11 items (Savoury × 9, Sweet × 2); use Unsplash URLs for items without client photos (Meat Pie, Chicken Pie, Sausage Roll, Egg Roll, Hot Dog, Sandwich, Shawarma, Jam Donut)
    - Implement `getFeaturedProducts()`, `getProductsByCategory()`, and `getBakeryByCategory()` helpers
    - _Requirements: 6.2, 6.3, 6.4, 6.6, 8.3, 9.4, 11.7_

  - [x] 2.2 Write property test for `buildWhatsAppUrl` — Property 1
    - **Property 1: WhatsApp URL format invariant**
    - Use `fc.string({ minLength: 1 })` with 100 runs; assert the returned URL starts with `https://wa.me/2348148778669` and `searchParams.get("text")` equals the original message exactly
    - **Validates: Requirements 6.2**

  - [x] 2.3 Write property test for item-specific WhatsApp message encoding — Property 2
    - **Property 2: Item-specific WhatsApp message encoding**
    - Use `fc.constantFrom(...products)`: decoded URL text must contain both `product.name` and `product.size`
    - Use `fc.constantFrom(...bakeryItems)`: decoded URL text must contain `item.name`
    - **Validates: Requirements 6.3, 6.4**

  - [x] 2.4 Write property test for `formatPrice` — Property 3
    - **Property 3: Price formatting correctness**
    - Use `fc.integer({ min: 1, max: 10_000_000 })` with 100 runs; result must match `/^₦[\d,]+$/`
    - Assert `formatPrice(null)` returns exactly `"Price on request"`
    - **Validates: Requirements 8.3**

  - [x] 2.5 Write property test for `getFeaturedProducts` — Property 4
    - **Property 4: Featured products count invariant**
    - Assert `getFeaturedProducts()` returns exactly 3 items, all with `featured === true`
    - **Validates: Requirements 7.3**

  - [x] 2.6 Write property tests for alt text completeness — Property 5
    - **Property 5: Alt text completeness**
    - Use `fc.constantFrom(...products)`: every product's `alt` must be a non-empty, non-whitespace string
    - Use `fc.constantFrom(...bakeryItems)`: every bakery item's `alt` must be a non-empty, non-whitespace string
    - **Validates: Requirements 11.2**

- [x] 3. Checkpoint — data layer
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Shared utility components
  - [x] 4.1 Create `components/SectionHeading.tsx`
    - Accept `title: string`, `subtitle?: string`, `centered?: boolean`, `light?: boolean` props
    - Render `<h2>` in Playfair Display; optional subtitle in DM Sans
    - Apply `text-white` when `light` is true; default to `text-brand-text`
    - _Requirements: 2.3_

  - [x] 4.2 Create `components/AnimatedSection.tsx`
    - Mark `'use client'`; accept `children`, `className?`, `delay?` (seconds, default 0) props
    - Use Framer Motion `motion.div` with `useInView` (`triggerOnce: true`, `margin: "-100px"`)
    - Animate `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }`, duration 0.6 s, ease `"easeOut"`
    - Detect `prefers-reduced-motion` via `window.matchMedia`; if set, render children immediately at full opacity with no motion
    - _Requirements: 13.1, 13.2, 13.4_

  - [x] 4.3 Write property test for card stagger delay monotonicity — Property 7
    - **Property 7: Card stagger delay monotonicity**
    - Use `fc.integer({ min: 0, max: 20 })`; assert that for card at index `i`, the delay prop equals `i * 0.1` seconds (strictly increasing from 0)
    - **Validates: Requirements 13.3**

- [x] 5. Layout components — WhatsAppButton, Navbar, Footer
  - [x] 5.1 Create `components/WhatsAppButton.tsx`
    - Fixed position: `bottom-6 right-6 z-[60]`
    - Circular green button (`bg-[#25D366]`) with WhatsApp SVG icon (Lucide `MessageCircle` or inline SVG)
    - `aria-label="Chat with us on WhatsApp"`
    - `href` = `buildWhatsAppUrl("Hi GRA Foods, I'd like to place an order")`, `target="_blank" rel="noopener noreferrer"`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 5.2 Create `components/Navbar.tsx`
    - Mark `'use client'`; sticky top, `z-50`
    - Desktop (≥768 px): logo (`/images/logo.svg`) left, nav links (Home, Products, Bakery, About) right, WhatsApp icon link
    - Mobile (<768 px): logo left, hamburger button right; clicking opens full-width drawer with all nav links and a close button
    - Use `usePathname()` for active link detection — apply `text-[#8B0000] font-semibold` and `aria-current="page"` to the current route
    - ARIA: `aria-label="Main navigation"` on `<nav>`, `aria-label="Open menu"` / `aria-label="Close menu"` on toggle buttons, `aria-label="Chat on WhatsApp"` on WhatsApp icon link
    - Focus-trap the drawer while open (Tab cycles within drawer elements only)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 14.3, 14.4, 14.5_

  - [x] 5.3 Write property test for active navigation link uniqueness — Property 6
    - **Property 6: Active navigation link uniqueness**
    - Use `fc.constantFrom("/", "/products", "/bakery", "/about")`; mock `usePathname` to return each route; assert exactly one nav link has the active style class and its `href` matches the pathname
    - **Validates: Requirements 3.6**

  - [x] 5.4 Create `components/Footer.tsx`
    - Three-column grid (stacks to single column on mobile)
    - Column 1: `logo.svg` + tagline "Good, Rich, Affordable Nutrition for All"
    - Column 2: Quick links — Home, Products, Bakery, About
    - Column 3: Phone numbers (08148778669, 08068003788), hours (7:30 am – 8:45 pm), location (Lagos, Nigeria), Instagram and TikTok icons
    - Social links: `target="_blank" rel="noopener noreferrer"`; Instagram → `https://www.instagram.com/foods.gra`; TikTok → `https://www.tiktok.com/@grafoodsng`
    - Copyright: `© {new Date().getFullYear()} GRA Foods`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 5.5 Write property test for copyright year currency — Property 8
    - **Property 8: Copyright year currency**
    - Render `<Footer />` and assert the copyright text contains `String(new Date().getFullYear())`
    - **Validates: Requirements 4.5**

- [x] 6. Product and Bakery card components
  - [x] 6.1 Create `components/ProductCard.tsx`
    - Accept `product: Product` and `index: number` props
    - Render Next.js `<Image>` (`width={400}`, `height={300}`, `alt={product.alt}`)
    - Render product name (Playfair Display, `<h3>`), size label, and price via `formatPrice(product.price)`
    - Render "Order via WhatsApp" button → `buildWhatsAppUrl(\`Hi GRA Foods, I'd like to enquire about ${product.name} ${product.size}\`)`
    - Wrap card in `<AnimatedSection delay={index * 0.1}>`
    - _Requirements: 6.3, 8.4, 8.5, 11.1, 11.2, 13.3_

  - [x] 6.2 Create `components/BakeryCard.tsx`
    - Accept `item: BakeryItem` and `index: number` props
    - Render Next.js `<Image>` (`width={400}`, `height={300}`, `alt={item.alt}`)
    - Render item name (Playfair Display, `<h3>`)
    - Render "Enquire via WhatsApp" button → `buildWhatsAppUrl(\`Hi GRA Foods, I'd like to enquire about ${item.name}\`)`
    - Do NOT display any price
    - Wrap card in `<AnimatedSection delay={index * 0.1}>`
    - _Requirements: 6.4, 9.4, 11.1, 11.2, 13.3_

- [x] 7. Root layout (`app/layout.tsx`)
  - Load Playfair Display and DM Sans via `next/font/google` with `display: 'swap'`
  - Set `lang="en"` on `<html>`
  - Render `<Navbar />`, `{children}`, `<Footer />`, `<WhatsAppButton />` in the correct order
  - Inject `<Analytics />` from `@vercel/analytics/react`
  - Apply global Tailwind base styles and CSS variables for the colour palette
  - Export root `metadata` with site name and default description
  - _Requirements: 1.2, 1.3, 1.6, 2.3, 12.7, 14.6_

- [x] 8. Home page (`app/page.tsx`)
  - [x] 8.1 Implement Hero section
    - Full-viewport height (`min-h-screen`), Unsplash food background image via `<Image fill priority>` with dark overlay
    - Display `logo.svg`, H1 "Good, Rich, Affordable Nutrition for All"
    - Two CTA buttons: "Shop Products" → `/products`; "Order via WhatsApp" → `buildWhatsAppUrl("Hi GRA Foods, I'd like to place an order")`
    - _Requirements: 7.1, 11.3, 11.8_

  - [x] 8.2 Implement Brand Story Strip
    - Two-column layout (image left, text right; stacks to single column on mobile)
    - Brand story text: "We started as a regular confectionery, today our vision has grown into processing our locally produced grains into nutritious, affordable products that are better alternative to imported breakfast cereals and foods."
    - "Learn More" link → `/about`
    - Wrap in `<AnimatedSection>`
    - _Requirements: 7.2, 7.8_

  - [x] 8.3 Implement Featured Products section
    - Call `getFeaturedProducts()` to get exactly 3 products
    - Render `<SectionHeading>` above a responsive grid of `<ProductCard>` components with staggered `index` props
    - _Requirements: 7.3, 13.3_

  - [x] 8.4 Implement Bakery Teaser section
    - Full-width deep red background (`bg-[#8B0000]`)
    - `<SectionHeading light>` heading
    - Horizontally scrollable row of bakery images (`overflow-x-auto` with flex row)
    - CTA button → `/bakery`
    - _Requirements: 7.4_

  - [x] 8.5 Implement Values section
    - Four icon cards: Locally Sourced, Affordable, Quality Assured, Continuously Innovating
    - Use Lucide React icons for each value
    - Wrap each card in `<AnimatedSection>` with staggered delay
    - _Requirements: 7.5_

  - [x] 8.6 Implement Social Proof Banner
    - Links to Instagram (`https://www.instagram.com/foods.gra`) and TikTok (`https://www.tiktok.com/@grafoodsng`) — open in new tab
    - WhatsApp order CTA button
    - _Requirements: 7.6_

  - [x] 8.7 Add Home page SEO metadata
    - Export static `metadata` with `title: "GRA Foods | Good, Rich, Affordable Nutrition"`, description, openGraph (with OG image), twitter card, and canonical URL `https://www.grafoods.com`
    - _Requirements: 12.1, 12.2, 12.3, 12.6_

- [x] 9. Products page (`app/products/page.tsx`)
  - [x] 9.1 Implement Products page Hero
    - 50 vh height, deep red background (`bg-[#8B0000]`), page title "Our Products"
    - _Requirements: 8.1_

  - [x] 9.2 Implement product category sections
    - For each category (Breakfast, Snacks, Staples, Add-ins), call `getProductsByCategory()` and render a `<SectionHeading>` followed by a responsive grid of `<ProductCard>` components
    - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
    - Wrap each category section in `<AnimatedSection>`
    - _Requirements: 8.2, 8.3, 8.5, 8.6, 8.7, 8.8_

  - [x] 9.3 Add Products page SEO metadata
    - Export static `metadata` with title `"Products | GRA Foods"`, description, openGraph, twitter card, and canonical URL `https://www.grafoods.com/products`
    - _Requirements: 12.1, 12.2, 12.3, 12.6_

- [x] 10. Bakery page (`app/bakery/page.tsx`)
  - [x] 10.1 Implement Bakery page Hero
    - 50 vh height, deep red background, consistent style with Products page Hero
    - _Requirements: 9.1_

  - [x] 10.2 Implement Savoury and Sweet sections
    - Call `getBakeryByCategory("Savoury")` and `getBakeryByCategory("Sweet")`
    - Render `<SectionHeading>` for each category followed by a responsive grid of `<BakeryCard>` components
    - Display the notice "Prices vary by size and customisation — chat with us to place your order." above the grid
    - No prices shown on any card
    - _Requirements: 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [x] 10.3 Add Bakery page SEO metadata
    - Export static `metadata` with title `"Bakery | GRA Foods"`, description, openGraph, twitter card, and canonical URL `https://www.grafoods.com/bakery`
    - _Requirements: 12.1, 12.2, 12.3, 12.6_

- [x] 11. About page (`app/about/page.tsx`)
  - [x] 11.1 Implement About page Hero
    - 50 vh height, deep red background, consistent style with other page Heroes
    - _Requirements: 10.1_

  - [x] 11.2 Implement Brand Narrative and Timeline section
    - Full brand narrative: "We are a Nigerian food innovation company transforming locally sourced millet into affordable nutritious breakfast and bakery products. We started as a regular confectionery, today our vision has grown into processing our locally produced grains into nutritious, affordable products that are better alternative to imported breakfast cereals and foods."
    - Visual timeline: founded 6+ years ago, Lagos, Nigeria
    - Wrap in `<AnimatedSection>`
    - _Requirements: 10.2_

  - [x] 11.3 Implement Mission, Vision, and Values section
    - Mission: "To process local foods into affordable, nutritious products."
    - Vision: "To be a leading brand for affordable nutrition across Africa."
    - Four Core Values with Lucide React icons: Continuous Innovation, Customer Satisfaction, Quality, Affordability
    - _Requirements: 10.3, 10.4, 10.5_

  - [x] 11.4 Implement Contact strip
    - Phone numbers (08148778669, 08068003788), hours (7:30 am – 8:45 pm), location (Lagos, Nigeria)
    - WhatsApp CTA button → `buildWhatsAppUrl("Hi GRA Foods, I'd like to place an order")`
    - _Requirements: 10.6_

  - [x] 11.5 Add About page SEO metadata
    - Export static `metadata` with title `"About | GRA Foods"`, description, openGraph, twitter card, and canonical URL `https://www.grafoods.com/about`
    - _Requirements: 12.1, 12.2, 12.3, 12.6_

- [x] 12. SEO infrastructure
  - [x] 12.1 Create `app/sitemap.ts`
    - Export a default function returning all four public page URLs (`/`, `/products`, `/bakery`, `/about`) with `lastModified` and `changeFrequency`
    - Use `SITE_URL` constant from `lib/products.ts`
    - _Requirements: 12.5_

  - [x] 12.2 Create `app/robots.ts`
    - Export a default function returning rules that allow all crawlers and point to the sitemap URL (`${SITE_URL}/sitemap.xml`)
    - _Requirements: 12.4_

- [x] 13. Final checkpoint — full build verification
  - `npx tsc --noEmit` exits with code 0 — zero TypeScript errors ✅
  - `next build` completes successfully — all 10 static routes generated (/, /products, /bakery, /about, /robots.txt, /sitemap.xml, /_not-found) ✅
  - No test files exist (optional property tests 2.3–2.6, 4.3, 5.3, 5.5 were skipped as marked optional)
  - Post-build data update: Tom Brown Cereals → 1kg / ₦7,000; Granola Cereals → per kg / ₦7,000 (confirmed by client) ✅
  - All WhatsApp CTAs route customers to the GRA Foods WhatsApp Business account with pre-filled item-specific messages ✅
  - _Requirements: 1.5, 15.3_

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (Properties 1–8 from the design document)
- Unit tests validate specific examples and edge cases
- `'use client'` is required on `Navbar.tsx` (uses `usePathname`, `useState`) and `AnimatedSection.tsx` (uses Framer Motion hooks); all page files remain Server Components
- Unsplash placeholder images are used for: hero background, Tom Brown, Granola, Milco Biscuits, Baked Chin-Chin, Fibre-Up Swallow, Meat Pie, Chicken Pie, Sausage Roll, Egg Roll, Hot Dog, Sandwich, Shawarma, Jam Donut — configure `next.config.js` `remotePatterns` accordingly
- `WHATSAPP_NUMBER` is defined once in `lib/products.ts` — never hardcoded elsewhere
- Client-provided images already exist in `public/images/`; the scaffolding task copies them with the correct filenames
- **Confirmed pricing (post-build update):** Tom Brown Cereals 1kg = ₦7,000; Granola Cereals per kg = ₦7,000 — updated in `lib/products.ts`
- **Outstanding items resolved:** Tom Brown and Granola prices confirmed by client; "Price on request" badges removed for both products
- **Deployment ready:** site passes `next build` with zero errors and is ready for manual deployment to Vercel
- **Test suite:** Vitest + React Testing Library configured; run `npm test` to execute all 10 property-based tests across 4 test files (`__tests__/products.test.ts`, `__tests__/animatedSection.test.ts`, `__tests__/navbar.test.tsx`, `__tests__/footer.test.tsx`) — **10/10 passing**

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1"] },
    { "id": 1, "tasks": ["2.2", "2.3", "2.4", "2.5", "2.6", "4.1", "4.2"] },
    { "id": 2, "tasks": ["4.3", "5.1", "5.2"] },
    { "id": 3, "tasks": ["5.3", "5.4", "6.1", "6.2"] },
    { "id": 4, "tasks": ["5.5"] },
    { "id": 5, "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "9.1", "9.2", "9.3", "10.1", "10.2", "10.3", "11.1", "11.2", "11.3", "11.4", "11.5", "12.1", "12.2"] }
  ]
}
```
