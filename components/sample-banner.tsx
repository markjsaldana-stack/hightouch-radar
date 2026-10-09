import { FlaskConical } from "lucide-react";
import { sampleDisclaimer } from "@/lib/site";

export function SampleBanner() {
  return (
    <div
      role="note"
      className="mb-6 flex items-start gap-2.5 rounded-lg border border-warn/30 bg-warn-soft px-3.5 py-2.5 text-sm text-warn"
    >
      <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden />
      <p>
        <strong className="font-semibold">{sampleDisclaimer}</strong>{" "}
        <span className="opacity-90">
          Company names are used for category context; events, ratings, and talk tracks are invented.
        </span>
      </p>
    </div>
  );
}
