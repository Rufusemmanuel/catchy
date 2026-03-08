import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminAuditLogs } from "@/lib/admin-audit-log";

export default async function AdminAuditPage() {
  await requireAdmin();
  const logs = await getAdminAuditLogs(300);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Admin audit log
        </h1>
        <Link href="/admin/verified" className="text-sm font-medium text-slate-700 hover:underline">
          Back to admin
        </Link>
      </div>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr] gap-3 border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 sm:grid">
          <span>Time</span>
          <span>Actor</span>
          <span>Action</span>
          <span>Business</span>
        </div>
        {logs.map((entry) => (
          <article
            key={entry.id}
            className="grid grid-cols-1 gap-2 border-b border-slate-100 px-5 py-4 text-sm last:border-b-0 sm:grid-cols-[1.2fr_1fr_1fr_1fr] sm:items-center"
          >
            <p className="text-slate-600">{new Date(entry.at).toLocaleString()}</p>
            <p className="font-medium text-slate-800">{entry.actor_email}</p>
            <p className="text-slate-700">{entry.action}</p>
            <p className="text-slate-600">{entry.business_slug || entry.business_id || "-"}</p>
          </article>
        ))}
        {logs.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-600">No audit events yet.</p>
        ) : null}
      </section>
    </div>
  );
}
