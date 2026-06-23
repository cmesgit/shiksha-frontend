/* Discovery.jsx — browse / filter guest teachers. */
import React, { useMemo, useState, useEffect } from "react";
import { Icon } from "./icons";
import { SKILL_CATEGORIES as FALLBACK_CATS } from "./data";
import { fetchTeachers } from "../../api/skillApi";
import api from "../../api/apiClient";

export default function Discovery({ nav, initialSkill = "all" }) {
  const [activeSkill, setActiveSkill] = useState(initialSkill);
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState(FALLBACK_CATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch live categories
    api.get("/skill/categories/")
      .then(r => { if (Array.isArray(r.data) && r.data.length) setCategories(r.data); })
      .catch(() => {/* keep fallback */});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = {};
    if (activeSkill !== "all") params.cat = activeSkill;
    if (search.trim()) params.search = search.trim();
    fetchTeachers(params)
      .then(data => { setTeachers(data); setLoading(false); })
      .catch(() => { setError("Could not load teachers."); setLoading(false); });
  }, [activeSkill, search]);

  // Client-side filter is still applied for instant response while API is in-flight
  // (when USE_MOCK is true, fetchTeachers returns all and we filter here)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return teachers.filter(t => {
      if (activeSkill !== "all" && t.cat !== activeSkill) return false;
      if (!q) return true;
      return (t.name + t.title + (t.skills || []).join(" ")).toLowerCase().includes(q);
    });
  }, [teachers, activeSkill, search]);

  return (
    <div className="sd-screen" style={{ background: "var(--c-cream-2)", minHeight: 560 }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--c-border)", padding: "20px 48px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-head)", fontSize: 22, fontWeight: 800, color: "var(--c-forest)", letterSpacing: "-.4px" }}>
                Find a guest teacher
              </h2>
              <p style={{ fontSize: 12.5, color: "var(--c-ink-soft)", marginTop: 2 }}>
                {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "teacher" : "teachers"} available`}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--c-cream-2)", padding: "6px 14px", borderRadius: 10, border: "1px solid var(--c-border)", minWidth: 280 }}>
              <Icon.search size={15} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or skill"
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: "var(--font-body)", padding: "6px 0" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            <button onClick={() => setActiveSkill("all")} className={"sd-chip " + (activeSkill === "all" ? "sd-chip-on" : "")}>All skills</button>
            {categories.map(s => {
              // Use slug when coming from the backend, fall back to id for mock data
              const key = s.slug || s.id;
              return (
                <button key={key} onClick={() => setActiveSkill(key)} className={"sd-chip " + (activeSkill === key ? "sd-chip-on" : "")}>
                  <span style={{ color: activeSkill === key ? "#fff" : s.color, fontWeight: 700 }}>{s.icon}</span> {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: "30px 48px 60px", maxWidth: 1180, margin: "0 auto" }}>
        {error ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--c-ink-soft)" }}>
            <div style={{ fontSize: 14 }}>{error}</div>
            <button onClick={() => setActiveSkill("all")} className="sd-btn sd-btn-ghost" style={{ marginTop: 14 }}>Try again</button>
          </div>
        ) : loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--c-border)", borderRadius: 16, height: 280,
                opacity: 0.5, animation: "pulse 1.4s ease-in-out infinite" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--c-ink-soft)" }}>
            <div style={{ fontSize: 14 }}>No teachers match that filter yet.</div>
            <button onClick={() => { setActiveSkill("all"); setSearch(""); }} className="sd-btn sd-btn-ghost" style={{ marginTop: 14 }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(t => <Card key={t.id} t={t} onOpen={() => nav("profile", { teacher: t })} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ t, onOpen }) {
  return (
    <button onClick={onOpen} style={{ all: "unset", cursor: "pointer", background: "#fff", border: "1px solid var(--c-border)",
      borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", transition: "all .18s", boxShadow: "0 4px 14px rgba(18,80,39,.05)" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 32px rgba(18,80,39,.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 14px rgba(18,80,39,.05)"; }}>
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        {t.img
          ? <img src={t.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: "var(--c-cream-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>👤</div>
        }
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,.92)", borderRadius: 100, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "var(--c-forest)", display: "flex", alignItems: "center", gap: 4 }}>
          <Icon.star size={11} /> {t.rating}
        </div>
        {(t.badges || []).includes("Top-rated") && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "var(--c-orange)", borderRadius: 100, padding: "4px 10px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: ".5px", textTransform: "uppercase" }}>Top rated</div>
        )}
      </div>
      <div style={{ padding: "14px 18px 18px", display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 15, color: "var(--c-forest)", letterSpacing: "-.3px" }}>{t.name}</div>
          <div style={{ fontSize: 12, color: "var(--c-ink-soft)", marginTop: 2 }}>{t.title}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {(t.skills || []).slice(0, 3).map(s => (
            <span key={s} style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 100, border: "1px solid var(--c-border)", color: "var(--c-forest)", fontWeight: 600 }}>{s}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid var(--c-border)", marginTop: "auto" }}>
          <div style={{ fontSize: 12, color: "var(--c-ink-soft)" }}>
            <strong style={{ color: "var(--c-forest)", fontFamily: "var(--font-head)" }}>₹{t.rate}</strong> /session
            <span style={{ opacity: .4, margin: "0 6px" }}>·</span>{t.sessions} done
          </div>
          <span style={{ color: "var(--c-forest-mid)", fontSize: 12, fontWeight: 700 }}>View →</span>
        </div>
      </div>
    </button>
  );
}
