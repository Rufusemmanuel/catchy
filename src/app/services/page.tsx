import type { Metadata } from "next";
import { CtaButton } from "@/components/cta-button";
import { services } from "@/config/brand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Catchy services for credibility, growth strategy, social execution, customer support, design, events, and ad management.",
};

const serviceDetails = [
  {
    name: "Catchy Verifs (FREE)",
    whatItIs:
      "An on-site credibility feature video that explains how your business operates and why customers can trust you.",
    whoItsFor:
      "Businesses that want to improve first-impression trust and educate new customers clearly.",
    deliverables:
      "On-site filming, guided interview, edit, captions, and final delivery format for social channels.",
    turnaround: "Typical turnaround: 5-10 business days after filming (placeholder).",
    cta: "/catchy-verifs",
    ctaLabel: "Apply for a Free Catchy Verif",
    highlight: true,
  },
  {
    name: "Social Media Management",
    whatItIs:
      "Monthly social content planning and publishing support focused on consistent visibility and engagement.",
    whoItsFor:
      "Brands with inconsistent posting or teams that need full social execution support.",
    deliverables:
      "Calendar, creative direction, posting workflow, and performance review updates.",
    turnaround: "Typical turnaround: weekly content cycles (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Customer Service Management",
    whatItIs:
      "Support channel management process to improve customer response quality and speed.",
    whoItsFor:
      "Businesses receiving high message volume or facing missed-response issues.",
    deliverables:
      "Response framework, escalation structure, and customer communication playbooks.",
    turnaround: "Typical turnaround: 1-2 weeks setup (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Business Consultation & Strategy",
    whatItIs:
      "Strategic planning sessions that align your offers, funnel, and marketing operations.",
    whoItsFor:
      "Founders and teams needing clearer growth priorities and execution plans.",
    deliverables:
      "Growth audit, action roadmap, and recommended campaign priorities.",
    turnaround: "Typical turnaround: 3-5 days for first strategy draft (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Graphics Design",
    whatItIs:
      "Design support for promotional graphics, social creatives, brand visuals, and campaign assets.",
    whoItsFor:
      "Teams needing reliable branded visuals without building a full internal design function.",
    deliverables:
      "Creative concepts, revision rounds, and export-ready assets.",
    turnaround: "Typical turnaround: 2-5 business days per batch (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Event Announcements & Promotions",
    whatItIs:
      "Campaign support for event announcements, countdowns, and attendance-driving promotions.",
    whoItsFor:
      "Businesses launching events, activations, special sales, or public experiences.",
    deliverables:
      "Promo content plan, launch creatives, reminder posts, and recap assets.",
    turnaround: "Typical turnaround: 1-2 week launch prep (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Catchy Verification",
    whatItIs:
      "A paid verification service focused on identity and brand trust verification. This is separate from Catchy Verifs (FREE).",
    whoItsFor:
      "Businesses that want formal trust signaling and verification positioning for customers.",
    deliverables:
      "Verification review, trust criteria assessment, and verification status package.",
    turnaround: "Typical turnaround: 7-14 business days (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Advertising & Ad Management",
    whatItIs:
      "Paid growth management for customer acquisition campaigns across major ad channels.",
    whoItsFor:
      "Businesses that want predictable lead flow or sales through paid media.",
    deliverables:
      "Campaign setup, creative testing, optimization, and reporting cadence.",
    turnaround: "Typical turnaround: 5-10 business day launch window (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--brand-accent)]">
          Services
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Catchy offers full-service credibility and growth support across all
          core channels.
        </p>
      </section>

      <section className="rounded-3xl bg-[linear-gradient(135deg,#ffffff,var(--brand-accent-soft))] p-6 shadow-sm ring-1 ring-slate-100">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)]">
          Featured Free Offer
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
          Catchy Verifs (FREE)
        </h2>
        <p className="mt-2 text-slate-600">
          {services[0].description}
        </p>
        <div className="mt-4">
          <CtaButton href="/catchy-verifs">Apply for a Free Catchy Verif</CtaButton>
        </div>
      </section>

      <section className="grid gap-4">
        {serviceDetails.map((service) => (
          <article
            key={service.name}
            className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 ${
              service.highlight ? "ring-[var(--brand-accent)]/25" : ""
            }`}
          >
            <h2 className="text-2xl font-semibold text-[var(--brand-accent)]">
              {service.name}
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-semibold">What it is:</span>{" "}
              {service.whatItIs}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">Who it&apos;s for:</span>{" "}
              {service.whoItsFor}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">What you get:</span>{" "}
              {service.deliverables}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">Typical turnaround:</span>{" "}
              {service.turnaround}
            </p>
            <div className="mt-4">
              <CtaButton
                href={service.cta}
                variant={
                  service.ctaLabel === "Book a Consultation"
                    ? "consultation"
                    : "primary"
                }
              >
                {service.ctaLabel}
              </CtaButton>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
          Packages Teaser
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            ["Starter", "Great for early stage consistency and setup."],
            ["Growth", "For brands ready to scale content and acquisition."],
            ["Premium", "High-touch strategy plus end-to-end execution."],
          ].map(([name, text]) => (
            <article key={name} className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold text-[var(--brand-accent)]">{name}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
