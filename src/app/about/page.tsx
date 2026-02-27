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
          <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
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
          <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
            Our Core Value: Growth Through Trust
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Many businesses struggle not because they lack good products but
            because they lack structure, positioning, and credibility. Catchy
            exists to solve that.
          </p>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Our core focus is helping brands:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7 text-gray-600">
            <li>Build consumer trust</li>
            <li>Strengthen credibility</li>
            <li>Improve visibility</li>
            <li>Structure operations</li>
            <li>Scale sustainably</li>
          </ul>
          <p className="mt-3 text-base leading-7 text-gray-600">
            When customers trust you, they buy confidently. When your brand is
            structured, it grows faster. Trust is not automatic. It is designed.
          </p>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
            What Makes Catchy Different?
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-600">
            We combine strategy, creativity, and structure. Our services go
            beyond content posting or advertising. We:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7 text-gray-600">
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
          <p className="mt-3 text-base leading-7 text-gray-600">
            Every service is built around one goal: positioning your brand for
            long-term visibility and authority.
          </p>
        </article>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-8">
          <h2 className="heading-gradient text-[1.7rem] font-bold tracking-tight">
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
          <p className="mt-4 text-base leading-7 text-gray-600">
            Catchy was founded by Rufus Emmanuella, a growth-focused marketing
            strategist with a strong foundation in communication, branding, and
            structured business development.
          </p>
          <p className="mt-3 text-base leading-7 text-gray-600">
            With a clear vision to help brands grow beyond surface-level
            marketing, Rufus built Catchy to bridge the gap between visibility
            and credibility.
          </p>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Her belief is simple: marketing should not just create attention; it
            should build trust, structure, and sustainable growth.
          </p>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Under her leadership, Catchy operates as a results-driven agency
            committed to helping brands become respected, structured, and
            positioned for long-term success.
          </p>
        </article>
        <article className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-8">
          <h2 className="heading-gradient text-[1.7rem] font-bold tracking-tight">
            Co-Founders
          </h2>
          <div className="mt-4 h-px bg-slate-100" />
          <div className="mt-6 flex flex-1 flex-col items-center text-center">
            <div className="relative h-[200px] w-[188px] sm:h-[228px] sm:w-[214px] md:h-[270px] md:w-[248px] lg:h-[292px] lg:w-[270px]">
              <div className="absolute inset-0 rounded-[42%_58%_52%_48%/36%_36%_64%_64%] bg-gradient-to-br from-[#7C3AED]/20 via-[#7C3AED]/8 to-transparent" />
              <div className="relative h-full w-full overflow-hidden rounded-[42%_58%_52%_48%/36%_36%_64%_64%] ring-2 ring-[#7C3AED]/25 shadow-[0_16px_34px_rgba(15,23,42,0.18)]">
                <Image
                  src="/team/rufus-emmanuella.jpg"
                  alt="Rufus Emmanuel, co-founder"
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 768px) 248px, (min-width: 640px) 214px, 188px"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </div>
            <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
              Co-Founder
            </span>
            <p className="mt-3 text-[1.9rem] font-bold leading-tight text-slate-900">
              Rufus Emmanuel
            </p>
            <p className="mt-2 text-base font-medium tracking-[0.03em] text-slate-500">
              Co-Founder / Growth &amp; Strategy
            </p>
            <p className="mt-4 max-w-[32ch] text-base leading-7 text-gray-600">
              Growth-focused marketing strategist with a strong foundation in
              communication, branding, and structured business development.
              Built Catchy to bridge the gap between visibility and
              credibility, helping brands scale with trust, structure, and
              sustainable growth.
            </p>
          </div>
        </article>
        <article className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-8">
          <h2 className="heading-gradient text-[1.7rem] font-bold tracking-tight">
            Our Team
          </h2>
          <div className="mt-4 h-px bg-slate-100" />
          <p className="mt-4 text-base leading-7 text-gray-600">
            Behind Catchy is a team of strategists, creatives, designers, and
            communication experts committed to one mission: helping brands grow
            with structure and confidence.
          </p>
          <p className="mt-3 text-base leading-7 text-gray-600">
            We collaborate across strategy, advertising, branding, and customer
            engagement to ensure every project delivers measurable impact.
          </p>
          <p className="mt-3 text-base leading-7 text-gray-600">We believe in:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7 text-gray-600">
            <li>Excellence</li>
            <li>Professionalism</li>
            <li>Transparency</li>
            <li>Results</li>
          </ul>
          <p className="mt-3 text-base leading-7 text-gray-600">
            Every brand we work with becomes a growth partner, not just a
            client.
          </p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
            Our Vision
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-600">
            To become one of the world&apos;s most trusted marketing and growth
            agencies known for building brands that lead with credibility and
            scale with confidence.
          </p>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
            Our Mission
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-600">
            To help businesses build trust, strengthen visibility, and achieve
            sustainable growth through strategic marketing and structured brand
            development.
          </p>
        </article>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Why Brands Choose Catchy
        </h2>
        <p className="mt-3 text-base leading-7 text-gray-600">
          Because we do not just manage brands. We:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7 text-gray-600">
          <li>Structure them</li>
          <li>Position them</li>
          <li>Strengthen them</li>
          <li>Scale them</li>
        </ul>
        <p className="mt-3 text-base leading-7 text-gray-600">
          Catchy is not just an agency. It is a growth partner.
        </p>
      </section>
    </div>
  );
}
