// Feature: gra-foods-website, Property 6: Active navigation link uniqueness

import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { render, cleanup } from '@testing-library/react'
import Navbar from '@/components/Navbar'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  },
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

import { usePathname } from 'next/navigation'

describe('Property 6: Active navigation link uniqueness', () => {
  beforeEach(() => {
    cleanup()
  })

  it('Navbar marks exactly one link as active for any valid route', () => {
    const routes = ['/', '/products', '/bakery', '/about']
    fc.assert(
      fc.property(fc.constantFrom(...routes), (pathname) => {
        vi.mocked(usePathname).mockReturnValue(pathname)
        const { container } = render(<Navbar />)
        // The Navbar renders two nav contexts: desktop (aria-label="Main navigation")
        // and mobile drawer (aria-label="Mobile navigation"). Check each independently.
        const desktopNav = container.querySelector('[aria-label="Main navigation"]')
        const mobileNav = container.querySelector('[aria-label="Mobile navigation"]')

        const desktopActiveLinks = desktopNav
          ? desktopNav.querySelectorAll('[aria-current="page"]')
          : []
        const mobileActiveLinks = mobileNav
          ? mobileNav.querySelectorAll('[aria-current="page"]')
          : []

        // Each nav context must have exactly one active link pointing to the current pathname
        expect(desktopActiveLinks).toHaveLength(1)
        expect((desktopActiveLinks[0] as HTMLAnchorElement).getAttribute('href')).toBe(pathname)

        expect(mobileActiveLinks).toHaveLength(1)
        expect((mobileActiveLinks[0] as HTMLAnchorElement).getAttribute('href')).toBe(pathname)

        cleanup()
      }),
      { numRuns: 100 }
    )
  })
})
