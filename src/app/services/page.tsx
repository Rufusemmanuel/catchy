import type { Metadata } from "next";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Catchy services across verification, social media, customer service, events, advertising, consultation, and design.",
};

const serviceCards = [
  {
    title: "1. Catchy Verification (On-Site Business & Trust Check)",
    description:
      "Catchy Verification is our physical, on-site business inspection and credibility audit. We assess how your business operates, verify credentials, review customer experience, and evaluate your brand structure.",
    bullets: [
      "Operational structure",
      "Customer service process",
      "Brand presentation (offline & online)",
      "Business credibility",
    ],
    impactTitle: "Why it matters",
    impactBody:
      "Trust is the foundation of growth. When customers trust you, they buy confidently.",
    impactPoints: [
      "Strengthens your credibility",
      "Identifies gaps limiting growth",
      "Improves customer confidence",
      "Positions your brand as structured and reliable",
    ],
    closing:
      "A verified business attracts better clients, bigger opportunities, and long-term loyalty.",
    bookingUrl: brandConfig.links.googleForm,
    bookingLabel: "Apply for Catchy Verification",
  },
  {
    title: "2. Social Media Management",
    description:
      "We manage your social platforms strategically: content creation, posting, engagement, and analytics.",
    impactTitle: "How it helps you grow",
    impactPoints: [
      "Builds consistent online presence",
      "Increases brand awareness",
      "Converts followers into customers",
      "Establishes authority in your industry",
    ],
    closing: "Visibility creates opportunity.",
    bookingUrl: brandConfig.consultationFormUrl,
    bookingLabel: "Book This Service",
  },
  {
    title: "3. Customer Service Management",
    description:
      "We handle your brand communication: DMs, emails, inquiries, and follow-ups, ensuring professional, timely responses.",
    impactTitle: "Growth impact",
    impactPoints: [
      "Improves customer satisfaction",
      "Increases repeat purchases",
      "Strengthens brand reputation",
      "Converts inquiries into sales",
    ],
    closing: "Strong communication builds strong brands.",
    bookingUrl: brandConfig.consultationFormUrl,
    bookingLabel: "Book This Service",
  },
  {
    title: "4. Event Announcement & Promotion",
    description:
      "We create powerful, attention-grabbing event promotions using strong scripts, voiceovers, and creative visuals.",
    impactTitle: "Why it works",
    impactPoints: [
      "Creates anticipation",
      "Increases attendance",
      "Boosts online engagement",
      "Positions your event as premium",
    ],
    closing:
      "We do not just announce events; we make people excited for them.",
    bookingUrl: brandConfig.consultationFormUrl,
    bookingLabel: "Book This Service",
  },
  {
    title: "5. Advertising & Paid Campaigns",
    description:
      "We create targeted ad campaigns designed to generate leads, traffic, and sales.",
    impactTitle: "How it boosts growth",
    impactPoints: [
      "Reaches the right audience",
      "Increases conversions",
      "Expands brand visibility",
      "Scales revenue faster",
    ],
    closing: "Strategic advertising drives measurable results.",
    bookingUrl: brandConfig.consultationFormUrl,
    bookingLabel: "Book This Service",
  },
  {
    title: "6. Business Consultation & Strategy",
    description:
      "We analyze your business and create a clear roadmap for growth.",
    impactTitle: "What you gain",
    impactPoints: [
      "Clear direction",
      "Strong positioning",
      "Better revenue structure",
      "Sustainable growth plan",
    ],
    closing: "Clarity reduces mistakes and increases profit.",
    bookingUrl: brandConfig.consultationFormUrl,
    bookingLabel: "Book This Service",
  },
  {
    title: "7. Graphic Design",
    description:
      "We design professional visuals that reflect your brand identity and attract attention.",
    impactTitle: "Impact on your brand",
    impactPoints: [
      "Strong first impressions",
      "Better brand recognition",
      "Higher perceived value",
      "Visual consistency",
    ],
    closing: "Good design builds authority instantly.",
    bookingUrl: brandConfig.consultationFormUrl,
    bookingLabel: "Book This Service",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section>
        <h1 className="heading-gradient text-4xl font-bold tracking-tight">
          Services
        </h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Catchy services are built to make your brand visible, credible, and
          profitable through structure, strategy, and trust.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {serviceCards.map((service) => (
          <article
            key={service.title}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
          >
            <h2 className="heading-gradient text-2xl font-semibold">
              {service.title}
            </h2>
            <p className="mt-3 text-sm text-gray-600">{service.description}</p>

            {service.bullets ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
                {service.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              {service.impactTitle}
            </h3>
            {service.impactBody ? (
              <p className="mt-2 text-sm text-gray-600">{service.impactBody}</p>
            ) : null}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
              {service.impactPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-gray-600">{service.closing}</p>
            <a
              href={service.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-transparent bg-[var(--button-primary)] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--button-primary-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]/30"
            >
              {service.bookingLabel}
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight">
          Why Catchy?
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          Every service at Catchy is built around one goal: making your brand
          visible, credible, and impossible to ignore.
        </p>
        <p className="mt-3 text-sm text-gray-600">
          We do not just help businesses exist; we help them grow with
          structure, strategy, and trust.
        </p>
      </section>
    </div>
  );
}
