import Link from "next/link";
import { InstagramIcon, TikTokIcon, XIcon } from "@/components/icons";
import { brandConfig } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Catchy</h2>
          <p className="mt-3 text-sm text-slate-600">
            Helping businesses grow their online presence through
            credibility-first storytelling.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Socials
          </h3>
          <div className="mt-3 flex items-center gap-3 text-slate-500">
            <Link
              href={brandConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram-link"
              aria-label="Catchy on Instagram"
              className="inline-flex rounded-full p-2 transition hover:scale-110 hover:text-[#D108F2] focus-visible:scale-110 focus-visible:text-[#D108F2]"
            >
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link
              href={brandConfig.links.x}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-x-link"
              aria-label="Catchy on X"
              className="inline-flex rounded-full p-2 transition hover:scale-110 hover:text-[#D108F2] focus-visible:scale-110 focus-visible:text-[#D108F2]"
            >
              <XIcon className="h-5 w-5" />
            </Link>
            <Link
              href={brandConfig.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-tiktok-link"
              aria-label="Catchy on TikTok"
              className="inline-flex rounded-full p-2 transition hover:scale-110 hover:text-[#D108F2] focus-visible:scale-110 focus-visible:text-[#D108F2]"
            >
              <TikTokIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            Start Here
          </h3>
          <Link
            href={brandConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-full bg-[var(--brand-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-accent-strong)]"
          >
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </footer>
  );
}
