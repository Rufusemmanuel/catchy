import Image from "next/image";
import Link from "next/link";
import { getPublicDirectoryFilters, getPublicVerifiedBusinesses, type VerificationStatus } from "@/lib/verified-businesses";
import {
  formatVerificationStatus,
  getTrustLevelClasses,
  getVerificationStatusClasses,
} from "@/lib/verified-businesses-shared";

export default async function VerifiedDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string; status?: VerificationStatus | "" }>;
}) {
  const params = await searchParams;
  const businesses = await getPublicVerifiedBusinesses({
    query: params.q,
    industry: params.industry,
    status: params.status,
  });
  const filters = await getPublicDirectoryFilters();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C3AED]">
          Public Verification Directory
        </p>
        <h1 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Browse verified businesses
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          Explore businesses verified by Catchy and review public trust details, verification status,
          and credibility summaries.
        </p>

        <form className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr_auto_auto]">
            <input
              type="search"
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="Search verified businesses..."
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15"
            />
            <select
              name="industry"
              defaultValue={params.industry ?? ""}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15"
            >
              <option value="">All industries</option>
              {filters.industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <select
              name="status"
              defaultValue={params.status ?? ""}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15"
            >
              <option value="">All statuses</option>
              {filters.statuses.map((status) => (
                <option key={status} value={status}>
                  {formatVerificationStatus(status)}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--button-primary)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--button-primary-hover)]"
            >
              Search
            </button>
            <Link
              href="/verified"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              Reset
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Showing {businesses.length} public {businesses.length === 1 ? "profile" : "profiles"}.
          </p>
        </form>
      </section>

      {businesses.length === 0 ? (
        <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
          <p className="text-base text-slate-700">No verified businesses match your current filters.</p>
          <Link href="/verified" className="mt-3 inline-flex text-sm font-semibold text-[#7C3AED] hover:underline">
            Clear filters and browse all
          </Link>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {businesses.map((business) => (
            <article key={business.id} className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                <Image
                  src={business.logo_url || "/logo.png"}
                  alt={`${business.business_name} logo`}
                  width={280}
                  height={120}
                  className="h-16 w-full object-contain"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{business.business_name}</h2>
                  <p className="text-sm text-slate-600">{business.industry || "Uncategorized"}</p>
                </div>
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getVerificationStatusClasses(business.verification_status)}`}>
                  {formatVerificationStatus(business.verification_status)}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[#7C3AED]">Verified by Catchy</p>
              <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <span className="font-semibold">Catchy Trust Score:</span> {business.trust_score}
                <span className={`ml-2 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${getTrustLevelClasses(business.trust_level)}`}>
                  {business.trust_level}
                </span>
              </div>
              {business.verified_date ? (
                <p className="mt-1 text-sm text-slate-600">Verified on {business.verified_date}</p>
              ) : null}
              <Link href={`/verified/${business.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#7C3AED] hover:underline">
                View profile
              </Link>
            </article>
          ))}
        </section>
      )}
      <p className="text-sm leading-6 text-slate-500">
        The Catchy Trust Score reflects Catchy&apos;s internal verification review and is not a legal
        certification or financial endorsement.
      </p>
    </div>
  );
}
