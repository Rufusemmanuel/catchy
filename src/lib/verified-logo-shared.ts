export const MAX_LOGO_UPLOAD_BYTES = 5 * 1024 * 1024;

export const ACCEPTED_LOGO_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
] as const;

export const ACCEPTED_LOGO_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "svg"] as const;

export const LOGO_FILE_ACCEPT_ATTR = ".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml";

export function formatLogoUploadLimit(maxBytes: number): string {
  return `${Math.round(maxBytes / (1024 * 1024))}MB`;
}
