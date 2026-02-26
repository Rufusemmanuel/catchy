import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Catchy, a global marketing and growth agency focused on trust, visibility, and sustainable brand growth.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="heading-gradient text-4xl font-bold tracking-tight">
          About Catchy
        </h1>
        <div className="mt-4 space-y-3">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            Who We Are
          </h2>
          <p className="max-w-4xl text-gray-600">
            Catchy is a global marketing and growth agency built to help brands
            become visible, credible, and profitable.
          </p>
          <p className="max-w-4xl text-gray-600">
            We work with startups, small businesses, and growing enterprises
            ready to move from ordinary presence to structured, strategic
            growth.
          </p>
          <p className="max-w-4xl text-gray-600">
            Growth is intentional. Trust is built. Visibility is strategic.
          </p>
          <p className="max-w-4xl text-gray-600">
            We do not just market brands. We build systems that make brands
            trusted.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            Our Core Value: Growth Through Trust
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Many businesses struggle not because they lack good products but
            because they lack structure, positioning, and credibility. Catchy
            exists to solve that.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Our core focus is helping brands:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
            <li>Build consumer trust</li>
            <li>Strengthen credibility</li>
            <li>Improve visibility</li>
            <li>Structure operations</li>
            <li>Scale sustainably</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            When customers trust you, they buy confidently. When your brand is
            structured, it grows faster. Trust is not automatic. It is designed.
          </p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            What Makes Catchy Different?
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            We combine strategy, creativity, and structure. Our services go
            beyond content posting or advertising. We:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
            <li>
              Audit businesses through Catchy Verified (on-site credibility
              checks)
            </li>
            <li>Manage social media with strategic growth plans</li>
            <li>Handle customer communication professionally</li>
            <li>Create powerful event promotions</li>
            <li>Run data-driven advertising campaigns</li>
            <li>Offer growth consultations</li>
            <li>Design high-impact brand visuals</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Every service is built around one goal: positioning your brand for
            long-term visibility and authority.
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            Founder
          </h2>
          <div className="mt-4 h-px bg-slate-100" />
          <Image
            src="/placeholders/founder-placeholder.svg"
            alt="Founder portrait placeholder"
            width={640}
            height={360}
            className="mt-4 rounded-2xl"
          />
          <p className="mt-3 text-sm text-gray-600">
            Catchy was founded by Rufus Emmanuella, a growth-focused marketing
            strategist with a strong foundation in communication, branding, and
            structured business development.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            With a clear vision to help brands grow beyond surface-level
            marketing, Rufus built Catchy to bridge the gap between visibility
            and credibility.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Her belief is simple: marketing should not just create attention; it
            should build trust, structure, and sustainable growth.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Under her leadership, Catchy operates as a results-driven agency
            committed to helping brands become respected, structured, and
            positioned for long-term success.
          </p>
        </article>
        <article className="flex h-full flex-col rounded-3xl bg-white p-6 pt-7 shadow-sm ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            Co-Founders
          </h2>
          <div className="mt-4 h-px bg-slate-100" />
          <div className="mt-5 flex flex-1 flex-col items-center text-center">
            <div className="relative h-[168px] w-[168px] sm:h-[204px] sm:w-[204px]">
              <div className="absolute inset-0 rounded-[44%_56%_52%_48%/46%_50%_50%_54%] bg-gradient-to-br from-[#7C3AED]/15 via-[#7C3AED]/5 to-transparent" />
              <svg
                viewBox="0 0 220 220"
                className="relative h-full w-full drop-shadow-[0_10px_18px_rgba(15,23,42,0.14)]"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="cofounder-blob-mask">
                    <path d="M182.6,64.4c14.8,25.8,20.6,61.5,8.6,90.9c-11.9,29.5-41.6,52.6-73.2,55.4c-31.6,2.7-65.2-14.9-84.3-44.7 c-19-29.7-23.5-71.5-8.7-101.2C39.8,35.1,74.2,17.1,106.6,15.2C139.1,13.2,167.8,38.6,182.6,64.4z" />
                  </clipPath>
                </defs>
                <image
                  href="/team/rufus-emmanuella.jpg"
                  width="220"
                  height="220"
                  preserveAspectRatio="xMidYMin slice"
                  clipPath="url(#cofounder-blob-mask)"
                />
                <path
                  d="M182.6,64.4c14.8,25.8,20.6,61.5,8.6,90.9c-11.9,29.5-41.6,52.6-73.2,55.4c-31.6,2.7-65.2-14.9-84.3-44.7 c-19-29.7-23.5-71.5-8.7-101.2C39.8,35.1,74.2,17.1,106.6,15.2C139.1,13.2,167.8,38.6,182.6,64.4z"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.5)"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
              Co-Founder
            </span>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              Rufus Emmanuel
            </p>
            <p className="mt-1 whitespace-nowrap text-sm font-medium text-slate-500">
              Co-Founder / Growth &amp; Strategy
            </p>
            <p className="mt-3 max-w-[28ch] text-sm leading-6 text-gray-600">
              Growth-focused marketing strategist with a strong foundation in
              communication, branding, and structured business development.
              Built Catchy to bridge the gap between visibility and
              credibility, helping brands scale with trust, structure, and
              sustainable growth.
            </p>
          </div>
        </article>
        <article className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            Our Team
          </h2>
          <div className="mt-4 h-px bg-slate-100" />
          <p className="mt-3 text-sm text-gray-600">
            Behind Catchy is a team of strategists, creatives, designers, and
            communication experts committed to one mission: helping brands grow
            with structure and confidence.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            We collaborate across strategy, advertising, branding, and customer
            engagement to ensure every project delivers measurable impact.
          </p>
          <p className="mt-3 text-sm text-gray-600">We believe in:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
            <li>Excellence</li>
            <li>Professionalism</li>
            <li>Transparency</li>
            <li>Results</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Every brand we work with becomes a growth partner, not just a
            client.
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            Our Vision
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            To become one of the world&apos;s most trusted marketing and growth
            agencies known for building brands that lead with credibility and
            scale with confidence.
          </p>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight">
            Our Mission
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            To help businesses build trust, strengthen visibility, and achieve
            sustainable growth through strategic marketing and structured brand
            development.
          </p>
        </article>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight">
          Why Brands Choose Catchy
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          Because we do not just manage brands. We:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
          <li>Structure them</li>
          <li>Position them</li>
          <li>Strengthen them</li>
          <li>Scale them</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          Catchy is not just an agency. It is a growth partner.
        </p>
      </section>
    </div>
  );
}
