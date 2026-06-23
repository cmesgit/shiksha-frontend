/* ui.jsx — small shared building blocks for the Skill Development screens.
   Buttons / inputs / chips live in SkillDevelopment.css as .sd-* classes;
   these are the composite bits that are easier to express as components. */
import React from "react";
import { Icon } from "./icons";
import { STAGES } from "./data";

/* Form helpers ───────────────────────────────────────────── */
export function Field({ label, hint, children }) {
  return (
    <div>
      {label && <div className="sd-label">{label}</div>}
      {children}
      {hint && <div style={{ fontSize: 11.5, color: "var(--c-ink-soft)", marginTop: 6, lineHeight: 1.4 }}>{hint}</div>}
    </div>
  );
}
export function FormRow({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>{children}</div>;
}
export function Section({ title, hint, children }) {
  return (
    <div style={{ borderTop: "1px solid var(--c-border)", paddingTop: 20 }}>
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14, color: "var(--c-forest)",
        letterSpacing: ".3px", textTransform: "uppercase", marginBottom: 4 }}>{title}</div>
      {hint && <div style={{ fontSize: 12, color: "var(--c-ink-soft)", marginBottom: 14 }}>{hint}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: hint ? 0 : 14 }}>{children}</div>
    </div>
  );
}

export function ErrorBox({ children }) {
  if (!children) return null;
  return (
    <div style={{ background: "rgba(248,113,113,.12)", color: "#b91c1c", padding: "10px 14px",
      borderRadius: 10, fontSize: 12.5, border: "1px solid rgba(248,113,113,.3)" }}>{children}</div>
  );
}

/* Pipeline stepper ───────────────────────────────────────── */
export function Stepper({ current }) {
  const idx = STAGES.findIndex(s => s.key === current);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
      {STAGES.map((s, i) => {
        const done = i < idx, active = i === idx;
        return (
          <React.Fragment key={s.key}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
              textAlign: "center", flex: "0 0 auto", width: 150 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)",
                fontWeight: 800, fontSize: 14,
                background: done ? "var(--c-forest-mid)" : active ? "var(--c-forest)" : "#fff",
                color: done || active ? "#fff" : "var(--c-ink-soft)",
                border: done || active ? "none" : "2px solid var(--c-border)",
                boxShadow: active ? "0 0 0 4px rgba(18,80,39,.14)" : "none" }}>
                {done ? <Icon.check size={16} /> : i + 1}
              </div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 12.5,
                color: active ? "var(--c-forest)" : "var(--c-ink)", marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 10.5, color: "var(--c-ink-soft)", marginTop: 2, lineHeight: 1.3 }}>{s.desc}</div>
            </div>
            {i < STAGES.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < idx ? "var(--c-forest-mid)" : "var(--c-border)",
                marginTop: 18, minWidth: 20 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function StatusPill({ status }) {
  const map = {
    ready:     { label: "Ready now", bg: "rgba(29,202,171,.16)", c: "#0f8a72", dot: "#1dcaab" },
    scheduled: { label: "Scheduled", bg: "rgba(96,165,250,.16)", c: "#2563eb", dot: "#60a5fa" },
    approved:  { label: "Approved",  bg: "rgba(18,80,39,.12)",   c: "#125027", dot: "#125027" },
    hold:      { label: "On hold",   bg: "rgba(255,143,1,.16)",  c: "#c46b00", dot: "#ff8f01" },
    rejected:  { label: "Rejected",  bg: "rgba(248,113,113,.16)",c: "#b91c1c", dot: "#f87171" },
  };
  const x = map[status] || map.scheduled;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: x.bg,
      color: x.c, padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>
      <span className="sd-dot" style={{ background: x.dot }} /> {x.label}
    </span>
  );
}

/* 1–5 rating dots ────────────────────────────────────────── */
export function DotRating({ value, onChange, color = "var(--c-forest)" }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onClick={() => onChange(n)} style={{ all: "unset", cursor: "pointer" }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, display: "flex",
            alignItems: "center", justifyContent: "center",
            background: n <= value ? color : "transparent",
            border: "1.5px solid " + (n <= value ? color : "var(--c-border)"),
            color: n <= value ? "#fff" : "var(--c-ink-soft)", fontSize: 11, fontWeight: 700,
            fontFamily: "var(--font-head)", transition: "all .12s" }}>{n}</div>
        </button>
      ))}
    </div>
  );
}

export function TeacherMini({ t, size = 44, light }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <img src={t.img} alt="" style={{ width: size, height: size, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14,
          color: light ? "#fff" : "var(--c-forest)", letterSpacing: "-.2px" }}>{t.name}</div>
        <div style={{ fontSize: 11.5, color: light ? "rgba(255,255,255,.65)" : "var(--c-ink-soft)" }}>{t.title}</div>
      </div>
    </div>
  );
}

/* Date / time formatting ─────────────────────────────────── */
export function fmtDate(s) {
  if (!s) return "Tomorrow";
  try {
    const d = new Date(s);
    if (isNaN(d)) return s;
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  } catch { return s; }
}
export function fmtTime(s) {
  if (!s) return "6:00 PM";
  if (/^\d{1,2}:\d{2}$/.test(s)) {
    const [h, m] = s.split(":").map(Number);
    const dt = new Date(); dt.setHours(h, m);
    return dt.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  }
  return s;
}
