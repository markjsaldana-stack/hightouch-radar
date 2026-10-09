// Cross-file checks the type system can't express: every reference points at
// something that exists. Run with `npm run check:data`.
import { readFileSync } from "node:fs";

const load = (f) => JSON.parse(readFileSync(new URL(`../data/${f}`, import.meta.url)));
const competitors = new Set(load("competitors.json").map((c) => c.id).concat("category"));
const sources = load("sources.json");
const sourceIds = new Set(sources.map((s) => s.id));
const types = new Set(load("signal_types.json").map((t) => t.id));
const signals = load("signals.json");
const signalIds = new Set(signals.map((s) => s.id));
const errors = [];

const enums = {
  tier: ["Primary", "Secondary", "Watch"],
  persona: ["Marketing", "Data", "Product", "Exec"],
  confidence: ["Confirmed", "Likely", "Rumor"],
  urgency: ["Alert now", "This week's digest", "Monthly review"],
  owner: ["Sales", "Sales leadership", "PMM", "Product", "Website", "CS", "Enablement"],
  status: ["Alert sent", "Talk track shipped", "In review", "Gap logged", "Page updated", "Logged"],
};
const checkEnum = (where, kind, value) => {
  if (!enums[kind].includes(value)) errors.push(`${where}: invalid ${kind} "${value}"`);
};

for (const c of load("competitors.json")) {
  checkEnum(`competitor ${c.id}`, "tier", c.tier);
  c.competesFor.forEach((p) => checkEnum(`competitor ${c.id}`, "persona", p));
}

for (const s of sources) if (!competitors.has(s.competitorId)) errors.push(`source ${s.id}: unknown competitor ${s.competitorId}`);
for (const s of signals) {
  if (!competitors.has(s.competitorId)) errors.push(`signal ${s.id}: unknown competitor ${s.competitorId}`);
  if (!sourceIds.has(s.sourceId)) errors.push(`signal ${s.id}: unknown source ${s.sourceId}`);
  if (!types.has(s.type)) errors.push(`signal ${s.id}: unknown type ${s.type}`);
  if (![1, 2, 3, 4, 5].includes(s.impact)) errors.push(`signal ${s.id}: impact must be 1-5`);
  checkEnum(`signal ${s.id}`, "confidence", s.confidence);
  checkEnum(`signal ${s.id}`, "urgency", s.urgency);
  checkEnum(`signal ${s.id}`, "status", s.status);
  s.personas.forEach((p) => checkEnum(`signal ${s.id}`, "persona", p));
  s.owners.forEach((o) => checkEnum(`signal ${s.id}`, "owner", o));
}
const digest = load("digest.json");
const refs = [
  ...digest.topForSales,
  ...digest.trends.flatMap((t) => t.signals),
  ...load("battlecard_segment.json").updatedBySignals.map((u) => u.signal),
  ...load("routing_log.json").entries.map((e) => e.signal),
];
for (const id of refs) if (!signalIds.has(id)) errors.push(`reference to missing signal #${id}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`data ok: ${competitors.size - 1} competitors, ${sources.length} sources, ${signals.length} signals`);
