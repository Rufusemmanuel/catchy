import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description: "Book a strategy call with Catchy.",
};

export default function BookCallPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--brand-accent)]">
          Book a Strategy Call
        </h1>
        <p className="mt-4 text-slate-600">
          Use your preferred scheduler link here. Placeholder below for now.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-[var(--brand-accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-accent-strong)]"
        >
          Go to Contact
        </Link>
      </section>
    </div>
  );
}
