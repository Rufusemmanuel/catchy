import type { Metadata } from "next";
import { CtaButton } from "@/components/cta-button";
import { brandConfig } from "@/config/brand";

const GOOGLE_FORM_URL = brandConfig.links.googleForm;
const canEmbedForm = GOOGLE_FORM_URL.startsWith("https://docs.google.com/forms");

export const metadata: Metadata = {
  title: "Catchy Verifs",
  description:
    "Apply for Catchy Verifs (FREE), the on-site credibility feature video that helps customers trust your business faster.",
};

export default function CatchyVerifsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Catchy Verifs (FREE)
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--brand-accent)]">
            Video-style credibility features for businesses that want trust at
            first glance.
          </h1>
          <p className="mt-4 text-slate-600">
            Catchy Verifs is an on-site feature video where we capture your real
            process and explain what makes your business reliable.
          </p>
          <div className="mt-6">
            <CtaButton href="#apply">Apply for a Free Catchy Verif</CtaButton>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          <div
            className="relative aspect-video w-full bg-[url('/placeholders/video-poster.svg')] bg-cover bg-center"
            aria-label="Video style section placeholder"
          />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
          Why it works
        </h2>
        <p className="mt-3 text-slate-600">
          Customers trust what they can see. Verifs show the proof behind your
          promise and reduce uncertainty before people buy.
        </p>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
          What we verify
        </h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          {[
            "Sourcing",
            "Production",
            "Quality checks",
            "Reliability",
            "Customer experience",
            "Refund/returns",
          ].map((item) => (
            <li key={item} className="rounded-xl bg-slate-50 p-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
          What&apos;s included
        </h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          {[
            "On-site visit",
            "Filming",
            "Interview",
            "Editing",
            "Captions",
            "Delivery",
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
        <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
          Apply for Free Verif
        </h2>
        <p className="mt-3 text-slate-600">
          Apply through the form below. If embedding is unavailable, use the
          direct form button.
        </p>
        {canEmbedForm ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Catchy Verifs application form"
              src={GOOGLE_FORM_URL}
              className="h-[680px] w-full"
            />
          </div>
        ) : (
          <a
            data-testid="google-form-link"
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-[var(--brand-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-accent-strong)]"
          >
            Open Catchy Verifs Application Form
          </a>
        )}
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--brand-accent)]">
          FAQ
        </h2>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Is selection guaranteed?</span> No.
            Selection is not guaranteed.
          </p>
          <p>
            <span className="font-semibold">How many slots are available?</span>{" "}
            We have limited slots per month.
          </p>
          <p>
            <span className="font-semibold">Do I need to provide consent?</span>{" "}
            Yes. Consent for filming is required.
          </p>
          <p>
            <span className="font-semibold">What is the typical turnaround?</span>{" "}
            Typical turnaround is shared after selection and scheduling.
          </p>
        </div>
      </section>
    </div>
  );
}
