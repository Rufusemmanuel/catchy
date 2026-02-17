import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { CtaButton } from "@/components/cta-button";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Catchy for growth strategy and credibility content.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--brand-accent)]">
          Contact Catchy
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Tell us about your business and growth goals. We will propose the
          right next step.
        </p>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">
            Direct channels
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={brandConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-accent-strong)]"
            >
              WhatsApp (Placeholder)
            </Link>
            <Link
              href={brandConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[var(--brand-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--brand-accent)] hover:bg-[var(--brand-accent-strong)] hover:text-white"
            >
              Instagram
            </Link>
          </div>
          <p className="text-sm text-slate-600">
            Email:{" "}
            <a
              href="mailto:hello@catchy.example"
              className="font-semibold text-slate-900"
            >
              hello@catchy.example
            </a>
          </p>
          <CtaButton href="/contact" variant="consultation">
            Book a Consultation
          </CtaButton>
        </aside>
      </div>
    </div>
  );
}
