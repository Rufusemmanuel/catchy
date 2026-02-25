import type { Metadata } from "next";
import { WorkFilter } from "@/components/work-filter";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore placeholder portfolio categories: Verification, Social, Design, Ads, and Events.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <section>
        <h1 className="heading-gradient text-4xl font-bold tracking-tight">
          Our Work
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Browse selected placeholder projects by category.
        </p>
      </section>
      <WorkFilter />
    </div>
  );
}
