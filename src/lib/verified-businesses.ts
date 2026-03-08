import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import {
  durableStoreEnvHint,
  hasDurableStoreConfig,
  storeGet,
  storeSet,
} from "@/lib/server-store";
import {
  VERIFICATION_STATUSES,
  clampScore,
  deriveTrustLevel,
  slugifyBusinessName,
  type AdminBusinessRecord,
  type PublicVerifiedBusiness,
  type VerificationReview,
  type VerificationStatus,
  type VerifiedBusiness,
} from "@/lib/verified-businesses-shared";

export {
  VERIFICATION_STATUSES,
  clampScore,
  deriveTrustLevel,
  slugifyBusinessName,
  type AdminBusinessRecord,
  type PublicVerifiedBusiness,
  type VerificationReview,
  type VerificationStatus,
  type VerifiedBusiness,
};

type VerifiedDataFile = {
  verified_businesses: VerifiedBusiness[];
  verification_reviews: VerificationReview[];
};

type LegacyVerifiedBusiness = VerifiedBusiness & {
  logo_path?: string;
};

export type VerifiedBusinessInput = {
  id?: string;
  business_name: string;
  slug?: string;
  logo_url?: string;
  industry?: string;
  location?: string;
  website_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  linkedin_url?: string;
  phone?: string;
  email?: string;
  verification_status?: VerificationStatus;
  verified_date?: string;
  last_reviewed_date?: string;
  trust_score?: number;
  short_summary?: string;
  full_description?: string;
  what_was_verified?: string;
  featured?: boolean;
  is_public?: boolean;
  reviewer_name?: string;
  authenticity_score?: number;
  brand_presence_score?: number;
  customer_credibility_score?: number;
  legitimacy_score?: number;
  operational_consistency_score?: number;
  internal_notes?: string;
  reviewed_at?: string;
};

const DATA_FILE_PATH = path.join(process.cwd(), "data", "verified-businesses.json");
const VERIFIED_DATA_KV_KEY = "catchy:verified:data:v1";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

function defaultData(): VerifiedDataFile {
  return {
    verified_businesses: [],
    verification_reviews: [],
  };
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    const directory = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultData(), null, 2), "utf8");
  }
}

async function readDataFile(): Promise<VerifiedDataFile> {
  if (hasDurableStoreConfig()) {
    const parsed = (await storeGet<Partial<VerifiedDataFile>>(VERIFIED_DATA_KV_KEY)) ?? defaultData();
    return {
      verified_businesses: (parsed.verified_businesses ?? []).map((record) => {
        const typedRecord = record as LegacyVerifiedBusiness;
        return {
          ...typedRecord,
          logo_url: normalizeText(typedRecord.logo_url || typedRecord.logo_path),
        };
      }),
      verification_reviews: parsed.verification_reviews ?? [],
    };
  }

  await ensureDataFile();
  const contents = await fs.readFile(DATA_FILE_PATH, "utf8");

  try {
    const parsed = JSON.parse(contents) as Partial<VerifiedDataFile>;
    return {
      verified_businesses: (parsed.verified_businesses ?? []).map((record) => {
        const typedRecord = record as LegacyVerifiedBusiness;
        return {
          ...typedRecord,
          logo_url: normalizeText(typedRecord.logo_url || typedRecord.logo_path),
        };
      }),
      verification_reviews: parsed.verification_reviews ?? [],
    };
  } catch {
    return defaultData();
  }
}

async function writeDataFile(data: VerifiedDataFile) {
  if (hasDurableStoreConfig()) {
    await storeSet(VERIFIED_DATA_KV_KEY, data);
    return;
  }

  if (IS_PRODUCTION) {
    throw new Error(
      `Verified business storage is not configured for production. ${durableStoreEnvHint()}`
    );
  }

  await ensureDataFile();
  const next = JSON.stringify(data, null, 2);
  const tempFile = `${DATA_FILE_PATH}.tmp`;
  await fs.writeFile(tempFile, next, "utf8");
  await fs.rename(tempFile, DATA_FILE_PATH);
}

function normalizeUrl(value: string | undefined): string {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function normalizeText(value: string | undefined): string {
  return (value ?? "").trim();
}

function toPublicBusiness(business: VerifiedBusiness): PublicVerifiedBusiness {
  return {
    ...business,
  };
}

function sortPublicBusinesses(a: VerifiedBusiness, b: VerifiedBusiness): number {
  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }

  return b.verified_date.localeCompare(a.verified_date);
}

function getUniqueSlug(baseSlug: string, businesses: VerifiedBusiness[], currentId?: string): string {
  const safeBase = baseSlug || "verified-business";
  let nextSlug = safeBase;
  let sequence = 2;

  while (
    businesses.some(
      (business) => business.slug === nextSlug && business.id !== currentId
    )
  ) {
    nextSlug = `${safeBase}-${sequence}`;
    sequence += 1;
  }

  return nextSlug;
}

export async function getPublicVerifiedBusinesses(options?: {
  query?: string;
  industry?: string;
  status?: VerificationStatus | "";
  featuredOnly?: boolean;
}): Promise<PublicVerifiedBusiness[]> {
  const data = await readDataFile();
  const query = normalizeText(options?.query).toLowerCase();
  const industryFilter = normalizeText(options?.industry);
  const statusFilter = options?.status ?? "";

  return data.verified_businesses
    .filter((business) => business.is_public)
    .filter((business) => !options?.featuredOnly || business.featured)
    .filter((business) => {
      if (!query) {
        return true;
      }

      return business.business_name.toLowerCase().includes(query);
    })
    .filter((business) => {
      if (!industryFilter) {
        return true;
      }

      return business.industry === industryFilter;
    })
    .filter((business) => {
      if (!statusFilter) {
        return true;
      }

      return business.verification_status === statusFilter;
    })
    .sort(sortPublicBusinesses)
    .map(toPublicBusiness);
}

export async function getFeaturedPublicVerifiedBusinesses(limit = 4): Promise<PublicVerifiedBusiness[]> {
  const businesses = await getPublicVerifiedBusinesses({ featuredOnly: true });
  return businesses.slice(0, limit);
}

export async function getPublicVerifiedBusinessBySlug(slug: string): Promise<PublicVerifiedBusiness | null> {
  const data = await readDataFile();
  const business = data.verified_businesses.find(
    (record) => record.slug === slug && record.is_public
  );

  if (!business) {
    return null;
  }

  return toPublicBusiness(business);
}

export async function getPublicDirectoryFilters(): Promise<{
  industries: string[];
  statuses: VerificationStatus[];
}> {
  const data = await readDataFile();

  const industries = Array.from(
    new Set(
      data.verified_businesses
        .filter((business) => business.is_public)
        .map((business) => business.industry)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  return {
    industries,
    statuses: [...VERIFICATION_STATUSES],
  };
}

export async function getAdminVerifiedBusinesses(): Promise<AdminBusinessRecord[]> {
  const data = await readDataFile();

  return data.verified_businesses
    .map((business) => {
      const review = data.verification_reviews.find(
        (candidate) => candidate.business_id === business.id
      );

      return { business, review: review ?? null };
    })
    .sort((a, b) => b.business.updated_at.localeCompare(a.business.updated_at));
}

export async function getAdminVerifiedBusinessById(id: string): Promise<AdminBusinessRecord | null> {
  const data = await readDataFile();
  const business = data.verified_businesses.find((record) => record.id === id);

  if (!business) {
    return null;
  }

  const review = data.verification_reviews.find((record) => record.business_id === id) ?? null;
  return { business, review };
}

export async function saveVerifiedBusiness(input: VerifiedBusinessInput): Promise<AdminBusinessRecord> {
  const data = await readDataFile();
  const nowIso = new Date().toISOString();
  const id = normalizeText(input.id) || randomUUID();

  const businessName = normalizeText(input.business_name);

  if (!businessName) {
    throw new Error("Business name is required.");
  }

  const baseSlug = slugifyBusinessName(normalizeText(input.slug) || businessName);
  const slug = getUniqueSlug(baseSlug, data.verified_businesses, input.id);

  const trustScore = clampScore(Number(input.trust_score ?? 0));
  const trustLevel = deriveTrustLevel(trustScore);
  const inputWithLegacyLogo = input as VerifiedBusinessInput & { logo_path?: string };
  const resolvedLogoUrl = normalizeText(input.logo_url || inputWithLegacyLogo.logo_path);

  const businessDraft: VerifiedBusiness = {
    id,
    business_name: businessName,
    slug,
    logo_url: resolvedLogoUrl,
    industry: normalizeText(input.industry),
    location: normalizeText(input.location),
    website_url: normalizeUrl(input.website_url),
    instagram_url: normalizeUrl(input.instagram_url),
    facebook_url: normalizeUrl(input.facebook_url),
    linkedin_url: normalizeUrl(input.linkedin_url),
    phone: normalizeText(input.phone),
    email: normalizeText(input.email),
    verification_status: input.verification_status ?? "pending",
    verified_date: normalizeText(input.verified_date),
    last_reviewed_date: normalizeText(input.last_reviewed_date),
    trust_score: trustScore,
    trust_level: trustLevel,
    short_summary: normalizeText(input.short_summary),
    full_description: normalizeText(input.full_description),
    what_was_verified: normalizeText(input.what_was_verified),
    featured: Boolean(input.featured),
    is_public: Boolean(input.is_public),
    created_at: nowIso,
    updated_at: nowIso,
  };

  const currentIndex = data.verified_businesses.findIndex((record) => record.id === id);

  if (currentIndex >= 0) {
    const current = data.verified_businesses[currentIndex];
    data.verified_businesses[currentIndex] = {
      ...businessDraft,
      created_at: current.created_at,
      updated_at: nowIso,
    };
  } else {
    data.verified_businesses.push(businessDraft);
  }

  const reviewDraft: VerificationReview = {
    id: randomUUID(),
    business_id: id,
    reviewer_name: normalizeText(input.reviewer_name),
    authenticity_score: clampScore(Number(input.authenticity_score ?? 0)),
    brand_presence_score: clampScore(Number(input.brand_presence_score ?? 0)),
    customer_credibility_score: clampScore(Number(input.customer_credibility_score ?? 0)),
    legitimacy_score: clampScore(Number(input.legitimacy_score ?? 0)),
    operational_consistency_score: clampScore(Number(input.operational_consistency_score ?? 0)),
    internal_notes: normalizeText(input.internal_notes),
    reviewed_at: normalizeText(input.reviewed_at),
  };

  const reviewIndex = data.verification_reviews.findIndex((record) => record.business_id === id);

  if (reviewIndex >= 0) {
    const existingReview = data.verification_reviews[reviewIndex];
    data.verification_reviews[reviewIndex] = {
      ...reviewDraft,
      id: existingReview.id,
    };
  } else {
    data.verification_reviews.push(reviewDraft);
  }

  await writeDataFile(data);

  return {
    business: data.verified_businesses.find((record) => record.id === id)!,
    review: data.verification_reviews.find((record) => record.business_id === id) ?? null,
  };
}

export async function deleteVerifiedBusiness(id: string): Promise<{ id: string; slug: string }> {
  const data = await readDataFile();
  const normalizedId = normalizeText(id);

  if (!normalizedId) {
    throw new Error("Business id is required.");
  }

  const businessIndex = data.verified_businesses.findIndex((record) => record.id === normalizedId);
  if (businessIndex < 0) {
    throw new Error("Business record not found.");
  }

  const [deletedBusiness] = data.verified_businesses.splice(businessIndex, 1);
  data.verification_reviews = data.verification_reviews.filter(
    (review) => review.business_id !== normalizedId
  );

  await writeDataFile(data);
  return { id: deletedBusiness.id, slug: deletedBusiness.slug };
}
