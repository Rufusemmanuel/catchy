import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteVerifiedBusinessButton } from "@/components/admin/delete-verified-business-button";
import { VerifiedBusinessForm } from "@/components/admin/verified-business-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminVerifiedBusinessById } from "@/lib/verified-businesses";

export default async function EditVerifiedBusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const record = await getAdminVerifiedBusinessById(id);

  if (!record) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Edit verified business
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/verified"
            className="text-sm font-medium text-slate-700 hover:underline"
          >
            Back to admin
          </Link>
          <DeleteVerifiedBusinessButton
            businessId={record.business.id}
            businessName={record.business.business_name}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-rose-300 bg-rose-50 px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>
      <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
        Prefer <strong>unpublish</strong> for temporary hiding. Delete is permanent and removes this
        business plus its internal review data.
      </p>
      <VerifiedBusinessForm mode="edit" businessId={id} initialRecord={record} />
    </div>
  );
}
