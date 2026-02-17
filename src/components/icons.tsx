type IconProps = {
  className?: string;
};

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 4h3.3l4.2 5.8L16.3 4H20l-6.5 7.5L20 20h-3.3l-4.6-6.2L7.1 20H4l6.8-7.9L4 4z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TikTokIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M14.4 4c.4 1.8 1.6 3.2 3.5 3.9v2.7a6.7 6.7 0 0 1-3.4-1v5.2a5.5 5.5 0 1 1-4.8-5.5v2.8a2.7 2.7 0 1 0 2 2.7V4h2.7z"
        fill="currentColor"
      />
    </svg>
  );
}
