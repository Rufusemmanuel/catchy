import Link from "next/link";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { brandConfig } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="heading-gradient text-lg font-semibold">Catchy</h2>
          <p className="mt-3 text-base text-gray-600">
            Helping businesses grow their online presence through
            credibility-first storytelling.
          </p>
        </div>
        <div>
          <h3 className="heading-gradient text-sm font-semibold uppercase tracking-wide">
            Socials
          </h3>
          <div className="mt-3 flex items-center gap-3 text-gray-500">
            <Link
              href={brandConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram-link"
              aria-label="Catchy on Instagram"
              className="inline-flex rounded-full p-2 transition hover:scale-110 hover:text-[var(--accent-link)] focus-visible:scale-110 focus-visible:text-[var(--accent-link)]"
            >
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link
              href={brandConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-facebook-link"
              aria-label="Catchy on Facebook"
              className="inline-flex rounded-full p-2 transition hover:scale-110 hover:text-[var(--accent-link)] focus-visible:scale-110 focus-visible:text-[var(--accent-link)]"
            >
              <FacebookIcon className="h-5 w-5" />
            </Link>
            <Link
              href={brandConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-linkedin-link"
              aria-label="Catchy on LinkedIn"
              className="inline-flex rounded-full p-2 transition hover:scale-110 hover:text-[var(--accent-link)] focus-visible:scale-110 focus-visible:text-[var(--accent-link)]"
            >
              <LinkedInIcon className="h-5 w-5" />
            </Link>
            <Link
              href={brandConfig.links.x}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-x-link"
              aria-label="Catchy on X"
              className="inline-flex rounded-full p-2 transition hover:scale-110 hover:text-[var(--accent-link)] focus-visible:scale-110 focus-visible:text-[var(--accent-link)]"
            >
              <XIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="heading-gradient text-sm font-semibold uppercase tracking-wide">
            Start Here
          </h3>
          <Link
            href={brandConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-11 items-center justify-center rounded-xl border border-transparent bg-[var(--button-primary)] px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[var(--button-primary-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]/30"
          >
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </footer>
  );
}
