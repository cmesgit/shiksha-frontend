/* Screening.jsx — online interview screening for teacher applicants.
   Applicant side: status pipeline, scheduler, interview room, result.
   Admin side: candidate queue, interview panel + live scorecard, decision. */
import React, { useState, useEffect } from "react";
import { Icon } from "./icons";
import { PANEL, STAGES, RUBRIC, AGENDA, TIERS, CANDIDATES, DEFAULT_APPLICANT } from "./data";
import { Stepper, StatusPill, DotRating, Field, FormRow } from "./ui";
import { submitEvaluation } from "../../api/skillApi";

/* ════════════════ APPLICANT · STATUS ════════════════ */
export function ApplicationStatus({ applicant = DEFAULT_APPLICANT, interview = {}, nav }) {
  const scheduled = !!interview.slot;
  return (
    <div className="sd-screen" style={{ background: "var(--c-cream-2)", minHeight: 560 }}>
      <div style={{ padding: "30px 48px 60px", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, color: "var(--c-orange)", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>Guest teacher application</div>
            <h2 style={{ fontFamily: "var(--font-head)", fontSize: 30, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-.8px", marginTop: 4 }}>Application received</h2>
            <p style={{ fontSize: 13.5, color: "var(--c-ink-soft)", marginTop: 4 }}>Every applicant teaches a short demo and answers a few questions in a live screening before going live. Here's where you are.</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <img src={applicant.img || DEFAULT_APPLICANT.img} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }} />
            <div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14, color: "var(--c-forest)" }}>{applicant.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--c-ink-soft)" }}>{applicant.skill}</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 18, padding: "26px 30px", marginTop: 16, boxShadow: "0 6px 20px rgba(18,80,39,.05)" }}>
          <Stepper current="interview" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginTop: 18 }}>
          <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 18, padding: 26, boxShadow: "0 6px 20px rgba(18,80,39,.05)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(18,80,39,.07)", color: "var(--c-forest)", padding: "5px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase" }}>
              <Icon.clock size={13} /> Step 3 · Action needed
            </div>
            {!scheduled ? (
              <>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: 21, fontWeight: 800, color: "var(--c-forest)", letterSpacing: "-.4px", marginTop: 14 }}>Book your screening interview</h3>
                <p style={{ fontSize: 13.5, color: "var(--c-ink-soft)", marginTop: 6, lineHeight: 1.6 }}>A 30-minute live call with our review panel. We'll talk through your background, ask a few subject questions, and you'll teach a short demo on a topic of your choice.</p>
                <div style={{ display: "flex", gap: 18, margin: "18px 0" }}>
                  <MiniStat icon={<Icon.clock size={15} />} label="Length" value="30 min" />
                  <MiniStat icon={<Icon.vid size={15} />} label="Format" value="Video call" />
                  <MiniStat icon={<Icon.users size={15} />} label="Panel" value="2 reviewers" />
                </div>
                <button onClick={() => nav("schedule-interview")} className="sd-btn sd-btn-primary"><Icon.cal size={14} /> Schedule interview <Icon.arrow size={14} /></button>
              </>
            ) : (
              <>
                <h3 style={{ fontFamily: "var(--font-head)", fontSize: 21, fontWeight: 800, color: "var(--c-forest)", letterSpacing: "-.4px", marginTop: 14 }}>Your interview is scheduled</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, background: "var(--c-cream-2)", border: "1px solid var(--c-border)", borderRadius: 14, padding: "16px 18px" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--c-forest)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.cal size={20} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 16, color: "var(--c-forest)" }}>{interview.slot}</div>
                    <div style={{ fontSize: 12, color: "var(--c-ink-soft)" }}>30 min · Shiksha video room · with the review panel</div>
                  </div>
                  <StatusPill status="scheduled" />
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  <button onClick={() => nav("interview-room")} className="sd-btn sd-btn-primary"><Icon.vid size={14} /> Join interview room</button>
                  <button onClick={() => nav("schedule-interview")} className="sd-btn sd-btn-ghost">Reschedule</button>
                </div>
                <div style={{ fontSize: 11.5, color: "var(--c-ink-soft)", marginTop: 10 }}>In production the Join button unlocks 10 min before the slot.</div>
              </>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 12.5, color: "var(--c-forest)", letterSpacing: ".3px", textTransform: "uppercase" }}>Your interview panel</h4>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--c-forest)", color: "#fff", padding: "3px 9px", borderRadius: 100, fontSize: 9.5, fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase" }}><Icon.shield size={10} /> Shiksha admin</span>
              </div>
              {PANEL.map(p => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <img src={p.img} alt="" style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover" }} />
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: "var(--c-forest)" }}>{p.name}</div><div style={{ fontSize: 11, color: "var(--c-ink-soft)" }}>{p.role}</div></div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: "var(--c-ink-soft)", marginTop: 2, lineHeight: 1.45 }}>Screening is run by the Shiksha admin team, not by other teachers.</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 16, padding: 20 }}>
              <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 12.5, color: "var(--c-forest)", letterSpacing: ".3px", textTransform: "uppercase", marginBottom: 12 }}>How to prepare</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                {["Pick one topic you'd teach a beginner in 8 min", "Keep your ID handy for verification", "Test your camera, mic and internet", "Have any slides or notes ready to screen-share"].map(l => (
                  <li key={l} style={{ display: "flex", gap: 9, fontSize: 12.5, color: "var(--c-ink-soft)" }}><span style={{ color: "var(--c-forest-mid)", marginTop: 1 }}><Icon.check size={13} /></span>{l}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => nav("reviewer-queue")} style={{ all: "unset", cursor: "pointer", background: "var(--c-forest-dk)", borderRadius: 14, padding: "14px 16px", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
              <Icon.clipboard size={16} />
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 12.5 }}>Demo: switch to the admin's view</div><div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>See the admin reviewer queue &amp; scorecard</div></div>
              <Icon.arrow size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--c-cream-2)", color: "var(--c-forest)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--c-border)" }}>{icon}</div>
      <div><div style={{ fontSize: 10, color: "var(--c-ink-soft)", textTransform: "uppercase", letterSpacing: ".4px", fontWeight: 600 }}>{label}</div><div style={{ fontSize: 13, fontWeight: 700, color: "var(--c-forest)", fontFamily: "var(--font-head)" }}>{value}</div></div>
    </div>
  );
}

/* ════════════════ APPLICANT · SCHEDULE ════════════════ */
export function ScheduleInterview({ nav }) {
  const days = [
    { d: "Mon", n: "2", slots: ["10:00 AM", "2:30 PM", "4:30 PM"] },
    { d: "Tue", n: "3", slots: ["11:00 AM", "3:00 PM", "5:15 PM"] },
    { d: "Wed", n: "4", slots: ["9:30 AM", "1:00 PM", "6:00 PM"] },
    { d: "Thu", n: "5", slots: ["10:30 AM", "12:30 PM"] },
  ];
  const [sel, setSel] = useState(null);
  return (
    <div className="sd-screen" style={{ background: "var(--c-cream-2)", minHeight: 560 }}>
      <div style={{ padding: "30px 48px 60px", maxWidth: 860, margin: "0 auto" }}>
        <button onClick={() => nav("application-status")} className="sd-btn sd-btn-ghost" style={{ padding: "6px 12px", fontSize: 12, marginBottom: 18 }}><Icon.back size={14} /> Back to status</button>
        <div style={{ fontSize: 11.5, color: "var(--c-orange)", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>Schedule</div>
        <h2 style={{ fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-.8px", marginTop: 4 }}>Pick a slot for your screening</h2>
        <p style={{ fontSize: 13.5, color: "var(--c-ink-soft)", marginTop: 6 }}>All slots are 30 minutes, Indian Standard Time. You can reschedule once for free.</p>
        <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 18, padding: 24, marginTop: 20, boxShadow: "0 6px 20px rgba(18,80,39,.05)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {days.map(day => (
              <div key={day.n}>
                <div style={{ textAlign: "center", paddingBottom: 10, marginBottom: 4, borderBottom: "1px solid var(--c-border)" }}>
                  <div style={{ fontSize: 11, color: "var(--c-ink-soft)", textTransform: "uppercase", letterSpacing: ".5px", fontWeight: 600 }}>{day.d}</div>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 18, color: "var(--c-forest)" }}>Jun {day.n}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {day.slots.map(time => {
                    const on = sel && sel.n === day.n && sel.time === time;
                    return (
                      <button key={time} onClick={() => setSel({ day: day.d, n: day.n, time })} style={{ all: "unset", cursor: "pointer", textAlign: "center", padding: "9px 6px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, border: "1.5px solid " + (on ? "var(--c-forest)" : "var(--c-border)"), background: on ? "var(--c-forest)" : "#fff", color: on ? "#fff" : "var(--c-forest)", boxShadow: on ? "0 0 0 3px rgba(18,80,39,.12)" : "none" }}>{time}</button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20 }}>
          <div style={{ flex: 1, fontSize: 13, color: "var(--c-ink-soft)" }}>
            {sel ? <>Selected: <strong style={{ color: "var(--c-forest)" }}>{sel.day} Jun {sel.n} · {sel.time}</strong></> : "Choose a time above to continue."}
          </div>
          <button onClick={() => sel && nav("application-status", { interview: { slot: `${sel.day} Jun ${sel.n} · ${sel.time}` } })} disabled={!sel} className="sd-btn sd-btn-primary">Confirm slot <Icon.arrow size={14} /></button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ INTERVIEW ROOM (applicant + reviewer) ════════════════ */
export function InterviewRoom({ mode = "applicant", applicant = DEFAULT_APPLICANT, candidate, interview = {}, nav }) {
  const who = candidate || applicant;
  const isReviewer = mode === "reviewer";
  const [secs, setSecs] = useState(isReviewer ? 920 : 64);
  const [mic, setMic] = useState(true);
  const [vid, setVid] = useState(true);
  const [share, setShare] = useState(false);
  const [segIdx, setSegIdx] = useState(isReviewer ? 2 : 0);
  const [side, setSide] = useState(isReviewer ? "score" : "agenda");
  const [scores, setScores] = useState({ subject: 4, comm: 4, method: 0, engage: 0, prof: 5 });
  const [notes, setNotes] = useState("Strong fundamentals; explained list comprehensions clearly. Watch pacing in the demo.");
  const [decisionOpen, setDecisionOpen] = useState(false);
  const total = 30 * 60;

  useEffect(() => { const id = setInterval(() => setSecs(s => Math.min(total, s + 1)), 1000); return () => clearInterval(id); }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const pct = (secs / total) * 100;
  const ratedCount = Object.values(scores).filter(v => v > 0).length;
  const vals = Object.values(scores).filter(v => v > 0);
  const avg = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";

  return (
    <div className="sd-screen" style={{ background: "#0a0f0d", color: "#fff", minHeight: 560, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,.08)", background: "rgba(0,0,0,.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(248,113,113,.18)", color: "#fca5a5", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase" }}>
            <span className="sd-dot" style={{ background: "#fca5a5", animation: "sdPulse 1.6s ease-in-out infinite" }} /> Recording
          </span>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 13.5, fontWeight: 700 }}>Screening interview · {who.skill}</div>
          <span style={{ opacity: .4 }}>·</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>{isReviewer ? `candidate: ${who.name}` : "with the review panel"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{mm}:{ss} <span style={{ opacity: .45 }}>/ 30:00</span></div>
            <div style={{ width: 130, height: 4, background: "rgba(255,255,255,.12)", borderRadius: 2, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: "linear-gradient(90deg, var(--c-teal), var(--c-orange))" }} /></div>
          </div>
          {isReviewer && <span style={{ fontSize: 11.5, opacity: .55, display: "inline-flex", alignItems: "center", gap: 6 }}><Icon.shield size={12} /> Admin reviewer</span>}
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 340px", minHeight: 0 }}>
        <div style={{ position: "relative", padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 360, background: "#000", borderRadius: 14, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08), 0 30px 60px rgba(0,0,0,.4)" }}>
            <img src={isReviewer ? who.img : PANEL[0].img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.85) brightness(.92)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.6), transparent 38%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)", padding: "7px 13px", borderRadius: 100, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--c-teal)", fontWeight: 700 }}>{AGENDA[segIdx].label}</span><span style={{ opacity: .55 }}>· {AGENDA[segIdx].mins}</span>
            </div>
            <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)", padding: "6px 12px", borderRadius: 100, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="sd-dot" style={{ background: "#9bff9b" }} /><strong>{isReviewer ? who.name.split(" ")[0] : PANEL[0].name.split(" ")[0]}</strong><span style={{ opacity: .6 }}>· {segIdx === 2 ? "demo teaching" : "speaking"}</span>
            </div>
            {segIdx === 2 && (
              <div style={{ position: "absolute", bottom: 16, right: 16, width: 220, height: 130, borderRadius: 10, overflow: "hidden", background: "#0d1b12", border: "1px solid rgba(255,255,255,.16)", padding: 12, fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 9.5, lineHeight: 1.6, color: "#9be9c9", boxShadow: "0 10px 30px rgba(0,0,0,.4)" }}>
                <div style={{ color: "rgba(255,255,255,.4)", marginBottom: 4 }}># demo.py — shared</div>
                <div><span style={{ color: "#ff8f01" }}>def</span> squares(n):</div>
                <div>&nbsp;&nbsp;<span style={{ color: "#ff8f01" }}>return</span> [i*i <span style={{ color: "#ff8f01" }}>for</span> i <span style={{ color: "#ff8f01" }}>in</span> range(n)]</div>
                <div style={{ opacity: .6, marginTop: 4 }}>&gt;&gt;&gt; squares(5)</div><div>[0, 1, 4, 9, 16]</div>
              </div>
            )}
            <div style={{ position: "absolute", top: 16, right: 16, width: 168, height: 108, borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg,#1f3a32,#08120e)", border: "1px solid rgba(255,255,255,.16)", boxShadow: "0 8px 24px rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isReviewer ? <img src={PANEL[0].img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.10)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 16, color: "#fff" }}>You</div>}
              <div style={{ position: "absolute", bottom: 7, left: 9, fontSize: 10.5, display: "flex", alignItems: "center", gap: 5 }}>
                <span className="sd-dot" style={{ background: vid ? "#9bff9b" : "#fca5a5" }} />{isReviewer ? PANEL[0].name.split(" ")[0] : "You"}
              </div>
            </div>
            {!isReviewer && (
              <div style={{ position: "absolute", top: 134, right: 16, width: 168, height: 108, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,.16)", boxShadow: "0 8px 24px rgba(0,0,0,.4)" }}>
                <img src={PANEL[1].img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 7, left: 9, fontSize: 10.5, display: "flex", alignItems: "center", gap: 5 }}><span className="sd-dot" style={{ background: "#9bff9b" }} />{PANEL[1].name.split(" ")[0]}</div>
              </div>
            )}
          </div>
        </div>

        <aside style={{ borderLeft: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column", background: "rgba(0,0,0,.35)" }}>
          <div style={{ display: "flex", padding: "0 16px", gap: 16, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            {(isReviewer ? [["score", "Scorecard"], ["agenda", "Agenda"], ["info", "Candidate"]] : [["agenda", "Agenda"], ["chat", "Chat"], ["info", "Details"]]).map(([k, label]) => (
              <button key={k} onClick={() => setSide(k)} style={{ all: "unset", cursor: "pointer", padding: "12px 4px", fontSize: 12.5, fontWeight: 600, color: side === k ? "#fff" : "rgba(255,255,255,.45)", borderBottom: side === k ? "2px solid var(--c-teal)" : "2px solid transparent" }}>{label}</button>
            ))}
          </div>
          <div className="sd-scroll" style={{ flex: 1, overflow: "auto", padding: 16 }}>
            {side === "agenda" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".4px", textTransform: "uppercase", marginBottom: 4 }}>30-minute agenda</div>
                {AGENDA.map((a, i) => {
                  const cur = i === segIdx, done = i < segIdx;
                  return (
                    <button key={a.key} onClick={() => isReviewer && setSegIdx(i)} style={{ all: "unset", cursor: isReviewer ? "pointer" : "default", display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", borderRadius: 10, background: cur ? "rgba(29,202,171,.12)" : "rgba(255,255,255,.03)", border: "1px solid " + (cur ? "rgba(29,202,171,.4)" : "rgba(255,255,255,.06)") }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: done ? "var(--c-forest-mid)" : cur ? "var(--c-teal)" : "rgba(255,255,255,.08)", color: done || cur ? "#062018" : "rgba(255,255,255,.6)", fontSize: 11, fontWeight: 800 }}>{done ? <Icon.check size={12} /> : i + 1}</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: cur ? "#fff" : "rgba(255,255,255,.8)" }}>{a.label}</div><div style={{ fontSize: 10.5, color: "rgba(255,255,255,.45)" }}>{a.mins}</div></div>
                      {cur && <span style={{ fontSize: 9.5, color: "var(--c-teal)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".4px" }}>Now</span>}
                    </button>
                  );
                })}
                {isReviewer && <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 6 }}>Tap a segment to move the interview along.</div>}
              </div>
            )}
            {side === "score" && isReviewer && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".4px", textTransform: "uppercase" }}>Live scorecard</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>{ratedCount}/5 rated · avg <strong style={{ color: "var(--c-teal)" }}>{avg}</strong></div>
                </div>
                {RUBRIC.map(c => (
                  <div key={c.key}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff" }}>{c.label}</div>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.45)", marginBottom: 6 }}>{c.hint}</div>
                    <DotRating value={scores[c.key]} onChange={v => setScores(s => ({ ...s, [c.key]: v }))} color="var(--c-teal)" />
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", marginBottom: 6 }}>Notes</div>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: 10, color: "#fff", fontSize: 12.5, fontFamily: "var(--font-body)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <button onClick={() => setDecisionOpen(true)} className="sd-btn" style={{ background: "var(--c-teal)", color: "#062018", justifyContent: "center", fontWeight: 700 }}><Icon.award size={15} /> Finish &amp; submit evaluation</button>
              </div>
            )}
            {side === "chat" && !isReviewer && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[{ who: "p", text: "Welcome! Whenever you're ready, tell us a bit about your background.", at: "00:14" }, { who: "me", text: "Thanks — happy to be here.", at: "00:22" }, { who: "p", text: "Go ahead and share your screen for the demo when you like.", at: "08:40" }].map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.who === "me" ? "flex-end" : "flex-start" }}>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.4)", marginBottom: 3, padding: "0 4px" }}>{m.who === "me" ? "You" : "Panel"} · {m.at}</div>
                    <div style={{ maxWidth: "88%", background: m.who === "me" ? "var(--c-forest-mid)" : "rgba(255,255,255,.08)", padding: "8px 12px", borderRadius: 12, fontSize: 12.5, lineHeight: 1.4 }}>{m.text}</div>
                  </div>
                ))}
              </div>
            )}
            {side === "info" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                  <img src={who.img || DEFAULT_APPLICANT.img} alt="" style={{ width: 46, height: 46, borderRadius: 12, objectFit: "cover" }} />
                  <div><div style={{ fontWeight: 700, fontSize: 14 }}>{who.name}</div><div style={{ fontSize: 11.5, color: "rgba(255,255,255,.55)" }}>{who.headline || who.skill}</div></div>
                </div>
                <RoomInfo label="Applying to teach" value={who.skill} />
                <RoomInfo label="Experience" value={who.experience || who.exp || "3–5 years"} />
                <RoomInfo label="Interview" value="Live · 30 min" />
                <RoomInfo label="Recording" value="On (consented)" />
                {isReviewer && <button className="sd-btn sd-btn-ghost" style={{ background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.14)", marginTop: 6, justifyContent: "center" }}><Icon.doc size={13} /> Open full application</button>}
              </div>
            )}
          </div>
        </aside>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 24px", background: "rgba(0,0,0,.55)", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <Ctrl label={mic ? "Mute" : "Unmute"} on={!mic} onClick={() => setMic(m => !m)} icon={<Icon.mic size={18} />} />
        <Ctrl label={vid ? "Stop video" : "Start video"} on={!vid} onClick={() => setVid(v => !v)} icon={<Icon.vid size={18} />} />
        <Ctrl label={share ? "Stop share" : "Share screen"} on={share} onClick={() => setShare(s => !s)} icon={<Icon.doc size={18} />} />
        {!isReviewer && <Ctrl label="Chat" onClick={() => setSide("chat")} icon={<Icon.msg size={18} />} />}
        {isReviewer && <Ctrl label="Scorecard" onClick={() => setSide("score")} icon={<Icon.clipboard size={18} />} />}
        <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.12)", margin: "0 6px" }} />
        {isReviewer
          ? <button onClick={() => setDecisionOpen(true)} className="sd-btn" style={{ background: "var(--c-teal)", color: "#062018", padding: "12px 20px", fontSize: 13, fontWeight: 700, borderRadius: 100 }}>End &amp; evaluate</button>
          : <button onClick={() => nav("interview-result")} className="sd-btn" style={{ background: "#dc2626", color: "#fff", padding: "12px 20px", fontSize: 13, fontWeight: 700, borderRadius: 100 }}>Leave interview</button>}
      </div>

      {decisionOpen && <DecisionModal who={who} avg={avg} onClose={() => setDecisionOpen(false)} onSubmit={() => { setDecisionOpen(false); nav("reviewer-queue", { reviewed: who.id }); }} />}
    </div>
  );
}

function Ctrl({ label, on, onClick, icon }) {
  return (
    <button onClick={onClick} title={label} style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 14px", borderRadius: 12, minWidth: 60, background: on ? "rgba(248,113,113,.16)" : "rgba(255,255,255,.06)", border: "1px solid " + (on ? "rgba(248,113,113,.4)" : "rgba(255,255,255,.10)"), color: on ? "#fca5a5" : "rgba(255,255,255,.85)" }}>
      <div style={{ lineHeight: 1 }}>{icon}</div><div style={{ fontSize: 10.5, fontWeight: 600 }}>{label}</div>
    </button>
  );
}
function RoomInfo({ label, value }) {
  return <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "6px 0", borderBottom: "1px dashed rgba(255,255,255,.08)" }}><div style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)" }}>{label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.9)", fontWeight: 600, textAlign: "right" }}>{value}</div></div>;
}

/* ── Decision modal (admin) ───────────────────────────────── */
function DecisionModal({ who, avg, onClose, onSubmit }) {
  const [decision, setDecision] = useState("approve");
  const [tier, setTier] = useState("senior");
  const [feedback, setFeedback] = useState("Clear communicator with solid fundamentals. Recommended at Senior tier.");
  const submit = async () => { try { await submitEvaluation({ candidateId: who.id, decision, tier, feedback }); } catch {} onSubmit(); };
  return (
    <div onClick={e => { if (e.currentTarget === e.target) onClose(); }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24 }}>
      <div style={{ background: "#fff", color: "var(--c-ink)", borderRadius: 18, width: "min(540px,100%)", maxHeight: "92%", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,.4)" }}>
        <div style={{ padding: "22px 24px 16px", borderBottom: "1px solid var(--c-border)" }}>
          <div style={{ fontSize: 11.5, color: "var(--c-orange)", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>Submit evaluation</div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 20, color: "var(--c-forest)", letterSpacing: "-.4px", marginTop: 3 }}>{who.name} · avg score {avg}/5</div>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <div className="sd-label">Decision</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[{ k: "approve", label: "Approve", c: "var(--c-forest)" }, { k: "hold", label: "Hold", c: "var(--c-orange)" }, { k: "reject", label: "Reject", c: "#dc2626" }].map(d => (
                <button key={d.k} onClick={() => setDecision(d.k)} style={{ all: "unset", cursor: "pointer", textAlign: "center", padding: "12px 8px", borderRadius: 12, fontSize: 13, fontWeight: 700, border: "2px solid " + (decision === d.k ? d.c : "var(--c-border)"), background: decision === d.k ? d.c : "#fff", color: decision === d.k ? "#fff" : "var(--c-ink)" }}>{d.label}</button>
              ))}
            </div>
          </div>
          {decision === "approve" && (
            <div>
              <div className="sd-label">Recommended teaching tier</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TIERS.map(t => (
                  <button key={t.key} onClick={() => setTier(t.key)} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: "1.5px solid " + (tier === t.key ? "var(--c-forest)" : "var(--c-border)"), background: tier === t.key ? "rgba(18,80,39,.05)" : "#fff" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, border: "2px solid " + (tier === t.key ? "var(--c-forest)" : "var(--c-border)"), display: "flex", alignItems: "center", justifyContent: "center" }}>{tier === t.key && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--c-forest)" }} />}</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: "var(--c-forest)" }}>{t.label} <span style={{ color: "var(--c-ink-soft)", fontWeight: 500 }}>· {t.note}</span></div></div>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14, color: "var(--c-forest)" }}>{t.range}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div><div className="sd-label">Feedback to the candidate</div><textarea className="sd-textarea" rows={3} value={feedback} onChange={e => setFeedback(e.target.value)} /></div>
          <button onClick={submit} className="sd-btn sd-btn-primary" style={{ justifyContent: "center" }}><Icon.check size={14} /> Submit &amp; notify candidate</button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ APPLICANT · RESULT ════════════════ */
export function InterviewResult({ applicant = DEFAULT_APPLICANT, nav }) {
  const scoreLines = [
    { label: "Subject knowledge", v: 4 }, { label: "Communication & clarity", v: 5 },
    { label: "Teaching method / demo", v: 4 }, { label: "Student engagement", v: 4 }, { label: "Professionalism", v: 5 },
  ];
  return (
    <div className="sd-screen" style={{ background: "var(--c-cream-2)", minHeight: 560 }}>
      <div style={{ padding: "30px 48px 60px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 22, overflow: "hidden", boxShadow: "0 14px 40px rgba(18,80,39,.10)" }}>
          <div style={{ position: "relative", background: "linear-gradient(135deg, var(--c-forest-dk), var(--c-forest))", color: "#fff", padding: "36px 32px 30px", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,202,171,.35), transparent 70%)", top: -140, right: -100 }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(29,202,171,.22)", color: "var(--c-teal)", padding: "5px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}><Icon.award size={13} /> You passed the screening</div>
              <h2 style={{ fontFamily: "var(--font-head)", fontSize: 32, fontWeight: 900, letterSpacing: "-1px", marginTop: 14 }}>Welcome aboard, {applicant.name.split(" ")[0]}.</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.7)", marginTop: 6, lineHeight: 1.55 }}>The panel approved your application. Your profile is now live in the {applicant.skill} directory at the <strong style={{ color: "#fff" }}>Senior</strong> tier.</p>
            </div>
          </div>
          <div style={{ padding: 28 }}>
            <Stepper current="decision" />
            <div style={{ marginTop: 24, background: "var(--c-cream-2)", border: "1px solid var(--c-border)", borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h4 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 13, color: "var(--c-forest)", letterSpacing: ".3px", textTransform: "uppercase" }}>Panel scorecard</h4>
                <div style={{ fontSize: 12, color: "var(--c-ink-soft)" }}>Overall <strong style={{ color: "var(--c-forest)", fontSize: 15 }}>4.4</strong>/5</div>
              </div>
              {scoreLines.map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 170, fontSize: 12.5, color: "var(--c-ink)" }}>{s.label}</div>
                  <div style={{ flex: 1, display: "flex", gap: 4 }}>{[1, 2, 3, 4, 5].map(n => <div key={n} style={{ flex: 1, height: 7, borderRadius: 3, background: n <= s.v ? "var(--c-forest-mid)" : "var(--c-border)" }} />)}</div>
                  <div style={{ width: 24, fontSize: 12, fontWeight: 700, color: "var(--c-forest)", textAlign: "right" }}>{s.v}.0</div>
                </div>
              ))}
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--c-border)", fontSize: 13, color: "var(--c-ink-soft)", lineHeight: 1.6, fontStyle: "italic" }}>
                "Clear communicator with solid fundamentals. Great demo on list comprehensions — just watch your pacing. Recommended at Senior tier."
                <div style={{ fontStyle: "normal", fontWeight: 600, color: "var(--c-forest)", marginTop: 6 }}>— {PANEL[0].name}, {PANEL[0].role}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button onClick={() => nav("discovery")} className="sd-btn sd-btn-primary" style={{ flex: 1, justifyContent: "center" }}><Icon.cap size={14} /> View my live profile</button>
              <button onClick={() => nav("hub")} className="sd-btn sd-btn-ghost" style={{ justifyContent: "center" }}>Back to hub</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ ADMIN · REVIEWER QUEUE ════════════════ */
export function ReviewerQueue({ nav, reviewed }) {
  const [filter, setFilter] = useState("all");
  const list = CANDIDATES.map(c => (c.id === reviewed ? { ...c, status: "approved", time: "Reviewed · just now" } : c));
  const shown = filter === "all" ? list
    : filter === "pending" ? list.filter(c => c.status === "ready" || c.status === "scheduled")
    : list.filter(c => c.status === filter);
  const counts = {
    pending: list.filter(c => c.status === "ready" || c.status === "scheduled").length,
    approved: list.filter(c => c.status === "approved").length,
    hold: list.filter(c => c.status === "hold").length,
  };
  return (
    <div className="sd-screen" style={{ background: "var(--c-cream-2)", minHeight: 560 }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--c-border)", padding: "22px 48px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--c-forest)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon.clipboard size={18} /></div>
            <div>
              <div style={{ fontSize: 11, color: "var(--c-orange)", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>Shiksha Admin · Reviewer console</div>
              <h2 style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800, color: "var(--c-forest)", letterSpacing: "-.4px" }}>Interview queue</h2>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--c-cream-2)", border: "1px solid var(--c-border)", borderRadius: 100, padding: "5px 12px 5px 5px" }}>
              <img src={PANEL[0].img} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ lineHeight: 1.15 }}><div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--c-forest)" }}>{PANEL[0].name}</div><div style={{ fontSize: 9.5, color: "var(--c-ink-soft)" }}>{PANEL[0].role}</div></div>
            </div>
            <button onClick={() => nav("application-status")} className="sd-btn sd-btn-ghost" style={{ fontSize: 12 }}><Icon.back size={13} /> Back to applicant view</button>
          </div>
        </div>
      </div>
      <div style={{ padding: "26px 48px 60px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 }}>
          <QueueStat label="Awaiting interview" value={counts.pending} tone="forest" />
          <QueueStat label="Approved this week" value={counts.approved} tone="teal" />
          <QueueStat label="On hold" value={counts.hold} tone="orange" />
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[["all", "All"], ["pending", "Awaiting"], ["approved", "Approved"], ["hold", "On hold"]].map(([k, label]) => (
            <button key={k} onClick={() => setFilter(k)} className={"sd-chip " + (filter === k ? "sd-chip-on" : "")}>{label}</button>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 16, overflow: "hidden" }}>
          {shown.map((c, i) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderTop: i === 0 ? "none" : "1px solid var(--c-border)" }}>
              <img src={c.img} alt="" style={{ width: 48, height: 48, borderRadius: 12, objectFit: "cover" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14.5, color: "var(--c-forest)" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--c-ink-soft)" }}>{c.skill} <span style={{ opacity: .4 }}>·</span> {c.cat} <span style={{ opacity: .4 }}>·</span> {c.exp}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--c-ink-soft)", minWidth: 150 }}><Icon.clock size={13} /> {c.time}</div>
              <StatusPill status={c.status} />
              <div style={{ width: 130, textAlign: "right" }}>
                {(c.status === "ready" || c.status === "scheduled")
                  ? <button onClick={() => nav("interview-panel", { candidate: c })} className="sd-btn sd-btn-primary" style={{ padding: "8px 14px", fontSize: 12.5 }}><Icon.vid size={13} /> {c.status === "ready" ? "Start" : "Open"}</button>
                  : <button className="sd-btn sd-btn-ghost" style={{ padding: "8px 14px", fontSize: 12.5 }}>View notes</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QueueStat({ label, value, tone }) {
  const tones = { forest: { bg: "var(--c-forest)", c: "#fff" }, teal: { bg: "rgba(29,202,171,.14)", c: "var(--c-forest)" }, orange: { bg: "rgba(255,143,1,.14)", c: "#c46b00" } };
  const t = tones[tone] || tones.teal;
  return (
    <div style={{ background: t.bg, color: t.c, borderRadius: 16, padding: "18px 20px", border: tone === "forest" ? "none" : "1px solid var(--c-border)" }}>
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: 32, letterSpacing: "-1px" }}>{value}</div>
      <div style={{ fontSize: 12, opacity: tone === "forest" ? .8 : 1, fontWeight: 600, marginTop: 2 }}>{label}</div>
    </div>
  );
}
