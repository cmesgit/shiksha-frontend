/* Register.jsx — role chooser + guest student form + guest teacher form.
   The teacher form leads into the screening pipeline (application-status). */
import React, { useState } from "react";
import { Icon } from "./icons";
import { SKILL_CATEGORIES } from "./data";
import { Field, FormRow, Section, ErrorBox } from "./ui";
import { registerStudent, registerTeacher } from "../../api/skillApi";

/* ── Role chooser ─────────────────────────────────────────── */
export function RoleChooser({ nav }) {
  return (
    <div className="sd-screen sd-grid-bg" style={{ padding: "50px 48px 60px", minHeight: 560 }}>
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-1.2px" }}>
          Join Skill Development
        </h2>
        <p style={{ fontSize: 14.5, color: "var(--c-ink-soft)", marginTop: 10, lineHeight: 1.6 }}>
          Are you here to <strong>learn</strong> a skill or to <strong>teach</strong> one?
          You can do both later &mdash; pick what brings you here today.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 36 }}>
          <RoleCard color="var(--c-forest-mid)" icon={<Icon.cap size={28} />} kind="Guest student"
            title="I'm a student" cta="Register as student" onClick={() => nav("student")}
            lines={["Browse master teachers from all over Mizoram", "One-on-one sessions, your choice of skill", "Pay per session, no subscription"]} />
          <RoleCard color="var(--c-orange)" icon={<Icon.spark size={26} />} kind="Guest teacher"
            title="I'm a teacher" cta="Register as teacher" onClick={() => nav("teacher")}
            lines={["List the skills you've actually mastered", "Pass a short live screening interview", "Set your rate, choose your availability"]} />
        </div>
        <p style={{ marginTop: 30, fontSize: 12.5, color: "var(--c-ink-soft)" }}>
          Already registered? <a style={{ color: "var(--c-forest)", fontWeight: 600 }} href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

function RoleCard({ color, icon, kind, title, lines, cta, onClick }) {
  return (
    <button onClick={onClick} style={{ all: "unset", cursor: "pointer", background: "#fff",
      border: "1px solid var(--c-border)", borderRadius: 18, padding: 28, textAlign: "left",
      transition: "all .2s", boxShadow: "0 6px 18px rgba(18,80,39,.05)" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(18,80,39,.10)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 18px rgba(18,80,39,.05)"; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: color + "1a", color,
          display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <div>
          <div style={{ fontSize: 10.5, color, fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>{kind}</div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 22, color: "var(--c-forest)", letterSpacing: "-.4px" }}>{title}</div>
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {lines.map(l => (
          <li key={l} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--c-ink-soft)" }}>
            <span style={{ color, marginTop: 2 }}><Icon.check size={14} /></span>{l}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 22, fontSize: 13.5, fontWeight: 700, color, display: "flex", alignItems: "center", gap: 8 }}>
        {cta} <Icon.arrow size={14} />
      </div>
    </button>
  );
}

/* ── Guest student registration ───────────────────────────── */
export function StudentSignup({ nav }) {
  const [data, setData] = useState({ fullName: "", email: "", phone: "", location: "Aizawl", interests: [], password: "", confirm: "", agree: false });
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const toggleInterest = id => setData(d => ({ ...d, interests: d.interests.includes(id) ? d.interests.filter(x => x !== id) : [...d.interests, id] }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.email || !data.phone) return setErr("Please fill name, email and phone.");
    if (data.password !== data.confirm) return setErr("Passwords don't match.");
    if (!data.agree) return setErr("Please accept the terms.");
    if (data.interests.length === 0) return setErr("Pick at least one skill you're interested in.");
    setErr(""); setBusy(true);
    try { await registerStudent(data); setDone(true); }
    catch (e2) { setErr(e2?.message || "Something went wrong. Try again."); }
    finally { setBusy(false); }
  };

  if (done) {
    return (
      <SuccessCard title="You're in." accent="var(--c-forest-mid)"
        text="Check your inbox for a verification email, then start browsing teachers in your skill of choice.">
        <button className="sd-btn sd-btn-primary" onClick={() => nav("discovery")}>Browse teachers <Icon.arrow size={14} /></button>
        <button className="sd-btn sd-btn-ghost" onClick={() => nav("hub")}>Back to hub</button>
      </SuccessCard>
    );
  }

  return (
    <div className="sd-screen sd-grid-bg" style={{ padding: "40px 48px 60px", minHeight: 560 }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <button onClick={() => nav("join")} className="sd-btn sd-btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
          <Icon.back size={14} /> Back
        </button>
        <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 18, padding: 36, marginTop: 18, boxShadow: "0 8px 28px rgba(18,80,39,.06)" }}>
          <div style={{ fontSize: 11.5, color: "var(--c-forest-mid)", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>Guest student</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-.8px", marginTop: 4 }}>Create your learner account</h2>
          <p style={{ fontSize: 13, color: "var(--c-ink-soft)", marginTop: 6 }}>Tell us what you'd like to learn so we can match you with the right teachers.</p>

          <form onSubmit={submit} style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 16 }}>
            <FormRow>
              <Field label="Full name"><input className="sd-input" value={data.fullName} onChange={e => setData(d => ({ ...d, fullName: e.target.value }))} placeholder="e.g. Mary Lalrinmawii" /></Field>
              <Field label="Location">
                <select className="sd-select" value={data.location} onChange={e => setData(d => ({ ...d, location: e.target.value }))}>
                  {["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </FormRow>
            <FormRow>
              <Field label="Email"><input className="sd-input" type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} placeholder="you@example.com" /></Field>
              <Field label="Phone (WhatsApp)"><input className="sd-input" value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))} placeholder="+91 9xxxx xxxxx" /></Field>
            </FormRow>
            <Field label="What do you want to learn? (pick any)">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SKILL_CATEGORIES.map(s => (
                  <button type="button" key={s.id} onClick={() => toggleInterest(s.id)} className={"sd-chip " + (data.interests.includes(s.id) ? "sd-chip-on" : "")}>{s.label}</button>
                ))}
              </div>
            </Field>
            <FormRow>
              <Field label="Password"><input className="sd-input" type="password" value={data.password} onChange={e => setData(d => ({ ...d, password: e.target.value }))} /></Field>
              <Field label="Confirm password"><input className="sd-input" type="password" value={data.confirm} onChange={e => setData(d => ({ ...d, confirm: e.target.value }))} /></Field>
            </FormRow>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: "var(--c-ink-soft)", marginTop: 6, cursor: "pointer" }}>
              <input type="checkbox" checked={data.agree} onChange={e => setData(d => ({ ...d, agree: e.target.checked }))} style={{ marginTop: 2 }} />
              <span>I accept the <a href="/terms" style={{ color: "var(--c-forest)" }}>Terms</a> and Privacy Policy.</span>
            </label>
            <ErrorBox>{err}</ErrorBox>
            <button type="submit" className="sd-btn sd-btn-primary" style={{ justifyContent: "center", marginTop: 6 }} disabled={busy}>
              {busy ? "Creating…" : <>Create student account <Icon.arrow size={14} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Guest teacher registration ───────────────────────────── */
export function TeacherSignup({ nav }) {
  const [data, setData] = useState({
    fullName: "", email: "", phone: "", location: "Aizawl", headline: "", bio: "", experience: "",
    categories: [], customSkills: [], rate: 400, modes: ["online"], availability: [], password: "", confirm: "", agree: false,
  });
  const [customInput, setCustomInput] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const toggle = (key, value) => setData(d => {
    const arr = d[key];
    return { ...d, [key]: arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value] };
  });
  const addCustom = () => {
    const t = customInput.trim();
    if (!t || data.customSkills.includes(t)) return;
    setData(d => ({ ...d, customSkills: [...d.customSkills, t] }));
    setCustomInput("");
  };
  const removeCustom = (sk) => setData(d => ({ ...d, customSkills: d.customSkills.filter(x => x !== sk) }));

  const submit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.email || !data.phone) return setErr("Please fill name, email and phone.");
    if (data.categories.length === 0 && data.customSkills.length === 0) return setErr("Add at least one master skill — pick a category or type your own.");
    if (data.password !== data.confirm) return setErr("Passwords don't match.");
    if (!data.agree) return setErr("Please accept the terms.");
    setErr(""); setBusy(true);
    const primarySkill = data.customSkills[0]
      || (data.categories[0] && (SKILL_CATEGORIES.find(s => s.id === data.categories[0]) || {}).label)
      || "your skill";
    try {
      await registerTeacher(data);
      nav("application-status", {
        applicant: {
          name: data.fullName, skill: primarySkill, category: data.categories[0] || "coding",
          headline: data.headline || "Guest teacher applicant", experience: data.experience || "3–5 years",
        },
      });
    } catch (e2) { setErr(e2?.message || "Something went wrong. Try again."); setBusy(false); }
  };

  return (
    <div className="sd-screen sd-grid-bg" style={{ padding: "40px 48px 60px", minHeight: 560 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <button onClick={() => nav("join")} className="sd-btn sd-btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
          <Icon.back size={14} /> Back
        </button>
        <div style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 18, padding: 36, marginTop: 18, boxShadow: "0 8px 28px rgba(18,80,39,.06)" }}>
          <div style={{ fontSize: 11.5, color: "var(--c-orange)", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase" }}>Guest teacher</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-.8px", marginTop: 4 }}>Register as a guest teacher</h2>
          <p style={{ fontSize: 13, color: "var(--c-ink-soft)", marginTop: 6 }}>
            After you apply, you&rsquo;ll book a short live screening interview with our panel. Pass it and your profile goes live in the directory.
          </p>

          <form onSubmit={submit} style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 22 }}>
            <Section title="01 · About you">
              <FormRow>
                <Field label="Full name"><input className="sd-input" value={data.fullName} onChange={e => setData(d => ({ ...d, fullName: e.target.value }))} placeholder="e.g. Lalmuanawma" /></Field>
                <Field label="Location">
                  <select className="sd-select" value={data.location} onChange={e => setData(d => ({ ...d, location: e.target.value }))}>
                    {["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </FormRow>
              <FormRow>
                <Field label="Email"><input className="sd-input" type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} /></Field>
                <Field label="Phone (WhatsApp)"><input className="sd-input" value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))} /></Field>
              </FormRow>
              <Field label="Headline" hint="One short line — what you teach + where you've worked.">
                <input className="sd-input" value={data.headline} onChange={e => setData(d => ({ ...d, headline: e.target.value }))} placeholder="e.g. Python & Data Science · ex-Wipro" />
              </Field>
            </Section>

            <Section title="02 · Master skills" hint="Pick categories you've mastered and add specific skills.">
              <Field label="Categories">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SKILL_CATEGORIES.map(s => (
                    <button type="button" key={s.id} onClick={() => toggle("categories", s.id)} className={"sd-chip " + (data.categories.includes(s.id) ? "sd-chip-on" : "")}>
                      <span style={{ color: data.categories.includes(s.id) ? "#fff" : s.color, fontWeight: 700 }}>{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Specific skills" hint="The actual things you teach: tools, languages, exams, instruments.">
                <div style={{ display: "flex", gap: 8 }}>
                  <input className="sd-input" value={customInput} onChange={e => setCustomInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }} placeholder="e.g. React, IELTS Writing, Acoustic Guitar" />
                  <button type="button" onClick={addCustom} className="sd-btn sd-btn-primary" style={{ flexShrink: 0 }}><Icon.plus size={14} /> Add</button>
                </div>
                {data.customSkills.length > 0 && (
                  <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {data.customSkills.map(sk => (
                      <span key={sk} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--c-forest)", color: "#fff", padding: "5px 10px 5px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600 }}>
                        {sk}
                        <button type="button" onClick={() => removeCustom(sk)} style={{ background: "rgba(255,255,255,.18)", border: "none", color: "#fff", borderRadius: "50%", width: 18, height: 18, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon.close size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Field>
              <Field label="Years of experience">
                <select className="sd-select" value={data.experience} onChange={e => setData(d => ({ ...d, experience: e.target.value }))}>
                  <option value="">Select…</option>
                  {["< 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Short bio" hint="Why students should learn from you. Keep it real.">
                <textarea className="sd-textarea" rows={4} value={data.bio} onChange={e => setData(d => ({ ...d, bio: e.target.value }))} placeholder="Your style, what you cover, what makes a session worth it." />
              </Field>
            </Section>

            <Section title="03 · Sessions">
              <FormRow>
                <Field label="Rate per session">
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--c-ink-soft)", fontWeight: 600 }}>₹</span>
                    <input className="sd-input" type="number" value={data.rate} onChange={e => setData(d => ({ ...d, rate: e.target.value }))} style={{ paddingLeft: 28 }} />
                  </div>
                </Field>
                <Field label="Mode">
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["online", "Online"], ["inperson", "In-person"]].map(([id, label]) => (
                      <button type="button" key={id} onClick={() => toggle("modes", id)} className={"sd-chip " + (data.modes.includes(id) ? "sd-chip-on" : "")} style={{ flex: 1, justifyContent: "center", padding: "10px 12px" }}>
                        {data.modes.includes(id) && <Icon.check size={12} />} {label}
                      </button>
                    ))}
                  </div>
                </Field>
              </FormRow>
              <Field label="Availability" hint="Rough windows — students see this on your profile.">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Mon mornings", "Mon evenings", "Wed evenings", "Fri evenings", "Saturdays", "Sundays"].map(o => (
                    <button type="button" key={o} onClick={() => toggle("availability", o)} className={"sd-chip " + (data.availability.includes(o) ? "sd-chip-on" : "")}>{o}</button>
                  ))}
                </div>
              </Field>
            </Section>

            <Section title="04 · Account">
              <FormRow>
                <Field label="Password"><input className="sd-input" type="password" value={data.password} onChange={e => setData(d => ({ ...d, password: e.target.value }))} /></Field>
                <Field label="Confirm password"><input className="sd-input" type="password" value={data.confirm} onChange={e => setData(d => ({ ...d, confirm: e.target.value }))} /></Field>
              </FormRow>
            </Section>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: "var(--c-ink-soft)", cursor: "pointer" }}>
              <input type="checkbox" checked={data.agree} onChange={e => setData(d => ({ ...d, agree: e.target.checked }))} style={{ marginTop: 2 }} />
              <span>I agree to the <a href="/terms" style={{ color: "var(--c-forest)" }}>Teacher Terms</a> and confirm the skills I&rsquo;ve listed reflect my actual experience.</span>
            </label>
            <ErrorBox>{err}</ErrorBox>
            <button type="submit" className="sd-btn sd-btn-primary" style={{ justifyContent: "center" }} disabled={busy}>
              {busy ? "Submitting…" : <>Submit application <Icon.arrow size={14} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function SuccessCard({ title, text, accent, children }) {
  return (
    <div className="sd-screen sd-grid-bg" style={{ padding: "60px 48px", minHeight: 560, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ maxWidth: 520, textAlign: "center", background: "#fff", borderRadius: 20, padding: "44px 36px", border: "1px solid var(--c-border)", boxShadow: "0 16px 48px rgba(18,80,39,.10)" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(29,202,171,.15)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: accent }}>
          <Icon.check size={32} />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "var(--c-forest)", letterSpacing: "-.8px", marginTop: 18 }}>{title}</h2>
        <p style={{ fontSize: 14, color: "var(--c-ink-soft)", marginTop: 10, lineHeight: 1.6 }}>{text}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 26 }}>{children}</div>
      </div>
    </div>
  );
}
