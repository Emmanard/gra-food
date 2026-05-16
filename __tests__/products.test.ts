// Feature: gra-foods-website, Property 2: Item-specific WhatsApp message encoding
// Feature: gra-foods-website, Property 3: Price formatting correctness
// Feature: gra-foods-website, Property 4: Featured products count invariant
// Feature: gra-foods-website, Property 5: Alt text completeness

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  buildWhatsAppUrl,
  products,
  bakeryItems,
  formatPrice,
  getFeaturedProducts,
} from '@/lib/products'

// ─── Property 2: Item-specific WhatsApp message encoding ──────────────────────

describe('Property 2: Item-specific WhatsApp message encoding', () => {
  it('product WhatsApp URL decodes to contain product name and size', () => {
    fc.assert(
      fc.property(fc.constantFrom(...products), (product) => {
        const url = buildWhatsAppUrl(
          `Hi GRA Foods, I'd like to enquire about ${product.name} ${product.size}`
        )
        const decoded = decodeURIComponent(new URL(url).searchParams.get('text')!)
        expect(decoded).toContain(product.name)
        expect(decoded).toContain(product.size)
      }),
      { numRuns: 100 }
    )
  })

  it('bakery item WhatsApp URL decodes to contain item name', () => {
    fc.assert(
      fc.property(fc.constantFrom(...bakeryItems), (item) => {
        const url = buildWhatsAppUrl(
          `Hi GRA Foods, I'd like to enquire about ${item.name}`
        )
        const decoded = decodeURIComponent(new URL(url).searchParams.get('text')!)
        expect(decoded).toContain(item.name)
      }),
      { numRuns: 100 }
    )
  })
})

// ─── Property 3: Price formatting correctness ─────────────────────────────────

describe('Property 3: Price formatting correctness', () => {
  it('formatPrice returns ₦-prefixed string for any positive price', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10_000_000 }), (price) => {
        const result = formatPrice(price)
        expect(result).toMatch(/^₦[\d,]+$/)
      }),
      { numRuns: 100 }
    )
  })

  it('formatPrice returns "Price on request" for null', () => {
    expect(formatPrice(null)).toBe('Price on request')
  })
})

// ─── Property 4: Featured products count invariant ────────────────────────────

describe('Property 4: Featured products count invariant', () => {
  it('getFeaturedProducts always returns exactly 3 featured products', () => {
    const featured = getFeaturedProducts()
    expect(featured).toHaveLength(3)
    featured.forEach((p) => expect(p.featured).toBe(true))
  })
})

// ─── Property 5: Alt text completeness ───────────────────────────────────────

describe('Property 5: Alt text completeness', () => {
  it('every product has a non-empty alt string', () => {
    fc.assert(
      fc.property(fc.constantFrom(...products), (product) => {
        expect(product.alt).toBeTruthy()
        expect(product.alt.trim().length).toBeGreaterThan(0)
      }),
      { numRuns: 100 }
    )
  })

  it('every bakery item has a non-empty alt string', () => {
    fc.assert(
      fc.property(fc.constantFrom(...bakeryItems), (item) => {
        expect(item.alt).toBeTruthy()
        expect(item.alt.trim().length).toBeGreaterThan(0)
      }),
      { numRuns: 100 }
    )
  })
})
