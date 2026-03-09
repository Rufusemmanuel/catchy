import type { Metadata } from "next";
import Link from "next/link";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Catchy for growth strategy and credibility content.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-24 pt-12 md:px-8">
      <section>
        <h1 className="heading-gradient text-4xl font-bold tracking-tight">
          Contact Catchy
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Tell us about your business and growth goals. We will propose the
          right next step.
        </p>
      </section>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="heading-gradient text-2xl font-semibold sm:text-3xl">
            Message us by email
          </h2>
          <p className="text-sm leading-7 text-slate-600">
            Contact form submissions are currently disabled. For reliable delivery,
            please email us directly and include your name, business, and request details.
          </p>
          <a
            href="mailto:info.catchy1@gmail.com"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-purple-600 px-6 text-base font-medium text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30"
          >
            Email info.catchy1@gmail.com
          </a>
        </section>
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="heading-gradient text-2xl font-semibold sm:text-3xl">
            Direct channels
          </h2>
          <p className="text-sm text-slate-600">Reach us faster via:</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={brandConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-purple-600 px-6 text-base font-medium text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30"
            >
              WhatsApp
            </Link>
            <Link
              href={brandConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-purple-600 bg-white px-6 text-base font-medium text-purple-700 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30"
            >
              Instagram
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
