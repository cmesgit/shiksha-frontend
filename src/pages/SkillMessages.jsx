// PLACEMENT: src student/pages/SkillMessages.jsx
// ACTION:    Replace the entire file.
//            (This replaces the version from the student-side fix output.)
//
// Change from the previous version:
//   Also reads ?teacherProfileId= from the URL query string.
//   This handles the case where the user messages an expert from the landing
//   page (ExpertProfilePage or Profile.jsx inside SkillDevelopment), which
//   redirects here after sending the first REST message. The query param
//   carries the TeacherProfile UUID so ChatPanel can immediately open the
//   live WS DM with that expert — the student lands in the right thread
//   without having to find it manually in the inbox.
//
//   Priority: router state (state.teacherId) wins over query param
//   (?teacherProfileId=), so normal in-app Message buttons still work.
//
// Route — inside RequireProfile / StudentLayout block in App.jsx (already added):
//   <Route path="skill-messages" element={<SkillMessages />} />

import { useLocation, useSearchParams } from "react-router-dom";
import ChatPanel from "../shared/ChatPanel";
import "../shared/ChatPanel.css";

export default function SkillMessages() {
  const { state } = useLocation();
  const [sp]      = useSearchParams();

  // Priority 1: router state from in-app Message buttons (SkillSessions)
  //   state.teacherId = TeacherProfile UUID
  // Priority 2: query param from landing page redirect (ExpertProfilePage / Profile)
  //   ?teacherProfileId=<TeacherProfile UUID>
  const teacherId = state?.teacherId || sp.get("teacherProfileId") || null;

  const directTo = teacherId
    ? { kind: "TEACHER", id: teacherId }
    : undefined;

  return (
    <div style={{ padding: "20px", height: "calc(100vh - 80px)", boxSizing: "border-box" }}>
      <ChatPanel directTo={directTo} />
    </div>
  );
}
