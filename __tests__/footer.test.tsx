// Feature: gra-foods-website, Property 8: Copyright year currency

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Footer from '@/components/Footer'

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

describe('Property 8: Copyright year currency', () => {
  it('Footer copyright contains the current year', () => {
    const year = new Date().getFullYear()
    const { getByText } = render(<Footer />)
    // The footer renders: © {year} GRA Foods
    const copyright = getByText(new RegExp(`${year}.*GRA Foods|GRA Foods.*${year}`))
    expect(copyright.textContent).toContain(String(year))
  })
})
