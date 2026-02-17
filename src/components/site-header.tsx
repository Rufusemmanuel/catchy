import Link from "next/link";
import { CtaButton } from "@/components/cta-button";
import { InstagramIcon } from "@/components/icons";
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
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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
        <div className="flex items-center gap-2">
          <Link
            href={brandConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Catchy Instagram"
            className="inline-flex rounded-full p-2 text-slate-500 transition hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-accent)]"
          >
            <InstagramIcon />
          </Link>
          <CtaButton href="/catchy-verifs" className="hidden sm:inline-flex">
            Apply for a Free Catchy Verif
          </CtaButton>
          <CtaButton
            href="/contact"
            variant="consultation"
            consultationStyle="secondary"
            className="hidden sm:inline-flex"
          >
            Book a Consultation
          </CtaButton>
          <Link
            href="/catchy-verifs"
            className="rounded-full bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white sm:hidden"
          >
            Free Catchy Verif
          </Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 pb-3 md:hidden sm:px-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 text-sm font-medium text-slate-600"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
