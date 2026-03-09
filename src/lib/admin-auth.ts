import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  isAdminIpAllowed,
  parseAdminIpAllowlist,
  resolveRequestIpFromHeaders,
} from "@/lib/admin-ip";

export type AdminPrincipal = {
  id: string;
  email: string;
  name: string;
  role: "admin";
  mfaEnabled: boolean;
};

async function getRequestIp(): Promise<string> {
  const requestHeaders = await headers();
  return resolveRequestIpFromHeaders(requestHeaders);
}

export async function isCurrentRequestIpAllowed(): Promise<boolean> {
  const allowlist = parseAdminIpAllowlist();
  const requestIp = await getRequestIp();
  return isAdminIpAllowed(requestIp, allowlist);
}

function toAdminPrincipal(session: Awaited<ReturnType<typeof auth>>): AdminPrincipal | null {
  if (!session?.user?.email || session.user.role !== "admin") {
    return null;
  }

  return {
    id: session.user.email,
    email: session.user.email,
    name: session.user.name ?? session.user.email,
    role: "admin",
    mfaEnabled: Boolean(session.user.mfaEnabled),
  };
}

export async function getAdminPrincipal(): Promise<AdminPrincipal | null> {
  if (!(await isCurrentRequestIpAllowed())) {
    return null;
  }

  const session = await auth();
  return toAdminPrincipal(session);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  return Boolean(await getAdminPrincipal());
}

export async function requireAdmin(): Promise<AdminPrincipal> {
  const principal = await getAdminPrincipal();
  if (!principal) {
    redirect("/admin/login?error=unauthorized");
  }
  return principal;
}
