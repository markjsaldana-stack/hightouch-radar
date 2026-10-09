import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { personName } from "@/lib/site";

export const metadata: Metadata = { title: "First 90 days" };

const phases = [
  {
    days: "Days 1–30",
    name: "Listen & baseline",
    items: [
      "Interview reps, SEs, PMs, and CS about where competitors show up and what they need in the moment.",
      "Audit existing competitive content and retire anything out of date.",
      "Pull win-loss and call data to see which competitors we actually lose to.",
      "Pick the primary competitors based on that data.",
      "Ship v1 battlecards for the top 3.",
    ],
    done: "Reps have current battlecards for the 3 competitors they see most.",
  },
  {
    days: "Days 31–60",
    name: "Systematize",
    items: [
      "Launch the weekly digest and a sales alert channel.",
      "Start a monthly win-loss interview cadence.",
      "Build the comparison matrix and the first comparison pages.",
    ],
    done: "The Radar runs every week without me having to chase it.",
  },
  {
    days: "Days 61–90",
    name: "Prove impact",
    items: [
      "Set the KPI baseline and report win rate against each primary competitor.",
      "Feed a quarterly competitive review into roadmap planning.",
      "Run a field enablement session on the top competitive plays.",
    ],
    done: "Leadership sees win rate by competitor, and Product plans with CI in the room.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="08 · First 90 days"
        title="My first 90 days building this at Hightouch"
        lede="Listen first, then build the system, then prove it changes win rates."
      />

      <ol className="grid gap-4 lg:grid-cols-3">
        {phases.map((p, i) => (
          <li key={p.days} className="flex flex-col rounded-xl border border-line bg-surface p-5">
            <p className="font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")} · {p.days}
            </p>
            <h2 className="mt-1 text-lg font-semibold">{p.name}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {p.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-line pt-4 text-sm [&:not(:first-child)]:mt-5">
              <span className="text-xs font-medium tracking-wide text-muted uppercase">Done when</span>
              <span className="mt-1 block text-pretty">{p.done}</span>
            </p>
          </li>
        ))}
      </ol>

      <blockquote className="mt-12 rounded-xl bg-fg p-8 text-bg">
        <p className="text-xl leading-relaxed font-medium text-balance">
          I ran this program at Gymdesk across more than a dozen competitors. This is how I&apos;d build it for
          Hightouch.
        </p>
        <footer className="mt-4 text-sm opacity-70">{personName}</footer>
      </blockquote>
    </>
  );
}
