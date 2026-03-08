import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { appendAdminAuditLog } from "@/lib/admin-audit-log";
import { getAdminPrincipal } from "@/lib/admin-auth";
import {
  deleteVerifiedBusiness,
  getAdminVerifiedBusinessById,
  saveVerifiedBusiness,
} from "@/lib/verified-businesses";
import { parseVerifiedBusinessInput } from "@/lib/verified-logo-upload";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const principal = await getAdminPrincipal();
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const before = await getAdminVerifiedBusinessById(id);
    const payload = await parseVerifiedBusinessInput(request);
    const saved = await saveVerifiedBusiness({ ...payload, id });
    const visibilityChanged =
      typeof before?.business.is_public === "boolean" &&
      before.business.is_public !== saved.business.is_public;
    const action = visibilityChanged
      ? saved.business.is_public
        ? "business_published"
        : "business_unpublished"
      : "business_edited";

    await appendAdminAuditLog({
      actor_email: principal.email,
      action,
      business_id: saved.business.id,
      business_slug: saved.business.slug,
    });

    revalidatePath("/");
    revalidatePath("/verified");
    revalidatePath(`/verified/${saved.business.slug}`);
    revalidatePath("/catchy-verification");
    revalidatePath("/admin/verified");

    return NextResponse.json(
      { id: saved.business.id, logo_url: saved.business.logo_url },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not update business profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const principal = await getAdminPrincipal();
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
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

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not delete business profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
