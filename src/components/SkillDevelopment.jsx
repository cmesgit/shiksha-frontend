/* SkillDevelopment.jsx — Skill Development feature host.
   ────────────────────────────────────────────────────────────────
   Drops into the existing /skill-development route (App.jsx). Renders
   the site Navbar + Footer like the other standalone pages, and hosts
   the whole feature behind internal navigation so it needs NO new
   routes. If you later prefer real URLs, lift `screen` into route
   params — every screen already navigates through the single nav() fn. */
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/SkillDevelopment.css";

import Hub from "./skill/Hub";
import { RoleChooser, StudentSignup, TeacherSignup } from "./skill/Register";
import Discovery from "./skill/Discovery";
import Profile from "./skill/Profile";
import { PaymentScreen, SessionConfirmed, SessionRoom } from "./skill/Booking";
import { ApplicationStatus, ScheduleInterview, InterviewRoom, InterviewResult, ReviewerQueue } from "./skill/Screening";

export default function SkillDevelopment() {
  const [screen, setScreen] = useState("hub");
  const [activeTeacher, setActiveTeacher] = useState(null);
  const [sessionDraft, setSessionDraft] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [interview, setInterview] = useState({});
  const [candidate, setCandidate] = useState(null);
  const [reviewedId, setReviewedId] = useState(null);
  const [initialSkill, setInitialSkill] = useState("all");

  const nav = (s, extra = {}) => {
    if (extra.teacher) setActiveTeacher(extra.teacher);
    if (extra.skill !== undefined) setInitialSkill(extra.skill);
    if (extra.sessionDraft) setSessionDraft(extra.sessionDraft);
    if (extra.applicant) setApplicant(extra.applicant);
    if (extra.interview) setInterview(iv => ({ ...iv, ...extra.interview }));
    if (extra.candidate) setCandidate(extra.candidate);
    if (extra.reviewed) setReviewedId(extra.reviewed);
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      <Navbar />

      {/* Scope all feature styling/tokens here so the .sd-root font/color
          can't cascade into the shared Navbar / Footer. */}
      <div className="sd-root" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Breadcrumb screen={screen} teacher={activeTeacher} nav={nav} />

        <div style={{ flex: 1 }}>
          {screen === "hub" && <Hub nav={nav} />}
        {screen === "join" && <RoleChooser nav={nav} />}
        {screen === "student" && <StudentSignup nav={nav} />}
        {screen === "teacher" && <TeacherSignup nav={nav} />}
        {screen === "discovery" && <Discovery nav={nav} initialSkill={initialSkill} />}
        {screen === "profile" && activeTeacher && (
          <Profile t={activeTeacher} nav={nav} />
        )}

        {/* Booking */}
        {screen === "payment" && activeTeacher && sessionDraft && <PaymentScreen t={activeTeacher} draft={sessionDraft} nav={nav} />}
        {screen === "session-confirmed" && activeTeacher && sessionDraft && <SessionConfirmed t={activeTeacher} draft={sessionDraft} nav={nav} />}
        {screen === "session-room" && activeTeacher && sessionDraft && <SessionRoom t={activeTeacher} draft={sessionDraft} nav={nav} />}

        {/* Screening — applicant */}
        {screen === "application-status" && <ApplicationStatus applicant={applicant} interview={interview} nav={nav} />}
        {screen === "schedule-interview" && <ScheduleInterview nav={nav} />}
        {screen === "interview-room" && <InterviewRoom mode="applicant" applicant={applicant} interview={interview} nav={nav} />}
        {screen === "interview-result" && <InterviewResult applicant={applicant} nav={nav} />}

        {/* Screening — admin */}
        {screen === "reviewer-queue" && <ReviewerQueue nav={nav} reviewed={reviewedId} />}
        {screen === "interview-panel" && <InterviewRoom mode="reviewer" candidate={candidate} nav={nav} />}
      </div>

      </div>

      <Footer />
    </div>
  );
}

function Breadcrumb({ screen, teacher, nav }) {
  const crumbs = [{ key: "hub", label: "Skill Development" }];
  if (["join", "student", "teacher"].includes(screen)) crumbs.push({ key: "join", label: "Join" });
  if (screen === "student") crumbs.push({ key: null, label: "Student registration" });
  if (screen === "teacher") crumbs.push({ key: null, label: "Teacher registration" });
  if (screen === "discovery") crumbs.push({ key: null, label: "Find teachers" });
  if (screen === "profile") { crumbs.push({ key: "discovery", label: "Find teachers" }); crumbs.push({ key: null, label: teacher?.name || "Profile" }); }
  if (screen === "payment") { crumbs.push({ key: "discovery", label: "Find teachers" }); crumbs.push({ key: null, label: "Confirm & pay" }); }
  if (screen === "session-confirmed") crumbs.push({ key: null, label: "Session booked" });
  if (screen === "session-room") crumbs.push({ key: null, label: `Live with ${teacher?.name?.split(" ")[0] || "teacher"}` });
  if (["application-status", "schedule-interview", "interview-room", "interview-result"].includes(screen)) crumbs.push({ key: "application-status", label: "My application" });
  if (screen === "schedule-interview") crumbs.push({ key: null, label: "Schedule interview" });
  if (screen === "interview-room") crumbs.push({ key: null, label: "Screening interview" });
  if (screen === "interview-result") crumbs.push({ key: null, label: "Result" });
  if (["reviewer-queue", "interview-panel"].includes(screen)) crumbs.push({ key: "reviewer-queue", label: "Reviewer console" });
  if (screen === "interview-panel") crumbs.push({ key: null, label: "Interview panel" });

  if (screen === "hub") return null;
  return (
    <div className="sd-crumbs">
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ opacity: .45 }}>›</span>}
          {c.key ? <button onClick={() => nav(c.key)}>{c.label}</button>
            : <span style={{ color: "var(--c-forest)", fontWeight: 600 }}>{c.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
