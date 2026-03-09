"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deriveTrustLevel,
  formatVerificationStatus,
  getTrustLevelClasses,
  getVerificationStatusClasses,
  slugifyBusinessName,
  VERIFIED_BUSINESS_INDUSTRIES,
  VERIFICATION_STATUSES,
  type AdminBusinessRecord,
} from "@/lib/verified-businesses-shared";
import {
  ACCEPTED_LOGO_EXTENSIONS,
  ACCEPTED_LOGO_MIME_TYPES,
  LOGO_FILE_ACCEPT_ATTR,
  MAX_LOGO_UPLOAD_BYTES,
  formatLogoUploadLimit,
} from "@/lib/verified-logo-shared";
import { VerifiedBusinessLogo } from "@/components/verified-business-logo";

type FormState = {
  business_name: string;
  slug: string;
  logo_url: string;
  verified_video_url: string;
  industry: string;
  location: string;
  website_url: string;
  instagram_url: string;
  facebook_url: string;
  linkedin_url: string;
  phone: string;
  email: string;
  short_summary: string;
  what_was_verified: string;
  verification_status: (typeof VERIFICATION_STATUSES)[number];
  verified_date: string;
  last_reviewed_date: string;
  reviewer_name: string;
  business_legitimacy_score: number | "";
  online_presence_accuracy_score: number | "";
  customer_experience_score: number | "";
  service_quality_score: number | "";
  safety_trust_signals_score: number | "";
  internal_notes: string;
  reviewed_at: string;
  featured: boolean;
  is_public: boolean;
};

const LOGO_RECOMMENDED_MAX_DIMENSION = 512;
const RASTER_LOGO_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

function buildFallbackInternalScores(trustScore: number) {
  const normalized = Math.max(0, Math.min(100, Math.round(Number(trustScore) || 0)));
  const base = Math.floor(normalized / 5);
  const remainder = normalized % 5;

  return {
    business_legitimacy_score: base + (remainder > 0 ? 1 : 0),
    online_presence_accuracy_score: base + (remainder > 1 ? 1 : 0),
    customer_experience_score: base + (remainder > 2 ? 1 : 0),
    service_quality_score: base + (remainder > 3 ? 1 : 0),
    safety_trust_signals_score: base,
  };
}

function buildInitialState(record?: AdminBusinessRecord): FormState {
  if (!record) {
    return {
      business_name: "",
      slug: "",
      logo_url: "",
      verified_video_url: "",
      industry: "",
      location: "",
      website_url: "",
      instagram_url: "",
      facebook_url: "",
      linkedin_url: "",
      phone: "",
      email: "",
      short_summary: "",
      what_was_verified: "",
      verification_status: "active",
      verified_date: "",
      last_reviewed_date: "",
      reviewer_name: "",
      business_legitimacy_score: "",
      online_presence_accuracy_score: "",
      customer_experience_score: "",
      service_quality_score: "",
      safety_trust_signals_score: "",
      internal_notes: "",
      reviewed_at: "",
      featured: false,
      is_public: false,
    };
  }

  const fallbackScores = buildFallbackInternalScores(record.business.trust_score);

  return {
    business_name: record.business.business_name,
    slug: record.business.slug,
    logo_url: record.business.logo_url,
    verified_video_url: record.business.verified_video_url,
    industry: record.business.industry,
    location: record.business.location,
    website_url: record.business.website_url,
    instagram_url: record.business.instagram_url,
    facebook_url: record.business.facebook_url,
    linkedin_url: record.business.linkedin_url,
    phone: record.business.phone,
    email: record.business.email,
    short_summary: record.business.short_summary,
    what_was_verified: record.business.what_was_verified,
    verification_status: record.business.verification_status,
    verified_date: record.business.verified_date,
    last_reviewed_date: record.business.last_reviewed_date,
    reviewer_name: record.review?.reviewer_name ?? "",
    business_legitimacy_score: record.review
      ? record.review.business_legitimacy_score
      : fallbackScores.business_legitimacy_score,
    online_presence_accuracy_score: record.review
      ? record.review.online_presence_accuracy_score
      : fallbackScores.online_presence_accuracy_score,
    customer_experience_score: record.review
      ? record.review.customer_experience_score
      : fallbackScores.customer_experience_score,
    service_quality_score: record.review
      ? record.review.service_quality_score
      : fallbackScores.service_quality_score,
    safety_trust_signals_score: record.review
      ? record.review.safety_trust_signals_score
      : fallbackScores.safety_trust_signals_score,
    internal_notes: record.review?.internal_notes ?? "",
    reviewed_at: record.review?.reviewed_at ?? "",
    featured: record.business.featured,
    is_public: record.business.is_public,
  };
}

function isRasterLogoMimeType(file: File): boolean {
  return RASTER_LOGO_MIME_TYPES.includes(file.type.toLowerCase() as (typeof RASTER_LOGO_MIME_TYPES)[number]);
}

async function readRasterImage(file: File): Promise<{ width: number; height: number; image: HTMLImageElement }> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Unable to read image dimensions."));
      element.src = objectUrl;
    });

    return { width: image.naturalWidth, height: image.naturalHeight, image };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function resizeRasterLogoFile(file: File, maxDimension: number): Promise<File> {
  const { width, height, image } = await readRasterImage(file);
  const longestSide = Math.max(width, height);

  if (longestSide <= maxDimension) {
    return file;
  }

  const scale = maxDimension / longestSide;
  const nextWidth = Math.max(1, Math.round(width * scale));
  const nextHeight = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = nextWidth;
  canvas.height = nextHeight;

  const context = canvas.getContext("2d");
  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0, nextWidth, nextHeight);

  const mimeType = file.type.toLowerCase();
  const targetMimeType =
    mimeType === "image/png"
      ? "image/png"
      : mimeType === "image/webp"
      ? "image/webp"
      : "image/jpeg";

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, targetMimeType, 0.9)
  );

  if (!blob) {
    return file;
  }

  return new File([blob], file.name, {
    type: targetMimeType,
    lastModified: Date.now(),
  });
}

export function VerifiedBusinessForm({
  mode,
  businessId,
  initialRecord,
}: {
  mode: "create" | "edit";
  businessId?: string;
  initialRecord?: AdminBusinessRecord;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(buildInitialState(initialRecord));
  const [slugTouched, setSlugTouched] = useState(Boolean(initialRecord?.business.slug));
  const [intent, setIntent] = useState<"save" | "draft">("save");
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState("");
  const [logoError, setLogoError] = useState("");
  const [logoHint, setLogoHint] = useState("");
  const hasCustomIndustry =
    Boolean(form.industry) && !VERIFIED_BUSINESS_INDUSTRIES.includes(form.industry);

  const trustScore = useMemo(
    () =>
      Number(form.business_legitimacy_score || 0) +
      Number(form.online_presence_accuracy_score || 0) +
      Number(form.customer_experience_score || 0) +
      Number(form.service_quality_score || 0) +
      Number(form.safety_trust_signals_score || 0),
    [
      form.business_legitimacy_score,
      form.online_presence_accuracy_score,
      form.customer_experience_score,
      form.service_quality_score,
      form.safety_trust_signals_score,
    ]
  );
  const trustLevel = useMemo(() => deriveTrustLevel(trustScore), [trustScore]);
  const logoPreviewSource = logoPreviewUrl || form.logo_url;

  useEffect(() => () => {
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }
  }, [logoPreviewUrl]);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleLogoSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setLogoError("");
    setLogoHint("");

    if (!file) {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
      setLogoFile(null);
      setLogoPreviewUrl("");
      setLogoHint("");
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const hasValidMime = ACCEPTED_LOGO_MIME_TYPES.includes(
      file.type.toLowerCase() as (typeof ACCEPTED_LOGO_MIME_TYPES)[number]
    );
    const hasValidExtension = ACCEPTED_LOGO_EXTENSIONS.includes(
      extension as (typeof ACCEPTED_LOGO_EXTENSIONS)[number]
    );

    if (!hasValidMime && !hasValidExtension) {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
      setLogoFile(null);
      setLogoPreviewUrl("");
      setLogoHint("");
      setLogoError("Invalid logo file type. Use PNG, JPG, JPEG, WEBP, or SVG.");
      event.currentTarget.value = "";
      return;
    }

    if (file.size > MAX_LOGO_UPLOAD_BYTES) {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
      setLogoFile(null);
      setLogoPreviewUrl("");
      setLogoHint("");
      setLogoError(`Logo file is too large. Maximum size is ${formatLogoUploadLimit(MAX_LOGO_UPLOAD_BYTES)}.`);
      event.currentTarget.value = "";
      return;
    }

    void (async () => {
      try {
        const selectedFile = file;
        const normalizedFile = isRasterLogoMimeType(selectedFile)
          ? await resizeRasterLogoFile(selectedFile, LOGO_RECOMMENDED_MAX_DIMENSION)
          : selectedFile;

        if (normalizedFile.size > MAX_LOGO_UPLOAD_BYTES) {
          if (logoPreviewUrl) {
            URL.revokeObjectURL(logoPreviewUrl);
          }
          setLogoFile(null);
          setLogoPreviewUrl("");
          setLogoHint("");
          setLogoError(`Logo file is too large. Maximum size is ${formatLogoUploadLimit(MAX_LOGO_UPLOAD_BYTES)}.`);
          event.currentTarget.value = "";
          return;
        }

        if (isRasterLogoMimeType(normalizedFile)) {
          const { width, height } = await readRasterImage(normalizedFile);
          const ratioGap = Math.abs(width - height) / Math.max(width, height);
          if (ratioGap > 0.1) {
            setLogoHint("For best display, use a square logo.");
          }
        }

        if (logoPreviewUrl) {
          URL.revokeObjectURL(logoPreviewUrl);
        }

        setLogoFile(normalizedFile);
        setLogoPreviewUrl(URL.createObjectURL(normalizedFile));
      } catch {
        if (logoPreviewUrl) {
          URL.revokeObjectURL(logoPreviewUrl);
        }
        setLogoFile(null);
        setLogoPreviewUrl("");
        setLogoHint("");
        setLogoError("Unable to process this logo file. Try another image.");
        event.currentTarget.value = "";
      }
    })();
  };

  const clearSelectedLogoFile = () => {
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }
    setLogoFile(null);
    setLogoPreviewUrl("");
    setLogoError("");
    setLogoHint("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        business_legitimacy_score: Number(form.business_legitimacy_score),
        online_presence_accuracy_score: Number(form.online_presence_accuracy_score),
        customer_experience_score: Number(form.customer_experience_score),
        service_quality_score: Number(form.service_quality_score),
        safety_trust_signals_score: Number(form.safety_trust_signals_score),
        is_public: intent === "draft" ? false : form.is_public,
      };
      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, String(value ?? ""));
      });

      if (logoFile) {
        formData.append("logo_file", logoFile);
      }

      const endpoint = mode === "create" ? "/api/admin/verified" : `/api/admin/verified/${businessId}`;
      const method = mode === "create" ? "POST" : "PUT";
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const failure = (await response.json()) as { error?: string };
        throw new Error(failure.error || "Unable to save changes.");
      }

      router.push("/admin/verified?saved=1");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
      <div className="space-y-6">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Business details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Business name" required>
              <input
                value={form.business_name}
                onChange={(e) => {
                  const value = e.target.value;
                  setField("business_name", value);

                  if (!slugTouched) {
                    setField("slug", slugifyBusinessName(value));
                  }
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Slug (editable)">
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setField("slug", e.target.value);
                }}
                className={inputClass}
                placeholder="auto-generated if empty"
              />
            </Field>
            <Field label="Business logo">
              <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                <input
                  type="file"
                  accept={LOGO_FILE_ACCEPT_ATTR}
                  onChange={handleLogoSelection}
                  className={`${inputClass} h-auto cursor-pointer px-3 py-2`}
                />
                <p className="text-xs text-slate-500">
                  Recommended logo format: square image (1:1 ratio), 512×512 for best display. Supported formats: PNG, JPG, JPEG, WEBP, SVG. Max {formatLogoUploadLimit(MAX_LOGO_UPLOAD_BYTES)}.
                </p>
                {logoFile ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-medium text-slate-700">Selected file: {logoFile.name}</p>
                    <button
                      type="button"
                      onClick={clearSelectedLogoFile}
                      className="inline-flex h-7 items-center justify-center rounded-md border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Use current logo
                    </button>
                  </div>
                ) : form.logo_url ? (
                  <p className="text-xs text-slate-600">Current logo: {form.logo_url}</p>
                ) : null}
                {logoHint ? <p className="text-xs text-amber-700">{logoHint}</p> : null}
                {logoError ? <p className="text-xs text-red-700">{logoError}</p> : null}
              </div>
            </Field>
            <div className="sm:col-span-2">
              <details className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-slate-700 marker:text-slate-400">
                  Advanced: set logo URL/path manually
                </summary>
                <div className="mt-3">
                  <Field label="Logo URL / Path (optional fallback)">
                    <input
                      value={form.logo_url}
                      onChange={(e) => setField("logo_url", e.target.value)}
                      className={inputClass}
                      placeholder="/uploads/verified-logos/example.png or https://..."
                    />
                  </Field>
                </div>
              </details>
            </div>
            <Field label="Industry">
              <select value={form.industry} onChange={(e) => setField("industry", e.target.value)} className={inputClass}>
                <option value="">Select industry</option>
                {hasCustomIndustry ? (
                  <option value={form.industry}>{form.industry} (existing value)</option>
                ) : null}
                {VERIFIED_BUSINESS_INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Location">
              <input value={form.location} onChange={(e) => setField("location", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Website URL">
              <input value={form.website_url} onChange={(e) => setField("website_url", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Link to verified video">
              <input
                type="url"
                value={form.verified_video_url}
                onChange={(e) => setField("verified_video_url", e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </Field>
            <Field label="Instagram URL">
              <input value={form.instagram_url} onChange={(e) => setField("instagram_url", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Facebook URL">
              <input value={form.facebook_url} onChange={(e) => setField("facebook_url", e.target.value)} className={inputClass} />
            </Field>
            <Field label="LinkedIn URL">
              <input value={form.linkedin_url} onChange={(e) => setField("linkedin_url", e.target.value)} className={inputClass} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Public profile content</h2>
          <div className="mt-4 space-y-4">
            <Field label="Short summary">
              <textarea rows={2} value={form.short_summary} onChange={(e) => setField("short_summary", e.target.value)} className={textareaClass} />
            </Field>
            <Field label="What was verified">
              <textarea rows={3} value={form.what_was_verified} onChange={(e) => setField("what_was_verified", e.target.value)} className={textareaClass} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Verification status + trust score</h2>
          <p className="mt-1 text-sm text-slate-600">
            Trust score and trust level are derived automatically from internal review scores.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Verification status">
              <select value={form.verification_status} onChange={(e) => setField("verification_status", e.target.value as FormState["verification_status"])} className={inputClass}>
                {VERIFICATION_STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </Field>
            <Field label="Trust score (0-100)">
              <input type="number" min={0} max={100} value={trustScore} disabled readOnly className={`${inputClass} bg-slate-100 text-slate-700`} />
            </Field>
            <Field label="Verified date">
              <input type="date" value={form.verified_date} onChange={(e) => setField("verified_date", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Last reviewed date">
              <input type="date" value={form.last_reviewed_date} onChange={(e) => setField("last_reviewed_date", e.target.value)} className={inputClass} />
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <span className="font-medium">Derived trust level:</span>
            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getTrustLevelClasses(trustLevel)}`}>
              {trustLevel}
            </span>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Internal review (admin only)</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Reviewer name">
              <input value={form.reviewer_name} onChange={(e) => setField("reviewer_name", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Reviewed at">
              <input type="date" value={form.reviewed_at} onChange={(e) => setField("reviewed_at", e.target.value)} className={inputClass} />
            </Field>
            <ScoreField label="Business legitimacy score" value={form.business_legitimacy_score} onChange={(value) => setField("business_legitimacy_score", value)} />
            <ScoreField label="Online presence accuracy score" value={form.online_presence_accuracy_score} onChange={(value) => setField("online_presence_accuracy_score", value)} />
            <ScoreField label="Customer experience score" value={form.customer_experience_score} onChange={(value) => setField("customer_experience_score", value)} />
            <ScoreField label="Service / product quality score" value={form.service_quality_score} onChange={(value) => setField("service_quality_score", value)} />
            <ScoreField label="Safety & trust signals score" value={form.safety_trust_signals_score} onChange={(value) => setField("safety_trust_signals_score", value)} />
          </div>
          <div className="mt-4">
            <Field label="Internal notes">
              <textarea rows={4} value={form.internal_notes} onChange={(e) => setField("internal_notes", e.target.value)} className={textareaClass} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Publishing controls</h2>
          <p className="mt-1 text-sm text-slate-600">
            Save as draft keeps the profile private. Publish uses your current visibility settings.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => setField("featured", e.target.checked)} />
              Featured on homepage
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={form.is_public} onChange={(e) => setField("is_public", e.target.checked)} />
              Publicly visible
            </label>
          </div>
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              onClick={() => setIntent("draft")}
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save draft
            </button>
            <button
              type="submit"
              onClick={() => setIntent("save")}
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--button-primary)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--button-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : mode === "create" ? "Create profile" : "Save changes"}
            </button>
          </div>
        </section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">Live Preview</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{form.business_name || "Business name"}</h3>
          <p className="mt-1 text-sm text-slate-600">{form.industry || "Industry"}</p>
          <div className="mt-4">
            <VerifiedBusinessLogo
              src={logoPreviewSource}
              alt={`${form.business_name || "Business"} logo preview`}
              className="mx-auto max-w-[10.5rem] sm:max-w-[11.5rem]"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${getVerificationStatusClasses(form.verification_status)}`}>
              {formatVerificationStatus(form.verification_status)}
            </span>
            <span className="inline-flex rounded-full bg-[#7C3AED]/10 px-2.5 py-1 text-xs font-semibold text-[#7C3AED]">
              Verified by Catchy
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
            <span className="font-medium text-slate-700">Catchy Trust Score</span>
            <span className="font-semibold text-slate-900">{trustScore}</span>
          </div>
          <div className="mt-2">
            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getTrustLevelClasses(trustLevel)}`}>
              {trustLevel}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{form.short_summary || "Short summary preview."}</p>
        </section>
      </aside>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm text-slate-700">
      <span className="font-medium">{label}{required ? " *" : ""}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ScoreField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | "";
  onChange: (next: number | "") => void;
}) {
  const handleChange = (raw: string) => {
    if (raw === "") {
      onChange("");
      return;
    }

    const parsed = Number(raw || 0);
    if (!Number.isFinite(parsed)) {
      onChange("");
      return;
    }

    onChange(Math.max(0, Math.min(20, Math.round(parsed))));
  };

  return (
    <Field label={label}>
      <input
        type="number"
        min={0}
        max={20}
        step={1}
        placeholder="0-20"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={inputClass}
      />
    </Field>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15";

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15";
