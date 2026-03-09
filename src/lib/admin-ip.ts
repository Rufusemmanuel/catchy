import "server-only";

const LOCAL_IPS = ["127.0.0.1", "::1", "localhost"] as const;

type HeaderMap = Record<string, string | string[] | undefined>;

function firstHeaderValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

function normalizeIp(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/^\[|\]$/g, "");
  if (normalized.startsWith("::ffff:")) {
    return normalized.slice("::ffff:".length);
  }
  return normalized;
}

function isLocalIp(value: string): boolean {
  const normalized = normalizeIp(value);
  return LOCAL_IPS.includes(normalized as (typeof LOCAL_IPS)[number]);
}

export function parseAdminIpAllowlist(): string[] {
  const rawEntries = (process.env.CATCHY_ADMIN_IP_ALLOWLIST ?? "")
    .split(",")
    .map((value) => normalizeIp(value))
    .filter(Boolean);

  const expanded = new Set<string>();
  rawEntries.forEach((entry) => {
    if (entry === "localhost") {
      LOCAL_IPS.forEach((local) => expanded.add(local));
      return;
    }
    expanded.add(entry);
  });

  return [...expanded];
}

export function isAdminIpAllowed(ip: string, allowlist: string[]): boolean {
  if (!allowlist.length) {
    return true;
  }

  const normalized = normalizeIp(ip);
  if (!normalized) {
    return false;
  }

  if (isLocalIp(normalized)) {
    return allowlist.some((value) => isLocalIp(value));
  }

  return allowlist.includes(normalized);
}

export function resolveRequestIpFromMap(headers: HeaderMap): string {
  const forwarded = firstHeaderValue(headers["x-forwarded-for"]);
  if (forwarded) {
    return normalizeIp(forwarded.split(",")[0] ?? "");
  }

  const realIp = firstHeaderValue(headers["x-real-ip"]);
  if (realIp) {
    return normalizeIp(realIp);
  }

  const cfIp = firstHeaderValue(headers["cf-connecting-ip"]);
  if (cfIp) {
    return normalizeIp(cfIp);
  }

  const host = firstHeaderValue(headers.host);
  if (host.includes("localhost") || host.includes("127.0.0.1") || host.includes("[::1]")) {
    return "localhost";
  }

  return process.env.NODE_ENV === "production" ? "" : "localhost";
}

export function resolveRequestIpFromHeaders(headers: Headers): string {
  return resolveRequestIpFromMap({
    "x-forwarded-for": headers.get("x-forwarded-for") ?? undefined,
    "x-real-ip": headers.get("x-real-ip") ?? undefined,
    "cf-connecting-ip": headers.get("cf-connecting-ip") ?? undefined,
    host: headers.get("host") ?? undefined,
  });
}
