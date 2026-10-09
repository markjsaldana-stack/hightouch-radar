import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "First 90 days" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="08 · First 90 days"
        title="My first 90 days building this at Hightouch"
        lede="Listen and baseline, systematize, then prove impact."
      />
    </>
  );
}
