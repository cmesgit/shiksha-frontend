// PLACEMENT: src/counselling/CounsellorPage.jsx   (NEW FILE — landing/frontend app)
//
// Workflow screens 5–7 — COUNSELLOR PROFILE (about, qualifications,
// languages, availability) → BOOK (select date → select time → confirm)
// → CONFIRMATION (✓ booked, assessment shared, return to matches).
// Slots come from GET /counselors/<id>/slots/ (already minus booked
// times); the backend re-validates on POST, so a raced slot returns 409
// and we refresh the picker instead of double-booking.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { bookAppointment, getCounsellor, getSlots } from "../api/counselling";
import CounsellingShell, { initialsOf, gradOf, EXPERIENCE_LABELS } from "./CounsellingShell";

const dayKey = (iso) => iso.slice(0, 10);
const fmtDay = (iso) => {
  const d = new Date(iso);
  return { num: d.getDate(), label: d.toLocaleDateString("en-IN", { weekday: "short" }), month: d.toLocaleDateString("en-IN", { month: "short" }) };
};
const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

export default function CounsellorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [c, setC] = useState(null);
  const [slots, setSlots] = useState(null);
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(null); // appointment after success

  const load = () => {
    getCounsellor(id).then(setC).catch(() => setError("Counsellor not found."));
    getSlots(id, 14).then((d) => setSlots(d.slots || [])).catch(() => setSlots([]));
  };
  useEffect(load, [id]);

  const days = useMemo(() => {
    if (!slots) return [];
    const map = new Map();
    for (const s of slots) {
      const k = dayKey(s);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(s);
    }
    return [...map.entries()];
  }, [slots]);

  useEffect(() => {
    if (days.length && (day === null || !days.some(([k]) => k === day))) setDay(days[0][0]);
  }, [days, day]);

  const confirm = async () => {
    if (!slot) return;
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/counselling/counsellors/${id}` } });
      return;
    }
    setBusy(true);
    setError("");
    try {
      const appt = await bookAppointment({
        counselor_id: Number(id),
        scheduled_at: slot,
        student_note: note.trim(),
      });
      setBooked(appt);
      window.scrollTo?.(0, 0);
    } catch (e) {
      if (e?.response?.status === 409) {
        setError("That slot was just taken — here are the updated times.");
        setSlot(null);
        getSlots(id, 14).then((d) => setSlots(d.slots || []));
      } else {
        setError(e?.response?.data?.detail || "Couldn't book — please try again.");
      }
    }
    setBusy(false);
  };

  /* ── CONFIRMATION view ── */
  if (booked) {
    return (
      <CounsellingShell crumb=" / Booking confirmed" step="book">
        <div className="sc-card sc-confirm">
          <div className="tick">✓</div>
          <h1 className="sc-h1" style={{ fontSize: 24 }}>Booking confirmed</h1>
          <p className="sc-sub" style={{ margin: "6px auto 18px" }}>
            {booked.counselor?.display_name} · {new Date(booked.scheduled_at).toLocaleString("en-IN", {
              weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true,
            })} · {booked.duration_minutes} minutes. A confirmation is in your
            notifications and email; the meeting link appears here once your
            counsellor adds it.
          </p>
          <div className="sc-card" style={{ textAlign: "left", background: "rgba(27,156,133,.06)", borderColor: "rgba(27,156,133,.3)" }}>
            <div style={{ font: "700 13.5px 'Montserrat',sans-serif", color: "#0e1c0f", marginBottom: 5 }}>
              Optional but smart: the pre-session assessment
            </div>
            <div style={{ font: "400 12.5px/1.65 'Poppins',sans-serif", color: "rgba(14,28,15,.65)" }}>
              Six short sections your counsellor reads before the call — it
              turns a get-to-know-you session into a working one. Your answers
              are shared only after you submit.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
            <Link className="sc-btn" to={`/counselling/appointments/${booked.id}/assessment`}>
              Fill the assessment →
            </Link>
            <Link className="sc-btn ghost" to="/counselling/counsellors">Return to matches</Link>
          </div>
        </div>
      </CounsellingShell>
    );
  }

  /* ── PROFILE + BOOKING view ── */
  return (
    <CounsellingShell crumb={c ? ` / ${c.display_name}` : " / Counsellor"} step="book">
      {error && <div className="sc-error">{error}</div>}
      {!c ? (
        <div className="sc-skel" style={{ height: 260 }} />
      ) : (
        <div className="sc-grid2" style={{ gridTemplateColumns: "1.1fr .9fr", alignItems: "start" }}>
          {/* about */}
          <div className="sc-card">
            <div className="sc-cslr-head" style={{ marginBottom: 14 }}>
              <span className="sc-avatar" style={{ background: gradOf(c.display_name), width: 66, height: 66, fontSize: 21 }}>
                {c.photo_url ? <img src={c.photo_url} alt="" /> : initialsOf(c.display_name)}
              </span>
              <div>
                <div className="sc-cslr-name" style={{ fontSize: 19 }}>{c.display_name}</div>
                <div className="sc-cslr-meta">
                  {EXPERIENCE_LABELS[c.years_experience] || "Counsellor"}
                  {c.languages?.length ? ` · Speaks ${c.languages.join(", ")}` : ""}
                  {Number(c.avg_rating) > 0 ? ` · ★ ${c.avg_rating} (${c.rating_count})` : ""}
                </div>
              </div>
            </div>
            <div className="sc-tags" style={{ marginBottom: 14 }}>
              {(c.specializations || []).map((s) => <span key={s.id} className="sc-badge teal">{s.name}</span>)}
            </div>
            {c.bio && (<><SectionLabel>About</SectionLabel><P>{c.bio}</P></>)}
            {c.qualifications && (<><SectionLabel>Qualifications</SectionLabel><P>{c.qualifications}</P></>)}
            {c.certifications && (<><SectionLabel>Certifications</SectionLabel><P>{c.certifications}</P></>)}
            {c.approach && (<><SectionLabel>Counselling approach</SectionLabel><P>{c.approach}</P></>)}
            <SectionLabel>Weekly availability</SectionLabel>
            {(c.availability || []).length === 0 ? (
              <P>No regular hours published yet.</P>
            ) : (
              c.availability.map((w, i) => (
                <div key={i} className="sc-avail-row"><b>{w.weekday_label}</b> {w.start}–{w.end}</div>
              ))
            )}
          </div>

          {/* booking */}
          <div className="sc-card" style={{ position: "sticky", top: 84 }}>
            <div style={{ font: "800 16px 'Montserrat',sans-serif", color: "#0e1c0f", marginBottom: 4 }}>
              Book a session
            </div>
            <div className="sc-note" style={{ marginBottom: 14 }}>
              Online · {c.session_duration_minutes} minutes · confirmation by email
            </div>

            {slots === null ? (
              <div className="sc-skel" style={{ height: 120 }} />
            ) : days.length === 0 ? (
              <div className="sc-empty">No open slots in the next two weeks — check back soon.</div>
            ) : (
              <>
                <label className="sc-label">Select a date</label>
                <div className="sc-days">
                  {days.map(([k, list]) => {
                    const d = fmtDay(list[0]);
                    return (
                      <button key={k} className={`sc-day${day === k ? " on" : ""}`}
                        onClick={() => { setDay(k); setSlot(null); }}>
                        <span>{d.label}</span><b>{d.num}</b><span>{d.month}</span>
                      </button>
                    );
                  })}
                </div>
                <label className="sc-label" style={{ marginTop: 14 }}>Select a time</label>
                <div className="sc-times">
                  {(days.find(([k]) => k === day)?.[1] || []).map((s) => (
                    <button key={s} className={`sc-time${slot === s ? " on" : ""}`} onClick={() => setSlot(s)}>
                      {fmtTime(s)}
                    </button>
                  ))}
                </div>
                <div className="sc-field" style={{ marginTop: 16 }}>
                  <label className="sc-label">What do you want to discuss? (optional)</label>
                  <textarea className="sc-textarea" maxLength={500} style={{ minHeight: 64 }}
                    placeholder="e.g. Torn between engineering and design after Class 12"
                    value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <button className="sc-btn" style={{ width: "100%", justifyContent: "center" }}
                  disabled={!slot || busy} onClick={confirm}>
                  {busy ? "Booking…" : slot ? `Confirm — ${fmtTime(slot)}` : "Pick a time to continue"}
                </button>
                {!isAuthenticated && (
                  <div className="sc-note" style={{ marginTop: 9, textAlign: "center" }}>
                    You'll sign in on the next step.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </CounsellingShell>
  );
}

const SectionLabel = ({ children }) => (
  <div style={{ font: "700 11px 'Poppins',sans-serif", color: "rgba(14,28,15,.45)", textTransform: "uppercase", letterSpacing: ".05em", margin: "14px 0 5px" }}>
    {children}
  </div>
);
const P = ({ children }) => (
  <p style={{ font: "400 13px/1.7 'Poppins',sans-serif", color: "rgba(14,28,15,.75)", margin: 0, whiteSpace: "pre-wrap" }}>{children}</p>
);
