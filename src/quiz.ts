import type { VerbItem } from "./data";
import { ensureItem } from "./storage";
import type { ProgressMap } from "./storage";

export type Mode = "learn" | "review";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQueue(items: VerbItem[], progress: ProgressMap, mode: Mode, limit = 20): VerbItem[] {
  const now = Date.now();

  const scored = items.map((v) => {
    const p = ensureItem(progress, v.id);
    const due = p.nextDue <= now;
    const hasErrors = p.wrong > 0 && p.streak === 0;
    const seen = (p.correct + p.wrong) > 0;

    let score = 0;
    if (mode === "review") {
      score += hasErrors ? 100 : 0;
      score += due ? 50 : 0;
      score += seen ? 10 : 0;
    } else {
      score += due ? 100 : 0;
      score += !seen ? 60 : 0;
      score += hasErrors ? 30 : 0;
    }

    score += Math.random();
    return { v, score };
  });

  return scored.sort((a, b) => b.score - a.score).map((x) => x.v).slice(0, Math.min(limit, scored.length));
}

export function makeOptions(correctVerb: VerbItem): string[] {
  const set = new Set<string>();
  set.add(correctVerb.verb);
  const pool = shuffle(correctVerb.distractors);

  for (const d of pool) {
    if (set.size >= 4) break;
    set.add(d);
  }

  while (set.size < 4) set.add(correctVerb.verb + "…");

  return shuffle(Array.from(set));
}