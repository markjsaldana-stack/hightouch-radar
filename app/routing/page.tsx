import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Routing log" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="07 · Routing log"
        title="Where intel went and what it changed"
        lede="The program is measured by what it changes in deals, roadmap, and the website."
        sample
      />
    </>
  );
}
