# GRA Foods — Official Website

> **Good, Rich, Affordable Nutrition for All**

Marketing website for [GRA Foods](https://www.grafoods.com) — a Nigerian food innovation company transforming locally sourced millet into affordable, nutritious breakfast and bakery products. Built with Next.js 14 and deployed on Vercel.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Testing | Vitest + React Testing Library |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

---

## Project Structure

```
gra-foods/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar, Footer, Analytics)
│   ├── page.tsx            # Home page
│   ├── products/page.tsx   # Products catalogue
│   ├── bakery/page.tsx     # Bakery & snacks menu
│   ├── about/page.tsx      # Brand story, mission, values
│   ├── sitemap.ts          # Auto-generated XML sitemap
│   └── robots.ts           # robots.txt
├── components/             # Shared UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx  # Floating WhatsApp CTA
│   ├── AnimatedSection.tsx # Scroll fade-up wrapper
│   ├── ProductCard.tsx
│   ├── BakeryCard.tsx
│   └── SectionHeading.tsx
├── lib/
│   └── products.ts         # All product data + WhatsApp URL builder
├── public/
│   └── images/             # All static image assets
├── __tests__/              # Vitest test files
├── vitest.config.ts
├── tailwind.config.ts
└── next.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/gra-foods.git
cd gra-foods
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Run Tests

```bash
npm test              # run all tests once
npm run test:watch    # watch mode
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, brand story, featured products, bakery teaser, values |
| `/products` | Full product catalogue grouped by category with pricing |
| `/bakery` | Bakery and snacks menu with WhatsApp enquiry CTAs |
| `/about` | Brand story, mission, vision, core values, contact strip |

---

## Content Updates

All product and bakery data lives in a single file — **`lib/products.ts`**. To update prices, add products, or change WhatsApp number:

```ts
// Update WhatsApp number in one place
export const WHATSAPP_NUMBER = "2348148778669";

// Add or edit products in the products array
export const products: Product[] = [ ... ];

// Add or edit bakery items in the bakeryItems array
export const bakeryItems: BakeryItem[] = [ ... ];
```

No component code needs to change for content updates.

---

## Image Assets

Place all images in `/public/images/`. Reference them in components as `/images/filename.jpg`.

| File | Usage |
|------|-------|
| `logo.svg` | Navbar and Footer logo |
| `naturefill.jpg` | Naturefill Mix Soy Powder |
| `wholemeal-pap-1.jpg` | Wholemeal Pap Multi-Grain |
| `wholemeal-pap-2.jpg` | Wholemeal Pap Yellow Corn |
| `bakery-burger.jpg` | Burger (Bakery page) |
| `bakery-pizza-1.jpg` | Pizza (Bakery page) |
| `bakery-cake-large.jpg` | Celebration Cake (Bakery page) |

Unsplash placeholder images are used for items without client photos. Replace them by updating the `image` field in `lib/products.ts` and dropping the new file in `/public/images/`.

---

## Environment Variables

This project requires no environment variables for v1. All content is static.

If you add server-side features in future, create a `.env.local` file — it is already in `.gitignore` and will never be committed.

---

## Deployment

The site is deployed to [Vercel](https://vercel.com) manually via the Vercel dashboard.

1. Push changes to the `main` branch on GitHub
2. Log in to [vercel.com](https://vercel.com) and import the repository
3. Vercel detects Next.js automatically — no build config needed
4. Set the custom domain `www.grafoods.com` in the Vercel project settings
5. Point your domain DNS to Vercel's nameservers

---

## Brand Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `brand.red` | `#8B0000` | Primary — headers, hero backgrounds |
| `brand.gold` | `#FFB800` | Accent — buttons, highlights |
| `brand.orange` | `#E07B00` | Secondary accent |
| `brand.bg` | `#FFF8F0` | Page background |
| `brand.text` | `#1A1A1A` | Body text |
| `brand.green` | `#4A7C59` | Natural/healthy badges only |

---

## Contact

**GRA Foods**
- 📍 Lagos, Nigeria
- 📞 08148778669 / 08068003788
- 🕐 7:30 am – 8:45 pm
- 📸 Instagram: [@foods.gra](https://www.instagram.com/foods.gra)
- 🎵 TikTok: [@grafoodsng](https://www.tiktok.com/@grafoodsng)
- 💬 WhatsApp: [Chat with us](https://wa.me/2348148778669)

---

© 2025 GRA Foods. All rights reserved.