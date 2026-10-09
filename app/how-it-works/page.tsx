import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "How it works" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="02 · How it works"
        title="From competitor change to sales-ready intel"
        lede="Sources → Snapshots → Change detection → Classify & score → Route → Outputs."
      />
    </>
  );
}
