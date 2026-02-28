export type ProgressItem = {
  correct: number;
  wrong: number;
  streak: number;
  lastSeen: number | null;
  nextDue: number;
};

export type ProgressMap = Record<string, ProgressItem>;

const KEY = "de_verbs_progress_v1";

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

export function saveProgress(map: ProgressMap) {
  localStorage.setItem(KEY, JSON.stringify(map));
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}

export function ensureItem(map: ProgressMap, id: string): ProgressItem {
  if (!map[id]) {
    map[id] = { correct: 0, wrong: 0, streak: 0, lastSeen: null, nextDue: 0 };
  }
  return map[id];
}

const STEPS_MIN = [60 * 24, 60 * 24 * 3, 60 * 24 * 7, 60 * 24 * 14, 60 * 24 * 30];

export function applyResult(map: ProgressMap, id: string, isCorrect: boolean, now = Date.now()) {
  const it = ensureItem(map, id);
  it.lastSeen = now;

  if (isCorrect) {
    it.correct += 1;
    it.streak += 1;
    const idx = Math.min(it.streak - 1, STEPS_MIN.length - 1);
    it.nextDue = now + STEPS_MIN[idx] * 60_000;
  } else {
    it.wrong += 1;
    it.streak = 0;
    it.nextDue = now + 10 * 60_000;
  }
}