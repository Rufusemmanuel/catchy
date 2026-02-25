import type { Metadata } from "next";
import { CtaButton } from "@/components/cta-button";
import { services } from "@/config/brand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Catchy services across growth strategy, creative, performance marketing, web and product, content, partnerships, and Catchy Verification.",
};

const serviceDetails = [
  {
    name: "Catchy Verification",
    whatItIs:
      "A featured trust service that combines credibility storytelling and verification-oriented brand positioning.",
    whoItsFor:
      "Businesses that need stronger trust signals to convert customers faster.",
    deliverables:
      "Trust assessment, credibility content direction, and verification campaign rollout assets.",
    turnaround: "Typical turnaround: 5-10 business days after onboarding (placeholder).",
    cta: "/catchy-verification",
    ctaLabel: "Apply for Catchy Verification",
    highlight: true,
  },
  {
    name: "Growth Strategy",
    whatItIs:
      "Strategic growth planning that aligns your offers, channels, and targets for scale.",
    whoItsFor:
      "Founders and teams that need clear priorities and execution direction.",
    deliverables:
      "Growth audit, strategic roadmap, and channel activation plan.",
    turnaround: "Typical turnaround: 3-5 business days for initial strategy draft (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Brand & Creative",
    whatItIs:
      "Creative systems for campaigns, launches, and always-on brand communication.",
    whoItsFor:
      "Businesses that need stronger creative consistency and conversion-ready assets.",
    deliverables:
      "Campaign concepts, design systems, and creative production support.",
    turnaround: "Typical turnaround: 2-5 business days per creative batch (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Performance Marketing",
    whatItIs:
      "Paid acquisition execution with testing frameworks and budget optimization.",
    whoItsFor:
      "Businesses looking for predictable lead flow and stronger return on ad spend.",
    deliverables:
      "Campaign setup, iterative testing, optimization loops, and reporting.",
    turnaround: "Typical turnaround: 5-10 business day launch window (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Web & Product",
    whatItIs:
      "Website and product experience improvements focused on trust and conversion.",
    whoItsFor:
      "Teams with drop-off issues across landing pages, checkout flows, or product journeys.",
    deliverables:
      "UX recommendations, conversion-first page structures, and implementation guidance.",
    turnaround: "Typical turnaround: 1-2 week optimization cycles (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Content & Social",
    whatItIs:
      "Content planning and social execution that keeps your brand visible and relevant.",
    whoItsFor:
      "Brands needing consistent publishing and stronger narrative continuity.",
    deliverables:
      "Editorial calendar, platform-native assets, publishing workflow, and analytics reviews.",
    turnaround: "Typical turnaround: weekly production cycles (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
  {
    name: "Partnerships / PR",
    whatItIs:
      "Authority-building partnership and PR support for audience expansion and social proof.",
    whoItsFor:
      "Businesses ready to scale credibility through collaborations and media visibility.",
    deliverables:
      "Partner mapping, PR narrative support, and collaboration campaign planning.",
    turnaround: "Typical turnaround: 1-3 week activation windows (placeholder).",
    cta: "/contact",
    ctaLabel: "Book a Consultation",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section>
        <h1 className="heading-gradient text-4xl font-bold tracking-tight">
          Services
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Catchy delivers end-to-end growth services across strategy, creative,
          media, digital experience, and partnerships.
        </p>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
          Featured Service
        </p>
        <h2 className="heading-gradient mt-2 text-2xl font-bold tracking-tight">
          Catchy Verification
        </h2>
        <p className="mt-2 text-gray-600">
          {services[0].description}
        </p>
        <div className="mt-4">
          <CtaButton href="/catchy-verification">Apply for Catchy Verification</CtaButton>
        </div>
      </section>

      <section className="grid gap-4">
        {serviceDetails.map((service) => (
          <article
            key={service.name}
            className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 ${
              service.highlight ? "ring-slate-300" : ""
            }`}
          >
            <h2 className="heading-gradient text-2xl font-semibold">
              {service.name}
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-semibold">What it is:</span>{" "}
              {service.whatItIs}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Who it&apos;s for:</span>{" "}
              {service.whoItsFor}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">What you get:</span>{" "}
              {service.deliverables}
            </p>
            <p className="mt-2 text-sm text-gray-600">
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
                consultationStyle="secondary"
              >
                {service.ctaLabel}
              </CtaButton>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight">
          Packages Teaser
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            ["Starter", "Great for early stage consistency and setup."],
            ["Growth", "For brands ready to scale content and acquisition."],
            ["Premium", "High-touch strategy plus end-to-end execution."],
          ].map(([name, text]) => (
            <article key={name} className="rounded-2xl bg-slate-50 p-4">
              <h3 className="heading-gradient font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-gray-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
