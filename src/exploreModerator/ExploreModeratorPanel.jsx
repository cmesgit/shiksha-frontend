import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { getExploreAnalytics } from "../api/exploreModeration";
import ReportedDocuments from "./ReportedDocuments";
import DuplicateReview from "./DuplicateReview";
import UploaderManagement from "./UploaderManagement";
import Analytics from "./Analytics";
import logo from "../assets/Shiksha.png";
import "./ExploreModerator.css";

// Standalone panel matching "ShikshaCom Explore Moderation.html". Renders its
// own chrome (no marketing <Page> wrapper) — same precedent as /moderator.
// Sections mirror the design: Reported Documents · Duplicate Review ·
// Uploader Management · Analytics. Gated (route + backend) on documents.moderate.

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

const initialsOf = (s) => {
  const parts = String(s || "").replace(/[^a-zA-Z ]/g, " ").split(" ").filter(Boolean);
  if (!parts.length) return "MO";
  return ((parts[0][0] || "") + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
};

const ExploreModeratorPanel = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
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

  const name = user?.username || "Moderator";
  const initials = initialsOf(user?.username || user?.email);

  const MONTH_ROWS = [
    ["Reports resolved", month.reports_resolved],
    ["Uploads published", month.uploads_published],
    ["Uploaders warned", month.uploaders_warned],
    ["Uploaders suspended", month.uploaders_suspended],
    ["Uploaders banned", month.uploaders_banned],
  ];

  return (
    <div className="em2">
      <div className="em2-topstrip">
        <span>Review reported documents · verify uploads · keep the library trustworthy.</span>
        <span className="em2-blink">|</span>
        <span>Protect students from plagiarism, copyright abuse and fraudulent material.</span>
      </div>

      <header className="em2-header">
        <div className="em2-brand" onClick={() => navigate("/explore")} role="button" tabIndex={0}>
          <img className="em2-logo" src={logo} alt="ShikshaCom" />
          <div>
            <h1 className="em2-brand-name">ShikshaCom</h1>
            <p className="em2-brand-tag">Explore Moderation</p>
          </div>
        </div>
        <div className="em2-hright">
          <div className="em2-modbadge">
            <span className="av">{initials}</span>
            <span className="nm">{name}</span>
          </div>
          <Link to="/explore" className="em2-back">← Back to Explore</Link>
        </div>
      </header>

      <div className="em2-hero">
        <div className="em2-crumb">ShikshaCom <b>›</b> Explore <b>›</b> Moderation</div>
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

      <footer className="em2-footer">
        <div className="em2-footer-inner">
          <div>
            <h4>EXPLORE MODERATION</h4>
            <div className="tag">Keep the ShikshaCom document library safe, original and trustworthy for every student.</div>
          </div>
          <div>
            <div className="col-hd">Panel</div>
            {SECTIONS.map((s) => (
              <span className="lnk" key={s.id} onClick={() => setSection(s.id)}>{s.label}</span>
            ))}
          </div>
          <div>
            <div className="col-hd">Resources</div>
            <span className="lnk">Content Policy</span>
            <span className="lnk">Copyright / DMCA</span>
            <span className="lnk">Ban Appeals</span>
          </div>
        </div>
        <div className="em2-footer-note">© 2026 ShikshaCom · Explore Moderation · For internal use only</div>
      </footer>
    </div>
  );
};

export default ExploreModeratorPanel;
