import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublicVerifiedBusinessBySlug,
} from "@/lib/verified-businesses";
import {
  formatVerificationStatus,
  getTrustLevelClasses,
  getVerificationStatusClasses,
} from "@/lib/verified-businesses-shared";

function Detail({ label, value }: { label: string; value: string }) {
  if (!value) {
    return null;
  }

  return (
    <p className="text-sm text-slate-600">
      <span className="font-semibold text-slate-800">{label}:</span> {value}
    </p>
  );
}

export default async function VerifiedBusinessProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await getPublicVerifiedBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
              Verified by Catchy
            </p>
            <h1 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {business.business_name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getVerificationStatusClasses(
                  business.verification_status
                )}`}
              >
                {formatVerificationStatus(business.verification_status)}
              </span>
              <span className="inline-flex rounded-full bg-[#7C3AED]/10 px-2.5 py-1 text-xs font-semibold text-[#7C3AED]">
                Catchy Trust Score: {business.trust_score}
              </span>
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getTrustLevelClasses(
                  business.trust_level
                )}`}
              >
                {business.trust_level}
              </span>
            </div>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {business.short_summary || "Public trust summary will be updated after the latest review cycle."}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Image
              src={business.logo_url || "/logo.png"}
              alt={`${business.business_name} logo`}
              width={360}
              height={180}
              className="h-24 w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <h2 className="heading-gradient text-2xl font-bold tracking-tight">
          Public trust profile
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          {business.full_description || "A detailed public description will be added after the next content update."}
        </p>
        {business.what_was_verified ? (
          <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <span className="font-semibold">What was verified:</span>{" "}
            {business.what_was_verified}
          </p>
        ) : null}
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Detail label="Industry" value={business.industry} />
          <Detail label="Location" value={business.location} />
          <Detail label="Verified date" value={business.verified_date} />
          <Detail label="Last reviewed" value={business.last_reviewed_date} />
          <Detail label="Phone" value={business.phone} />
          <Detail label="Email" value={business.email} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm font-medium">
          {business.website_url ? (
            <a
              href={business.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-[#7C3AED] hover:bg-slate-50"
            >
              Website
            </a>
          ) : null}
          {business.instagram_url ? (
            <a
              href={business.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-[#7C3AED] hover:bg-slate-50"
            >
              Instagram
            </a>
          ) : null}
          {business.facebook_url ? (
            <a
              href={business.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-[#7C3AED] hover:bg-slate-50"
            >
              Facebook
            </a>
          ) : null}
          {business.linkedin_url ? (
            <a
              href={business.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-[#7C3AED] hover:bg-slate-50"
            >
              LinkedIn
            </a>
          ) : null}
          {!business.website_url &&
          !business.instagram_url &&
          !business.facebook_url &&
          !business.linkedin_url ? (
            <p className="text-sm text-slate-500">Official links will be added soon.</p>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 text-sm leading-6 text-slate-600 shadow-sm ring-1 ring-slate-100 sm:p-6">
        The Catchy Trust Score reflects Catchy&apos;s internal verification
        review and is not a legal certification or financial endorsement.
      </section>

      <Link
        href="/verified"
        className="inline-flex text-sm font-semibold text-[#7C3AED] hover:underline"
      >
        Back to all verified businesses
      </Link>
    </div>
  );
}
