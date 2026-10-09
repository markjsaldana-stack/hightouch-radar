import type { ReactNode } from "react";
import { SampleBanner } from "@/components/sample-banner";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  sample?: boolean;
};

export function PageHeader({ eyebrow, title, lede, sample }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {sample ? <SampleBanner /> : null}
      <p className="font-mono text-xs tracking-wide text-accent uppercase">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
      {lede ? <p className="mt-3 max-w-2xl text-lg text-pretty text-muted">{lede}</p> : null}
    </div>
  );
}
