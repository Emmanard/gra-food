# Requirements Document

## Introduction

GRA Foods is a Nigerian food innovation company transforming locally sourced millet into affordable nutritious breakfast and bakery products. Founded over 6 years ago and based in Lagos, Nigeria, GRA Foods started as a regular confectionery; today its vision has grown into processing locally produced grains into nutritious, affordable products that are a better alternative to imported breakfast cereals and foods. This document defines the requirements for a production-ready, SEO-optimised marketing website hosted on Vercel at www.grafoods.com. The site is a multi-page Next.js 14 application whose primary goals are brand credibility, product discovery, and driving customer enquiries via WhatsApp. There is no e-commerce checkout; all purchase intent is routed through WhatsApp deep links.

The site comprises four pages — Home, Products, Bakery, and About — plus shared navigation and footer components. It must feel warm, wholesome, and proudly Nigerian, consistent with the GRA Foods brand identity.

---

## Glossary

- **Website**: The GRA Foods marketing website at www.grafoods.com.
- **Next.js App**: The Next.js 14 (App Router) TypeScript application that powers the Website.
- **Visitor**: Any person who loads a page of the Website in a browser.
- **WhatsApp CTA**: A hyperlink that opens WhatsApp with a pre-filled message directed to the GRA Foods business number.
- **Product Card**: A UI component that displays a single product's image, name, weight/size, price, and a WhatsApp CTA.
- **Bakery Card**: A UI component that displays a single bakery item's image, name, and a WhatsApp enquiry CTA (no price shown).
- **Navbar**: The sticky top navigation bar present on every page.
- **Footer**: The bottom section present on every page containing contact details, quick links, and social icons.
- **AnimatedSection**: A reusable wrapper component that applies a fade-up scroll animation to its children.
- **Hero**: A full- or half-viewport banner section at the top of a page.
- **OG Image**: An Open Graph image used for social media link previews.
- **Sitemap**: An XML sitemap at /sitemap.xml listing all public pages.
- **Robots File**: A robots.txt file at /robots.txt controlling crawler access.
- **WCAG AA**: Web Content Accessibility Guidelines 2.1 Level AA.
- **Vercel Analytics**: Vercel's built-in web analytics service embedded in the Next.js App.

---

## Requirements

### Requirement 1: Project Foundation and Tech Stack

**User Story:** As a developer, I want a well-structured Next.js 14 project with TypeScript, Tailwind CSS, and the specified dependencies, so that the codebase is maintainable, type-safe, and deployable to Vercel without additional configuration.

#### Acceptance Criteria

1. THE Next.js App SHALL use Next.js 14 with the App Router, TypeScript, and Tailwind CSS v3.
2. THE Next.js App SHALL include Framer Motion for animations, Lucide React for icons, and next/font/google for Playfair Display and DM Sans typefaces.
3. THE Next.js App SHALL include Vercel Analytics via the `@vercel/analytics` package, injected in the root layout.
4. THE Next.js App SHALL follow the folder structure: `app/`, `components/`, `public/images/`, `lib/`, and `next.config.js` as specified in the implementation brief.
5. THE Next.js App SHALL compile without TypeScript errors and pass `next build` successfully.
6. WHEN a Visitor loads any page, THE Next.js App SHALL serve the Playfair Display font for headings and DM Sans for body text, loaded via `next/font/google` with no layout shift.

---

### Requirement 2: Brand Identity and Design System

**User Story:** As a brand owner, I want every page to consistently reflect the GRA Foods visual identity, so that Visitors associate the site with a warm, trustworthy, and proudly Nigerian food brand.

#### Acceptance Criteria

1. THE Website SHALL apply the following colour palette throughout all pages: Deep Red `#8B0000` (primary), Gold `#FFB800` (accent), Orange-Gold `#E07B00` (secondary accent), Warm Off-White `#FFF8F0` (background), Dark Charcoal `#1A1A1A` (body text), and Warm Green `#4A7C59` (natural/healthy badges only).
2. THE Website SHALL display the GRA Foods logo sourced from `/public/images/logo.svg` in the Navbar and Footer.
3. THE Website SHALL use Playfair Display for all heading elements (h1–h3) and DM Sans for all body text and UI labels.
4. THE Website SHALL maintain WCAG AA colour contrast ratios for all text-on-background combinations.
5. THE Website SHALL NOT use a cold, clinical, or startup-style aesthetic; all design decisions SHALL reinforce the brand mood: Warm, Wholesome, Nigerian Pride, Trustworthy, and Accessible.

---

### Requirement 3: Shared Navigation (Navbar)

**User Story:** As a Visitor, I want a clear, accessible navigation bar on every page, so that I can move between sections of the site and quickly reach the WhatsApp contact channel.

#### Acceptance Criteria

1. THE Navbar SHALL be sticky (fixed to the top of the viewport) on all pages and screen sizes.
2. THE Navbar SHALL display the GRA Foods logo on the left and navigation links (Home, Products, Bakery, About) on the right on desktop viewports (≥ 768 px wide).
3. WHEN a Visitor views the Website on a viewport narrower than 768 px, THE Navbar SHALL replace the navigation links with a hamburger menu icon that toggles a mobile navigation drawer.
4. THE Navbar SHALL include a WhatsApp icon link that opens the GRA Foods WhatsApp chat in a new tab.
5. WHEN a Visitor activates the hamburger menu, THE Navbar SHALL display all navigation links in the mobile drawer and provide a visible close control.
6. THE Navbar SHALL indicate the currently active page link with a distinct visual style.
7. THE Navbar SHALL provide ARIA labels for the hamburger button, close button, and WhatsApp link to meet WCAG AA requirements.

---

### Requirement 4: Shared Footer

**User Story:** As a Visitor, I want a footer on every page with contact details and quick links, so that I can find GRA Foods' contact information and navigate the site from the bottom of any page.

#### Acceptance Criteria

1. THE Footer SHALL be present on every page and contain three columns: (1) Logo and tagline, (2) Quick navigation links, (3) Contact information.
2. THE Footer SHALL display the business phone numbers (08148778669 and 08068003788), operating hours (7:30 am – 8:45 pm), location (Lagos, Nigeria), and social media icons for Instagram (@foods.gra) and TikTok (@grafoodsng).
3. THE Footer SHALL display the tagline "Good, Rich, Affordable Nutrition for All" beneath the logo.
4. WHEN a Visitor clicks a social media icon in the Footer, THE Footer SHALL open the corresponding social media profile in a new browser tab (Instagram: https://www.instagram.com/foods.gra; TikTok: https://www.tiktok.com/@grafoodsng).
5. THE Footer SHALL include a copyright notice with the current year and "GRA Foods".

---

### Requirement 5: Floating WhatsApp Button

**User Story:** As a Visitor, I want a persistent WhatsApp contact button visible on every page, so that I can initiate a WhatsApp conversation with GRA Foods at any point during my visit.

#### Acceptance Criteria

1. THE WhatsApp Button SHALL be fixed to the bottom-right corner of the viewport on all pages and all screen sizes.
2. THE WhatsApp Button SHALL be a circular green button containing the WhatsApp icon.
3. WHEN a Visitor clicks the WhatsApp Button, THE WhatsApp Button SHALL open `https://wa.me/2348148778669?text=Hello%2C%20I%27d%20like%20to%20place%20an%20order` in a new browser tab.
4. THE WhatsApp Button SHALL include an ARIA label "Chat with us on WhatsApp" for screen reader accessibility.
5. THE WhatsApp Button SHALL have a z-index sufficient to remain visible above all other page content.

---

### Requirement 6: WhatsApp CTA Link Logic

**User Story:** As a Visitor, I want to be able to tap a button and open WhatsApp with a pre-filled message, so that I can enquire about or order a product through a WhatsApp conversation with GRA Foods.

#### Acceptance Criteria

1. THE Website SHALL have NO checkout, cart, or payment functionality. All orders and enquiries are completed through WhatsApp conversation.
2. THE Website SHALL construct all WhatsApp deep links using the format `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`.
3. WHEN a Visitor clicks a product WhatsApp CTA, THE Website SHALL open WhatsApp pre-filled with: "Hi GRA Foods, I'd like to enquire about [Product Name] [Size]".
4. WHEN a Visitor clicks a bakery item WhatsApp CTA, THE Website SHALL open WhatsApp pre-filled with: "Hi GRA Foods, I'd like to enquire about [Bakery Item]".
5. WHEN a Visitor clicks a general WhatsApp CTA (Hero, Footer, floating button), THE Website SHALL open WhatsApp pre-filled with: "Hi GRA Foods, I'd like to place an order".
6. THE Website SHALL define the WhatsApp number as a single constant (`WHATSAPP_NUMBER = "2348148778669"`) in `lib/products.ts` so that updating the number requires a change in one place only.

---

### Requirement 7: Home Page

**User Story:** As a Visitor landing on the home page, I want to immediately understand what GRA Foods offers and be guided toward exploring products or placing an order, so that I can make a purchase decision quickly.

#### Acceptance Criteria

1. THE Home Page SHALL contain a full-viewport Hero section with a background food image (Unsplash placeholder until a dedicated hero shot is provided by the client), a dark overlay, the GRA Foods logo, the H1 tagline "Good, Rich, Affordable Nutrition for All", and two CTA buttons: "Shop Products" (linking to `/products`) and "Order via WhatsApp".
2. THE Home Page SHALL contain a Brand Story Strip with a two-column layout (image on one side, text on the other), displaying the brand story "We started as a regular confectionery, today our vision has grown into processing our locally produced grains into nutritious, affordable products that are better alternative to imported breakfast cereals and foods.", and a link to `/about`.
3. THE Home Page SHALL contain a Featured Products section displaying exactly three Product Cards: Wholemeal Pap Multi-Grain, Wholemeal Pap Yellow Corn, and Naturefill Mix Soy Powder, each with a WhatsApp CTA.
4. THE Home Page SHALL contain a Bakery Teaser section with a full-width deep red background, a heading, a horizontally scrollable row of bakery images, and a CTA linking to `/bakery`.
5. THE Home Page SHALL contain a Values section displaying four icon cards: Locally Sourced, Affordable, Quality Assured, and Continuously Innovating.
6. THE Home Page SHALL contain a Social Proof Banner with links to the GRA Foods Instagram profile (https://www.instagram.com/foods.gra) and TikTok profile (https://www.tiktok.com/@grafoodsng) and a WhatsApp order CTA.
7. WHEN a Visitor scrolls down the Home Page, THE AnimatedSection component SHALL apply a fade-up animation (opacity 0→1, translateY 40px→0, duration 0.6 s) to each major section as it enters the viewport.
8. WHEN a Visitor views the Home Page on a viewport narrower than 768 px, THE Home Page SHALL stack all multi-column layouts into a single column.

---

### Requirement 8: Products Page

**User Story:** As a Visitor interested in buying GRA Foods products, I want to browse all available products grouped by category with clear pricing, so that I can identify what I want and place an order via WhatsApp.

#### Acceptance Criteria

1. THE Products Page SHALL contain a Hero section with a 50 vh height and a deep red background.
2. THE Products Page SHALL display products grouped under the following categories: Breakfast, Snacks, Staples, and Add-ins.
3. THE Products Page SHALL display the following products with their names, weights, and prices:
   - Breakfast: Wholemeal Pap Multi-Grain 250g ₦1,700 | Wholemeal Pap Yellow Corn 250g ₦1,200 | Tom Brown Cereals (price on request) | Granola Cereals (price on request)
   - Snacks: Milco Biscuits ₦300/sachet | Baked Chin-Chin 150g ₦1,500
   - Staples: Fibre-Up Swallow ₦3,000/kg
   - Add-ins: Naturefill Mix Soy Powder 250g ₦2,000 | 500g ₦4,500 | 1kg ₦8,500
4. WHEN a Visitor clicks the WhatsApp CTA on a Product Card, THE Products Page SHALL open WhatsApp with a pre-filled message asking about that specific product (e.g. "Hi GRA Foods, I'd like to enquire about Wholemeal Pap Multi-Grain 250g"). There is NO direct checkout — all orders are placed through WhatsApp conversation.
5. THE Products Page SHALL display each product in a Product Card containing: product image, product name, weight/size, price (or "Price on request" for Tom Brown, Granola, and any unpriced items), and a WhatsApp enquiry button labelled "Order via WhatsApp".
6. WHEN a Visitor views the Products Page on a viewport narrower than 768 px, THE Products Page SHALL display Product Cards in a single-column layout.
7. WHEN a Visitor views the Products Page on a viewport between 768 px and 1024 px, THE Products Page SHALL display Product Cards in a two-column grid.
8. WHEN a Visitor views the Products Page on a viewport wider than 1024 px, THE Products Page SHALL display Product Cards in a three-column grid.

---

### Requirement 9: Bakery Page

**User Story:** As a Visitor interested in GRA Foods' bakery items, I want to browse all savoury and sweet items with enquiry CTAs, so that I can contact GRA Foods to place a custom order.

#### Acceptance Criteria

1. THE Bakery Page SHALL contain a Hero section consistent in style with the Products Page Hero.
2. THE Bakery Page SHALL display savoury items: Meat Pie, Chicken Pie, Sausage Roll, Egg Roll, Hot Dog, Sandwich, Burger, Shawarma, and Pizza.
3. THE Bakery Page SHALL display sweet items: Jam Donut and Celebration Cakes.
4. THE Bakery Page SHALL NOT display prices for any bakery item.
5. THE Bakery Page SHALL display the notice: "Prices vary by size and customisation — chat with us to place your order."
6. WHEN a Visitor clicks the WhatsApp CTA on a Bakery Card, THE Bakery Page SHALL open a WhatsApp chat pre-filled with the specific bakery item name and an enquiry message.
7. THE Bakery Page SHALL group items under clearly labelled "Savoury" and "Sweet" headings.

---

### Requirement 10: About Page

**User Story:** As a Visitor who wants to learn about GRA Foods, I want to read the brand story, mission, vision, and values, so that I can trust the brand and feel confident placing an order.

#### Acceptance Criteria

1. THE About Page SHALL contain a Hero section consistent in style with the other page Heroes.
2. THE About Page SHALL display the full brand narrative — "We are a Nigerian food innovation company transforming locally sourced millet into affordable nutritious breakfast and bakery products. We started as a regular confectionery, today our vision has grown into processing our locally produced grains into nutritious, affordable products that are better alternative to imported breakfast cereals and foods." — and a visual timeline of GRA Foods' history (founded 6+ years ago, Lagos, Nigeria).
3. THE About Page SHALL display the Mission statement: "To process local foods into affordable, nutritious products."
4. THE About Page SHALL display the Vision statement: "To be a leading brand for affordable nutrition across Africa."
5. THE About Page SHALL display the four Core Values: Continuous Innovation, Customer Satisfaction, Quality, and Affordability.
6. THE About Page SHALL contain a Contact strip at the bottom with the business phone numbers (08148778669 and 08068003788), operating hours (7:30 am – 8:45 pm), location (Lagos, Nigeria), and a WhatsApp CTA.

---

### Requirement 11: Image Handling and Performance

**User Story:** As a Visitor on a mobile network, I want images to load quickly and not cause layout shifts, so that I can browse the site without frustration on a slow connection.

#### Acceptance Criteria

1. THE Website SHALL use the Next.js `<Image>` component for all images to enable automatic optimisation, lazy loading, and WebP conversion.
2. THE Website SHALL specify `width`, `height`, and `alt` attributes on every `<Image>` component.
3. THE Website SHALL use `priority` loading for above-the-fold Hero images to avoid Largest Contentful Paint delays.
4. THE Website SHALL store all images in `/public/images/` and reference them with absolute paths from the public root.
5. IF an image fails to load, THE Website SHALL display a meaningful `alt` text description in place of the image.
6. THE Website SHALL copy the following image files from the workspace root to `/public/images/` with the renamed filenames listed below during project setup. The originals SHALL NOT be renamed; only copies with new names are required:
   - `WhatsApp Image 2026-05-06 at 20.09.47.svg` → `logo.svg` (GRA Foods logo)
   - `WhatsApp Image 2026-05-06 at 20.08.51.jpeg` → `naturefill.jpg` (Naturefill Mix Soy Powder product shot)
   - `WhatsApp Image 2026-05-06 at 20.15.25.jpeg` → `wholemeal-pap-1.jpg` (Wholemeal Pap product shot)
   - `WhatsApp Image 2026-05-06 at 20.16.52.jpeg` → `wholemeal-pap-2.jpg` (Wholemeal Pap product shot)
   - `WhatsApp Image 2026-05-13 at 16.27.49.jpeg` → `bakery-burger.jpg` (Burger)
   - `WhatsApp Image 2026-05-13 at 16.27.50.jpeg` → `bakery-pizza-1.jpg` (Pizza)
   - `WhatsApp Image 2026-05-13 at 16.27.51 (1).jpeg` → `bakery-cake-small.jpg` (Small Cake)
   - `WhatsApp Image 2026-05-13 at 16.27.51.jpeg` → `bakery-pizza-2.jpg` (Pizza)
   - `WhatsApp Image 2026-05-13 at 16.27.52.jpeg` → `bakery-cake-large.jpg` (Large/Celebration Cake)
7. FOR bakery items that do not have a client-provided photo (Meat Pie, Chicken Pie, Sausage Roll, Egg Roll, Hot Dog, Sandwich, Shawarma, Jam Donut), THE Website SHALL use royalty-free placeholder images sourced from Unsplash (https://unsplash.com) with descriptive `alt` text. These SHALL be replaced with real GRA Foods photos when available.
8. THE Website SHALL NOT use the Naturefill or Wholemeal Pap product images as the hero background. The hero section SHALL use a suitable Unsplash food image as placeholder until a dedicated hero shot is provided by the client.

---

### Requirement 12: SEO and Metadata

**User Story:** As a brand owner, I want every page to have complete SEO metadata and structured data, so that GRA Foods ranks well in search results and social media previews look professional.

#### Acceptance Criteria

1. THE Website SHALL use the Next.js Metadata API (`generateMetadata` or static `metadata` export) to define `title`, `description`, `openGraph`, and `twitter` metadata for every page.
2. THE Website SHALL include a unique, descriptive `<title>` tag for each page following the pattern "[Page Name] | GRA Foods".
3. THE Website SHALL include an OG image for each page used in social media link previews.
4. THE Website SHALL serve a valid `robots.txt` at `/robots.txt` allowing all crawlers and pointing to the sitemap.
5. THE Website SHALL serve a valid XML sitemap at `/sitemap.xml` listing all four public pages with their canonical URLs.
6. THE Website SHALL include canonical URL `<link>` tags on every page pointing to `https://www.grafoods.com/[path]`.
7. THE Website SHALL use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) throughout all pages.

---

### Requirement 13: Animations

**User Story:** As a Visitor, I want smooth, subtle animations as I scroll through the site, so that the browsing experience feels polished and engaging without being distracting.

#### Acceptance Criteria

1. THE AnimatedSection component SHALL accept children and wrap them in a Framer Motion element that animates from `opacity: 0, y: 40` to `opacity: 1, y: 0` when the element enters the viewport.
2. THE AnimatedSection component SHALL use a transition duration of 0.6 seconds with an ease-out curve.
3. WHEN multiple Product Cards or Bakery Cards are rendered in a grid, THE Website SHALL apply a staggered delay (0.1 s per card) to their entrance animations.
4. WHEN a Visitor has enabled the `prefers-reduced-motion` media query, THE AnimatedSection component SHALL skip all motion animations and render content immediately at full opacity.

---

### Requirement 14: Accessibility

**User Story:** As a Visitor using assistive technology, I want the Website to be navigable and understandable without a mouse, so that GRA Foods is accessible to all users regardless of ability.

#### Acceptance Criteria

1. THE Website SHALL achieve WCAG AA compliance for colour contrast on all text elements.
2. THE Website SHALL provide descriptive `alt` text for all images.
3. THE Website SHALL ensure all interactive elements (buttons, links, inputs) are keyboard-focusable and have visible focus indicators.
4. THE Website SHALL use ARIA roles and labels on all landmark regions and interactive components where native HTML semantics are insufficient.
5. THE Website SHALL ensure the mobile navigation drawer is focus-trapped while open, preventing keyboard focus from escaping to background content.
6. THE Website SHALL use `lang="en"` on the root `<html>` element.

---

### Requirement 15: Deployment Readiness

**User Story:** As a developer, I want the site to build cleanly and be ready for manual deployment to Vercel, so that the client can publish updates at their own pace without requiring an automated pipeline.

#### Acceptance Criteria

1. THE Next.js App SHALL be deployable to Vercel's free tier without additional build configuration beyond `next build`.
2. THE Next.js App SHALL include a `next.config.js` that configures the `images.domains` or `images.remotePatterns` field if any external image sources are used.
3. THE Next.js App SHALL pass `next build` with zero TypeScript errors and zero build errors before being considered ready for deployment.

> **Note:** Automatic GitHub → Vercel CI/CD pipeline is out of scope. The client will handle deployment manually via the Vercel dashboard or CLI. No Vercel project linking, environment variable setup, or GitHub integration is required as part of this spec.

---

## Outstanding Items (Awaiting Client Confirmation)

The following details have not yet been confirmed by the client and must be resolved before the corresponding UI sections can be finalised:

| # | Item | Impact |
|---|------|--------|
| 1 | **Tom Brown Cereals price** — not yet confirmed | Product Card shows "Price on request" until confirmed |
| 2 | **Granola Cereals price** — not yet confirmed | Product Card shows "Price on request" until confirmed |
| 3 | **NAFDAC registration numbers** — if available, displaying these builds consumer trust | Optional trust badge on Product Cards / About page |
| 4 | **Contact form** — current assumption is WhatsApp + phone only; confirm this is acceptable | If a form is needed, About page Contact strip must be updated |
