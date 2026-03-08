import "server-only";

import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import type { VerifiedBusinessInput } from "@/lib/verified-businesses";
import { VERIFICATION_STATUSES, type VerificationStatus } from "@/lib/verified-businesses-shared";
import {
  ACCEPTED_LOGO_EXTENSIONS,
  ACCEPTED_LOGO_MIME_TYPES,
  MAX_LOGO_UPLOAD_BYTES,
} from "@/lib/verified-logo-shared";

const TEXT_FIELDS = [
  "business_name",
  "slug",
  "logo_url",
  "industry",
  "location",
  "website_url",
  "instagram_url",
  "facebook_url",
  "linkedin_url",
  "phone",
  "email",
  "verified_date",
  "last_reviewed_date",
  "short_summary",
  "full_description",
  "what_was_verified",
  "reviewer_name",
  "internal_notes",
  "reviewed_at",
] as const;

const NUMBER_FIELDS = [
  "trust_score",
  "authenticity_score",
  "brand_presence_score",
  "customer_credibility_score",
  "legitimacy_score",
  "operational_consistency_score",
] as const;

const BOOLEAN_FIELDS = ["featured", "is_public"] as const;

const UPLOAD_DIRECTORY_PATH = path.join(process.cwd(), "public", "uploads", "verified-logos");
const UPLOAD_PUBLIC_PREFIX = "/uploads/verified-logos";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(formData: FormData, key: string): number | undefined {
  const value = readText(formData, key);
  if (!value) {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function readBoolean(formData: FormData, key: string): boolean {
  const value = readText(formData, key).toLowerCase();
  return value === "true" || value === "1" || value === "on";
}

function sanitizeFilename(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "business-logo";
}

function extractFileExtension(fileName: string): string {
  const extension = path.extname(fileName || "").toLowerCase().replace(".", "");
  return extension;
}

function isValidLogoMime(mimeType: string): boolean {
  return ACCEPTED_LOGO_MIME_TYPES.includes(mimeType as (typeof ACCEPTED_LOGO_MIME_TYPES)[number]);
}

function isValidLogoExtension(extension: string): boolean {
  return ACCEPTED_LOGO_EXTENSIONS.includes(extension as (typeof ACCEPTED_LOGO_EXTENSIONS)[number]);
}

async function writeUploadedLogo(file: File): Promise<string> {
  if (file.size <= 0) {
    throw new Error("Logo upload is empty.");
  }

  if (file.size > MAX_LOGO_UPLOAD_BYTES) {
    throw new Error("Logo file is too large. Maximum size is 5MB.");
  }

  const mimeType = file.type.toLowerCase();
  const extensionFromName = extractFileExtension(file.name);

  if (!isValidLogoMime(mimeType) && !isValidLogoExtension(extensionFromName)) {
    throw new Error("Invalid logo file type. Use PNG, JPG, JPEG, WEBP, or SVG.");
  }

  const extension = isValidLogoExtension(extensionFromName)
    ? extensionFromName
    : mimeType === "image/png"
    ? "png"
    : mimeType === "image/jpeg"
    ? "jpg"
    : mimeType === "image/webp"
    ? "webp"
    : "svg";

  const baseName = sanitizeFilename(path.basename(file.name, path.extname(file.name)));
  const uniqueName = `${Date.now()}-${randomUUID().slice(0, 8)}-${baseName}.${extension}`;

  if (IS_PRODUCTION) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error(
        "Logo upload storage is not configured for production. Set BLOB_READ_WRITE_TOKEN."
      );
    }

    const blob = await put(`verified-logos/${uniqueName}`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type || undefined,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
  }

  await fs.mkdir(UPLOAD_DIRECTORY_PATH, { recursive: true });
  const absolutePath = path.join(UPLOAD_DIRECTORY_PATH, uniqueName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(absolutePath, bytes);
  return `${UPLOAD_PUBLIC_PREFIX}/${uniqueName}`;
}

async function parseMultipartPayload(request: Request): Promise<VerifiedBusinessInput> {
  const formData = await request.formData();
  const payload: VerifiedBusinessInput = {
    business_name: readText(formData, "business_name"),
  };

  for (const key of TEXT_FIELDS) {
    payload[key] = readText(formData, key);
  }

  const legacyLogoPath = readText(formData, "logo_path");
  if (!payload.logo_url && legacyLogoPath) {
    payload.logo_url = legacyLogoPath;
  }

  const verificationStatus = readText(formData, "verification_status");
  if (VERIFICATION_STATUSES.includes(verificationStatus as VerificationStatus)) {
    payload.verification_status = verificationStatus as VerificationStatus;
  }

  for (const key of NUMBER_FIELDS) {
    payload[key] = readNumber(formData, key);
  }

  for (const key of BOOLEAN_FIELDS) {
    payload[key] = readBoolean(formData, key);
  }

  const logoFile = formData.get("logo_file");
  if (logoFile instanceof File && logoFile.size > 0) {
    payload.logo_url = await writeUploadedLogo(logoFile);
  }

  return payload;
}

export async function parseVerifiedBusinessInput(request: Request): Promise<VerifiedBusinessInput> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("multipart/form-data")) {
    return parseMultipartPayload(request);
  }

  return (await request.json()) as VerifiedBusinessInput;
}
