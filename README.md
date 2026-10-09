# Competitive Radar

An unofficial work sample showing how I'd run competitive intelligence for Hightouch: the system, its inputs, and what sales receives each week.

**Sample data for illustration. Not real competitive claims.** Company names give category context. Ownership facts in `data/competitors.json` are public and sourced. Every event, rating, and talk track is invented.

## Run locally

```bash
npm install
npm run dev
```

## Data

Everything the UI shows comes from JSON in `/data`, so swapping sample data for real data never touches the UI.

| File | What it holds |
| --- | --- |
| `competitors.json` | Competitors, tiers, personas, "why they win" hypotheses, sourced facts |
| `sources.json` | What gets monitored, how often, and what we look for |
| `signal_types.json` | The nine kinds of change the Radar classifies |
| `rules.json` | Deal-impact scoring, urgency, confidence, routing table |
| `signals.json` | Scored signals across three weeks |
| `digest.json` | This week's top-3, trends, and win-loss questions |
| `battlecard_segment.json` | Sample battlecard |
| `matrix.json` | Capability matrix and positioning map |
| `routing_log.json` | Where intel went, plus the KPI scorecard |

`samples/snapshots/` holds before/after source snapshots that power the diff demo.

Run `npm run check:data` after editing data. It validates enum fields and every cross-file reference.

## Deploy

Import the repo in Vercel (framework preset: Next.js). The site is `noindex` and blocked in `robots.txt`, so it's shared by link only.
