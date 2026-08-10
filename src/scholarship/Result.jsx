// Screen 9 — Scholarship result.
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamResult, getScholarshipConfig } from "../api/scholarshipApi";
import "./scholarship.tokens.css";
import "./scholarship.css";

export default function Result() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    getExamResult(sessionId).then(setResult).catch(() => navigate("/scholarship"));
    getScholarshipConfig().then(setConfig);
  }, [sessionId, navigate]);

  if (!result) {
    return <div className="sch" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div className="sch-spinner" /></div>;
  }

  const won = result.awarded_discount_pct > 0;
  const fmt = (paise) => `₹${Math.round(paise / 100).toLocaleString("en-IN")}`;
  const discountPaise = Math.round((result.course.price * result.awarded_discount_pct) / 100);
  const finalPaise = result.course.price - discountPaise;

  return (
    <div className="sch" style={{ minHeight: "100vh" }}>
      <div style={{ background: "var(--sch-green-dark-surface)", color: "#fff", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px" }}>
            <div className="sch-kicker">{won ? "Scholarship awarded" : "Examination complete"}</div>
            <h1 className="sch-serif" style={{ fontSize: "clamp(30px, 3.8vw, 46px)", letterSpacing: "-.025em", margin: "12px 0" }}>
              {won ? `You earned a ${result.awarded_discount_pct}% scholarship.` : "No scholarship this time."}
            </h1>
            <p style={{ opacity: 0.7, marginBottom: 24 }}>
              {won ? "The celebration is restrained — here's exactly what you earned." : `You needed at least ${25} correct to qualify for an award.`}
            </p>
            {won && (
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <div className="sch-serif" style={{ fontSize: "clamp(80px, 11vw, 132px)", color: "var(--sch-gold-light)", lineHeight: 0.85 }}>{result.awarded_discount_pct}%</div>
                <div style={{ opacity: 0.65, fontSize: 15 }}>scholarship<br />awarded</div>
              </div>
            )}
          </div>

          <div style={{ flex: "1 1 340px", background: "rgba(255,255,255,.07)", borderRadius: 18, padding: 26 }}>
            {[["Course", result.course.title], ["Current class", `Class ${result.course.class_level}`],
              ["Correct answers", `${result.score} / ${config?.question_count ?? 50}`],
              ["Scholarship band", `${result.awarded_discount_pct}%`]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, borderBottom: "1px solid rgba(255,255,255,.14)", padding: "10px 0" }}>
                <span style={{ opacity: 0.65 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            {won && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "14px 0 6px" }}>
                  <span style={{ opacity: 0.65 }}>Original fee</span><span>{fmt(result.course.price)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--sch-gold-light)", paddingBottom: 10 }}>
                  <span>Scholarship discount</span><span>−{fmt(discountPaise)}</span>
                </div>
                <div className="sch-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 600, borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: 14, marginBottom: 18 }}>
                  <span>Final fee</span><span>{fmt(finalPaise)}</span>
                </div>
              </>
            )}
            <button className="sch-btn" style={{ background: "#fff", color: "var(--sch-green)", width: "100%" }}
              onClick={() => navigate(`/scholarship/checkout/${sessionId}`)}>
              {won ? "Continue to payment" : "Browse courses"}
            </button>
          </div>
        </div>
      </div>

      {result.subject_breakdown && Object.keys(result.subject_breakdown).length > 0 && (
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px" }}>
          <div className="sch-kicker" style={{ marginBottom: 18 }}>SUBJECT BREAKDOWN</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {Object.entries(result.subject_breakdown).map(([subject, { correct, total }]) => (
              <div key={subject} className="sch-card" style={{ padding: 20 }}>
                <div style={{ fontSize: 13.5, color: "var(--sch-ink-60)", marginBottom: 8, textTransform: "capitalize" }}>{subject.replace("_", " ")}</div>
                <div className="sch-serif" style={{ fontSize: 28, marginBottom: 10 }}>{correct}/{total}</div>
                <div style={{ height: 5, borderRadius: 3, background: "var(--sch-border-faint)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(correct / total) * 100}%`, background: "var(--sch-green)", transition: "width .8s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
