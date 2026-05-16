'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../lib/products';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Bakery', href: '/bakery' },
  { label: 'About', href: '/about' },
] as const;

const whatsappUrl = buildWhatsAppUrl("Hi GRA Foods, I'd like to place an order");

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Refs for focus trap
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  // Focus the close button when drawer opens
  useEffect(() => {
    if (drawerOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [drawerOpen]);

  // Focus trap: cycle Tab/Shift+Tab within drawer elements only
  const handleDrawerKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!drawerOpen || !drawerRef.current) return;

      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const focusableArray = Array.from(focusable).filter(
        (el) => !el.hasAttribute('disabled')
      );

      if (focusableArray.length === 0) return;

      const first = focusableArray[0];
      const last = focusableArray[focusableArray.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if focus is on first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if focus is on last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [drawerOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleDrawerKeyDown);
    return () => document.removeEventListener('keydown', handleDrawerKeyDown);
  }, [handleDrawerKeyDown]);

  // Prevent body scroll and signal drawer state when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('drawer-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('drawer-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('drawer-open');
    };
  }, [drawerOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FFF8F0] shadow-sm">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={closeDrawer}>
            <Image
              src="/images/logo.svg"
              alt="GRA Foods logo"
              width={120}
              height={48}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`text-sm transition-colors hover:text-[#8B0000] ${
                  isActive(href)
                    ? 'font-semibold text-[#8B0000]'
                    : 'font-medium text-[#1A1A1A]'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* WhatsApp icon link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center rounded-full bg-[#25D366] p-2 text-white transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.428a.75.75 0 0 0 .916.916l5.638-1.47A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 0 1-4.964-1.355l-.356-.213-3.688.961.982-3.594-.232-.37A9.75 9.75 0 1 1 12 21.75z" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            onClick={openDrawer}
            className="flex items-center justify-center rounded-md p-2 text-[#1A1A1A] transition-colors hover:bg-[#FFB800]/20 focus:outline-none focus:ring-2 focus:ring-[#8B0000] md:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          aria-hidden="true"
          onClick={closeDrawer}
        />
      )}

      {/* Mobile drawer panel */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-50 w-full transform bg-[#FFF8F0] shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#FFB800]/30 px-6 py-4">
          <Link href="/" onClick={closeDrawer}>
            <Image
              src="/images/logo.svg"
              alt="GRA Foods logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
            className="flex items-center justify-center rounded-md p-2 text-[#1A1A1A] transition-colors hover:bg-[#FFB800]/20 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer body — fills remaining height, stacks nav + pushes CTA to bottom */}
        <div className="flex h-[calc(100%-73px)] flex-col px-6 py-8">
          {/* Nav links */}
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                onClick={closeDrawer}
                className={`flex items-center gap-3 rounded-xl px-4 py-4 text-lg transition-colors ${
                  isActive(href)
                    ? 'bg-[#8B0000]/8 font-semibold text-[#8B0000]'
                    : 'font-medium text-[#1A1A1A] hover:bg-[#FFB800]/10 hover:text-[#8B0000]'
                }`}
              >
                {isActive(href) && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#8B0000]" aria-hidden="true" />
                )}
                {label}
              </Link>
            ))}
          </nav>

          {/* Push CTA to bottom */}
          <div className="flex-1" />

          {/* WhatsApp CTA */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDrawer}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.428a.75.75 0 0 0 .916.916l5.638-1.47A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 0 1-4.964-1.355l-.356-.213-3.688.961.982-3.594-.232-.37A9.75 9.75 0 1 1 12 21.75z" />
              </svg>
              Chat on WhatsApp
            </a>
            <p className="text-center text-xs text-[#1A1A1A]/40">
              Good, Rich, Affordable Nutrition
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
