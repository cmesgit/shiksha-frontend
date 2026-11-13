// ─────────────────────────────────────────────────────────────────────────────
// src/explore/MyLibraryPage.jsx   —   /explore/dashboard
//
// "My Library." Sets you save from Browse are kept here.
// Spec: design_handoff_explore_verification/README.md §8.
//
// ⚠ This REPLACED a six-tab dashboard (Overview, Reading History, My Uploads,
// Saved, Following, Collections). The owner chose the design's simpler page on
// 2026-11-12 knowing it drops four tabs. What was dropped is the SCREEN, not
// the data or the routes:
//
//   * DashboardPage.jsx is still on disk, unchanged — restoring it is one line
//     in App.jsx.
//   * ExploreStore.jsx still records reading history, follows and likes, so
//     nothing stops being collected and the decision stays reversible.
//   * /explore/collections, /explore/collections/:id and /explore/author/:id
//     are still routed and still linked from here.
//   * My Uploads moved rather than vanished — it is the Verify page's
//     "My uploads" tab, which also shows each upload's verification status
//     and the reviewer's note. The design's own cross-link says so, and this
//     page repeats it.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useExplore } from "./ExploreStore";
import { getDocumentsByIds } from "./exploreApi";
import { DocCard, Loading } from "./components/ui";
import { verificationEnabled } from "./verificationApi";
import "./Explore.css";
import "./Verification.css";

export default function MyLibraryPage() {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const { lib } = useExplore();
  const [docs, setDocs] = useState(null);
  const [failed, setFailed] = useState(false);
  const [verifyOn, setVerifyOn] = useState(false);

  const savedIds = lib?.saved || [];
  const key = savedIds.join(",");

  const load = useCallback(() => {
    if (!savedIds.length) { setDocs([]); setFailed(false); return; }
    getDocumentsByIds(savedIds)
      .then((rows) => { setDocs(rows || []); setFailed(false); })
      /* ⚠ Not `setDocs([])`. An outage and an empty library look identical to
         a reader otherwise, and "Nothing saved yet" is reassuring in a way a
         failed request should not be — the admin.js safe() lesson. */
      .catch(() => { setDocs(null); setFailed(true); });
    // savedIds is rebuilt each render; `key` is its stable identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(load, [load]);
  useEffect(() => {
    let live = true;
    verificationEnabled().then((on) => live && setVerifyOn(on));
    return () => { live = false; };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="exp"><div className="exp-wrap exp-in">
        <h1 className="exp-secttitle">My Library</h1>
        <div className="exp-empty">
          <p>Sign in to keep sets you find in Browse.</p>
          <button className="exp-btn exp-btn-primary"
            onClick={() => nav("/login?next=/explore/dashboard")}>Log in</button>
        </div>
      </div></div>
    );
  }

  return (
    <div className="exp">
      <div className="exp-wrap exp-in">
        <h1 className="exp-secttitle">My Library</h1>
        <p className="exp-sub" style={{ marginBottom: 22 }}>
          Sets you save from Browse are kept here.
        </p>

        {failed && (
          <div className="exp-empty" role="alert">
            <p>Couldn’t load your library.</p>
            <button className="exp-btn exp-btn-ghost" onClick={load}>Try again</button>
          </div>
        )}

        {!failed && docs === null && <Loading />}

        {!failed && docs !== null && docs.length === 0 && (
          <div className="exp-empty">
            <h3>Nothing saved yet</h3>
            <p>Open a set in Browse and choose Save to My Library.</p>
            <button className="exp-btn exp-btn-primary"
              onClick={() => nav("/explore/browse")}>Browse the library</button>
          </div>
        )}

        {!failed && docs !== null && docs.length > 0 && (
          <div className="exp-docgrid">
            {docs.map((d) => <DocCard key={d.id} doc={d} />)}
          </div>
        )}

        <p className="exp-sub" style={{ marginTop: 26 }}>
          {verifyOn ? (
            <>
              Your own uploads and their verification status are under{" "}
              <button type="button" className="exp-inlinelink"
                onClick={() => nav("/explore/verify?tab=uploads")}>Verify</button>
              , on the My uploads tab.
            </>
          ) : (
            <>
              Looking for something you uploaded? It is in{" "}
              <button type="button" className="exp-inlinelink"
                onClick={() => nav("/explore/browse?mine=1")}>Browse</button>.
            </>
          )}
          {" "}Your collections are under{" "}
          <button type="button" className="exp-inlinelink"
            onClick={() => nav("/explore/collections")}>Collections</button>.
        </p>
      </div>
    </div>
  );
}
