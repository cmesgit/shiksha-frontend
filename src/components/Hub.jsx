/* Hub.jsx — Skill Development landing: two doors (learn / teach) + skill rail. */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./icons";
import { SKILL_CATEGORIES, TEACHERS } from "./data";

export default function Hub({ nav }) {
  const navigate = useNavigate();
  return (
    <div className="sd-screen sd-grid-bg" style={{ padding: "40px 48px 60px", position: "relative", minHeight: 600 }}>
      <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(18,80,39,.16), transparent 70%)", top: -160, right: -80, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,143,1,.12), transparent 70%)", bottom: 100, left: -80, pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,143,1,.12)",
          border: "1px solid rgba(255,143,1,.3)", color: "#c46b00", padding: "6px 14px", borderRadius: 100,
          fontSize: 11.5, fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>
          <Icon.spark size={13} /> Skill Development
        </div>

        <h1 style={{ fontSize: 52, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-1.8px",
          lineHeight: 1.05, marginTop: 18, maxWidth: 720 }}>
          Learn a skill <span style={{ color: "var(--c-orange)" }}>directly</span> from someone who&nbsp;does&nbsp;it.
        </h1>
        <p style={{ marginTop: 14, fontSize: 15.5, color: "var(--c-ink-soft)", maxWidth: 560, lineHeight: 1.65 }}>
          Guest teachers from across Mizoram offer short, focused sessions in their specialty
          &mdash; outside the regular school curriculum.
        </p>

        {/* Two doors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 32 }}>
          <button onClick={() => navigate("/skill/browse")} style={{ all: "unset", cursor: "pointer",
            background: "linear-gradient(0deg, rgba(0,0,0,.32), rgba(0,0,0,.32)), rgba(0,50,35,.92)",
            border: "1px solid rgba(255,255,255,.09)", borderRadius: 18, padding: "26px 26px 22px",
            color: "#fff", position: "relative", overflow: "hidden", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(29,202,171,.35), transparent 70%)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--c-teal)" }}>
              <Icon.cap size={20} />
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>For learners</span>
            </div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 26, marginTop: 14, letterSpacing: "-.6px" }}>
              I want to learn a skill
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 8, lineHeight: 1.6 }}>
              Browse guest teachers, pick someone whose work you like, book a session.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 22, color: "var(--c-orange)", fontSize: 13.5, fontWeight: 700 }}>
              Find a teacher <Icon.arrow size={14} />
            </div>
          </button>

          <button onClick={() => navigate("/signup?role=teacher&skill=true")} style={{ all: "unset", cursor: "pointer",
            background: "#fff", border: "1px solid var(--c-border)", borderRadius: 18, padding: "26px 26px 22px",
            position: "relative", overflow: "hidden", boxShadow: "0 12px 32px rgba(18,80,39,.08)", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(18,80,39,.14)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 12px 32px rgba(18,80,39,.08)"; }}>
            <div style={{ position: "absolute", top: -30, left: -30, width: 140, height: 140, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,143,1,.18), transparent 70%)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--c-orange)" }}>
              <Icon.user size={18} />
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>For teachers</span>
            </div>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 26, marginTop: 14, letterSpacing: "-.6px", color: "var(--c-forest)" }}>
              I want to teach my craft
            </div>
            <p style={{ fontSize: 13, color: "var(--c-ink-soft)", marginTop: 8, lineHeight: 1.6 }}>
              Register as a guest teacher, list your master skills, pass a quick screening, set your rate.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 22, color: "var(--c-forest)", fontSize: 13.5, fontWeight: 700 }}>
              Become a guest teacher <Icon.arrow size={14} />
            </div>
          </button>
        </div>

        {/* skill rail */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 20, color: "var(--c-forest)", letterSpacing: "-.3px" }}>
              Skill categories
            </div>
            <button onClick={() => nav("discovery")} style={{ background: "none", border: "none",
              color: "var(--c-forest-mid)", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              See all teachers →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {SKILL_CATEGORIES.map(s => {
              const count = TEACHERS.filter(t => t.cat === s.id).length;
              return (
                <button key={s.id} onClick={() => nav("discovery", { skill: s.id })}
                  style={{ all: "unset", cursor: "pointer", background: "#fff", border: "1px solid var(--c-border)",
                    borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, transition: "all .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = "#fdfaf0"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.background = "#fff"; }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: s.color + "22", color: s.color,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--c-forest)" }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "var(--c-ink-soft)" }}>{count} {count === 1 ? "teacher" : "teachers"}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
