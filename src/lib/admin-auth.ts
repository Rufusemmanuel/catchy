import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export type AdminPrincipal = {
  id: string;
  email: string;
  name: string;
  role: "admin";
  mfaEnabled: boolean;
};

function parseIpAllowlist(): string[] {
  return (process.env.CATCHY_ADMIN_IP_ALLOWLIST ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

async function getRequestIp(): Promise<string> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }

  return (
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("cf-connecting-ip") ??
    ""
  ).trim();
}

function isAllowedIp(ip: string, allowlist: string[]): boolean {
  if (!allowlist.length) {
    return true;
  }

  return Boolean(ip) && allowlist.includes(ip);
}

export async function isCurrentRequestIpAllowed(): Promise<boolean> {
  const allowlist = parseIpAllowlist();
  const requestIp = await getRequestIp();
  return isAllowedIp(requestIp, allowlist);
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
