import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Inputs" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="03 · Inputs"
        title="The configuration behind the Radar"
        lede="Competitors, sources, signal types, and the rules that score and route every change."
        sample
      />
    </>
  );
}
