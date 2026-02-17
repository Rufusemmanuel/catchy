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
  title: {
    default: "Catchy | Growth Marketing Agency",
    template: "%s | Catchy",
  },
  description:
    "Catchy helps businesses grow their online presence with trust-led campaigns, content, and FREE Catchy Verifs.",
  openGraph: {
    title: "Catchy | Growth Marketing Agency",
    description:
      "Grow your online presence with credibility-first storytelling and FREE Catchy Verifs.",
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
            "--brand-accent": brandConfig.colors.primary,
            "--brand-accent-strong": brandConfig.colors.secondary,
            "--brand-accent-soft": brandConfig.colors.soft,
          } as CSSProperties
        }
        className={`${bodyFont.variable} ${headingFont.variable} bg-[var(--site-bg)] text-slate-900 antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
