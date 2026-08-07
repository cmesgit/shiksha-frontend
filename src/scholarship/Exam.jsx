// Screen 7 — Examination. Full-screen, no marketing shell, per the brief.
//
// Timer is server-authoritative: on load we capture the offset between the
// server's clock (server_time, returned by every session GET) and this
// device's clock, then tick locally from that offset — never from a bare
// client-side deadline. A background poll every 25s re-syncs the offset and
// catches server-side auto-expiry (the deadline sweep, or another tab
// having already submitted). Submitting past the deadline is rejected by
// the server regardless of what the client's clock shows — the client-side
// countdown is a courtesy display, not the enforcement.
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  answerQuestion, clearAnswer, getExamQuestions, getExamSession, logCheatSignal,
} from "../api/scholarshipApi";
import { radioKeyDown } from "./a11y";
import "./scholarship.tokens.css";
import "./scholarship.css";

const KEYS = ["A", "B", "C", "D"];

export default function Exam() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState(() => new Set());
  const [clockOffsetMs, setClockOffsetMs] = useState(0);
  const [remainingMs, setRemainingMs] = useState(null);
  const [saved, setSaved] = useState(false);
  const [tabWarn, setTabWarn] = useState(false);
  const [tabCount, setTabCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  // Date.now() is captured lazily (goTo/loadAll below), never as a useRef
  // initializer — an initializer expression is re-evaluated every render,
  // which is exactly the render-impurity react-hooks/purity flags.
  const questionStartRef = useRef(null);
  const submittedRef = useRef(false);

  const loadAll = useCallback(async () => {
    const [sess, qs] = await Promise.all([getExamSession(sessionId), getExamQuestions(sessionId)]);
    setSession(sess);
    setQuestions(qs);
    setClockOffsetMs(new Date(sess.server_time).getTime() - Date.now());
    setVisited((v) => new Set(v).add(0));
    questionStartRef.current = Date.now();
    return sess;
  }, [sessionId]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const goToEvaluating = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    navigate(`/scholarship/evaluating/${sessionId}`);
  }, [navigate, sessionId]);

  // ── Server-driven countdown ──────────────────────────────────────────
  useEffect(() => {
    if (!session) return;
    const deadline = new Date(session.deadline).getTime();
    const tick = () => {
      const now = Date.now() + clockOffsetMs;
      const left = deadline - now;
      setRemainingMs(Math.max(0, left));
      if (left <= 0) goToEvaluating();
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [session, clockOffsetMs, goToEvaluating]);

  // Resync + catch server-side expiry/void every 25s.
  useEffect(() => {
    if (!session) return;
    const t = setInterval(async () => {
      const sess = await getExamSession(sessionId).catch(() => null);
      if (!sess) return;
      setSession(sess);
      setClockOffsetMs(new Date(sess.server_time).getTime() - Date.now());
      if (sess.status !== "in_progress") goToEvaluating();
    }, 25000);
    return () => clearInterval(t);
  }, [session, sessionId, goToEvaluating]);

  // ── Tab-switch detection ──────────────────────────────────────────────
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && session?.status === "in_progress") {
        setTabWarn(true);
        setTabCount((c) => c + 1);
        logCheatSignal(sessionId, "tab_hidden");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [sessionId, session]);

  const answeredCount = useMemo(
    () => (questions || []).filter((q) => q.selected_option_index != null).length,
    [questions]
  );

  const handleSelect = async (optionIndex) => {
    const q = questions[current];
    setQuestions((prev) => prev.map((row, i) => (i === current ? { ...row, selected_option_index: optionIndex } : row)));
    // Runs from onClick, not render — the compiler's static analysis can't
    // tell handlers apart from render here, but this only ever executes on
    // a real user interaction.
    // eslint-disable-next-line react-hooks/purity
    const timeSpent = Math.round((Date.now() - questionStartRef.current) / 1000);
    try {
      await answerQuestion(sessionId, q.id, optionIndex, timeSpent);
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
    } catch { /* the periodic resync will surface a real problem (e.g. expiry) */ }
  };

  const handleClear = async () => {
    const q = questions[current];
    setQuestions((prev) => prev.map((row, i) => (i === current ? { ...row, selected_option_index: null } : row)));
    await clearAnswer(sessionId, q.id).catch(() => {});
  };

  const goTo = (index) => {
    setCurrent(index);
    setVisited((v) => new Set(v).add(index));
    questionStartRef.current = Date.now();
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    goToEvaluating();
  };

  if (!session || !questions) {
    return (
      <div className="sch" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--sch-surface-exam)" }}>
        <div className="sch-spinner" />
      </div>
    );
  }

  const q = questions[current];
  const minutes = Math.floor((remainingMs ?? 0) / 60000);
  const seconds = Math.floor(((remainingMs ?? 0) % 60000) / 1000);
  const low = (remainingMs ?? 0) < 120000;
  const progressPct = (answeredCount / questions.length) * 100;

  return (
    <div className="sch" style={{ minHeight: "100vh", background: "var(--sch-surface-exam)" }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "#fff", borderBottom: "1px solid var(--sch-border)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--sch-green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--sch-font-display)", fontWeight: 600 }}>S</div>
          <strong style={{ fontSize: 14.5 }}>Scholarship Examination</strong>
          <span style={{ color: "var(--sch-border-strong)" }}>|</span>
          <span style={{ fontSize: 13.5, color: "var(--sch-ink-60)" }}>{answeredCount} of {questions.length} answered</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12.5, color: "var(--sch-green)", opacity: saved ? 1 : 0, transition: "opacity .4s", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sch-green)" }} /> Answers saved
          </span>
          <div style={{
            background: low ? "var(--sch-danger-surface)" : "var(--sch-surface-exam)",
            border: `1px solid ${low ? "var(--sch-danger-border)" : "var(--sch-border)"}`,
            borderRadius: 9, padding: "6px 14px", textAlign: "center",
          }}>
            <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: ".06em", color: low ? "var(--sch-danger-label)" : "var(--sch-ink-45)" }}>Time left</div>
            <div className="sch-serif" style={{ fontSize: 20, color: low ? "var(--sch-danger)" : "var(--sch-ink)", fontVariantNumeric: "tabular-nums" }}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          </div>
          <button className="sch-btn sch-btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </div>
        <div className="sch-progress-track"><div className="sch-progress-fill" style={{ width: `${progressPct}%` }} /></div>
      </div>

      {tabWarn && (
        <div style={{ background: "var(--sch-danger)", color: "#fff", padding: "10px 24px", display: "flex", justifyContent: "center", gap: 16, fontSize: 13.5 }}>
          <span>You have left the scholarship examination. Please return to continue. Event recorded ({tabCount}).</span>
          <button onClick={() => setTabWarn(false)} style={{ all: "unset", cursor: "pointer", textDecoration: "underline" }}>Dismiss</button>
        </div>
      )}

      {/* Body */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px", display: "flex", gap: 28, alignItems: "flex-start" }}>
        <div className="sch-card" style={{ flex: 1, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <span style={{ fontSize: 13.5, color: "var(--sch-ink-45)" }}>Question {current + 1} of {questions.length}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ background: "var(--sch-green-tint)", color: "var(--sch-green)", borderRadius: 999, padding: "4px 12px", fontSize: 11.5, fontWeight: 600 }}>{q.subject.replace("_", " ")}</span>
              <span style={{ background: "var(--sch-gold-surface)", color: "var(--sch-gold-text)", borderRadius: 999, padding: "4px 12px", fontSize: 11.5, fontWeight: 600 }}>{q.difficulty}</span>
            </div>
          </div>
          <p style={{ fontSize: "clamp(19px, 2.2vw, 24px)", fontWeight: 500, letterSpacing: "-.01em", lineHeight: 1.45, marginBottom: 28 }}>{q.text}</p>

          <div role="radiogroup" aria-label={`Question ${current + 1} options`} style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 24 }}>
            {q.options.map((opt, i) => {
              const isSel = q.selected_option_index === i;
              return (
                <div
                  key={i}
                  role="radio"
                  aria-checked={isSel}
                  tabIndex={0}
                  onClick={() => handleSelect(i)}
                  onKeyDown={radioKeyDown(() => handleSelect(i))}
                  style={{
                    display: "flex", alignItems: "center", gap: 16, borderRadius: 13, padding: "16px 18px", cursor: "pointer",
                    border: `1.5px solid ${isSel ? "var(--sch-green)" : "var(--sch-border)"}`,
                    background: isSel ? "var(--sch-green-tint-soft)" : "#fff", transition: "transform .18s",
                  }}
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13, flexShrink: 0,
                    background: isSel ? "var(--sch-green)" : "var(--sch-surface-exam)", color: isSel ? "#fff" : "var(--sch-ink-60)",
                  }}>{KEYS[i]}</span>
                  <span style={{ fontSize: 15 }}>{opt}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--sch-border-faint)", paddingTop: 20 }}>
            <button className="sch-btn sch-btn-secondary" disabled={current === 0} onClick={() => goTo(current - 1)}>Previous</button>
            <button className="sch-btn sch-btn-primary" disabled={current === questions.length - 1} onClick={() => goTo(current + 1)}>Next question</button>
            <div style={{ flex: 1 }} />
            <button onClick={handleClear} style={{ all: "unset", cursor: "pointer", fontSize: 13.5, color: "var(--sch-ink-45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sch-danger)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sch-ink-45)")}>
              Clear response
            </button>
          </div>
        </div>

        <div style={{ position: "sticky", top: 96, width: 292, flexShrink: 0 }}>
          <div className="sch-card" style={{ padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(38px, 1fr))", gap: 7, marginBottom: 16 }}>
              {questions.map((qq, i) => {
                const state = i === current ? "current" : qq.selected_option_index != null ? "answered" : visited.has(i) ? "visited" : "unvisited";
                const styleFor = {
                  current: { background: "#fff", border: "2px solid var(--sch-green)", color: "var(--sch-green)" },
                  answered: { background: "var(--sch-green)", border: "none", color: "#fff" },
                  visited: { background: "var(--sch-surface-exam)", border: "1px solid var(--sch-border)", color: "var(--sch-ink-60)" },
                  unvisited: { background: "var(--sch-surface-exam)", border: "1px solid var(--sch-border)", color: "var(--sch-ink-45)" },
                }[state];
                return (
                  <button key={qq.id} onClick={() => goTo(i)} style={{
                    ...styleFor, aspectRatio: "1", borderRadius: 9, fontSize: 12.5, fontWeight: 600, cursor: "pointer", transition: "transform .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                  >{i + 1}</button>
                );
              })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "var(--sch-ink-45)", marginBottom: 14 }}>
              <Legend color="var(--sch-green)" label="Answered" />
              <Legend color="#fff" border="var(--sch-green)" label="Current" />
              <Legend color="var(--sch-surface-exam)" border="var(--sch-border)" label="Not visited" />
            </div>
            <div style={{ borderTop: "1px solid var(--sch-border-faint)", paddingTop: 14, fontSize: 13, display: "flex", justifyContent: "space-between" }}>
              <span>Answered: <strong>{answeredCount}</strong></span>
              <span>Remaining: <strong>{questions.length - answeredCount}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, border, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 12, height: 12, borderRadius: 4, background: color, border: border ? `1.5px solid ${border}` : "none" }} />
      {label}
    </div>
  );
}
