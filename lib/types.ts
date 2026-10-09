export type Tier = "Primary" | "Secondary" | "Watch";
export type Persona = "Marketing" | "Data" | "Product" | "Exec";
export type Confidence = "Confirmed" | "Likely" | "Rumor";
export type Urgency = "Alert now" | "This week's digest" | "Monthly review";
export type Owner = "Sales" | "Sales leadership" | "PMM" | "Product" | "Website" | "CS" | "Enablement";
export type SignalStatus = "Alert sent" | "Talk track shipped" | "In review" | "Gap logged" | "Page updated" | "Logged";

export type Competitor = {
  id: string;
  name: string;
  parent: string | null;
  tier: Tier;
  category: string;
  competesFor: Persona[];
  whyTheyWin: string;
  facts: { fact: string; source: string }[];
};

export type SourceType =
  | "changelog"
  | "pricing page"
  | "docs"
  | "blog"
  | "careers"
  | "review themes"
  | "partner directory"
  | "webinar/events"
  | "win-loss notes"
  | "call mentions";

export type Source = {
  id: string;
  competitorId: string;
  type: SourceType;
  url: string;
  internal: boolean;
  frequency: "Daily" | "Weekly" | "Monthly" | "Continuous";
  lookFor: string;
  snapshot?: string;
};

export type SignalType = {
  id: string;
  label: string;
  description: string;
  example: string;
};

export type Rules = {
  dealImpact: { score: number; label: string }[];
  personas: { id: Persona; needs: string }[];
  urgency: { id: Urgency; when: string }[];
  confidence: { id: Confidence; when: string }[];
  routing: { when: string; to: Owner[]; action: string }[];
};

export type Signal = {
  id: number;
  weekOf: string;
  date: string;
  competitorId: string;
  sourceId: string;
  type: string;
  change: string;
  whyItMatters: string;
  whatToSay: string;
  personas: Persona[];
  impact: 1 | 2 | 3 | 4 | 5;
  confidence: Confidence;
  urgency: Urgency;
  owners: Owner[];
  status: SignalStatus;
};

export type Digest = {
  weekOf: string;
  topForSales: number[];
  trends: { title: string; detail: string; signals: number[] }[];
  winLossQuestions: { question: string; gap: string }[];
};

export type ProofType = "Customer story" | "Demo moment" | "Architecture";

export type Battlecard = {
  competitorId: string;
  updatedOn: string;
  updatedBySignals: { signal: number; section: string; change: string }[];
  quickDismiss: string;
  whereWeWin: { point: string; detail: string; proofType: ProofType; proof: string }[];
  whereTheyWin: { point: string; handle: string }[];
  landmines: string[];
  objections: { objection: string; response: string }[];
  byPersona: { persona: Persona; theyCareAbout: string; lead: string; avoid: string; proofPoint: string }[];
};

export type MatrixMark = "yes" | "partial" | "no";

export type Matrix = {
  players: { id: string; name: string }[];
  groups: {
    persona: Persona;
    capabilities: {
      name: string;
      cells: Record<string, { mark: MatrixMark; note: string }>;
    }[];
  }[];
  positioning: {
    xAxis: { low: string; high: string };
    yAxis: { low: string; high: string };
    // label: which side of the dot the name sits on. Defaults to right, or left near the right edge.
    points: { id: string; name: string; x: number; y: number; note: string; label?: "top" | "left" | "right" }[];
  };
};

export type RoutingEntry = {
  date: string;
  signal: number;
  destination: string;
  action: string;
  outcome: string;
  kind: "Sales alert" | "Product" | "PMM" | "Website" | "CS" | "Win-loss";
};

export type Kpi = {
  name: string;
  why: string;
  measure: string;
  target: string;
};

export type RoutingLog = {
  entries: RoutingEntry[];
  kpis: Kpi[];
};
