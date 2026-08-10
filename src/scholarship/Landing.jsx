// Screen 1 — Landing (marketing shell). Hero · how it works · benefits ·
// calculator · FAQ, per design_handoff_instant_scholarship/README.md.
// Rendered inside the site's real <Page> (Navbar/Footer untouched) — the
// green/gold visual system is scoped under .sch so it never leaks onto them.
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCurrentExamSession } from "../api/scholarshipApi";
import "./scholarship.tokens.css";
import "./scholarship.css";

const HOW_IT_WORKS = [
  ["Choose course", "Pick the class your scholarship attempt will be generated for."],
  ["Verify identity", "A parent or guardian verifies once, so the attempt is bound to a real person."],
  ["Educational details", "Tell us the board, school and academic year the paper should match."],
  ["AI builds your paper", "50 questions generated fresh for this attempt — never shared between students."],
  ["Sit the exam", "30 minutes, server-timed, autosaved as you go."],
  ["Receive scholarship", "Evaluated instantly. No manual review, no waiting."],
  ["Purchase course", "Your discount is already applied at checkout — no coupon code."],
];

const BENEFITS = [
  ["AI-powered examination", "Every paper is generated fresh — questions and options are shuffled per student."],
  ["Built for your class", "Matched to your syllabus — Class 8 through 12."],
  ["Randomised order", "Question and option order differ between students, even on repeat sittings."],
  ["Instant results", "Scored automatically the moment you submit — or the moment the timer runs out."],
  ["Up to 50% scholarship", "Fifty correct answers earns the maximum award."],
  ["Automatic discount", "Applied to your cart with no coupon code and no manual approval."],
];

const BANDS = [
  [0, 24, 0], [25, 29, 10], [30, 34, 20], [35, 39, 30], [40, 44, 35], [45, 49, 40], [50, 50, 50],
];
function bandFor(score) {
  return BANDS.find(([lo, hi]) => score >= lo && score <= hi)?.[2] ?? 0;
}

const FAQS = [
  ["Who can apply?", "Any student in Class 8 through 12 purchasing a course through Shiksha, verified through a parent or guardian."],
  ["How many scholarship attempts are allowed?", "One verified person is allowed one scholarship attempt per academic year."],
  ["How are scholarships calculated?", "Your discount is based on how many of the 50 questions you answer correctly, on a fixed band from 0% up to 50%."],
  ["How is my identity verified?", "A parent or guardian verifies once via DigiLocker, Aadhaar OTP, or a manual document review — the exam itself is never gated on the student's own identity documents."],
  ["Can I take the scholarship again?", "Yes — you become eligible again the following academic year."],
  ["What subjects are included?", "Mathematics, Science, English, Social Studies, General Knowledge and Current Affairs. Regional-language subjects are not included."],
];

function FaqRow({ q, a, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: "1px solid var(--sch-border-faintest)" }}>
      <button
        onClick={onToggle}
        style={{
          all: "unset", cursor: "pointer", width: "100%", display: "flex",
          alignItems: "center", justifyContent: "space-between", padding: "22px 0",
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 600 }}>{q}</span>
        <span style={{ fontSize: 22, color: "var(--sch-green)", fontWeight: 400 }}>{isOpen ? "−" : "+"}</span>
      </button>
      <div style={{ maxHeight: isOpen ? 260 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--sch-ink-60)", maxWidth: 660, paddingRight: 44, paddingBottom: 22 }}>{a}</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, activeProfile } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);
  const [calc, setCalc] = useState(38);
  const [resumeSession, setResumeSession] = useState(null);
  const feePreview = 1499900; // ₹14,999 — same default course as the header preview, in paise

  useEffect(() => {
    let alive = true;
    if (isAuthenticated && activeProfile) {
      getCurrentExamSession().then((s) => { if (alive) setResumeSession(s); });
    }
    return () => { alive = false; };
  }, [isAuthenticated, activeProfile]);

  const pct = bandFor(calc);
  const discount = Math.round((feePreview * pct) / 100);
  const final = feePreview - discount;
  const fmt = (paise) => `₹${Math.round(paise / 100).toLocaleString("en-IN")}`;

  const minutesLeft = useMemo(() => {
    if (!resumeSession) return null;
    const ms = new Date(resumeSession.deadline).getTime() - new Date(resumeSession.server_time).getTime();
    return Math.max(0, Math.round(ms / 60000));
  }, [resumeSession]);

  return (
    <div className="sch">
      {resumeSession && (
        <div style={{ background: "var(--sch-green-dark-surface)", color: "#fff", padding: "16px 24px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <strong>You have an examination in progress.</strong>{" "}
              <span style={{ opacity: 0.75 }}>{minutesLeft} minute{minutesLeft === 1 ? "" : "s"} remaining.</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="sch-btn" style={{ background: "#fff", color: "var(--sch-green)" }}
                onClick={() => navigate(`/scholarship/exam/${resumeSession.id}`)}>
                Resume examination
              </button>
              <button className="sch-btn sch-btn-ghost" onClick={() => setResumeSession(null)}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 24px", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: "1 1 460px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, background: "var(--sch-gold-surface)",
              border: "1px solid var(--sch-gold-border)", borderRadius: 999, padding: "7px 14px", marginBottom: 22,
            }}>
              <span className="sch-pulse-dot" />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--sch-gold-text)" }}>Shiksha Instant Scholarship</span>
            </div>
            <h1 style={{ fontSize: "clamp(40px, 5.4vw, 68px)", lineHeight: 1.04, letterSpacing: "-.025em", margin: "0 0 20px" }}>
              Earn up to <em style={{ color: "var(--sch-green)", fontStyle: "italic" }}>50% off</em> your course fee.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--sch-ink-60)", maxWidth: 520, marginBottom: 28 }}>
              Sit a 30-minute AI-generated examination matched to your class. Score well and the discount is applied
              automatically — no coupon code, no manual approval.
            </p>
            <div style={{ display: "flex", gap: 14, marginBottom: 40 }}>
              <Link to="/scholarship/course" className="sch-btn sch-btn-primary">Apply for Scholarship</Link>
              <a href="#how" className="sch-btn sch-btn-secondary">Learn more</a>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1,
              background: "var(--sch-border)", borderRadius: 14, overflow: "hidden",
            }}>
              {[["AI", "Generated questions"], ["Class 8–12", "Matched to your syllabus"], ["50", "Questions"],
                ["30 min", "Duration"], ["Instant", "Automatic evaluation"], ["50%", "Maximum scholarship"]].map(([v, l]) => (
                <div key={l} style={{ background: "var(--sch-canvas)", padding: "16px 18px" }}>
                  <div className="sch-serif" style={{ fontSize: 22, color: "var(--sch-green)", fontWeight: 600 }}>{v}</div>
                  <div style={{ fontSize: 12.5, color: "var(--sch-ink-45)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            flex: "1 1 380px", background: "var(--sch-green-dark-surface)", borderRadius: 22, padding: 32, color: "#fff",
            boxShadow: "var(--sch-shadow-hero-card)", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(120% 90% at 100% 0%, rgba(184,134,47,.28), transparent 60%)",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 12.5, opacity: 0.65, marginBottom: 10 }}>Sample result</div>
              <div className="sch-serif" style={{ fontSize: 76, color: "var(--sch-gold-light)", lineHeight: 0.85 }}>40%</div>
              <div style={{ opacity: 0.7, marginBottom: 24 }}>awarded · 45 / 50 correct</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 15, borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.7 }}><span>Original fee</span><span>₹14,999</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--sch-gold-light)" }}><span>Scholarship</span><span>−₹6,000</span></div>
                <div className="sch-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 600, paddingTop: 6 }}><span>Final fee</span><span>₹8,999</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section id="how" style={{ background: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="sch-kicker" style={{ marginBottom: 10 }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: "clamp(30px, 3.6vw, 44px)", letterSpacing: "-.02em", marginBottom: 40 }}>
            Seven steps from course to scholarship.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18 }}>
            {HOW_IT_WORKS.map(([title, desc], i) => (
              <div key={title} className="sch-card" style={{ padding: 22, transition: "transform .25s, box-shadow .25s, border-color .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--sch-shadow-step-hover)"; e.currentTarget.style.borderColor = "var(--sch-green)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = ""; }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "var(--sch-green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, marginBottom: 14 }}>{i + 1}</div>
                <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: "var(--sch-ink-60)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {BENEFITS.map(([title, desc]) => (
            <div key={title} className="sch-card" style={{ padding: 26, transition: "transform .25s, box-shadow .25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--sch-shadow-benefit-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--sch-green-tint)", color: "var(--sch-green)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, fontWeight: 700 }}>✓</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 14, color: "var(--sch-ink-60)" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calculator ───────────────────────────────────────────────── */}
      <section style={{ background: "var(--sch-green-dark-surface)", color: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", gap: 52, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px" }}>
            <div className="sch-kicker">CALCULATOR</div>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 44px)", letterSpacing: "-.02em", margin: "10px 0 16px" }}>
              See what your score is worth.
            </h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div><div className="sch-serif" style={{ fontSize: 52 }}>{calc}<span style={{ fontSize: 20, opacity: 0.6 }}>/50</span></div><div style={{ opacity: 0.65, fontSize: 13 }}>Correct answers</div></div>
              <div style={{ textAlign: "right" }}><div className="sch-serif" style={{ fontSize: 52, color: "var(--sch-gold-light)" }}>{pct}%</div><div style={{ opacity: 0.65, fontSize: 13 }}>Scholarship</div></div>
            </div>
            <input type="range" min={0} max={50} step={1} value={calc} onChange={(e) => setCalc(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--sch-gold-light)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.55, marginTop: 6 }}>
              <span>0</span><span>25 → 10%</span><span>35 → 30%</span><span>50 → 50%</span>
            </div>
          </div>
          <div style={{ flex: "1 1 320px", background: "rgba(255,255,255,.07)", borderRadius: 18, padding: 26, alignSelf: "center" }}>
            <div style={{ fontSize: 13, opacity: 0.65, marginBottom: 12 }}>Class 10 Board Prep Intensive</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, marginBottom: 8 }}><span style={{ opacity: 0.7 }}>Original fee</span><span>{fmt(feePreview)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, marginBottom: 8, color: "var(--sch-gold-light)" }}><span>Scholarship</span><span>−{fmt(discount)}</span></div>
            <div className="sch-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 600, borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: 12, marginBottom: 18 }}><span>Final fee</span><span>{fmt(final)}</span></div>
            <Link to="/scholarship/course" className="sch-btn" style={{ background: "#fff", color: "var(--sch-green)", width: "100%" }}>Apply for Scholarship</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(30px, 3.6vw, 44px)", letterSpacing: "-.02em", marginBottom: 24 }}>Frequently asked questions.</h2>
          {FAQS.map(([q, a], i) => (
            <FaqRow key={q} q={q} a={a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>
      </section>
    </div>
  );
}
