import Image from "next/image";
import { CtaButton } from "@/components/cta-button";
import { brandConfig, services } from "@/config/brand";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section className="reveal-up grid gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 md:grid-cols-2 md:p-12">
        <div>
          <p className="inline-flex rounded-full bg-[var(--brand-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)]">
            Growth Agency
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[var(--brand-accent)] md:text-5xl">
            Grow faster with trust-led marketing that proves your credibility.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Catchy combines strategy, execution, and visibility systems that
            make people trust your brand before they even message you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/catchy-verifs">
              Apply for a Free Catchy Verif
            </CtaButton>
            <CtaButton
              href="/contact"
              variant="consultation"
              consultationStyle="secondary"
            >
              Book a Consultation
            </CtaButton>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-[var(--brand-accent-soft)] p-3 ring-1 ring-[var(--brand-accent)]/15">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-white">
            <Image
              src="/placeholders/video-poster.svg"
              alt="Catchy hero video preview placeholder"
              fill
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Quick preview: how Catchy Verifs builds trust through on-site
            credibility stories.
          </p>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:grid-cols-3">
        {[
          ["150+", "Brands Supported"],
          ["320+", "Credibility Videos Produced"],
          ["95%", "Client Retention (Placeholder)"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-accent)]">
          Core services
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.name}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              {index === 0 ? (
                <p className="inline-flex rounded-full bg-[var(--brand-accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--brand-accent)]">
                  FREE
                </p>
              ) : null}
              <h3 className="text-lg font-semibold text-[var(--brand-accent)]">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-accent)]">
          Catchy Verifs in 3 steps
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            [
              "1",
              "Apply",
              "Apply with your business information and availability.",
            ],
            [
              "2",
              "Get Selected",
              "Get shortlisted based on fit and available monthly slots.",
            ],
            [
              "3",
              "Get Featured",
              "We visit, film, and deliver your credibility feature video.",
            ],
          ].map(([step, title, text]) => (
            <article key={step} className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-[var(--brand-accent-strong)]">
                Step {step}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--brand-accent)]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-accent)]">
          Recent Work
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Bakery Verif",
            "Clinic Trust Film",
            "Retail Process Story",
            "Factory Tour Cut",
            "Service Walkthrough",
            "Founder Credibility Reel",
          ].map((item) => (
            <article
              key={item}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
            >
              <Image
                src="/placeholders/portfolio-card.svg"
                alt="Portfolio placeholder"
                width={600}
                height={360}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-[var(--brand-accent)]">{item}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Placeholder portfolio summary for this category.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-accent)]">
          Testimonials
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "The Verif made prospects trust us before the first call.",
            "Our online reputation improved because customers saw our real process.",
            "Catchy turned confusing operations into simple, credible content.",
          ].map((quote, idx) => (
            <blockquote
              key={quote}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-sm text-slate-700">{`"${quote}"`}</p>
              <footer className="mt-3 text-xs text-slate-500">
                Client #{idx + 1} placeholder
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-accent)]">
          Instagram Preview
        </h2>
        <p className="mt-2 text-slate-600">
          Follow{" "}
          <a
            href={brandConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-strong)]"
          >
            @catchy_is_growth
          </a>{" "}
          for recent verifs, social campaigns, and growth tips.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {["Post placeholder", "Reel placeholder", "Story highlight placeholder"].map(
            (item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-600">{item}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Embed-ready block placeholder.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="rounded-3xl bg-[linear-gradient(135deg,#ffffff,var(--brand-accent-soft))] p-8 shadow-sm ring-1 ring-slate-100 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-accent)]">
            Ready to grow your online presence?
          </h2>
          <p className="mt-2 text-slate-600">
            Start with a free credibility feature and a clear strategy for
            growth.
          </p>
        </div>
        <div className="mt-5 flex gap-3 md:mt-0">
          <CtaButton href="/catchy-verifs">
            Apply for a Free Catchy Verif
          </CtaButton>
          <CtaButton
            href="/contact"
            variant="consultation"
            consultationStyle="secondary"
          >
            Book a Consultation
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
