import { ConfidenceBadge, Chip, ImpactBadge } from "@/components/badges";
import { competitorName, signalTypeLabel } from "@/lib/data";
import type { Signal } from "@/lib/types";

export function SignalCard({ signal }: { signal: Signal }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-mono text-xs text-muted">Signal #{signal.id}</span>
        <ImpactBadge impact={signal.impact} />
        <ConfidenceBadge confidence={signal.confidence} />
        <Chip>{signalTypeLabel(signal.type)}</Chip>
        <Chip>{competitorName(signal.competitorId)}</Chip>
      </div>
      <p className="mt-3 font-medium text-pretty">{signal.change}</p>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-medium">Why it matters</dt>
          <dd className="mt-0.5 text-pretty text-muted">{signal.whyItMatters}</dd>
        </div>
        <div>
          <dt className="font-medium">What to say</dt>
          <dd className="mt-0.5 border-l-2 border-accent pl-3 text-pretty">{signal.whatToSay}</dd>
        </div>
      </dl>
      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs sm:grid-cols-4">
        <div>
          <dt className="text-muted">Urgency</dt>
          <dd className="mt-0.5 font-medium">{signal.urgency}</dd>
        </div>
        <div>
          <dt className="text-muted">Personas</dt>
          <dd className="mt-0.5 font-medium">{signal.personas.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-muted">Routed to</dt>
          <dd className="mt-0.5 font-medium">{signal.owners.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-muted">Status</dt>
          <dd className="mt-0.5 font-medium">{signal.status}</dd>
        </div>
      </dl>
    </article>
  );
}
