export const VERIFICATION_STATUSES = ["active", "pending", "expired", "revoked"] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export type TrustLevel = "High" | "Strong" | "Moderate" | "Limited";

export type VerifiedBusiness = {
  id: string;
  business_name: string;
  slug: string;
  logo_url: string;
  industry: string;
  location: string;
  website_url: string;
  instagram_url: string;
  facebook_url: string;
  linkedin_url: string;
  phone: string;
  email: string;
  verification_status: VerificationStatus;
  verified_date: string;
  last_reviewed_date: string;
  trust_score: number;
  trust_level: TrustLevel;
  short_summary: string;
  full_description: string;
  what_was_verified: string;
  featured: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type VerificationReview = {
  id: string;
  business_id: string;
  reviewer_name: string;
  authenticity_score: number;
  brand_presence_score: number;
  customer_credibility_score: number;
  legitimacy_score: number;
  operational_consistency_score: number;
  internal_notes: string;
  reviewed_at: string;
};

export type PublicVerifiedBusiness = Omit<VerifiedBusiness, "created_at" | "updated_at">;

export type AdminBusinessRecord = {
  business: VerifiedBusiness;
  review: VerificationReview | null;
};

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

export function deriveTrustLevel(score: number): TrustLevel {
  const normalized = clampScore(score);

  if (normalized >= 85) {
    return "High";
  }

  if (normalized >= 70) {
    return "Strong";
  }

  if (normalized >= 50) {
    return "Moderate";
  }

  return "Limited";
}

export function slugifyBusinessName(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getVerificationStatusClasses(status: VerificationStatus): string {
  if (status === "active") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  if (status === "pending") {
    return "bg-amber-50 text-amber-700 ring-amber-100";
  }

  if (status === "expired") {
    return "bg-slate-100 text-slate-700 ring-slate-200";
  }

  return "bg-rose-50 text-rose-700 ring-rose-100";
}

export function formatVerificationStatus(status: VerificationStatus): string {
  if (status === "active") {
    return "Active";
  }

  if (status === "pending") {
    return "Pending";
  }

  if (status === "expired") {
    return "Expired";
  }

  return "Revoked";
}

export function getTrustLevelClasses(level: TrustLevel): string {
  if (level === "High") {
    return "bg-[#7C3AED]/12 text-[#5B21B6]";
  }

  if (level === "Strong") {
    return "bg-indigo-50 text-indigo-700";
  }

  if (level === "Moderate") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-rose-50 text-rose-700";
}
