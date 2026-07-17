import { useEffect, useState } from "react";
import { getExploreAnalytics } from "../api/exploreModeration";
import { formatAgo } from "./helpers";

const LOG_META = {
  dismiss: ["ok", "Dismissed"], remove: ["bad", "Removed"], warn: ["warn", "Warned"],
  ban: ["bad", "Banned"], unban: ["ok", "Reinstated"], restore: ["ok", "Restored"],
  suspend: ["warn", "Suspended"], lock: ["warn", "Locked"], unlock: ["ok", "Unlocked"],
};

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    getExploreAnalytics().then((d) => alive && setData(d));
    return () => { alive = false; };
  }, []);

  if (!data) return <div className="em2-loading">Loading…</div>;

  const { kpis = [], reports_by_reason = [], recent_actions = [] } = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="em2-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="em2-kpi">
            <div className="v">{k.value}</div>
            <div className="l">{k.label}</div>
            {k.trend != null && (
              <div className={`tr ${k.trend >= 0 ? "up" : "down"}`}>
                {k.trend >= 0 ? "▲" : "▼"} {Math.abs(k.trend)}%
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="em2-card">
        <div className="em2-side-hd" style={{ marginBottom: 12 }}>Reports by reason (last 30 days)</div>
        <div className="em2-bars">
          {reports_by_reason.map((r) => (
            <div key={r.reason} className="em2-bar-row">
              <span className="lbl">{r.label}</span>
              <div className="em2-bar-track"><div className="em2-bar-fill" style={{ width: `${r.pct}%` }} /></div>
              <span className="num">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="em2-card">
        <div className="em2-side-hd" style={{ marginBottom: 6 }}>Recent moderator actions</div>
        <div className="em2-log">
          {recent_actions.length === 0 ? (
            <div className="em2-doc-meta" style={{ padding: "8px 0" }}>No actions recorded yet.</div>
          ) : recent_actions.map((a) => {
            const [type, label] = LOG_META[a.action] || ["ok", a.action];
            return (
              <div key={a.id} className="em2-log-row">
                <span className={`em2-log-pill ${type}`}>{label}</span>
                <div className="txt">
                  {a.target_user ? <>{label} <b>{a.target_user}</b></> : label}
                  {a.note ? <div className="sub">{a.note}</div> : null}
                </div>
                <span className="sub">{a.moderator} · {formatAgo(a.created_at)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
