import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Matrix & map" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="06 · Matrix & map"
        title="Comparison matrix and positioning map"
        lede="Capabilities by persona, and where each player sits on the composable-to-packaged spectrum."
        sample
      />
    </>
  );
}
