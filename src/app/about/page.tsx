import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Catchy, a global marketing and growth agency focused on trust, visibility, and sustainable brand growth.",
};

type TeamMemberCardProps = {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  name: string;
  title: string;
  description: string;
  imagePositionClass?: string;
};

function TeamMemberCard({
  heading,
  imageSrc,
  imageAlt,
  tag,
  name,
  title,
  description,
  imagePositionClass = "object-[center_20%]",
}: TeamMemberCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="heading-gradient text-3xl font-semibold tracking-tight">
        {heading}
      </h2>
      <div className="mt-4 mb-6 border-t border-slate-200" />
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="relative h-[200px] w-[188px] sm:h-[228px] sm:w-[214px] md:h-[270px] md:w-[248px] lg:h-[292px] lg:w-[270px]">
          <div className="absolute inset-0 rounded-[42%_58%_52%_48%/36%_36%_64%_64%] bg-gradient-to-br from-[#7C3AED]/20 via-[#7C3AED]/8 to-transparent" />
          <div className="relative h-full w-full overflow-hidden rounded-[42%_58%_52%_48%/36%_36%_64%_64%] ring-2 ring-[#7C3AED]/25 shadow-[0_16px_34px_rgba(15,23,42,0.18)]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 270px, (min-width: 768px) 248px, (min-width: 640px) 214px, 188px"
              className={`object-cover ${imagePositionClass}`}
            />
          </div>
        </div>
        <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
          {tag}
        </span>
        <p className="mt-3 text-[1.9rem] font-bold leading-tight text-slate-900">
          {name}
        </p>
        <p className="mt-2 text-base font-medium tracking-[0.03em] text-slate-500">
          {title}
        </p>
        <p className="mt-4 max-w-[32ch] text-base leading-7 text-gray-600">
          {description}
        </p>
      </div>
    </article>
  );
}

type InfoCardProps = {
  heading: string;
  children: ReactNode;
};

function InfoCard({ heading, children }: InfoCardProps) {
  return (
    <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="heading-gradient text-3xl font-semibold tracking-tight">
        {heading}
      </h2>
      <div className="mt-4 mb-6 border-t border-slate-200" />
      {children}
    </article>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-28 pt-12 sm:px-6 lg:px-8">
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

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <TeamMemberCard
          heading="Founder"
          imageSrc="/images/founder.jpg"
          imageAlt="Founder - Rufus Emmanuella"
          tag="Founder"
          name="Rufus Emmanuella"
          title="Founder / Growth & Strategy"
          description="Catchy was founded by Rufus Emmanuella, a growth-focused marketing strategist with a strong foundation in communication, branding, and structured business development. Her mission is to help brands scale through trust, structure, and sustainable visibility."
        />
        <TeamMemberCard
          heading="Co-Founders"
          imageSrc="/team/rufus-emmanuella.jpg"
          imageAlt="Rufus Emmanuel, co-founder"
          tag="Co-Founder"
          name="Rufus Emmanuel"
          title="Co-Founder / Growth & Strategy"
          description="Growth-focused marketing strategist with a strong foundation in communication, branding, and structured business development. Built Catchy to bridge the gap between visibility and credibility, helping brands scale with trust, structure, and sustainable growth."
        />
      </section>

      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <InfoCard heading="Our Team">
          <div className="space-y-5">
            <p className="text-slate-600 leading-relaxed">
              Behind Catchy is a team of strategists, creatives, designers, and
              communication experts committed to one mission: helping brands
              grow with structure and confidence.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We collaborate across strategy, advertising, branding, and
              customer engagement to ensure every project delivers measurable
              impact.
            </p>
            <div className="mt-6">
              <p className="text-slate-600 leading-relaxed">We believe in:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-slate-600">Excellence</li>
                <li className="text-slate-600">Professionalism</li>
                <li className="text-slate-600">Transparency</li>
                <li className="text-slate-600">Results</li>
              </ul>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Every brand we work with becomes a growth partner, not just a
              client.
            </p>
          </div>
        </InfoCard>
        <InfoCard heading="Our Vision">
          <p className="text-base leading-7 text-gray-600">
            To become one of the world&apos;s most trusted marketing and growth
            agencies known for building brands that lead with credibility and
            scale with confidence.
          </p>
        </InfoCard>
        <InfoCard heading="Our Mission">
          <p className="text-base leading-7 text-gray-600">
            To help businesses build trust, strengthen visibility, and achieve
            sustainable growth through strategic marketing and structured brand
            development.
          </p>
        </InfoCard>
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
