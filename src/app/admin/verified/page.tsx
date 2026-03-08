import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/admin-sign-out-button";
import { DeleteVerifiedBusinessButton } from "@/components/admin/delete-verified-business-button";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminVerifiedBusinesses } from "@/lib/verified-businesses";
import {
  formatVerificationStatus,
  getTrustLevelClasses,
  getVerificationStatusClasses,
} from "@/lib/verified-businesses-shared";

export default async function AdminVerifiedIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const records = await getAdminVerifiedBusinesses();

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
            Private Admin
          </p>
          <h1 className="heading-gradient mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Manage verified businesses
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/audit"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Audit log
          </Link>
          <Link
            href="/admin/verified/new"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--button-primary)] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--button-primary-hover)]"
          >
            Add business
          </Link>
          <AdminSignOutButton />
        </div>
      </section>

      {params.saved ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          Saved successfully.
        </p>
      ) : null}
      {params.deleted ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          Business deleted permanently.
        </p>
      ) : null}

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-3 border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 sm:grid">
          <span>Business</span>
          <span>Status</span>
          <span>Trust</span>
          <span>Actions</span>
        </div>
        <div>
          {records.map((record) => (
            <article
              key={record.business.id}
              className="grid grid-cols-1 gap-3 border-b border-slate-100 px-5 py-4 text-sm last:border-b-0 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center"
            >
              <div>
                <p className="font-semibold text-slate-900">{record.business.business_name}</p>
                <p className="text-slate-600">
                  {record.business.industry || "Unspecified industry"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 sm:hidden">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getVerificationStatusClasses(
                      record.business.verification_status
                    )}`}
                  >
                    {formatVerificationStatus(record.business.verification_status)}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getTrustLevelClasses(
                      record.business.trust_level
                    )}`}
                  >
                    {record.business.trust_score} {record.business.trust_level}
                  </span>
                </div>
              </div>
              <p className="hidden sm:block">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getVerificationStatusClasses(
                    record.business.verification_status
                  )}`}
                >
                  {formatVerificationStatus(record.business.verification_status)}
                </span>
              </p>
              <p className="hidden sm:block text-slate-700">
                {record.business.trust_score}{" "}
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${getTrustLevelClasses(
                    record.business.trust_level
                  )}`}
                >
                  {record.business.trust_level}
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/verified/${record.business.slug}`}
                  className="text-sm font-medium text-[#7C3AED] hover:underline"
                >
                  View
                </Link>
                <Link
                  href={`/admin/verified/${record.business.id}/edit`}
                  className="text-sm font-medium text-slate-700 hover:underline"
                >
                  Edit
                </Link>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500">
                  {record.business.is_public ? "Public" : "Private"}
                </span>
                <DeleteVerifiedBusinessButton
                  businessId={record.business.id}
                  businessName={record.business.business_name}
                  className="ml-0 inline-flex h-8 items-center justify-center rounded-lg border border-rose-300 bg-rose-50 px-2.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 sm:ml-2"
                />
              </div>
            </article>
          ))}
          {records.length === 0 ? (
            <p className="px-5 py-8 text-sm text-slate-600">No verified businesses yet.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
