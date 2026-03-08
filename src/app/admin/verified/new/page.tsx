import Link from "next/link";
import { VerifiedBusinessForm } from "@/components/admin/verified-business-form";
import { requireAdmin } from "@/lib/admin-auth";

export default async function NewVerifiedBusinessPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="heading-gradient text-2xl font-bold tracking-tight sm:text-3xl">
          Add verified business
        </h1>
        <Link href="/admin/verified" className="text-sm font-medium text-slate-700 hover:underline">
          Back to admin
        </Link>
      </div>
      <VerifiedBusinessForm mode="create" />
    </div>
  );
}
