import Image from "next/image";
import { CtaButton } from "@/components/cta-button";
import { HeroVideo } from "@/components/hero-video";
import { brandConfig, services } from "@/config/brand";

const testimonials = [
  {
    quote:
      "I’ve worked with different media teams before, but Catchy handled our event announcement differently. The way they packaged it made the event look bigger and more organised. We saw more turnout than usual, and people kept referring to the announcement video. It definitely helped our brand visibility.",
    role: "Event Director",
    name: "Tomi Adebayo",
    avatar: "/testimonials/t1.png",
    alt: "Professional portrait of Tomi Adebayo, Event Director",
  },
  {
    quote:
      "When we first spoke, I just needed direction. The consultation was practical. They pointed out gaps in our positioning and helped us clean it up. Since then, inquiries have been more intentional. That clarity alone was worth it.",
    role: "Startup Founder",
    name: "Zainab Musa",
    avatar: "/testimonials/t2.png",
    alt: "Professional portrait of Zainab Musa, Startup Founder",
  },
  {
    quote:
      "We were running ads before, but nothing consistent. Catchy came in, adjusted the creatives and targeting, and within a few weeks we started seeing stronger leads. It wasn’t hype just solid strategy and execution.",
    role: "Business Owner",
    name: "Omar Al-Khatib",
    avatar: "/testimonials/t3.png",
    alt: "Professional portrait of Omar Al-Khatib, Business Owner",
  },
  {
    quote:
      "What I appreciated most was how they tightened our brand message. Our content finally felt cohesive. Customers started engaging more, and our store conversions improved shortly after.",
    role: "Retail Brand Owner",
    name: "Chloe Harrison",
    avatar: "/testimonials/t4.png",
    alt: "Professional portrait of Chloe Harrison, Retail Brand Owner",
  },
  {
    quote:
      "Our social media used to be inconsistent. Catchy helped us structure it properly and maintain a steady presence. It now reflects the standard of work we actually deliver offline.",
    role: "Service Provider",
    name: "David Okoye",
    avatar: "/testimonials/t5.png",
    alt: "Professional portrait of David Okoye, Service Provider",
  },
  {
    quote:
      "The event promotion was handled professionally from start to finish. The rollout built proper anticipation, and ticket sales moved faster than previous years. It felt organised and well thought through.",
    role: "Event Organiser",
    name: "James Whitaker",
    avatar: "/testimonials/t6.png",
    alt: "Professional portrait of James Whitaker, Event Organiser",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-[4.5rem] px-4 pb-16 pt-10 md:px-6 md:pt-12 lg:px-8">
      <section className="reveal-up grid gap-7 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6 md:grid-cols-2 md:p-12">
        <div>
          <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-semibold uppercase tracking-[0.22em] text-gray-600">
            GLOBAL GROWTH AND MARKETING AGENCY
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 [text-wrap:balance] sm:text-4xl md:text-5xl md:leading-[1.08]">
            Catchy builds global growth systems for brands ready to scale.
          </h1>
          <p className="mt-5 max-w-[68ch] text-lg leading-8 text-gray-600">
            We combine strategy, creative, performance marketing, and digital
            execution so your brand grows with clarity and consistency across
            markets.
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <CtaButton href="/services" className="w-full justify-center whitespace-nowrap sm:w-auto">
              Explore Agency Services
            </CtaButton>
            <CtaButton
              href="/book-call"
              variant="secondary"
              className="w-full justify-center whitespace-nowrap sm:w-auto"
            >
              Book a Consultation
            </CtaButton>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-slate-200">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-white">
            <HeroVideo />
          </div>
          <p className="mt-3 text-base font-medium text-gray-600">
            Featured service: Catchy Verification helps businesses turn trust
            signals into customer confidence.
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
            <p className="text-base text-gray-600">{label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-7">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Core agency capabilities
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {services.slice(1).map((service) => (
            <article
              key={service.name}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <h3 className="heading-gradient text-xl font-semibold">{service.name}</h3>
              <p className="mt-2 text-base text-gray-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <p className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-sm font-semibold text-gray-600">
          Featured Service
        </p>
        <h2 className="heading-gradient mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Catchy Verification
        </h2>
        <p className="mt-3 max-w-3xl text-gray-600">
          Need stronger trust signals before customers buy? Catchy Verification
          captures real operations and converts proof into clear credibility
          content your audience can understand quickly.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            [
              "1",
              "Apply",
              "Submit your business details and verification goals.",
            ],
            [
              "2",
              "Review",
              "Our team evaluates fit, readiness, and documentation.",
            ],
            [
              "3",
              "Launch",
              "We produce and publish verification-ready trust assets.",
            ],
          ].map(([step, title, text]) => (
            <article key={step} className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-gray-600">
                Step {step}
              </p>
              <h3 className="heading-gradient mt-2 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-base text-gray-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <CtaButton href="/catchy-verification">
            Apply for Catchy Verification
          </CtaButton>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Recent Work
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Global Market Entry Sprint",
            "Brand Narrative Refresh",
            "Performance Funnel Rebuild",
            "Website Conversion Upgrade",
            "Always-On Social Engine",
            "Strategic Partnerships Launch",
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
                <h3 className="heading-gradient text-xl font-semibold">{item}</h3>
                <p className="mt-1 text-base text-gray-600">
                  Placeholder portfolio summary for this category.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Testimonials
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <article
              key={item.name}
              className="reveal-on-scroll group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full ring-2 ring-purple-200 shadow-sm sm:h-[88px] sm:w-[88px]">
                <Image
                  src={item.avatar}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 88px, 72px"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10 text-[#7C3AED]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M9.7 11.5c0 3.6-1.9 6.1-5.6 7.4l-1-1.9c2.1-.9 3.2-2 3.5-3.6H3.8V6.8h5.9v4.7Zm10.6 0c0 3.6-1.9 6.1-5.6 7.4l-1-1.9c2.1-.9 3.2-2 3.5-3.6H14.4V6.8h5.9v4.7Z"
                  />
                </svg>
              </div>
              <blockquote className="mt-3 max-w-[62ch] text-base leading-7 text-gray-600">
                {item.quote}
              </blockquote>
              <div className="mt-5 h-px w-full bg-slate-200" />
              <p className="mt-4 text-base font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm font-medium tracking-[0.02em] text-slate-500">
                {item.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Instagram Preview
        </h2>
        <p className="mt-2 text-gray-600">
          Follow{" "}
          <a
            href={brandConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-900 hover:text-[var(--accent-link)]"
          >
            @catchy_is_growth
          </a>{" "}
          for campaigns, launches, and growth tips.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {["Post placeholder", "Reel placeholder", "Story highlight placeholder"].map(
            (item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-base text-gray-600">{item}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Embed-ready block placeholder.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
            Need verification? Apply in minutes.
          </h2>
          <p className="mt-2 text-gray-600">
            Launch Catchy Verification as part of your broader growth plan and
            strengthen trust at every customer touchpoint.
          </p>
        </div>
        <div className="mt-5 flex flex-nowrap gap-3 md:mt-0">
          <CtaButton
            href="/catchy-verification"
            className="min-w-[120px] whitespace-nowrap"
          >
            Apply
          </CtaButton>
          <CtaButton
            href="/book-call"
            variant="secondary"
            className="min-w-[120px] whitespace-nowrap"
          >
            Consult
          </CtaButton>
        </div>
      </section>
    </div>
  );
}
