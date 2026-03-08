import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { appendAdminAuditLog } from "@/lib/admin-audit-log";
import { getAdminPrincipal } from "@/lib/admin-auth";
import { saveVerifiedBusiness } from "@/lib/verified-businesses";
import { parseVerifiedBusinessInput } from "@/lib/verified-logo-upload";

export async function POST(request: Request) {
  const principal = await getAdminPrincipal();
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await parseVerifiedBusinessInput(request);
    const saved = await saveVerifiedBusiness(payload);
    await appendAdminAuditLog({
      actor_email: principal.email,
      action: "business_created",
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
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create business profile.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
