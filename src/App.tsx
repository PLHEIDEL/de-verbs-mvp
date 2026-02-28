import { useEffect, useMemo, useState } from "react";
import { TOPICS, VERBS } from "./data";
import type { TopicId, VerbItem } from "./data";
import { loadProgress, saveProgress, resetProgress, applyResult } from "./storage";
import { makeOptions, pickQueue } from "./quiz";
import type { Mode } from "./quiz";

type Screen = "home" | "session";
type SessionStats = { correct: number; wrong: number };

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [topic, setTopic] = useState<TopicId>("home");
  const [mode, setMode] = useState<Mode>("learn");

  const [progress, setProgress] = useState(() => loadProgress());

  const itemsForTopic = useMemo(() => VERBS.filter((v) => v.topic === topic), [topic]);

  const [queue, setQueue] = useState<VerbItem[]>([]);
  const [idx, setIdx] = useState(0);
  const current = queue[idx];

  const [options, setOptions] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [stats, setStats] = useState<SessionStats>({ correct: 0, wrong: 0 });

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  function startSession(nextMode: Mode) {
    const p = loadProgress();
    const q = pickQueue(itemsForTopic, p, nextMode, 20);
    setProgress(p);
    setQueue(q);
    setIdx(0);
    setMode(nextMode);
    setStats({ correct: 0, wrong: 0 });
    setScreen("session");
    setLocked(false);
    setPicked(null);
    setOptions(q[0] ? makeOptions(q[0]) : []);
  }

  useEffect(() => {
    if (screen !== "session") return;
    const cur = queue[idx];
    setLocked(false);
    setPicked(null);
    setOptions(cur ? makeOptions(cur) : []);
  }, [idx, queue, screen]);

  function answer(choice: string) {
    if (!current || locked) return;
    const isCorrect = choice === current.verb;

    const next = { ...progress };
    applyResult(next, current.id, isCorrect);
    setProgress(next);

    setPicked(choice);
    setLocked(true);
    setStats((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      wrong: s.wrong + (!isCorrect ? 1 : 0),
    }));

    window.setTimeout(() => {
      setIdx((i) => {
        const ni = i + 1;
        if (ni >= queue.length) return i;
        return ni;
      });
      setLocked(false);
      setPicked(null);
    }, isCorrect ? 450 : 800);
  }

  function endSession() {
    setScreen("home");
  }

  function clearAll() {
    resetProgress();
    setProgress({});
  }

  const totals = useMemo(() => {
    let seen = 0,
      due = 0,
      errors = 0;
    const now = Date.now();
    for (const v of itemsForTopic) {
      const p = progress[v.id];
      if (!p) continue;
      if (p.correct + p.wrong > 0) seen++;
      if (p.nextDue <= now) due++;
      if (p.wrong > 0 && p.streak === 0) errors++;
    }
    return { total: itemsForTopic.length, seen, due, errors };
  }, [itemsForTopic, progress]);

  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="logo" />
          <div>
            <div className="title">Deutsch Verben — MVP</div>
            <div className="subtitle">картинка → выберите правильный глагол</div>
          </div>
        </div>

        <div className="pillRow">
          <div className="pill">Прогресс: localStorage</div>
          <button className="btn" onClick={clearAll} title="Сбросить прогресс">
            Сброс
          </button>
        </div>
      </div>

      {screen === "home" && (
        <div className="grid">
          <div className="card">
            <div className="h1">Выберите тему</div>
            <div className="muted">Дальше выберите режим: Учить или Повтор ошибок</div>

            <div className="hr" />

            <div className="grid grid2">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  className={"btn" + (t.id === topic ? " btnPrimary" : "")}
                  onClick={() => setTopic(t.id)}
                >
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{t.title}</div>
                  <div className="small">{t.subtitle}</div>
                </button>
              ))}
            </div>

            <div className="hr" />

            <div className="kpi">
              <div className="kpiBox">
                <div className="kpiLabel">Всего глаголов</div>
                <div className="kpiValue">{totals.total}</div>
              </div>
              <div className="kpiBox">
                <div className="kpiLabel">Уже встречались</div>
                <div className="kpiValue">{totals.seen}</div>
              </div>
              <div className="kpiBox">
                <div className="kpiLabel">Ошибки к повтору</div>
                <div className="kpiValue">{totals.errors}</div>
              </div>
            </div>

            <div className="hr" />

            <div className="footerActions">
              <button className="btn btnPrimary" onClick={() => startSession("learn")}>
                Учить (новые + повтор)
              </button>
              <button className="btn" onClick={() => startSession("review")}>
                Повтор ошибок
              </button>
            </div>

            <div className="small" style={{ marginTop: 10 }}>
              Позже можно заменить SVG на реальные картинки/видео, не меняя логику.
            </div>
          </div>
        </div>
      )}

      {screen === "session" && (
        <div className="grid">
          <div className="card">
            <div className="rowBetween">
              <div>
                <div className="h1">
                  {TOPICS.find((t) => t.id === topic)?.title} — {mode === "learn" ? "Учить" : "Повтор"}
                </div>
                <div className="muted">
                  Вопрос {queue.length ? idx + 1 : 0}/{queue.length} · Правильно: {stats.correct} · Ошибок:{" "}
                  {stats.wrong}
                </div>
              </div>

              <div className="pillRow">
                <button className="btn" onClick={endSession}>
                  На главную
                </button>
              </div>
            </div>

            <div className="hr" />

            {!current ? (
              <div className="muted">Нет элементов для сессии (попробуйте другой режим или тему).</div>
            ) : (
              <>
                <div className="mediaBox">
                  <img src={current.mediaDataUri} alt="scene" style={{ width: "100%", display: "block" }} />
                </div>

                <div className="hr" />

                <div className="answerGrid">
                  {options.map((opt) => {
                    const isCorrect = opt === current.verb;
                    const isPicked = picked === opt;

                    let cls = "answerBtn";
                    if (locked && isPicked && isCorrect) cls += " good";
                    if (locked && isPicked && !isCorrect) cls += " bad";
                    if (locked && !isPicked && isCorrect) cls += " good";

                    return (
                      <button key={opt} className={cls} onClick={() => answer(opt)} disabled={locked}>
                        <div style={{ fontSize: 18, fontWeight: 900 }}>{opt}</div>
                        <div className="small">{locked && isCorrect ? "✔ правильный" : "\u00A0"}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="hr" />

                <div className="rowBetween">
                  <div>
                    <div className="h2">Подсказка (после ответа)</div>
                    <div className="muted">
                      {picked ? (
                        <>
                          <div>
                            <b>{current.verb}</b> — {current.ru}
                          </div>
                          <div className="small">{current.example}</div>
                        </>
                      ) : (
                        "Выберите вариант"
                      )}
                    </div>
                  </div>

                  <div className="pillRow">
                    <div className="pill">SRS: 1д→3д→7д→14д→30д</div>
                  </div>
                </div>

                {idx === queue.length - 1 && locked && (
                  <>
                    <div className="hr" />
                    <button className="btn btnPrimary" onClick={endSession}>
                      Завершить сессию
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}