type VerifiedBusinessLogoProps = {
  src?: string;
  alt: string;
  className?: string;
  placeholderLabel?: string;
};

export function VerifiedBusinessLogo({
  src,
  alt,
  className = "",
  placeholderLabel = "Logo preview",
}: VerifiedBusinessLogoProps) {
  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-4 ${className}`.trim()}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-contain object-center" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
          {placeholderLabel}
        </div>
      )}
    </div>
  );
}
