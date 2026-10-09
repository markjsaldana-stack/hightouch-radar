import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Weekly digest" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="04 · Weekly digest"
        title="What sales gets every Monday"
        lede="Top moves, what to say about them, and every signal from the week in one place."
        sample
      />
    </>
  );
}
