// PLACEMENT: src/counselling/MyPathPage.jsx   (NEW FILE — landing/frontend app)
//
// Workflow screen 3 — MY PATH: the personalised career path with "why it
// suits you", suggested next steps, and related career guides. Computed
// by the rule engine in careerPath.js from the intake + learner data the
// backend returns — same explainable, no-AI philosophy as the backend's
// counsellor matching.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getIntake } from "../api/counselling";
import { getGuideIndex, toGuideCard } from "../api/guidesApi";
import CounsellingShell from "./CounsellingShell";
import { buildCareerPath } from "./careerPath";
import { GuideCard } from "./LandingPage";
import useCounsellorsLive from "./useCounsellorsLive";

export default function MyPathPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { live: counsellorsLive } = useCounsellorsLive();
  const [intake, setIntake] = useState(null);
  const [error, setError] = useState("");
  const [guideIndex, setGuideIndex] = useState([]);

  useEffect(() => {
    let mounted = true;
    getGuideIndex().then((cards) => mounted && setGuideIndex(cards.map(toGuideCard)));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/counselling/path" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let live = true;
    getIntake().then((d) => live && setIntake(d))
      .catch(() => live && setError("Couldn't load your profile."));
    return () => { live = false; };
  }, [isAuthenticated]);

  if (error) {
    return <CounsellingShell crumb=" / My Path" step="path"><div className="sc-error">{error}</div></CounsellingShell>;
  }
  if (!intake) {
    return (
      <CounsellingShell crumb=" / My Path" step="path">
        <div className="sc-skel" style={{ height: 46, maxWidth: 480, marginBottom: 16 }} />
        <div className="sc-skel" style={{ height: 210 }} />
      </CounsellingShell>
    );
  }

  if (!intake.is_complete) {
    return (
      <CounsellingShell crumb=" / My Path" step="path">
        <div className="sc-empty" style={{ maxWidth: 560, margin: "40px auto" }}>
          <div style={{ font: "700 16px 'Montserrat',sans-serif", color: "#0e1c0f", marginBottom: 8 }}>
            First, tell us where you're headed
          </div>
          Your path is built from your career profile — it takes two minutes.
          <div style={{ marginTop: 16 }}>
            <Link className="sc-btn" to="/counselling/profile">Complete my career profile →</Link>
          </div>
        </div>
      </CounsellingShell>
    );
  }

  const path = buildCareerPath(intake);

  return (
    <CounsellingShell crumb=" / My Path" step="path">
      <div className="sc-h2row" style={{ marginTop: 0 }}>
        <div>
          <h1 className="sc-h1">{path.headline}</h1>
          <p className="sc-sub" style={{ marginBottom: 0 }}>
            Built from your profile — {path.interests.length
              ? `interests: ${path.interests.slice(0, 3).join(", ")}${path.interests.length > 3 ? "…" : ""}`
              : "add interests to sharpen it"}.{" "}
            <Link to="/counselling/profile" style={{ color: "#1b9c85", fontWeight: 700 }}>Edit profile</Link>
          </p>
        </div>
        <Link className="sc-btn" to={counsellorsLive ? "/counselling/counsellors" : "/counselling/guides"}>
          {counsellorsLive ? "Find my counsellors →" : "All career guides →"}
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
        {path.paths.map((p) => (
          <div key={p.title} className="sc-card sc-path-card">
            <div style={{ font: "800 17px 'Montserrat',sans-serif", color: "#0e1c0f" }}>{p.title}</div>
            <div style={{ margin: "10px 0 4px", font: "700 11px 'Poppins',sans-serif", color: "rgba(14,28,15,.45)", textTransform: "uppercase", letterSpacing: ".05em" }}>
              Why it suits you
            </div>
            <ul className="sc-why" style={{ margin: "0 0 8px", paddingLeft: 18 }}>
              {p.why.map((w, i) => (
                <li key={i} style={{ font: "400 13px/1.65 'Poppins',sans-serif" }}>{w}</li>
              ))}
            </ul>
            <div style={{ font: "700 11px 'Poppins',sans-serif", color: "rgba(14,28,15,.45)", textTransform: "uppercase", letterSpacing: ".05em" }}>
              Suggested next steps
            </div>
            <ol className="sc-next">
              {p.nextSteps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </div>
        ))}
      </div>

      <div className="sc-h2row"><h2 className="sc-h2">Related career guides</h2></div>
      <div className="sc-grid3">
        {path.relatedGuides
          .map((slug) => guideIndex.find((g) => g.slug === slug))
          .filter(Boolean)
          .map((g) => <GuideCard key={g.slug} g={g} />)}
      </div>
    </CounsellingShell>
  );
}
