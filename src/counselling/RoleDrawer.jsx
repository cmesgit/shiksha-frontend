// PLACEMENT: src/counselling/RoleDrawer.jsx   (NEW FILE — landing/frontend app)
//
// Workflow §7a — the role-detail slide-over. Opens from any job role on the
// Career Detail page (Specialisations tab or Jobs & Salary tab) and can
// re-target itself from its own "Related roles" list.
//
// Everything here is derived from CAREER_FULL / CAREER_DETAIL content that
// is already on screen — there is no per-role data file. Where the branch
// supplies a real one-line description for the role we use it; the v3
// prototype threw that away and printed a generic "A role within X" instead,
// which wasted the best sentence it had.

import React, { useEffect } from "react";

export default function RoleDrawer({ role, career, onSelectRole, onClose, onFindCounsellor }) {
  // Esc to close — the drawer is a dialog and keyboard users expect it.
  useEffect(() => {
    if (!role) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [role, onClose]);

  if (!role) return null;

  const { detail, full, title: careerTitle } = career;
  const branch = role.branch || null;
  const named = !!(branch && branch.name && branch.name !== careerTitle);

  const pathSteps = [
    { label: "Complete Class 12", detail: career.streamLabel || "Any stream." },
    career.degrees.length && {
      label: "Pick a degree",
      detail: career.degrees.join(" or ") + (named ? `, specialising in ${branch.name}` : "") + ".",
    },
    career.examNames.length && {
      label: "Clear the entrance exam",
      detail: career.examNames.slice(0, 3).join(", ") + ".",
    },
    (detail?.certifications || []).length && {
      label: "Add certifications (optional, but valuable)",
      detail: detail.certifications.slice(0, 3).join(", ") + ".",
    },
    (detail?.progression || []).length && {
      label: "Grow into the role",
      detail: detail.progression.slice(0, 2).join(" → ") + ".",
    },
  ].filter(Boolean);

  const subjects = named ? (branch.subjects || []) : [];
  const recruiters = (detail?.topRecruiters || []).slice(0, 6);
  const related = (named ? (branch.roles || []).map((r) => r.title) : (detail?.jobRoles || []))
    .filter((t) => t !== role.title)
    .slice(0, 5);

  return (
    <div className="cf-drawer-mask" onClick={onClose}>
      <aside
        className="cf-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={role.title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="cf-drawer-head">
          <span className="cf-drawer-icon">{named ? (branch.icon || "💼") : "💼"}</span>
          <div>
            <div className="cf-drawer-kicker">{named ? `${branch.name} · ${careerTitle}` : careerTitle}</div>
            <h2 className="cf-drawer-title">{role.title}</h2>
          </div>
          <button className="cf-drawer-x" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="cf-drawer-body">
          <p className="cf-drawer-summary">
            {role.desc
              || (named
                ? `A role within ${branch.name}, one of the specialisations in ${careerTitle}.`
                : `A role within ${careerTitle}.`)}
          </p>

          {(named ? branch.demand : detail?.marketDemand) && (
            <div className="cf-kvrow">
              <div>
                <span className="cf-kvlabel">Demand</span>
                <span className="cf-kvvalue">{named ? branch.demand : detail.marketDemand}</span>
              </div>
              <div>
                <span className="cf-kvlabel">Typical salary</span>
                <span className="cf-kvvalue">{(named ? branch.salary : detail?.salaryFresher) || "—"}</span>
              </div>
            </div>
          )}

          {(named ? branch.about : full?.intro) && (
            <section className="cf-drawer-sec">
              <h3>What the work involves</h3>
              <p>{named ? branch.about : full.intro}</p>
            </section>
          )}

          {(full?.outlook || detail?.demandNote) && (
            <section className="cf-drawer-sec">
              <h3>Outlook</h3>
              <p>{full?.outlook || detail.demandNote}</p>
            </section>
          )}

          {pathSteps.length > 0 && (
            <section className="cf-drawer-sec">
              <h3>How to get there</h3>
              <ol className="cf-timeline">
                {pathSteps.map((s) => (
                  <li key={s.label}>
                    <strong>{s.label}</strong>
                    <span>{s.detail}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {subjects.length > 0 && (
            <section className="cf-drawer-sec">
              <h3>Core subjects</h3>
              <div className="sc-tags">{subjects.map((s) => <span key={s} className="sc-chip">{s}</span>)}</div>
            </section>
          )}

          {recruiters.length > 0 && (
            <section className="cf-drawer-sec">
              <h3>Who hires</h3>
              <div className="sc-tags">{recruiters.map((r) => <span key={r} className="sc-chip">{r}</span>)}</div>
            </section>
          )}

          {related.length > 0 && (
            <section className="cf-drawer-sec">
              <h3>Related roles</h3>
              <div className="cf-related">
                {related.map((t) => (
                  <button
                    key={t}
                    className="cf-related-btn"
                    onClick={() => onSelectRole({ title: t, desc: "", branch })}
                  >
                    {t} →
                  </button>
                ))}
              </div>
            </section>
          )}

          <button className="sc-btn green cf-drawer-cta" onClick={onFindCounsellor}>
            Talk to a counsellor about this →
          </button>
        </div>
      </aside>
    </div>
  );
}
