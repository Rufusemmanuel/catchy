import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { HeroVideo } from "@/components/hero-video";
import { brandConfig } from "@/config/brand";

const GOOGLE_FORM_URL = brandConfig.links.googleForm;
const canEmbedForm = GOOGLE_FORM_URL.startsWith("https://docs.google.com/forms");

export const metadata: Metadata = {
  title: "Catchy Verification",
  description:
    "Apply for Catchy Verification to strengthen trust, showcase credibility, and turn proof into customer confidence.",
  openGraph: {
    title: "Catchy Verification | Catchy",
    description:
      "Apply for Catchy Verification and build stronger trust signals with credibility-focused storytelling.",
    url: "https://catchy-agency.example/catchy-verification",
  },
  twitter: {
    title: "Catchy Verification | Catchy",
    description:
      "Apply for Catchy Verification and build stronger trust signals with credibility-focused storytelling.",
  },
};

export default function CatchyVerificationPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Featured Trust Service
          </p>
          <h1 className="heading-gradient mt-3 flex max-w-fit items-center gap-2.5 text-3xl font-bold tracking-tight sm:gap-3 sm:text-4xl">
            <span>Catchy Verification</span>
            <span className="inline-flex flex-none items-center justify-center rounded-xl border border-blue-100 bg-blue-50/85 p-1.5 shadow-sm sm:p-1.5">
              <BadgeCheck className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Catchy Verification helps businesses present clear trust evidence
            through verification-focused storytelling and structured brand
            credibility assets.
          </p>
          <div className="mt-6">
            <CtaButton href="#apply">Apply for Catchy Verification</CtaButton>
          </div>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100">
          <HeroVideo />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">Why it works</h2>
        <p className="mt-3 text-base leading-7 text-gray-600">
          Trust grows when customers can see proof. Catchy Verification closes
          the credibility gap by turning your real operations into clear,
          confidence-building communication.
        </p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">What we verify</h2>
        <ul className="mt-4 grid gap-3 text-base leading-7 text-gray-600 sm:grid-cols-2">
          {[
            "Business identity and positioning",
            "Operational credibility signals",
            "Quality and reliability indicators",
            "Customer trust touchpoints",
            "Proof-of-process storytelling",
            "Public-facing trust messaging",
          ].map((item) => (
            <li key={item} className="rounded-xl bg-slate-50 p-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">What&apos;s included</h2>
        <ul className="mt-4 grid gap-3 text-base leading-7 text-gray-600 sm:grid-cols-2">
          {[
            "Verification intake review",
            "Trust criteria assessment",
            "Credibility story framework",
            "Content direction guidance",
            "Verification rollout recommendations",
            "Campaign-ready trust assets",
          ].map((item) => (
            <li key={item} className="rounded-xl bg-slate-50 p-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="apply"
        className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
      >
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Apply for Catchy Verification
        </h2>
        <p className="mt-3 text-base leading-7 text-gray-600">
          Apply through the embedded form. If the embed has issues, use the
          direct link to open the form in a new tab.
        </p>
        {canEmbedForm ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Catchy Verification application form"
              src={GOOGLE_FORM_URL}
              className="h-[680px] w-full"
            />
          </div>
        ) : null}
        <a
          data-testid="google-form-link"
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-transparent bg-[var(--button-primary)] px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[var(--button-primary-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]/30"
        >
          Open form in new tab
        </a>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">FAQ</h2>
        <div className="mt-4 space-y-3 text-base leading-7 text-gray-600">
          <p>
            <span className="font-semibold">Is selection guaranteed?</span> No.
            Selection is based on fit and available monthly capacity.
          </p>
          <p>
            <span className="font-semibold">How long does review take?</span>{" "}
            Typical review timelines are shared after submission.
          </p>
          <p>
            <span className="font-semibold">Do we need to provide consent?</span>{" "}
            Yes. Applicable consent and approvals are required before production.
          </p>
        </div>
      </section>
    </div>
  );
}

