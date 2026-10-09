import type { Metadata } from "next";
import { AssistantMockup } from "@/components/assistant-mockup";
import { PageHeader } from "@/components/page-header";
import { battlecard, competitorName } from "@/lib/data";
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

const stages = [
  { name: "Discovery", gives: "Landmine questions to plant before the evaluation starts." },
  { name: "Evaluation & demo", gives: "The demo moments and proof points that land with this buyer." },
  { name: "Technical validation", gives: "Architecture answers for the data team and what to test in the POC." },
  { name: "Proposal & negotiation", gives: "Responses to bundling and cost objections, and when to bring in the AE's TCO worksheet." },
  { name: "Renewal", gives: "Proof of value to date and what to say if a competitor shows up at renewal." },
];

const buildSteps = [
  {
    title: "Ground it in the Radar",
    body: "It answers only from the battlecards, signals, matrix, and win-loss notes, and every line cites the signal or card section it came from. When the data has no answer, it says so.",
  },
  {
    title: "Ask before answering",
    body: "Three questions first: who the customer is (buyer persona, company size, industry), which competitor is in the deal, and where the deal is in the sales process.",
  },
  {
    title: "Shape the answer to the stage",
    body: "The same competitor needs landmine questions in discovery and cost responses in negotiation. Claude drafts the answer in the format that stage needs.",
  },
  {
    title: "Put it where reps work",
    body: "Slack and the CRM opportunity page, so a rep can ask between calls without opening another tool.",
  },
  {
    title: "Turn gaps into intel requests",
    body: "Questions it can't answer come to me. They become new sources to track or new win-loss interview questions.",
  },
];

export default function Page() {
  const persona = battlecard.byPersona.find((p) => p.persona === "Marketing")!;
  const objection = battlecard.objections[0];
  const competitor = competitorName(battlecard.competitorId);
  const conversation = [
    { from: "bot" as const, text: "Who's the customer? Give me the buyer and the company." },
    { from: "rep" as const, text: "Marketing buyer at a mid-market retailer." },
    { from: "bot" as const, text: "Which competitor is in the deal?" },
    { from: "rep" as const, text: competitor },
    { from: "bot" as const, text: "Where are you in the sales process?" },
    { from: "rep" as const, text: "Evaluation. Demo is Thursday." },
    {
      from: "bot" as const,
      lines: [
        { label: "Lead with:", text: persona.lead },
        { label: "Expect this objection:", text: objection.objection },
        { text: objection.response, reply: true },
        { label: "Avoid:", text: persona.avoid },
      ],
      source: `Sources: ${competitor} battlecard (Marketing tab, objections) · Signal #14`,
    },
  ];

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

      <section className="mt-14">
        <p className="font-mono text-xs text-accent">Next · After day 90</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">A positioning assistant for reps</h2>
        <p className="mt-3 max-w-3xl text-pretty text-muted">
          At Gymdesk I built an AI sales tool that closed 300+ deals in its first 90 days. Once the Radar has a quarter
          of data behind it, I&apos;d build the Hightouch version: a rep says who the customer is, which competitor is
          in the deal, and where the deal stands, and gets back what to say next.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-semibold">How I&apos;d build it</h3>
            <ol className="mt-4 space-y-4 text-sm">
              {buildSteps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="font-mono text-xs leading-5 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="font-medium">{step.title}.</span>{" "}
                    <span className="text-pretty text-muted">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-semibold">What changes by sales stage</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {stages.map((stage) => (
                <div key={stage.name}>
                  <dt className="font-medium">{stage.name}</dt>
                  <dd className="text-pretty text-muted">{stage.gives}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <figure className="mt-4 rounded-xl border border-dashed border-line bg-surface-2 p-5">
          <figcaption className="text-xs text-muted">
            Mockup of one exchange, built from the sample battlecard. Not a working tool.
          </figcaption>
          <div className="mt-4">
            <AssistantMockup steps={conversation} />
          </div>
        </figure>

        <p className="mt-4 max-w-3xl text-sm text-pretty text-muted">
          <span className="font-medium text-fg">How I&apos;d measure it: </span>
          reps using it each week, the share of competitive deals where it was used, win rate in those deals compared
          with the rest, and how many questions it couldn&apos;t answer.
        </p>
      </section>

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
