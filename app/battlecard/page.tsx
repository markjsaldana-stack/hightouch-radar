import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Battlecard" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="05 · Battlecard"
        title="Hightouch vs. Segment"
        lede="One page a rep can use mid-call, kept live by the Radar."
        sample
      />
    </>
  );
}
