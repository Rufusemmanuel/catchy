"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Item = {
  title: string;
  category: "Verification" | "Social" | "Design" | "Ads" | "Events";
  summary: string;
};

const categories: Array<Item["category"]> = [
  "Verification",
  "Social",
  "Design",
  "Ads",
  "Events",
];

const items: Item[] = [
  {
    title: "Family Restaurant Verification",
    category: "Verification",
    summary: "On-site trust video covering sourcing and hygiene checks.",
  },
  {
    title: "Product Launch Reels",
    category: "Social",
    summary: "Batch content with short-form edits and captions.",
  },
  {
    title: "Brand Refresh Pack",
    category: "Design",
    summary: "Visual identity alignment for digital channels.",
  },
  {
    title: "Event Launch Countdown",
    category: "Events",
    summary: "Multi-post event awareness and promotion sequence.",
  },
  {
    title: "Seasonal Growth Sprint",
    category: "Ads",
    summary: "Paid social campaigns with weekly optimization.",
  },
  {
    title: "Workshop Verification Story",
    category: "Verification",
    summary: "Process-led feature explaining quality controls.",
  },
];

export function WorkFilter() {
  const [active, setActive] = useState<Item["category"]>("Verification");

  const filtered = useMemo(
    () => items.filter((item) => item.category === active),
    [active]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === category
                ? "bg-black text-white"
                : "bg-white text-gray-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <Image
              src="/placeholders/portfolio-card.svg"
              alt="Portfolio placeholder image"
              width={600}
              height={340}
              className="h-40 w-full rounded-xl object-cover"
            />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {item.category}
            </p>
            <h3 className="heading-gradient mt-2 text-lg font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
