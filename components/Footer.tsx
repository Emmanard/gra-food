import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";

// Custom Instagram SVG (lucide-react version installed doesn't include it)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Custom TikTok SVG since lucide-react doesn't include it
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Bakery", href: "/bakery" },
  { label: "About", href: "/about" },
];

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-brand-text text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo.svg"
              alt="GRA Foods logo"
              width={120}
              height={40}
              className="object-contain"
            />
            <p className="text-[#F5E6D3] text-sm leading-relaxed">
              Good, Rich, Affordable Nutrition for All
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-gold font-semibold text-base uppercase tracking-wide">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2">
                {quickLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[#D4C4B0] text-sm hover:text-brand-gold transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-gold font-semibold text-base uppercase tracking-wide">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-[#D4C4B0] text-sm">
                <Phone size={16} className="text-brand-gold shrink-0" aria-hidden="true" />
                <a href="tel:+2348148778669" className="hover:text-brand-gold transition-colors duration-200">08148778669</a>
              </li>
              <li className="flex items-center gap-2 text-[#D4C4B0] text-sm">
                <Phone size={16} className="text-brand-gold shrink-0" aria-hidden="true" />
                <a href="tel:+2348068003788" className="hover:text-brand-gold transition-colors duration-200">08068003788</a>
              </li>
              <li className="flex items-center gap-2 text-[#D4C4B0] text-sm">
                <Clock size={16} className="text-brand-gold shrink-0" aria-hidden="true" />
                <span>7:30 am – 8:45 pm</span>
              </li>
              <li className="flex items-center gap-2 text-[#D4C4B0] text-sm">
                <MapPin size={16} className="text-brand-gold shrink-0" aria-hidden="true" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-1">
              <a
                href="https://www.instagram.com/foods.gra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GRA Foods on Instagram"
                className="text-[#D4C4B0] hover:text-brand-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-text rounded-sm"
              >
                <InstagramIcon className="w-[22px] h-[22px]" />
              </a>
              <a
                href="https://www.tiktok.com/@grafoodsng"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GRA Foods on TikTok"
                className="text-[#D4C4B0] hover:text-brand-gold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-text rounded-sm"
              >
                <TikTokIcon className="w-[22px] h-[22px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-[#D4C4B0] text-sm">
            &copy; {new Date().getFullYear()} GRA Foods
          </p>
        </div>
      </div>
    </footer>
  );
}
