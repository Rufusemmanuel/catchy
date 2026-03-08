"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deriveTrustLevel,
  formatVerificationStatus,
  getTrustLevelClasses,
  getVerificationStatusClasses,
  slugifyBusinessName,
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

type FormState = {
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
  short_summary: string;
  full_description: string;
  what_was_verified: string;
  verification_status: (typeof VERIFICATION_STATUSES)[number];
  verified_date: string;
  last_reviewed_date: string;
  trust_score: number;
  reviewer_name: string;
  authenticity_score: number;
  brand_presence_score: number;
  customer_credibility_score: number;
  legitimacy_score: number;
  operational_consistency_score: number;
  internal_notes: string;
  reviewed_at: string;
  featured: boolean;
  is_public: boolean;
};

function buildInitialState(record?: AdminBusinessRecord): FormState {
  if (!record) {
    return {
      business_name: "",
      slug: "",
      logo_url: "",
      industry: "",
      location: "",
      website_url: "",
      instagram_url: "",
      facebook_url: "",
      linkedin_url: "",
      phone: "",
      email: "",
      short_summary: "",
      full_description: "",
      what_was_verified: "",
      verification_status: "pending",
      verified_date: "",
      last_reviewed_date: "",
      trust_score: 0,
      reviewer_name: "",
      authenticity_score: 0,
      brand_presence_score: 0,
      customer_credibility_score: 0,
      legitimacy_score: 0,
      operational_consistency_score: 0,
      internal_notes: "",
      reviewed_at: "",
      featured: false,
      is_public: false,
    };
  }

  return {
    business_name: record.business.business_name,
    slug: record.business.slug,
    logo_url: record.business.logo_url,
    industry: record.business.industry,
    location: record.business.location,
    website_url: record.business.website_url,
    instagram_url: record.business.instagram_url,
    facebook_url: record.business.facebook_url,
    linkedin_url: record.business.linkedin_url,
    phone: record.business.phone,
    email: record.business.email,
    short_summary: record.business.short_summary,
    full_description: record.business.full_description,
    what_was_verified: record.business.what_was_verified,
    verification_status: record.business.verification_status,
    verified_date: record.business.verified_date,
    last_reviewed_date: record.business.last_reviewed_date,
    trust_score: record.business.trust_score,
    reviewer_name: record.review?.reviewer_name ?? "",
    authenticity_score: record.review?.authenticity_score ?? 0,
    brand_presence_score: record.review?.brand_presence_score ?? 0,
    customer_credibility_score: record.review?.customer_credibility_score ?? 0,
    legitimacy_score: record.review?.legitimacy_score ?? 0,
    operational_consistency_score: record.review?.operational_consistency_score ?? 0,
    internal_notes: record.review?.internal_notes ?? "",
    reviewed_at: record.review?.reviewed_at ?? "",
    featured: record.business.featured,
    is_public: record.business.is_public,
  };
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

  const trustLevel = useMemo(() => deriveTrustLevel(Number(form.trust_score)), [form.trust_score]);
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

    if (!file) {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
      setLogoFile(null);
      setLogoPreviewUrl("");
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
      setLogoError(`Logo file is too large. Maximum size is ${formatLogoUploadLimit(MAX_LOGO_UPLOAD_BYTES)}.`);
      event.currentTarget.value = "";
      return;
    }

    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }

    setLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedLogoFile = () => {
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }
    setLogoFile(null);
    setLogoPreviewUrl("");
    setLogoError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        trust_score: Number(form.trust_score),
        authenticity_score: Number(form.authenticity_score),
        brand_presence_score: Number(form.brand_presence_score),
        customer_credibility_score: Number(form.customer_credibility_score),
        legitimacy_score: Number(form.legitimacy_score),
        operational_consistency_score: Number(form.operational_consistency_score),
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
                  Upload from your computer. Supported formats: PNG, JPG, JPEG, WEBP, SVG. Max {formatLogoUploadLimit(MAX_LOGO_UPLOAD_BYTES)}.
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
              <input value={form.industry} onChange={(e) => setField("industry", e.target.value)} className={inputClass} />
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
            <Field label="Full description">
              <textarea rows={4} value={form.full_description} onChange={(e) => setField("full_description", e.target.value)} className={textareaClass} />
            </Field>
            <Field label="What was verified">
              <textarea rows={3} value={form.what_was_verified} onChange={(e) => setField("what_was_verified", e.target.value)} className={textareaClass} />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Verification status + trust score</h2>
          <p className="mt-1 text-sm text-slate-600">
            Trust level is derived automatically from the trust score.
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
              <input type="number" min={0} max={100} value={form.trust_score} onChange={(e) => setField("trust_score", Number(e.target.value || 0))} className={inputClass} />
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
            <ScoreField label="Authenticity score" value={form.authenticity_score} onChange={(value) => setField("authenticity_score", value)} />
            <ScoreField label="Brand presence score" value={form.brand_presence_score} onChange={(value) => setField("brand_presence_score", value)} />
            <ScoreField label="Customer credibility score" value={form.customer_credibility_score} onChange={(value) => setField("customer_credibility_score", value)} />
            <ScoreField label="Legitimacy score" value={form.legitimacy_score} onChange={(value) => setField("legitimacy_score", value)} />
            <ScoreField label="Operational consistency score" value={form.operational_consistency_score} onChange={(value) => setField("operational_consistency_score", value)} />
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
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
            {logoPreviewSource ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoPreviewSource} alt="Logo preview" className="h-20 w-full object-contain" />
            ) : (
              <div className="flex h-20 items-center justify-center text-xs text-slate-500">
                Logo preview
              </div>
            )}
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
            <span className="font-semibold text-slate-900">{Number(form.trust_score) || 0}</span>
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
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <Field label={label}>
      <input type="number" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value || 0))} className={inputClass} />
    </Field>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15";

const textareaClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15";
