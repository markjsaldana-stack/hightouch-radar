import type { Confidence, Signal } from "@/lib/types";

const base = "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap";

export function ImpactBadge({ impact }: { impact: Signal["impact"] }) {
  const tone =
    impact >= 4 ? "bg-bad-soft text-bad" : impact === 3 ? "bg-warn-soft text-warn" : "bg-surface-2 text-muted";
  return (
    <span className={`${base} ${tone}`} title="Deal impact, 1 to 5">
      Impact {impact}
    </span>
  );
}

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const tone =
    confidence === "Confirmed"
      ? "bg-good-soft text-good"
      : confidence === "Likely"
        ? "bg-warn-soft text-warn"
        : "bg-surface-2 text-muted";
  return <span className={`${base} ${tone}`}>{confidence}</span>;
}

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className={`${base} border border-line text-muted`}>{children}</span>;
}
