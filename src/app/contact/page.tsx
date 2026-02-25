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
        <h1 className="heading-gradient text-4xl font-bold tracking-tight">
          Contact Catchy
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Tell us about your business and growth goals. We will propose the
          right next step.
        </p>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-xl font-semibold">
            Direct channels
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={brandConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-transparent bg-[var(--button-primary)] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--button-primary-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]/30"
            >
              WhatsApp (Placeholder)
            </Link>
            <Link
              href={brandConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--button-primary)] bg-white px-6 text-sm font-semibold text-[var(--button-primary)] shadow-sm transition-colors hover:bg-[#7C3AED]/10 hover:shadow-md active:bg-[#7C3AED]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]/30"
            >
              Instagram
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            Email:{" "}
            <a
              href="mailto:hello@catchy.example"
              className="font-semibold text-slate-900"
            >
              hello@catchy.example
            </a>
          </p>
          <CtaButton
            href="/contact"
            variant="consultation"
            consultationStyle="secondary"
          >
            Book a Consultation
          </CtaButton>
        </aside>
      </div>
    </div>
  );
}
