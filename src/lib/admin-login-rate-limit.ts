import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

type AttemptRecord = {
  key: string;
  attempts: number;
  first_attempt_at: string;
  last_attempt_at: string;
  locked_until?: string;
};

type AttemptsFile = {
  records: AttemptRecord[];
};

const ATTEMPTS_FILE_PATH = path.join(process.cwd(), "data", "admin-login-attempts.json");

const DEFAULT_MAX_ATTEMPTS = Number(process.env.CATCHY_ADMIN_LOGIN_MAX_ATTEMPTS ?? 5);
const DEFAULT_WINDOW_MINUTES = Number(process.env.CATCHY_ADMIN_LOGIN_WINDOW_MINUTES ?? 15);
const DEFAULT_LOCK_MINUTES = Number(process.env.CATCHY_ADMIN_LOGIN_LOCK_MINUTES ?? 30);

function now(): Date {
  return new Date();
}

function makeKey(ip: string, email: string): string {
  return `${ip || "unknown"}::${email.toLowerCase().trim()}`;
}

function defaultData(): AttemptsFile {
  return { records: [] };
}

async function ensureFile() {
  try {
    await fs.access(ATTEMPTS_FILE_PATH);
  } catch {
    await fs.mkdir(path.dirname(ATTEMPTS_FILE_PATH), { recursive: true });
    await fs.writeFile(ATTEMPTS_FILE_PATH, JSON.stringify(defaultData(), null, 2), "utf8");
  }
}

async function readFileData(): Promise<AttemptsFile> {
  await ensureFile();
  try {
    const raw = await fs.readFile(ATTEMPTS_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<AttemptsFile>;
    return { records: parsed.records ?? [] };
  } catch {
    return defaultData();
  }
}

async function writeFileData(data: AttemptsFile) {
  await ensureFile();
  const next = JSON.stringify(data, null, 2);
  const tempPath = `${ATTEMPTS_FILE_PATH}.tmp`;
  await fs.writeFile(tempPath, next, "utf8");
  await fs.rename(tempPath, ATTEMPTS_FILE_PATH);
}

function pruneExpired(records: AttemptRecord[]): AttemptRecord[] {
  const cutoff = now().getTime() - 24 * 60 * 60 * 1000;
  return records.filter((record) => {
    const lastAttempt = Date.parse(record.last_attempt_at);
    return Number.isFinite(lastAttempt) && lastAttempt >= cutoff;
  });
}

export async function getLoginLockStatus(ip: string, email: string): Promise<{ locked: boolean; retryAfterSeconds: number }> {
  const data = await readFileData();
  const key = makeKey(ip, email);
  const record = data.records.find((candidate) => candidate.key === key);

  if (!record?.locked_until) {
    return { locked: false, retryAfterSeconds: 0 };
  }

  const lockUntil = Date.parse(record.locked_until);
  const remainingMs = lockUntil - now().getTime();
  if (!Number.isFinite(lockUntil) || remainingMs <= 0) {
    return { locked: false, retryAfterSeconds: 0 };
  }

  return {
    locked: true,
    retryAfterSeconds: Math.ceil(remainingMs / 1000),
  };
}

export async function registerFailedLoginAttempt(ip: string, email: string): Promise<void> {
  const data = await readFileData();
  const key = makeKey(ip, email);
  const currentTime = now();
  const currentIso = currentTime.toISOString();
  const windowStart = currentTime.getTime() - DEFAULT_WINDOW_MINUTES * 60 * 1000;

  data.records = pruneExpired(data.records);
  const existingIndex = data.records.findIndex((candidate) => candidate.key === key);

  if (existingIndex < 0) {
    data.records.push({
      key,
      attempts: 1,
      first_attempt_at: currentIso,
      last_attempt_at: currentIso,
    });
    await writeFileData(data);
    return;
  }

  const record = data.records[existingIndex];
  const firstAttemptMs = Date.parse(record.first_attempt_at);
  const isOutsideWindow = !Number.isFinite(firstAttemptMs) || firstAttemptMs < windowStart;

  const attempts = isOutsideWindow ? 1 : record.attempts + 1;
  const firstAttemptAt = isOutsideWindow ? currentIso : record.first_attempt_at;

  const next: AttemptRecord = {
    ...record,
    attempts,
    first_attempt_at: firstAttemptAt,
    last_attempt_at: currentIso,
  };

  if (attempts >= DEFAULT_MAX_ATTEMPTS) {
    next.locked_until = new Date(currentTime.getTime() + DEFAULT_LOCK_MINUTES * 60 * 1000).toISOString();
  }

  data.records[existingIndex] = next;
  await writeFileData(data);
}

export async function clearLoginAttempts(ip: string, email: string): Promise<void> {
  const data = await readFileData();
  const key = makeKey(ip, email);
  data.records = data.records.filter((record) => record.key !== key);
  await writeFileData(data);
}
