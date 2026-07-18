import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { getExploreAnalytics } from "../api/exploreModeration";
import ReportedDocuments from "./ReportedDocuments";
import DuplicateReview from "./DuplicateReview";
import UploaderManagement from "./UploaderManagement";
import Analytics from "./Analytics";
import Navbar from "../components/Navbar";
import "./ExploreModerator.css";

// Panel matching "ShikshaCom Explore Moderation.html", merged into the site
// body: it renders the shared site <Navbar /> (same integration the forum and
// /moderator use) instead of the old standalone marquee + brand bar, followed
// by the design's dark hero (breadcrumb + title + stat pills). Sections mirror
// the design: Reported Documents · Duplicate Review · Uploader Management ·
// Analytics. Gated (route + backend) on documents.moderate.

const SECTIONS = [
  { id: "reports", label: "Reported Documents", badge: true },
  { id: "duplicates", label: "Duplicate Review", badge: true },
  { id: "uploaders", label: "Uploader Management" },
  { id: "analytics", label: "Analytics" },
];

const RULES = [
  "Verify copyright & authorship",
  "Remove plagiarised uploads",
  "Document every decision",
  "Escalate DMCA claims",
  "Protect uploader privacy",
];

const ExploreModeratorPanel = () => {
  const { showToast } = useToast();
  const [section, setSection] = useState("reports");
  const [counts, setCounts] = useState({ reports: 0, duplicates: 0 });
  const [stats, setStats] = useState({ reported_docs: 0, duplicate_uploads: 0 });
  const [month, setMonth] = useState({});

  const refresh = useCallback(() => {
    getExploreAnalytics().then((d) => {
      if (d?.header_stats) setStats(d.header_stats);
      if (d?.this_month) setMonth(d.this_month);
    });
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const onAction = useCallback((message) => {
    showToast({ message });
    refresh();
  }, [refresh, showToast]);

  const MONTH_ROWS = [
    ["Reports resolved", month.reports_resolved],
    ["Uploads published", month.uploads_published],
    ["Uploaders warned", month.uploaders_warned],
    ["Uploaders suspended", month.uploaders_suspended],
    ["Uploaders banned", month.uploaders_banned],
  ];

  return (
    <div className="em2">
      <Navbar />

      <div className="em2-hero">
        <div className="em2-crumb">
          <Link to="/">ShikshaCom</Link> <b>›</b> <Link to="/explore">Explore</Link> <b>›</b> Moderation
        </div>
        <h1>Explore Moderation</h1>
        <p>Review reported documents · verify uploads · manage uploaders · keep the library trustworthy</p>
        <div className="em2-pills">
          <div className="em2-pill"><b>{stats.reported_docs ?? 0}</b><span>reported docs</span></div>
          <div className="em2-pill warn"><b>{stats.duplicate_uploads ?? 0}</b><span>duplicate uploads</span></div>
        </div>
      </div>

      <div className="em2-wrap">
        <div className="em2-layout">
          <aside className="em2-side">
            <div className="em2-card">
              <div className="em2-side-hd">Sections</div>
              <div className="em2-secnav">
                {SECTIONS.map((s) => (
                  <button key={s.id} className={`em2-secitem${section === s.id ? " active" : ""}`}
                          onClick={() => setSection(s.id)}>
                    <span>{s.label}</span>
                    {s.badge && counts[s.id] > 0 && <span className="cnt">{counts[s.id]}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="em2-card">
              <div className="em2-side-hd">This month</div>
              <div className="em2-month">
                {MONTH_ROWS.map(([label, value]) => (
                  <div className="em2-month-row" key={label}>
                    <span>{label}</span><b>{value ?? 0}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="em2-card">
              <div className="em2-side-hd">Mod guidelines</div>
              <div className="em2-rules">
                {RULES.map((r, i) => (
                  <div className="em2-rule" key={i}>
                    <span className="n">{i + 1}.</span><span className="t">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="em2-main">
            <h2 className="em2-section-title">
              {SECTIONS.find((s) => s.id === section)?.label}
            </h2>
            {section === "reports" && (
              <ReportedDocuments
                onCount={(n) => setCounts((c) => ({ ...c, reports: n }))}
                onAction={onAction} />
            )}
            {section === "duplicates" && (
              <DuplicateReview
                onCount={(n) => setCounts((c) => ({ ...c, duplicates: n }))}
                onAction={onAction} />
            )}
            {section === "uploaders" && <UploaderManagement onAction={onAction} />}
            {section === "analytics" && <Analytics />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExploreModeratorPanel;
