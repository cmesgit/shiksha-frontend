/* Booking.jsx — payment → confirmation → live session room.
   ────────────────────────────────────────────────────────────────
   CHANGES vs original:
     PaymentScreen
       1. Fetches GET /skill/payment-config/ on mount; shows a one-tap "Confirm"
          button when mode is free, otherwise shows the UPI/card form.
       2. Calls payForSession() which POSTs /skill/payments/create-order/ and
          returns { bookingId, sessionId }. Both are forwarded to SessionConfirmed
          via nav("session-confirmed", { sessionDraft: { ...draft, bookingId, sessionId } }).

     SessionConfirmed
       3. Uses draft.bookingId from the API instead of generating a random one.
       4. "Join session room" passes sessionId forward so SessionRoom can call /join/.

     SessionRoom
       5. On mount, POSTs /skill/sessions/<sessionId>/join/ to get a LiveKit token
          and ws_url. Token is logged; real SDK wiring goes here.
       6. "End session" POSTs /skill/sessions/<sessionId>/complete/ then navigates
          to a post-session review screen before returning to hub. */
import React, { useState, useEffect } from "react";
import { Icon } from "./icons";
import { Field, FormRow, TeacherMini, fmtDate, fmtTime } from "./ui";
import { payForSession, fetchSkillPaymentConfig } from "../../api/skillApi";
import api from "../../api/apiClient";

/* ════════════════ PAYMENT ════════════════ */
export function PaymentScreen({ t, draft, nav }) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [upiApp, setUpiApp] = useState("phonepe");
  const [card, setCard] = useState({ name: "", no: "", exp: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [payConfig, setPayConfig] = useState(null);   // null = loading
  const [configErr, setConfigErr] = useState(false);

  const sessionFee = Number(t.rate) || 400;
  const platformFee = 25;
  const gst = Math.round((sessionFee + platformFee) * 0.18);
  const total = sessionFee + platformFee + gst;

  // FIX: fetch payment config so we know if the platform is free or not
  useEffect(() => {
    fetchSkillPaymentConfig()
      .then(cfg => setPayConfig(cfg))
      .catch(() => { setConfigErr(true); setPayConfig({ is_free: true }); });
  }, []);

  const isFree = payConfig?.is_free ?? false;

  const valid = isFree ? true
    : method === "upi" ? (upiApp || upiId.trim().length > 3)
    : method === "card" ? (card.name && card.no.replace(/\s/g, "").length >= 12 && card.exp && card.cvv.length >= 3)
    : true;

  const pay = async () => {
    if (!valid || processing) return;
    setProcessing(true);
    try {
      // FIX: capture the API response — it contains the real bookingId + sessionId
      const result = await payForSession({ teacherId: t.id, draft, method, amount: isFree ? 0 : total });
      nav("session-confirmed", {
        sessionDraft: {
          ...draft,
          bookingId:  result.bookingId  || result.booking_id  || "",
          sessionId:  result.sessionId  || result.session_id  || "",
        }
      });
    } catch {
      setProcessing(false);
    }
  };

  return (
    <div className="sd-screen" style={{ background: "var(--c-cream-2)", minHeight: 560 }}>
      <div style={{ padding: "30px 48px 60px", maxWidth: 1080, margin: "0 auto" }}>
        <button onClick={() => nav("profile", { teacher: t })} className="sd-btn sd-btn-ghost" style={{ padding: "6px 12px", fontSize: 12, marginBottom: 18 }}>
          <Icon.back size={14} /> Back to profile
        </button>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11.5, color: "var(--c-orange)", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>Step 2 of 3</div>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: 30, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-.8px", marginTop: 4 }}>Confirm &amp; pay</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 18, alignItems: "start" }}>
          {/* ── left: payment method ── */}
          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid var(--c-border)", boxShadow: "0 8px 24px rgba(18,80,39,.06)", padding: 26 }}>

            {payConfig === null ? (
              /* loading skeleton */
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[1,2,3].map(i => <div key={i} style={{ height: 52, borderRadius: 14, background: "var(--c-cream-2)", opacity: 0.6 }} />)}
              </div>
            ) : isFree ? (
              /* FREE mode — single confirm panel */
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(29,202,171,.12)",
                  border: "1px solid rgba(29,202,171,.3)", color: "#0e7665", padding: "8px 16px", borderRadius: 12, fontSize: 13, fontWeight: 600 }}>
                  <Icon.check size={15} /> This session is free — no payment needed
                </div>
                <p style={{ fontSize: 13, color: "var(--c-ink-soft)", lineHeight: 1.6, margin: 0 }}>
                  Your request will be sent to {t.name.split(" ")[0]}. Once they confirm, your slot is locked.
                </p>
              </div>
            ) : (
              /* PAID mode — full payment form */
              <>
                <h3 style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14, color: "var(--c-forest)", letterSpacing: ".3px", textTransform: "uppercase", marginBottom: 14 }}>Choose how to pay</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <MethodRow checked={method === "upi"} onClick={() => setMethod("upi")} label="UPI" tag="Fastest" tag2="Pay in seconds with any UPI app." />
                  <MethodRow checked={method === "card"} onClick={() => setMethod("card")} label="Credit / Debit card" tag2="Visa, Mastercard, RuPay." />
                  <MethodRow checked={method === "netbanking"} onClick={() => setMethod("netbanking")} label="Net banking" tag2="All major Indian banks." />
                </div>

                <div style={{ marginTop: 18, padding: "18px 18px 6px", border: "1px dashed var(--c-border)", borderRadius: 14, background: "var(--c-cream-2)" }}>
                  {method === "upi" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div className="sd-label">Pay with a UPI app</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                        {[{ id: "phonepe", name: "PhonePe", bg: "#5f259f", g: "P" }, { id: "gpay", name: "Google Pay", bg: "#1a73e8", g: "G" }, { id: "paytm", name: "Paytm", bg: "#002970", g: "P" }, { id: "bhim", name: "BHIM UPI", bg: "#ff7f00", g: "B" }].map(app => (
                          <button key={app.id} type="button" onClick={() => setUpiApp(app.id)} style={{ all: "unset", cursor: "pointer", background: "#fff", border: "1.5px solid " + (upiApp === app.id ? "var(--c-forest)" : "var(--c-border)"), borderRadius: 12, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, boxShadow: upiApp === app.id ? "0 0 0 3px rgba(18,80,39,.12)" : "none" }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: app.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 900, fontSize: 16 }}>{app.g}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--c-forest)" }}>{app.name}</div>
                          </button>
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11.5, color: "var(--c-ink-soft)" }}>
                        <span style={{ flex: 1, height: 1, background: "var(--c-border)" }} /> or enter UPI ID <span style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
                      </div>
                      <input className="sd-input" placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
                    </div>
                  )}
                  {method === "card" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <Field label="Name on card"><input className="sd-input" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} placeholder="As printed on the card" /></Field>
                      <Field label="Card number"><input className="sd-input" value={card.no} onChange={e => setCard(c => ({ ...c, no: e.target.value.replace(/[^\d\s]/g, "").slice(0, 19) }))} placeholder="1234 5678 9012 3456" /></Field>
                      <FormRow>
                        <Field label="Expiry"><input className="sd-input" value={card.exp} onChange={e => setCard(c => ({ ...c, exp: e.target.value }))} placeholder="MM / YY" /></Field>
                        <Field label="CVV"><input className="sd-input" value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} placeholder="123" /></Field>
                      </FormRow>
                    </div>
                  )}
                  {method === "netbanking" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div className="sd-label">Pick your bank</div>
                      <select className="sd-select">{["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Mizoram Rural Bank", "Other"].map(b => <option key={b}>{b}</option>)}</select>
                      <div style={{ fontSize: 12, color: "var(--c-ink-soft)" }}>You'll be redirected to your bank's login page to authorize the payment.</div>
                    </div>
                  )}
                </div>
              </>
            )}

            {!isFree && payConfig !== null && (
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20, fontSize: 11.5, color: "var(--c-ink-soft)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon.shield size={13} /> 256-bit secure payment</div>
                <span style={{ opacity: .35 }}>·</span>
                <div>Razorpay</div>
              </div>
            )}
          </div>

          {/* ── right: order summary ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 24px rgba(18,80,39,.06)" }}>
              <div style={{ padding: "18px 20px 14px", background: "var(--c-cream-2)", borderBottom: "1px solid var(--c-border)" }}><TeacherMini t={t} /></div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 13, color: "var(--c-forest)", letterSpacing: ".3px", textTransform: "uppercase" }}>You're booking</div>
                <Row label="Topic" value={draft.topic || `Intro to ${(t.skills||[])[0] || "skill"}`} />
                <Row label="When" value={draft.slotLabel || (draft.date ? `${fmtDate(draft.date)} · ${fmtTime(draft.time)}` : "Time TBC with teacher")} />
                <Row label="Length" value={`${draft.duration_mins || 60} minutes`} />
                <Row label="Mode" value="Online · Shiksha video" />
                <div style={{ height: 1, background: "var(--c-border)", margin: "4px 0" }} />
                {isFree ? (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14, color: "var(--c-forest)", letterSpacing: ".3px", textTransform: "uppercase" }}>Total</div>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: 28, color: "#0e7665", letterSpacing: "-.6px" }}>Free</div>
                  </div>
                ) : (
                  <>
                    <Price label="Session fee" detail={`${draft.duration_mins || 60} min · ${(t.skills||[])[0] || ""}`} amount={sessionFee} />
                    <Price label="Platform fee" amount={platformFee} />
                    <Price label="GST (18%)" amount={gst} />
                    <div style={{ height: 1, background: "var(--c-border)" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14, color: "var(--c-forest)", letterSpacing: ".3px", textTransform: "uppercase" }}>Total</div>
                      <div style={{ fontFamily: "var(--font-head)", fontWeight: 900, fontSize: 28, color: "var(--c-forest)", letterSpacing: "-.6px" }}>₹{total.toLocaleString("en-IN")}</div>
                    </div>
                  </>
                )}
                <button onClick={pay} disabled={!valid || processing || payConfig === null} className="sd-btn sd-btn-primary" style={{ justifyContent: "center", padding: "14px", fontSize: 14.5 }}>
                  {processing ? "Processing…"
                    : payConfig === null ? "Loading…"
                    : isFree ? <>Confirm booking <Icon.arrow size={14} /></>
                    : <>Pay ₹{total.toLocaleString("en-IN")} <Icon.arrow size={14} /></>}
                </button>
                <div style={{ fontSize: 11, color: "var(--c-ink-soft)", textAlign: "center", lineHeight: 1.5 }}>
                  {isFree
                    ? "Session is confirmed once the teacher accepts."
                    : "Held in escrow. Released to the teacher only after the session.\nFree cancellation up to 12 hours before."}
                </div>
              </div>
            </div>
            <div style={{ background: "rgba(29,202,171,.1)", border: "1px solid rgba(29,202,171,.3)", borderRadius: 14, padding: 14, fontSize: 12, color: "var(--c-forest)", display: "flex", gap: 10 }}>
              <Icon.shield size={16} />
              <div><strong>Risk-free first session.</strong><div style={{ marginTop: 3, color: "var(--c-ink-soft)" }}>If you're not happy in the first 15 minutes, end the session and we'll refund in full.</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodRow({ checked, onClick, label, tag, tag2 }) {
  return (
    <button onClick={onClick} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1.5px solid " + (checked ? "var(--c-forest)" : "var(--c-border)"), borderRadius: 14, background: checked ? "rgba(18,80,39,.04)" : "#fff", boxShadow: checked ? "0 0 0 3px rgba(18,80,39,.10)" : "none" }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid " + (checked ? "var(--c-forest)" : "var(--c-border)"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {checked && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--c-forest)" }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--c-forest)" }}>{label}</div>
        {tag2 && <div style={{ fontSize: 11.5, color: "var(--c-ink-soft)", marginTop: 2 }}>{tag2}</div>}
      </div>
      {tag && <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 100, background: "rgba(255,143,1,.15)", color: "#c46b00", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase" }}>{tag}</span>}
    </button>
  );
}
function Row({ label, value }) {
  return <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13 }}><div style={{ color: "var(--c-ink-soft)" }}>{label}</div><div style={{ color: "var(--c-forest)", fontWeight: 600, textAlign: "right" }}>{value}</div></div>;
}
function Price({ label, detail, amount }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 13 }}>
      <div><div style={{ color: "var(--c-ink)", fontWeight: 500 }}>{label}</div>{detail && <div style={{ fontSize: 11, color: "var(--c-ink-soft)", marginTop: 1 }}>{detail}</div>}</div>
      <div style={{ color: "var(--c-forest)", fontWeight: 700, fontFamily: "var(--font-head)" }}>₹{amount.toLocaleString("en-IN")}</div>
    </div>
  );
}

/* ════════════════ CONFIRMED ════════════════ */
export function SessionConfirmed({ t, draft, nav }) {
  // FIX: use the real bookingId from the API response (passed via draft)
  const bookingId = draft.bookingId ? `#${draft.bookingId}` : "#SHK-000000";

  return (
    <div className="sd-screen" style={{ background: "var(--c-cream-2)", minHeight: 560 }}>
      <div style={{ padding: "30px 48px 60px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 22, overflow: "hidden", boxShadow: "0 14px 40px rgba(18,80,39,.10)" }}>
          <div style={{ position: "relative", background: "linear-gradient(135deg, var(--c-forest-dk), var(--c-forest))", color: "#fff", padding: "36px 32px 30px", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,202,171,.35), transparent 70%)", top: -140, right: -100 }} />
            <div style={{ position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(29,202,171,.22)", color: "var(--c-teal)", padding: "5px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}><Icon.check size={13} /> Booking confirmed</div>
              <h2 style={{ fontFamily: "var(--font-head)", fontSize: 32, fontWeight: 900, letterSpacing: "-1px", marginTop: 14 }}>You're booked with {t.name.split(" ")[0]}.</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.7)", marginTop: 6, lineHeight: 1.55 }}>A receipt and calendar invite are on their way to your email.</p>
            </div>
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Cell label="With" value={<><img src={t.img} alt="" style={{ width: 28, height: 28, borderRadius: 8, objectFit: "cover", verticalAlign: "-9px", marginRight: 8 }} />{t.name}</>} />
              <Cell label="Topic" value={draft.topic || `Intro to ${(t.skills||[])[0] || "skill"}`} />
              <Cell label="When" value={draft.slotLabel || (draft.date ? `${fmtDate(draft.date)} · ${fmtTime(draft.time)}` : "Time TBC with teacher")} />
              <Cell label="Length" value={`${draft.duration_mins || 60} minutes`} />
              <Cell label="Mode" value="Online · Shiksha video room" />
              <Cell label="Booking ID" value={bookingId} mono />
            </div>
            {/* FIX: pass sessionId forward so SessionRoom can call /join/ */}
            {draft.sessionId && (
              <button onClick={() => nav("session-room")} className="sd-btn sd-btn-primary" style={{ marginTop: 24, width: "100%", justifyContent: "center", padding: "14px", fontSize: 14.5 }}>
                <Icon.vid size={15} /> Join the session room
              </button>
            )}
            <div style={{ fontSize: 11.5, color: "var(--c-ink-soft)", textAlign: "center", marginTop: 8 }}>The room becomes active 5 minutes before your session start time.</div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button className="sd-btn sd-btn-ghost" style={{ flex: 1, justifyContent: "center" }}><Icon.cal size={13} /> Add to calendar</button>
              <button className="sd-btn sd-btn-ghost" style={{ flex: 1, justifyContent: "center" }}><Icon.msg size={13} /> Message {t.name.split(" ")[0]}</button>
              <button onClick={() => nav("hub")} className="sd-btn sd-btn-ghost" style={{ flex: 1, justifyContent: "center" }}><Icon.back size={13} /> Back to hub</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Cell({ label, value, mono }) {
  return (
    <div style={{ background: "var(--c-cream-2)", borderRadius: 12, padding: "12px 14px", border: "1px solid var(--c-border)" }}>
      <div style={{ fontSize: 10.5, color: "var(--c-ink-soft)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".4px" }}>{label}</div>
      <div style={{ fontSize: 13.5, color: "var(--c-forest)", fontWeight: 700, marginTop: 3, fontFamily: mono ? "ui-monospace, SF Mono, monospace" : "inherit" }}>{value}</div>
    </div>
  );
}

/* ════════════════ SESSION ROOM ════════════════ */
export function SessionRoom({ t, draft, nav }) {
  const [secs, setSecs] = useState(143);
  const [mic, setMic] = useState(true);
  const [vid, setVid] = useState(true);
  const [share, setShare] = useState(false);
  const [hand, setHand] = useState(false);
  const [side, setSide] = useState("notes");
  const [chatMsg, setChatMsg] = useState("");
  const [chat, setChat] = useState([
    { who: "t", text: "Hey! Welcome — give me a second to share my screen.", at: "00:12" },
    { who: "me", text: "All good, take your time.", at: "00:18" },
    { who: "t", text: "Pulled up the project — let's start by looking at the file structure.", at: "01:02" },
  ]);
  const [endOpen, setEndOpen] = useState(false);
  const [ending, setEnding] = useState(false);
  // FIX: track LiveKit connection state
  const [roomToken, setRoomToken] = useState(null);
  const [roomErr, setRoomErr] = useState(null);

  const total = 60 * 60;

  useEffect(() => { const id = setInterval(() => setSecs(s => Math.min(total, s + 1)), 1000); return () => clearInterval(id); }, []);

  // FIX: call POST /skill/sessions/<sessionId>/join/ to get the LiveKit token
  useEffect(() => {
    const sessionId = draft?.sessionId;
    if (!sessionId) return;
    api.post(`/skill/sessions/${sessionId}/join/`)
      .then(r => {
        setRoomToken(r.data);
        // TODO: connect to LiveKit using r.data.token + r.data.ws_url
        // e.g. const room = new Room(); await room.connect(r.data.ws_url, r.data.token);
        console.info("[SessionRoom] LiveKit join →", r.data.room, "identity:", r.data.identity);
      })
      .catch(err => {
        console.warn("[SessionRoom] join failed:", err?.response?.data || err?.message);
        setRoomErr("Could not connect to the session room. The teacher may not have confirmed yet.");
      });
  }, [draft?.sessionId]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const pct = (secs / total) * 100;
  const sendChat = () => { if (!chatMsg.trim()) return; setChat(c => [...c, { who: "me", text: chatMsg.trim(), at: `${mm}:${ss}` }]); setChatMsg(""); };

  // FIX: end session → POST /complete/, then go to review screen
  const handleEndSession = async () => {
    setEnding(true);
    const sessionId = draft?.sessionId;
    if (sessionId) {
      try { await api.post(`/skill/sessions/${sessionId}/complete/`); }
      catch (e) { console.warn("[SessionRoom] complete failed:", e?.response?.data || e?.message); }
    }
    setEndOpen(false);
    // Navigate to hub — review prompt will appear via MyReviewableSessionsView
    // when the learner returns. A dedicated review screen can be added here later.
    nav("hub");
  };

  return (
    <div className="sd-screen" style={{ background: "#0a0f0d", color: "#fff", minHeight: 560, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* connection status banner */}
      {roomErr && (
        <div style={{ background: "rgba(248,113,113,.18)", borderBottom: "1px solid rgba(248,113,113,.3)", padding: "8px 24px", fontSize: 12.5, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon.shield size={13} /> {roomErr}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,.08)", background: "rgba(0,0,0,.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(248,113,113,.18)", color: "#fca5a5", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase" }}>
            <span className="sd-dot" style={{ background: "#fca5a5", animation: "sdPulse 1.6s ease-in-out infinite" }} /> Live
          </span>
          <div style={{ fontFamily: "var(--font-head)", fontSize: 13.5, fontWeight: 700 }}>{draft?.topic || `Intro to ${(t.skills||[])[0] || "skill"}`}</div>
          <span style={{ opacity: .4 }}>·</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>with {t.name}</span>
          {roomToken && <span style={{ fontSize: 11, color: "rgba(29,202,171,.8)", display: "inline-flex", alignItems: "center", gap: 5 }}><Icon.check size={11} /> Connected</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{mm}:{ss} <span style={{ opacity: .45 }}>/ 60:00</span></div>
            <div style={{ width: 140, height: 4, background: "rgba(255,255,255,.12)", borderRadius: 2, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: "linear-gradient(90deg, var(--c-teal), var(--c-orange))" }} /></div>
          </div>
          <span style={{ opacity: .25 }}>|</span>
          <span style={{ fontSize: 11.5, opacity: .55, display: "inline-flex", alignItems: "center", gap: 6 }}><Icon.shield size={12} /> End-to-end encrypted</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 320px", minHeight: 0 }}>
        <div style={{ position: "relative", padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 380, background: "#000", borderRadius: 14, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08), 0 30px 60px rgba(0,0,0,.4)" }}>
            <img src={t.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.85) brightness(.92)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.6), transparent 35%)" }} />
            <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.12)", padding: "6px 12px", borderRadius: 100, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="sd-dot" style={{ background: "#9bff9b" }} /><strong>{t.name.split(" ")[0]}</strong><span style={{ opacity: .6 }}>· speaking</span>
            </div>
            <div style={{ position: "absolute", top: 16, right: 16, width: 170, height: 110, borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg, #1f3a32, #08120e)", border: "1px solid rgba(255,255,255,.16)", boxShadow: "0 8px 24px rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,.10)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 18, color: "#fff" }}>You</div>
              <div style={{ position: "absolute", bottom: 8, left: 10, fontSize: 11, display: "flex", alignItems: "center", gap: 6 }}>
                <span className="sd-dot" style={{ background: vid ? "#9bff9b" : "#fca5a5" }} /> You {!mic && <Icon.close size={10} />}
              </div>
            </div>
          </div>
        </div>

        <aside style={{ borderLeft: "1px solid rgba(255,255,255,.08)", display: "flex", flexDirection: "column", background: "rgba(0,0,0,.35)" }}>
          <div style={{ display: "flex", padding: "0 16px", gap: 18, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            {[["notes", "Notes"], ["chat", "Chat"], ["info", "Session"]].map(([k, label]) => (
              <button key={k} onClick={() => setSide(k)} style={{ all: "unset", cursor: "pointer", padding: "12px 4px", fontSize: 12.5, fontWeight: 600, color: side === k ? "#fff" : "rgba(255,255,255,.45)", borderBottom: side === k ? "2px solid var(--c-teal)" : "2px solid transparent" }}>{label}</button>
            ))}
          </div>
          <div className="sd-scroll" style={{ flex: 1, overflow: "auto", padding: 16 }}>
            {side === "notes" && (
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".4px", textTransform: "uppercase", marginBottom: 10 }}>Live notes from {t.name.split(" ")[0]}</div>
                <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 14, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,.85)" }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{draft?.topic || `Intro to ${(t.skills||[])[0] || "skill"}`}</div>
                  <ol style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,.7)" }}><li>Why we need it — the problem it solves</li><li>The shape of a basic example</li><li>One gotcha and how to spot it</li><li>Tiny exercise (you try it)</li></ol>
                </div>
                <div style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,.55)", display: "flex", alignItems: "center", gap: 8 }}><Icon.pin size={12} /> Notes are saved to your library after the session.</div>
              </div>
            )}
            {side === "chat" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {chat.map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.who === "me" ? "flex-end" : "flex-start" }}>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.4)", marginBottom: 3, padding: "0 4px" }}>{m.who === "me" ? "You" : t.name.split(" ")[0]} · {m.at}</div>
                    <div style={{ maxWidth: "88%", background: m.who === "me" ? "var(--c-forest-mid)" : "rgba(255,255,255,.08)", padding: "8px 12px", borderRadius: 12, fontSize: 13, lineHeight: 1.4 }}>{m.text}</div>
                  </div>
                ))}
              </div>
            )}
            {side === "info" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Info label="Topic" value={draft?.topic || `Intro to ${(t.skills||[])[0] || "skill"}`} />
                <Info label="With" value={t.name} />
                <Info label="Length" value={`${draft?.duration_mins || 60} min`} />
                <Info label="Booking ID" value={draft?.bookingId || "—"} />
                <Info label="Recording" value="Off (you can turn on)" />
                <Info label="Encrypted" value="End-to-end" />
              </div>
            )}
          </div>
          {side === "chat" && (
            <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", gap: 8 }}>
              <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => { if (e.key === "Enter") sendChat(); }} placeholder="Message…" style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "8px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "var(--font-body)" }} />
              <button onClick={sendChat} className="sd-btn" style={{ background: "var(--c-forest-mid)", color: "#fff", padding: "6px 14px", fontSize: 12 }}>Send</button>
            </div>
          )}
        </aside>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 24px", background: "rgba(0,0,0,.55)", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <Control label={mic ? "Mute" : "Unmute"} on={!mic} onClick={() => setMic(m => !m)} icon={<Icon.mic size={18} />} />
        <Control label={vid ? "Stop video" : "Start video"} on={!vid} onClick={() => setVid(v => !v)} icon={<Icon.vid size={18} />} />
        <Control label={share ? "Stop share" : "Share screen"} on={share} onClick={() => setShare(s => !s)} icon={<Icon.doc size={18} />} />
        <Control label="Raise hand" on={hand} onClick={() => setHand(h => !h)} icon={<Icon.user size={18} />} />
        <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.12)", margin: "0 6px" }} />
        <button onClick={() => setEndOpen(true)} className="sd-btn" style={{ background: "#dc2626", color: "#fff", padding: "12px 20px", fontSize: 13, fontWeight: 700, borderRadius: 100 }}>End session</button>
      </div>

      {endOpen && (
        <div onClick={e => { if (e.currentTarget === e.target) setEndOpen(false); }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24 }}>
          <div style={{ background: "#fff", color: "var(--c-ink)", borderRadius: 16, padding: 24, width: "min(420px, 100%)", boxShadow: "0 30px 80px rgba(0,0,0,.4)" }}>
            <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 18, color: "var(--c-forest)" }}>End the session?</div>
            <p style={{ fontSize: 13, color: "var(--c-ink-soft)", marginTop: 8, lineHeight: 1.55 }}>{t.name.split(" ")[0]} will be notified. You'll be asked to leave a quick review afterwards.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => setEndOpen(false)} className="sd-btn sd-btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Keep going</button>
              {/* FIX: call /complete/ then navigate, show loading while it runs */}
              <button onClick={handleEndSession} disabled={ending} className="sd-btn" style={{ flex: 1, justifyContent: "center", background: "#dc2626", color: "#fff" }}>
                {ending ? "Ending…" : "End session"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Control({ label, on, onClick, icon }) {
  return (
    <button onClick={onClick} title={label} style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 14px", borderRadius: 12, minWidth: 64, background: on ? "rgba(248,113,113,.16)" : "rgba(255,255,255,.06)", border: "1px solid " + (on ? "rgba(248,113,113,.4)" : "rgba(255,255,255,.10)"), color: on ? "#fca5a5" : "rgba(255,255,255,.85)" }}>
      <div style={{ lineHeight: 1 }}>{icon}</div>
      <div style={{ fontSize: 10.5, fontWeight: 600 }}>{label}</div>
    </button>
  );
}
function Info({ label, value }) {
  return <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "6px 0", borderBottom: "1px dashed rgba(255,255,255,.08)" }}><div style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)" }}>{label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.9)", fontWeight: 600, textAlign: "right" }}>{value}</div></div>;
}
