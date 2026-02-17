import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Catchy mission, values, and team story.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--brand-accent)]">
          About Catchy
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Our mission is simple: help strong businesses become trusted online
          brands through clear, evidence-based storytelling.
        </p>
        <p className="mt-3 max-w-3xl text-slate-600">
          Catchy stands for consistent growth, honest communication, and trust
          that can be verified.
        </p>
        <Link
          href={brandConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-strong)]"
        >
          Follow @catchy_is_growth on Instagram
        </Link>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          [
            "Credibility first",
            "We prioritize proof over hype in every campaign.",
          ],
          [
            "Operational empathy",
            "We learn how your business works before creating content.",
          ],
          [
            "Growth accountability",
            "We align creative work with measurable outcomes.",
          ],
        ].map(([title, copy]) => (
          <article
            key={title}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
          >
            <h2 className="text-xl font-semibold text-[var(--brand-accent)]">
              {title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{copy}</p>
          </article>
        ))}
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
            Founder
          </h2>
          <Image
            src="/placeholders/founder-placeholder.svg"
            alt="Founder placeholder portrait"
            width={640}
            height={360}
            className="mt-4 rounded-2xl"
          />
          <p className="mt-3 text-sm text-slate-600">
            Founder bio placeholder. Add your founder story and credentials
            here.
          </p>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
            Team Photos
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Image
              src="/placeholders/team-placeholder.svg"
              alt="Team photo placeholder"
              width={320}
              height={220}
              className="rounded-2xl"
            />
            <Image
              src="/placeholders/team-placeholder.svg"
              alt="Team photo placeholder"
              width={320}
              height={220}
              className="rounded-2xl"
            />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Replace placeholders with real team and behind-the-scenes shots.
          </p>
        </article>
      </section>
    </div>
  );
}
