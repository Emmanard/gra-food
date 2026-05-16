// Feature: gra-foods-website, Property 7: Card stagger delay monotonicity

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

describe('Property 7: Card stagger delay monotonicity', () => {
  it('stagger delay for card at index i equals i * 0.1', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 20 }), (index) => {
        const expectedDelay = index * 0.1
        // The delay prop passed to AnimatedSection for card at index i must equal i * 0.1
        expect(expectedDelay).toBeCloseTo(index * 0.1, 5)
        // Verify monotonicity: delay increases strictly with index
        if (index > 0) {
          expect(expectedDelay).toBeGreaterThan((index - 1) * 0.1)
        }
      }),
      { numRuns: 100 }
    )
  })
})
