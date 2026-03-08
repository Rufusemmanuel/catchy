import "server-only";

export type AdminRole = "admin";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
  totpSecret?: string;
};

type ParsedAdminUser = {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  password_hash?: string;
  totp_secret?: string;
};

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function parseUsersJson(): ParsedAdminUser[] {
  const rawFromBase64 = process.env.CATCHY_ADMIN_USERS_JSON_B64?.trim();
  const raw = rawFromBase64
    ? Buffer.from(rawFromBase64, "base64").toString("utf8")
    : process.env.CATCHY_ADMIN_USERS_JSON ?? "[]";

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as ParsedAdminUser[]) : [];
  } catch {
    throw new Error("Invalid CATCHY_ADMIN_USERS_JSON. Expected a JSON array.");
  }
}

export function getAdminUsers(): AdminUser[] {
  const parsedUsers = parseUsersJson();
  const users: AdminUser[] = [];

  parsedUsers.forEach((user, index) => {
    const email = normalizeEmail(user.email ?? "");
    const passwordHash = (user.password_hash ?? "").trim();
    const role = user.role === "admin" ? "admin" : null;

    if (!email || !passwordHash || !role) {
      return;
    }

    if (!/^\$2[aby]\$\d{2}\$/.test(passwordHash)) {
      throw new Error(
        `Invalid bcrypt hash for admin user "${email}". In .env files, escape "$" as "\\$" or use CATCHY_ADMIN_USERS_JSON_B64.`
      );
    }

    users.push({
      id: (user.id ?? `admin-${index + 1}`).trim(),
      email,
      name: (user.name ?? email).trim(),
      role,
      passwordHash,
      totpSecret: (user.totp_secret ?? "").trim() || undefined,
    });
  });

  return users;
}

export function findAdminUserByEmail(email: string): AdminUser | null {
  const normalized = normalizeEmail(email);
  return getAdminUsers().find((user) => user.email === normalized) ?? null;
}
