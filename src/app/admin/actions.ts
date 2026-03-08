"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { appendAdminAuditLog } from "@/lib/admin-audit-log";
import { getAdminPrincipal, isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteVerifiedBusiness } from "@/lib/verified-businesses";

export async function redirectIfAuthenticated() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/verified");
  }
}

export async function deleteVerifiedBusinessAction(id: string) {
  const principal = await getAdminPrincipal();
  if (!principal) {
    throw new Error("Unauthorized");
  }

  const deleted = await deleteVerifiedBusiness(id);
  await appendAdminAuditLog({
    actor_email: principal.email,
    action: "business_deleted",
    business_id: deleted.id,
    business_slug: deleted.slug,
  });

  revalidatePath("/");
  revalidatePath("/verified");
  revalidatePath(`/verified/${deleted.slug}`);
  revalidatePath("/catchy-verification");
  revalidatePath("/admin/verified");

  return deleted;
}
