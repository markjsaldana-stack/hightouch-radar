import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  ChevronRight,
  Diff,
  Globe,
  Route,
  Tags,
  UserCheck,
  Inbox,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { competitorName, signalById, signalTypeLabel, sources } from "@/lib/data";

export const metadata: Metadata = { title: "How it works" };

// The worked example traced through every step below.
const EXAMPLE_SIGNAL = 15;

export default function Page() {
  const signal = signalById(EXAMPLE_SIGNAL)!;
  const source = sources.find((s) => s.id === signal.sourceId)!;
  const competitor = competitorName(signal.competitorId);

  const steps = [
    {
      icon: Globe,
      title: "Sources",
      body: "Changelogs, release notes, pricing pages, product docs, blogs, webinars, job posts, partner pages, public review themes, win-loss notes, and sales-call mentions.",
      trace: `${competitor} ${source.type}, checked ${source.frequency.toLowerCase()}.`,
    },
    {
      icon: Camera,
      title: "Snapshots",
      body: "Each source is captured on a schedule: weekly by default, daily for pricing pages.",
      trace: "Captured Oct 5 and Oct 6.",
    },
    {
      icon: Diff,
      title: "Change detection",
      body: "Diff against the last snapshot. Cosmetic changes like dates, typos, and layout are ignored.",
      trace: "1 meaningful change: identity resolution moved from Add-ons into the Starter edition. The date stamp change was ignored.",
    },
    {
      icon: Tags,
      title: "Classify & score",
      body: "AI does the first pass, then I review it. Each change gets a type, the personas it affects, and scores for deal impact, urgency, and confidence.",
      trace: `${signalTypeLabel(signal.type)} · Impact ${signal.impact}/5 · ${signal.personas.join(", ")} · ${signal.confidence}.`,
    },
    {
      icon: Route,
      title: "Route",
      body: "High-impact items go to Sales the same day. Roadmap-relevant items go to Product. Messaging items go to PMM and the website.",
      trace: `${signal.urgency} → ${signal.owners.join(" + ")}.`,
    },
    {
      icon: Inbox,
      title: "Outputs",
      body: "Weekly digest, live battlecards, the comparison matrix, and alerts for urgent shifts.",
      trace: "Same-day sales alert, battlecard update, and a top-3 slot in Monday's digest.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="02 · How it works"
        title="From competitor change to sales-ready intel"
        lede="Six steps run every week. Collection is mostly automated, and I review every change before it reaches a rep."
        sample
      />

      {/* Flow strip: the whole pipeline at a glance. */}
      <ol
        aria-label="Pipeline steps"
        className="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-xl border border-line bg-surface p-3"
      >
        {steps.map(({ icon: Icon, title }, i) => (
          <li key={title} className="flex items-center gap-1">
            <a
              href={`#step-${i + 1}`}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              <Icon className="size-4 text-accent" aria-hidden />
              {title}
            </a>
            {i < steps.length - 1 ? <ChevronRight className="size-4 text-muted" aria-hidden /> : null}
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-2 text-sm text-muted">
        <span className="font-medium text-fg">Follow one change through:</span>
        <span>
          Signal #{signal.id}, {signal.change}
        </span>
      </div>

      <ol className="relative mt-6 space-y-4">
        {steps.map(({ icon: Icon, title, body, trace }, i) => (
          <li
            key={title}
            id={`step-${i + 1}`}
            className="relative grid scroll-mt-32 gap-4 rounded-xl border border-line bg-surface p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-8"
          >
            <div className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-semibold">
                  <span className="mr-2 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {title}
                </h2>
                <p className="mt-1 text-sm text-pretty text-muted">{body}</p>
              </div>
            </div>
            <div className="rounded-lg border border-dashed border-line bg-surface-2 px-4 py-3 text-sm">
              <p className="font-mono text-[11px] tracking-wide text-muted uppercase">Signal #{signal.id}</p>
              <p className="mt-1 text-pretty">{trace}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="mt-8 flex gap-4 rounded-xl border border-accent/30 bg-accent-soft p-6">
        <UserCheck className="mt-0.5 size-6 shrink-0 text-accent" aria-hidden />
        <div>
          <h2 className="font-semibold">Human in the loop</h2>
          <p className="mt-1 max-w-2xl text-pretty">
            AI handles collection and first drafts. I own the judgment, the point of view, and anything a rep will
            say to a customer. I check every talk track against its source, and anything rated Rumor stays out of
            talk tracks entirely.
          </p>
        </div>
      </aside>

      <div className="mt-10">
        <Link
          href="/inputs"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          See the inputs and the diff <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </>
  );
}
