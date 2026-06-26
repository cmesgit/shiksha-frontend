/* PLACEMENT: src/components/skill/Profile.jsx
   ACTION:    Replace the entire file.

   Fixes from original:

   FIX 1 — confirmMsg() now sends the message AND redirects to the student
   app's SkillMessages page with teacher_profile_id in the query string,
   so the conversation continues in the real WS inbox — not a dead REST thread.

   FIX 2 — "ok: buy" modal now has a "Go to my courses" button that redirects
   to APP_URL + "/" (student dashboard root) instead of doing nothing.

   t.teacher_profile_id is available after the backend serializers.py fix. */

import React, { useState, useEffect } from "react";
import { SKILL_CATEGORIES } from "./data";
import { SDAvail } from "./availability";
import * as skillApi from "../../api/skillApi";
import { APP_URL } from "../../config/urls";
import "./SkillProfile.css";

/* ── inline icon set ─────────────────────────────────────────── */
function Ic({ n, w = 16, h, sw = 2, cls }) {
  const base = { width: w, height: h || w, viewBox: "0 0 24 24", className: cls };
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (n) {
    case "seal":
      return (
        <svg {...base} fill="currentColor">
          <path d="M12 1 9.3 3.4 5.8 3 4.6 6.3 1.6 8.2 3 11.5 1.6 14.8l3 1.9L5.8 20l3.5-.4L12 22l2.7-2.4 3.5.4-.2-3.3 3-1.9-1.4-3.3 1.4-3.3-3-1.9L17.4 3l-3.5.4z" fill="#1b9c85" />
          <path d="m8.5 12 2.2 2.2L15.5 9.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":   return <svg {...base} {...stroke}><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" /><path d="m9 11 2 2 4-4" /></svg>;
    case "clock":    return <svg {...base} {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></svg>;
    case "pin":      return <svg {...base} {...stroke}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "cal":      return <svg {...base} {...stroke}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "camera":   return <svg {...base} {...stroke}><path d="M15 10l4.55-2.28A1 1 0 0 1 21 8.62v6.76a1 1 0 0 1-1.45.9L15 14M3 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" /></svg>;
    case "book":     return <svg {...base} {...stroke}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    case "arrow":    return <svg {...base} {...stroke} className={cls || "arrow"}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case "check":    return <svg {...base} {...stroke}><path d="M20 6 9 17l-5-5" /></svg>;
    case "play":     return <svg {...base} {...stroke}><path d="M20 7v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" /><path d="m10 11 4 2-4 2z" /></svg>;
    case "users":    return <svg {...base} {...stroke}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "mortar":   return <svg {...base} {...stroke}><path d="m12 14 9-5-9-5-9 5 9 5z" /><path d="M12 14v7" /></svg>;
    case "file":     return <svg {...base} {...stroke}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>;
    case "lifetime": return <svg {...base} {...stroke}><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /><path d="M12 6v6l4 2" /></svg>;
    case "grad":     return <svg {...base} {...stroke}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
    case "qa":       return <svg {...base} {...stroke}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>;
    case "mobile":   return <svg {...base} {...stroke}><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M12 11v4M8 11v4M16 11v4" /></svg>;
    case "chev":     return <svg {...base} {...stroke} className={cls || "chev"}><path d="M9 18l6-6-6-6" /></svg>;
    case "lecplay":  return <svg {...base} {...stroke}><circle cx="12" cy="12" r="9" /><path d="m10 9 5 3-5 3z" /></svg>;
    case "msg":      return <svg {...base} {...stroke}><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" /></svg>;
    case "cart":     return <svg {...base} {...stroke}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>;
    case "playlist": return <svg {...base} {...stroke}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>;
    case "graph":    return <svg {...base} {...stroke}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
    case "guard":    return <svg {...base} {...stroke}><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "close":    return <svg {...base} {...stroke}><path d="M18 6 6 18M6 6l12 12" /></svg>;
    case "send":     return <svg {...base} {...stroke}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>;
    case "card":     return <svg {...base} {...stroke}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>;
    case "back":     return <svg {...base} {...stroke}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>;
    default:         return null;
  }
}

function AvailLegend() {
  return (
    <div className="avlegend">
      <span><i style={{ background: "rgba(29,202,171,.5)" }} />Open</span>
      <span><i style={{ background: "#f0a23b" }} />Booked</span>
      <span><i style={{ background: "#f1ece1" }} />Closed</span>
    </div>
  );
}
function AvailGrid({ tid, interactive, selected, onPick, onData }) {
  // Real open/booked slots from the backend (the same record the expert edits
  // and the student app reads). Falls back to empty until loaded / if unset.
  const [d, setD] = useState({ open: [], booked: [] });
  useEffect(() => {
    let alive = true;
    skillApi.fetchAvailability(tid).then(r => {
      if (!alive) return;
      setD(r);
      if (onData) onData(r);
    });
    return () => { alive = false; };
  }, [tid]);
  return (
    <div className="avgrid">
      <div />
      {SDAvail.DAYS.map(x => <div key={x} className="avhd">{x}</div>)}
      {SDAvail.SLOTS.map((sl, si) => (
        <React.Fragment key={si}>
          <div className="avrow">{sl}</div>
          {SDAvail.DAYS.map((dd, di) => {
            const k = di + "-" + si;
            const st = d.booked.includes(k) ? "booked" : d.open.includes(k) ? "open" : "closed";
            if (st === "open" && interactive) {
              return (
                <button key={k} type="button"
                  className={"avslot open" + (selected === k ? " on" : "")}
                  title={SDAvail.label(k)} onClick={() => onPick(k)} />
              );
            }
            return <div key={k} className={"avslot " + st}
              title={st === "booked" ? "Already booked" : st === "open" ? SDAvail.label(k) : "Closed"} />;
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Profile({ t, nav, initialMode }) {
  const cat = SKILL_CATEGORIES.find(s => (s.slug || s.id) === t.cat) || SKILL_CATEGORIES[0];
  const first = (t.name || "").split(" ")[0];

  const [course, setCourse]   = useState(undefined);
  const [reviews, setReviews] = useState({ count: 0, list: [] });
  const [mode, setMode]       = useState(initialMode === "course" ? "course" : "live");
  const [modal, setModal]     = useState(null);
  const [slot, setSlot]       = useState(null);
  // null = not loaded yet; number once AvailGrid reports the tutor's open slots.
  const [openSlotCount, setOpenSlotCount] = useState(null);
  const [allOpen, setAllOpen] = useState({ 0: true });
  const [bTopic, setBTopic]   = useState("");
  const [bDur, setBDur]       = useState(0);
  const [pay, setPay]         = useState("UPI");
  const [buyEmail, setBuyEmail] = useState("");
  const [msgText, setMsgText] = useState("");

  useEffect(() => {
    let alive = true;
    setCourse(undefined);
    skillApi.fetchExpertReviews(t.id).then(r => {
      if (!alive) return;
      setReviews({ count: r.count, list: r.reviews });
      skillApi.fetchExpertCourse(t.id, { rating: t.rating, ratingCount: r.count })
        .then(c => alive && setCourse(c || null));
    }).catch(() => {
      if (!alive) return;
      setReviews({ count: 0, list: [] });
      skillApi.fetchExpertCourse(t.id, { rating: t.rating })
        .then(c => alive && setCourse(c || null)).catch(() => setCourse(null));
    });
    return () => { alive = false; };
  }, [t.id, t.rating]);

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasCourse     = !!course;
  const totalLectures = hasCourse ? course.curriculum.reduce((a, s) => a + s.l.length, 0) : 0;
  const reviewN       = reviews.count;
  const responds      = t.sessions > 120 ? "within 1 hour" : t.sessions > 80 ? "within 2 hours" : "within 4 hours";
  const loc           = "Online only";
  const off           = hasCourse && course.old ? Math.round((1 - course.price / course.old) * 100) : 0;
  const effMode       = hasCourse ? mode : "live";

  function scrollToCard() {
    if (window.innerWidth > 900) window.scrollTo({ top: 0, behavior: "smooth" });
    else if (effMode === "course") document.getElementById("sdp-courseBlock")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function toggleSect(i) { setAllOpen(o => ({ ...o, [i]: !o[i] })); }
  function toggleAll() {
    if (!hasCourse) return;
    const everyOpen = course.curriculum.every((_, i) => allOpen[i]);
    const next = {};
    course.curriculum.forEach((_, i) => { next[i] = !everyOpen; });
    setAllOpen(next);
  }
  const everyOpen = hasCourse && course.curriculum.every((_, i) => allOpen[i]);

  function confirmBook() {
    const durations   = [60, 90, 120];
    const duration_mins = durations[bDur] || 60;
    const slotLabel   = slot ? SDAvail.label(slot) : null;
    const sessionDraft = {
      topic:        bTopic || `Intro to ${t.skills?.[0] || "the skill"}`,
      slot, slotLabel,
      date:         slotLabel ? slotLabel.split(" · ")[0] : null,
      time:         slotLabel ? slotLabel.split(" · ")[1] : null,
      mode:         "online",
      duration_mins,
      expertId:     t.id,
      note:         (bTopic ? `Topic: ${bTopic}. ` : "") + (slotLabel ? `Requested slot: ${slotLabel}.` : ""),
    };
    setModal(null);
    nav("payment", { teacher: t, sessionDraft });
  }

  async function confirmBuy() {
    setModal("busy");
    try { if (course?.id) await skillApi.enrollCourse(course.id); }
    catch (e) { console.warn("enrollCourse failed (demo continues):", e?.message); }
    setModal({ ok: "buy" });
  }

  // FIX 1: after sending, redirect to the student app's SkillMessages page
  // with teacher_profile_id so it opens the live WS DM immediately.
  // t.teacher_profile_id = TeacherProfile UUID (from ExpertCardSerializer after backend fix).
  async function confirmMsg() {
    setModal("busy");
    try {
      await skillApi.messageExpert(t.id, msgText);
    } catch (e) {
      console.warn("messageExpert failed (demo continues):", e?.message);
    }
    setModal({ ok: "msg" });
    // Redirect after a short pause so the user sees the success state
    if (t.teacher_profile_id) {
      const dest = `${APP_URL}/skill-messages?teacherProfileId=${t.teacher_profile_id}&expertName=${encodeURIComponent(t.name)}`;
      setTimeout(() => { window.location.href = dest; }, 1400);
    }
  }

  function openBook() { setSlot(null); setBTopic(""); setBDur(0); setOpenSlotCount(null); setModal("book"); }

  return (
    <div className="sd-prof">
      <div className="cover">
        <span className="catpill" style={{ background: cat.color }}>{cat.label}</span>
        <a className="back-link" onClick={() => nav && nav("discovery")} style={{ cursor: "pointer" }}>
          <Ic n="back" w={14} sw={2.2} /> All guest experts
        </a>
      </div>

      <div className="wrap">
        <div className="layout">
          {/* ── main column ─────────────────────────────── */}
          <div className="col-main">
            <div className="idcard">
              <div className="idtop">
                <img className="ava" src={t.img} alt={t.name} />
                <div className="idtext">
                  <span className="kick"><Ic n="shield" w={11} sw={2.5} /> Verified guest expert</span>
                  <h1>{t.name} <span className="vrf" title="ID-verified"><Ic n="seal" w={20} /></span></h1>
                  <div className="role">{t.title}</div>
                  <div className="quickmeta">
                    <span className="qm"><Ic n="clock" w={14} /> Responds {responds}</span>
                    <span className="qm"><Ic n="pin" w={14} /> {loc}</span>
                    <span className="qm"><Ic n="cal" w={14} /> {t.availability}</span>
                  </div>
                </div>
              </div>
              <div className="idskills">{(t.skills || []).map(s => <span key={s}>{s}</span>)}</div>
              <div className="idstats">
                <div className="s"><div className="v"><span className="o">★</span> {t.rating}</div><div className="l">{reviewN} reviews</div></div>
                <div className="s"><div className="v">{t.sessions}</div><div className="l">Sessions taught</div></div>
                <div className="s"><div className="v">{hasCourse && course.students != null ? course.students.toLocaleString() : "—"}</div><div className="l">Course learners</div></div>
              </div>
            </div>

            <div className="ways" style={hasCourse ? null : { gridTemplateColumns: "1fr" }}>
              <button className="way live" onClick={() => { setMode("live"); scrollToCard(); }}>
                <span className="wk"><Ic n="camera" w={13} sw={2.2} /> Live 1-on-1</span>
                <h4>Book hourly sessions</h4>
                <p className="desc">Personalised, scheduled video lessons. Pay per hour, first 15 min free.</p>
                <div className="wprice"><span className="p">₹{t.rate}</span><span className="u">/ hour</span></div>
                <span className="wgo">Book a lesson <Ic n="arrow" w={13} /></span>
              </button>
              {hasCourse && (
                <button className="way course" onClick={() => { setMode("course"); scrollToCard(); }}>
                  <span className="wk"><Ic n="book" w={13} sw={2.2} /> Self-paced</span>
                  <h4>Buy the full course</h4>
                  <p className="desc">{course.hours} hrs of video, {totalLectures} lessons. Learn anytime, lifetime access.</p>
                  <div className="wprice"><span className="p">₹{course.price.toLocaleString()}</span>{course.old && <span className="old">₹{course.old.toLocaleString()}</span>}</div>
                  <span className="wgo">Buy course <Ic n="arrow" w={13} /></span>
                </button>
              )}
            </div>

            <div className="sec">
              <h3>About {first}</h3>
              <p>{t.bio}</p>
            </div>

            {hasCourse && (
              <div className="csec" id="sdp-courseBlock">
                <div className="chead">
                  <span className="ck"><Ic n="book" w={14} sw={2.2} /> Self-paced course</span>
                  <h2>{course.title}</h2>
                  <div className="cmeta">
                    {course.rating != null && <span className="cm"><span className="o">★ {course.rating}</span>{course.ratingCount != null && ` (${course.ratingCount} ratings)`}</span>}
                    <span className="cm"><Ic n="play" w={14} /> {course.hours} hrs · {totalLectures} lessons</span>
                    {course.students != null && <span className="cm"><Ic n="users" w={14} /> {course.students.toLocaleString()} learners</span>}
                    <span className="cm"><Ic n="mortar" w={14} /> {course.level}</span>
                  </div>
                </div>
                <div className="cbody">
                  <h3>What you'll learn</h3>
                  <div className="learn-grid">
                    {course.learn.map((x, i) => <div className="li" key={i}><Ic n="check" w={16} sw={2.5} /><span>{x}</span></div>)}
                  </div>
                  <h3 style={{ marginTop: 26 }}>This course includes</h3>
                  <div className="incl">
                    <div className="ii"><Ic n="play" w={16} /><span><b>{course.hours} hours</b> on-demand video</span></div>
                    <div className="ii"><Ic n="file" w={16} /><span><b>Downloadable</b> resources</span></div>
                    <div className="ii"><Ic n="lifetime" w={16} /><span><b>Lifetime</b> access</span></div>
                    <div className="ii"><Ic n="grad" w={16} /><span>Certificate of <b>completion</b></span></div>
                    <div className="ii"><Ic n="qa" w={16} /><span>Q&amp;A with <b>{first}</b></span></div>
                    <div className="ii"><Ic n="mobile" w={16} /><span>Access on <b>mobile</b> &amp; desktop</span></div>
                  </div>
                  <h3 style={{ marginTop: 26 }}>Course content</h3>
                  <div className="csum">
                    <span><b>{course.curriculum.length}</b> sections</span>
                    <span><b>{totalLectures}</b> lessons</span>
                    <span><b>{course.hours}h</b> total</span>
                    <button className="exp" onClick={toggleAll}>{everyOpen ? "Collapse all" : "Expand all"}</button>
                  </div>
                  <div className="curric">
                    {course.curriculum.map((s, i) => (
                      <div className={"sect" + (allOpen[i] ? " open" : "")} key={i}>
                        <div className="sect-h" onClick={() => toggleSect(i)}>
                          <Ic n="chev" w={16} sw={2.5} cls="chev" />
                          <span className="st">{s.t}</span>
                          <span className="sc">{s.l.length} lessons</span>
                        </div>
                        <div className="sect-body">
                          {s.l.map((le, j) => (
                            <div className="lec" key={j}>
                              <Ic n="lecplay" w={15} />
                              <span className="ll">{le.n}</span>
                              {le.p && <span className="lp">Preview</span>}
                              <span className="lt">{le.d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="sec">
              <h3>What 1-on-1 sessions look like</h3>
              <div className="freecal" style={{ marginBottom: 16 }}>
                <Ic n="check" w={20} /><div style={{ fontSize: 13.5, color: "var(--c-ink-soft)" }}><b>1st lesson free</b> · a 15-min intro to see if you click, before you pay for anything.</div>
              </div>
              <ul>
                <li><Ic n="check" w={16} sw={2.5} /> 60-minute one-on-one sessions, online — tailored to exactly what you need.</li>
                <li><Ic n="check" w={16} sw={2.5} /> Responds {responds} · {loc}.</li>
                <li><Ic n="check" w={16} sw={2.5} /> Available: {t.availability}. Reschedule any time up to 12h before.</li>
              </ul>
              <div style={{ marginTop: 18, borderTop: "1px solid var(--c-border)", paddingTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--c-forest)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 10 }}>This week's availability</div>
                <AvailLegend />
                <AvailGrid tid={t.id} interactive={false} />
                <div style={{ fontSize: 11.5, color: "var(--c-ink-soft)", marginTop: 10 }}>Booked slots are already taken — pick an open one when you book to avoid clashes.</div>
              </div>
            </div>

            <div className="sec">
              <div className="revhead"><h3 style={{ textTransform: "uppercase" }}>Learner reviews</h3><span className="big">★ {t.rating}</span><span className="cnt">({reviewN})</span></div>
              {reviews.list.map((r, i) => (
                <div className="rev" key={i}>
                  <div className="rh"><div className="who"><div className="av2">{(r.reviewer || "?")[0]}</div><div className="nm2">{r.reviewer}</div></div><div className="stq">{"★".repeat(r.rating || 5)}</div></div>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── sticky offer card ───────────────────────── */}
          <aside>
            <div className="bookcard">
              <div className="modes">
                <button className={effMode === "live" ? "on" : ""} onClick={() => setMode("live")}>Live 1-on-1<span className="ms">₹{t.rate}/hr</span></button>
                {hasCourse && <button className={effMode === "course" ? "on" : ""} onClick={() => setMode("course")}>Self-paced course<span className="ms">₹{course.price.toLocaleString()}</span></button>}
              </div>
              {effMode === "live" ? (
                <>
                  <div className="bc-top">
                    <div className="price">₹{t.rate} <small>/ hour</small></div>
                    <span className="freeline"><Ic n="check" w={13} sw={2.5} /> First lesson free</span>
                  </div>
                  <div className="bc-body">
                    <button className="btn btn-accent cta" onClick={openBook}><Ic n="cal" w={15} /> Book a lesson</button>
                    <button className="btn btn-ghost msgbtn" onClick={() => { setMsgText(""); setModal("msg"); }}><Ic n="msg" w={15} /> Message {first}</button>
                    <div className="bc-trust">
                      <div className="tr"><Ic n="shield" w={15} /> <b>ID-verified</b> guest expert</div>
                      <div className="tr"><Ic n="clock" w={15} /> Responds {responds}</div>
                      <div className="tr"><Ic n="graph" w={15} /> Pay only after your session</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bc-top">
                    <div className="price">₹{course.price.toLocaleString()} {course.old && <span className="old">₹{course.old.toLocaleString()}</span>}</div>
                    <span className="freeline"><Ic n="check" w={13} sw={2.5} /> {course.old ? `${off}% off · ends soon` : "Lifetime access"}</span>
                  </div>
                  <div className="bc-body">
                    <button className="btn btn-accent cta" onClick={() => { setBuyEmail(""); setPay("UPI"); setModal("buy"); }}><Ic n="cart" w={15} /> Buy this course</button>
                    <button className="btn btn-ghost msgbtn" onClick={() => document.getElementById("sdp-courseBlock")?.scrollIntoView({ behavior: "smooth", block: "start" })}><Ic n="playlist" w={15} /> See full curriculum</button>
                    <div className="bc-trust">
                      <div className="tr"><Ic n="lifetime" w={15} /> <b>Lifetime</b> access · learn anytime</div>
                      <div className="tr"><Ic n="grad" w={15} /> Certificate of completion</div>
                      <div className="tr"><Ic n="guard" w={15} /> 30-day money-back guarantee</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* mobile sticky CTA */}
      <div className="mobcta">
        {effMode === "live" ? (
          <><div className="pr">₹{t.rate} <small>/hr · 1st free</small></div><button className="btn btn-accent" onClick={openBook}>Book a lesson</button></>
        ) : (
          <><div className="pr">₹{course.price.toLocaleString()} <small>· lifetime</small></div><button className="btn btn-accent" onClick={() => { setBuyEmail(""); setPay("UPI"); setModal("buy"); }}>Buy course</button></>
        )}
      </div>

      {modal && (
        <div className="overlay on" onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="modal"><div className="pane">{renderPane()}</div></div>
        </div>
      )}
    </div>
  );

  function CloseBtn() {
    return <button className="mclose" onClick={() => setModal(null)}><Ic n="close" w={15} sw={2.2} /></button>;
  }

  function renderPane() {
    if (modal === "busy") {
      return <div className="ok"><div className="ic" style={{ animation: "none" }}><Ic n="clock" w={26} /></div><h3>One moment…</h3><p>Sending this to {first}.</p></div>;
    }
    if (modal && modal.ok === "buy") {
      return (
        <div className="ok">
          <div className="ic"><Ic n="check" w={26} sw={2.5} /></div>
          <h3>You're enrolled! 🎉</h3>
          <p>"{course.title}" is now in your library with lifetime access. Start anytime — your first lessons are ready.</p>
          {/* FIX 2: button now redirects to student dashboard instead of doing nothing */}
          <button className="btn btn-accent" style={{ margin: "16px auto 0" }}
            onClick={() => { window.location.href = APP_URL + "/"; }}>
            Start learning <Ic n="arrow" w={16} />
          </button>
        </div>
      );
    }
    if (modal && modal.ok === "msg") {
      return (
        <div className="ok">
          <div className="ic"><Ic n="check" w={26} sw={2.5} /></div>
          <h3>Message sent to {first}</h3>
          <p>Taking you to your messages…</p>
          {/* Fallback button if redirect is slow */}
          {t.teacher_profile_id && (
            <button className="btn btn-ghost" style={{ margin: "16px auto 0" }}
              onClick={() => { window.location.href = `${APP_URL}/skill-messages?teacherProfileId=${t.teacher_profile_id}&expertName=${encodeURIComponent(t.name)}`; }}>
              Open messages now
            </button>
          )}
        </div>
      );
    }
    if (modal === "book") {
      return (
        <>
          <div className="mh"><div><h3>Book a lesson with {first}</h3><div className="who">{t.title} · ₹{t.rate}/hr</div></div><CloseBtn /></div>
          <div className="field"><label>Topic / what you want to cover</label><input className="inp" value={bTopic} onChange={e => setBTopic(e.target.value)} placeholder={`e.g. Intro to ${t.skills?.[0] || "the basics"}`} /></div>
          <div className="field"><label>Pick an open slot · {first}'s week</label><AvailLegend /><AvailGrid tid={t.id} interactive selected={slot} onPick={setSlot} onData={(d) => setOpenSlotCount((d.open || []).length)} /></div>
          {openSlotCount === 0 && (
            <div style={{ fontSize: 12, color: "#b46a00", background: "rgba(255,143,1,.08)", border: "1px solid rgba(255,143,1,.25)", borderRadius: 10, padding: "9px 12px", marginTop: -4, marginBottom: 4 }}>
              {first} hasn't published open slots yet. You can still send a request and agree a time over chat.
            </div>
          )}
          <div className="row2">
            <div className="field"><label>Duration</label>
              <select className="inp" value={bDur} onChange={e => setBDur(+e.target.value)}>
                <option value={0}>1 hour — ₹{t.rate}</option>
                <option value={1}>1.5 hours — ₹{Math.round(t.rate * 1.5)}</option>
                <option value={2}>2 hours — ₹{t.rate * 2}</option>
              </select>
            </div>
            <div className="field"><label>Mode</label><select className="inp"><option>Online · Shiksha room</option></select></div>
          </div>
          <div className="summary">First 15-min intro is <b>free</b>. {first} confirms your request, then the slot is locked. Rate: <b>₹{t.rate}/hr</b>.</div>
          <button
            className="btn btn-accent"
            style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: 14, opacity: (openSlotCount > 0 && !slot) ? 0.5 : 1, cursor: (openSlotCount > 0 && !slot) ? "not-allowed" : "pointer" }}
            disabled={openSlotCount > 0 && !slot}
            onClick={confirmBook}
          >
            {openSlotCount > 0 && !slot ? "Pick a slot to continue" : <>Continue to payment <Ic n="arrow" w={16} /></>}
          </button>
        </>
      );
    }
    if (modal === "buy") {
      return (
        <>
          <div className="mh"><div><h3>Get this course</h3><div className="who">One-time purchase · lifetime access</div></div><CloseBtn /></div>
          <div className="buyitem">
            <img src={t.img} alt="" />
            <div><div className="bt">{course.title}</div><div className="bm">By {t.name} · {course.hours} hrs · {totalLectures} lessons{course.rating != null ? ` · ★ ${course.rating}` : ""}</div></div>
          </div>
          <div className="field"><label>Email for access</label><input className="inp" value={buyEmail} onChange={e => setBuyEmail(e.target.value)} placeholder="you@example.com" /></div>
          <div className="field"><label>Payment method</label>
            <div className="paychips">
              {["UPI", "Card", "Net banking", "Wallet"].map(p => (
                <div key={p} className={"pc" + (pay === p ? " on" : "")} onClick={() => setPay(p)}>{p}</div>
              ))}
            </div>
          </div>
          <div className="pricelines">
            <div className="pl"><span>Course price</span><span>{course.old && <span className="old">₹{course.old.toLocaleString()}</span>}₹{course.price.toLocaleString()}</span></div>
            {course.old && <div className="pl save"><span>Discount ({off}%)</span><span>− ₹{(course.old - course.price).toLocaleString()}</span></div>}
            <div className="pl tot"><span>Total</span><span>₹{course.price.toLocaleString()}</span></div>
          </div>
          <button className="btn btn-accent" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: 14, marginTop: 4 }} onClick={confirmBuy}><Ic n="card" w={16} /> Pay ₹{course.price.toLocaleString()}</button>
          <div className="guarantee"><Ic n="guard" w={15} /> 30-day money-back guarantee, no questions asked.</div>
        </>
      );
    }
    if (modal === "msg") {
      return (
        <>
          <div className="mh"><div><h3>Message {first}</h3><div className="who">Usually replies {responds}</div></div><CloseBtn /></div>
          <div className="field"><label>Your message</label><textarea className="inp" value={msgText} onChange={e => setMsgText(e.target.value)} placeholder={`Hi ${first}, I'd like to learn ${t.skills?.[0] || "this skill"}. I'm a beginner with about 3 hrs a week — could we chat?`} /></div>
          <div className="summary">Replies arrive in your messages inbox.</div>
          <button className="btn btn-forest" style={{ width: "100%", justifyContent: "center" }} onClick={confirmMsg} disabled={!msgText.trim()}><Ic n="send" w={16} /> Send message</button>
        </>
      );
    }
    return null;
  }
}
