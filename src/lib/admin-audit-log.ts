import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import {
  durableStoreEnvHint,
  hasDurableStoreConfig,
  storeGet,
  storeSet,
} from "@/lib/server-store";

export type AdminAuditAction =
  | "admin_login"
  | "admin_login_failed"
  | "business_created"
  | "business_edited"
  | "business_published"
  | "business_unpublished"
  | "business_deleted";

export type AdminAuditEntry = {
  id: string;
  at: string;
  actor_email: string;
  action: AdminAuditAction;
  business_id?: string;
  business_slug?: string;
  details?: string;
};

type AuditFile = {
  entries: AdminAuditEntry[];
};

const AUDIT_FILE_PATH = path.join(process.cwd(), "data", "admin-audit-log.json");
const AUDIT_KV_KEY = "catchy:admin:audit:v1";
const MAX_AUDIT_ENTRIES = 5000;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function defaultData(): AuditFile {
  return { entries: [] };
}

async function ensureFile() {
  try {
    await fs.access(AUDIT_FILE_PATH);
  } catch {
    await fs.mkdir(path.dirname(AUDIT_FILE_PATH), { recursive: true });
    await fs.writeFile(AUDIT_FILE_PATH, JSON.stringify(defaultData(), null, 2), "utf8");
  }
}

async function readData(): Promise<AuditFile> {
  if (hasDurableStoreConfig()) {
    const parsed = (await storeGet<Partial<AuditFile>>(AUDIT_KV_KEY)) ?? defaultData();
    return { entries: parsed.entries ?? [] };
  }

  if (IS_PRODUCTION) {
    throw new Error(
      `Audit log storage is not configured for production. ${durableStoreEnvHint()}`
    );
  }

  await ensureFile();
  try {
    const raw = await fs.readFile(AUDIT_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<AuditFile>;
    return { entries: parsed.entries ?? [] };
  } catch {
    return defaultData();
  }
}

async function writeData(data: AuditFile) {
  if (hasDurableStoreConfig()) {
    await storeSet(AUDIT_KV_KEY, data);
    return;
  }

  if (IS_PRODUCTION) {
    throw new Error(
      `Audit log storage is not configured for production. ${durableStoreEnvHint()}`
    );
  }

  await ensureFile();
  const temp = `${AUDIT_FILE_PATH}.tmp`;
  await fs.writeFile(temp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(temp, AUDIT_FILE_PATH);
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function appendAdminAuditLog(entry: Omit<AdminAuditEntry, "id" | "at">): Promise<void> {
  const data = await readData();
  data.entries.push({
    id: makeId(),
    at: new Date().toISOString(),
    ...entry,
  });

  if (data.entries.length > MAX_AUDIT_ENTRIES) {
    data.entries = data.entries.slice(data.entries.length - MAX_AUDIT_ENTRIES);
  }

  await writeData(data);
}

export async function getAdminAuditLogs(limit = 200): Promise<AdminAuditEntry[]> {
  const data = await readData();
  return data.entries.slice(-limit).reverse();
}
