import React, { useEffect, useState } from "react";
import { getSaved } from "../../api/forum";
import QuestionCard from "../components/QuestionCard";

export default function SavedPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSaved().then((d) => setItems(d.results || [])).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div><h1 className="fm2-h1">Saved</h1><p className="fm2-sub">Questions and posts you've bookmarked.</p></div>
      {loading ? <div className="fm2-empty-card">Loading…</div> : items.length === 0 ? (
        <div className="fm2-empty-card">Nothing saved yet. Bookmark any question to keep it here.</div>
      ) : <div className="fm2-feed-scroll">{items.map((q) => <QuestionCard key={q.id} q={q} />)}</div>}
    </div>
  );
}
