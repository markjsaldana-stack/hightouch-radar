import { readFileSync } from "node:fs";
import path from "node:path";

export type DiffLine = {
  kind: "same" | "add" | "del";
  text: string;
  // Changed, but only cosmetically (dates, a word or two), so it doesn't produce a signal.
  cosmetic?: boolean;
};

export type SnapshotDiff = {
  lines: DiffLine[];
  meaningful: number;
  cosmetic: number;
};

const DATE = /\d{4}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}, \d{4}/g;

function words(line: string) {
  return line
    .replace(DATE, "<date>")
    .replace(/[.,;:!?]+(\s|$)/g, "$1")
    .split(/\s+/)
    .filter(Boolean);
}

// Word-level edit distance between two lines.
function wordDistance(a: string[], b: string[]) {
  const prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

const COSMETIC_MAX_WORDS = 2;

export function diffLines(before: string, after: string): SnapshotDiff {
  const a = before.trimEnd().split("\n");
  const b = after.trimEnd().split("\n");

  // Longest common subsequence table.
  const lcs = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const lines: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      lines.push({ kind: "same", text: a[i] });
      i++;
      j++;
    } else if (i < a.length && (j === b.length || lcs[i + 1][j] >= lcs[i][j + 1])) {
      lines.push({ kind: "del", text: a[i++] });
    } else {
      lines.push({ kind: "add", text: b[j++] });
    }
  }

  // Pair each run of deletions with the run of additions next to it. A pair
  // that differs by only a date or a couple of words is cosmetic.
  for (let k = 0; k < lines.length; ) {
    if (lines[k].kind === "same") {
      k++;
      continue;
    }
    let end = k;
    while (end < lines.length && lines[end].kind !== "same") end++;
    const dels = lines.slice(k, end).filter((l) => l.kind === "del");
    const adds = lines.slice(k, end).filter((l) => l.kind === "add");
    for (let p = 0; p < Math.min(dels.length, adds.length); p++) {
      if (wordDistance(words(dels[p].text), words(adds[p].text)) <= COSMETIC_MAX_WORDS) {
        dels[p].cosmetic = true;
        adds[p].cosmetic = true;
      }
    }
    k = end;
  }

  const changed = lines.filter((l) => l.kind !== "same" && l.text.trim());
  const cosmetic = changed.filter((l) => l.cosmetic && l.kind === "add").length;
  const meaningful = changed.filter((l) => !l.cosmetic).length;
  return { lines, meaningful, cosmetic };
}

export function loadSnapshotDiff(name: string): SnapshotDiff {
  const dir = path.join(process.cwd(), "samples", "snapshots");
  const read = (side: string) => readFileSync(path.join(dir, `${name}.${side}.md`), "utf8");
  return diffLines(read("before"), read("after"));
}
