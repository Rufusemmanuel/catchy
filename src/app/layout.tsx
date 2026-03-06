import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import type { CSSProperties } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { brandConfig } from "@/config/brand";

const bodyFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const headingFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://catchy-agency.example"),
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "Catchy | Growth Marketing Agency",
    template: "%s | Catchy",
  },
  description:
    "Catchy is a global growth agency delivering strategy, creative, performance marketing, and web execution, with Catchy Verification as a featured trust service.",
  openGraph: {
    title: "Catchy | Growth Marketing Agency",
    description:
      "Scale with a global growth agency for strategy, creative, performance, and web, featuring Catchy Verification for trust-led visibility.",
    url: "https://catchy-agency.example",
    siteName: "Catchy",
    images: [
      {
        url: "/placeholders/og-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Catchy preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--site-bg": brandConfig.colors.background,
            "--surface-subtle": brandConfig.colors.soft,
          } as CSSProperties
        }
        className={`${bodyFont.variable} ${headingFont.variable} bg-[var(--site-bg)] text-[var(--text-primary)] antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <a
          href={brandConfig.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Catchy on WhatsApp"
          className="fixed bottom-4 right-4 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#22C55E] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(34,197,94,0.35)] transition hover:bg-[#16A34A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-primary)]/50 sm:bottom-6 sm:right-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
            aria-hidden
          >
            <path d="M20.52 3.48A11.87 11.87 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.12.56 4.2 1.62 6.03L0 24l6.14-1.6A11.94 11.94 0 0 0 12.02 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.5-8.52Zm-8.5 18.49c-1.83 0-3.62-.49-5.19-1.42l-.37-.22-3.64.95.97-3.55-.24-.36a9.91 9.91 0 0 1-1.53-5.37c0-5.51 4.49-10 10-10 2.67 0 5.17 1.04 7.06 2.93A9.91 9.91 0 0 1 22.02 12c0 5.51-4.49 9.97-10 9.97Zm5.48-7.47c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.69.15-.2.3-.79.99-.97 1.19-.18.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.49-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.69-1.66-.94-2.28-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.47s1.05 2.87 1.2 3.07c.15.2 2.05 3.12 4.97 4.38.7.3 1.25.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.8-.74 2.05-1.46.25-.72.25-1.34.18-1.46-.07-.12-.27-.2-.57-.35Z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </body>
    </html>
  );
}
