"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CtaButton } from "@/components/cta-button";
import { InstagramIcon, TikTokIcon, XIcon } from "@/components/icons";
import { brandConfig } from "@/config/brand";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/catchy-verifs", label: "Catchy Verifs" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[var(--brand-accent)]"
        >
          Catchy
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={brandConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Catchy Instagram"
            className="inline-flex rounded-full p-2 text-slate-500 transition hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-accent)]"
          >
            <InstagramIcon />
          </Link>
          <CtaButton href="/catchy-verifs" className="whitespace-nowrap">
            Apply for a Free Catchy Verif
          </CtaButton>
          <CtaButton
            href="/contact"
            variant="consultation"
            consultationStyle="secondary"
            className="whitespace-nowrap"
          >
            Book a Consultation
          </CtaButton>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <CtaButton
            href="/catchy-verifs"
            className="max-w-[220px] px-3 py-2 text-xs whitespace-nowrap"
          >
            Apply for a Free Catchy Verif
          </CtaButton>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden>
              <path
                d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          id="mobile-nav-menu"
          className="overflow-hidden border-t border-slate-100 bg-white transition-all duration-200 animate-in slide-in-from-top-1 md:hidden"
        >
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobileMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile primary" className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <a
              href={brandConfig.consultationFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-accent)] ring-1 ring-[var(--brand-accent)]/25 transition hover:bg-[var(--brand-accent-soft)] whitespace-nowrap"
            >
              Book a Consultation
            </a>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={brandConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Catchy Instagram"
                onClick={closeMobileMenu}
                className="inline-flex rounded-full p-2 text-slate-500 transition hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-accent)]"
              >
                <InstagramIcon />
              </Link>
              <Link
                href={brandConfig.links.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Catchy X"
                onClick={closeMobileMenu}
                className="inline-flex rounded-full p-2 text-slate-500 transition hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-accent)]"
              >
                <XIcon />
              </Link>
              <Link
                href={brandConfig.links.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Catchy TikTok"
                onClick={closeMobileMenu}
                className="inline-flex rounded-full p-2 text-slate-500 transition hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-accent)]"
              >
                <TikTokIcon />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
