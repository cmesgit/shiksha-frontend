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
    <div>
      <h1 className="fm-h1">Saved</h1>
      <p className="fm-sub">Questions and posts you've bookmarked.</p>
      {loading ? <div className="fm-loading">Loading…</div> : items.length === 0 ? (
        <div className="fm-empty"><h4>Nothing saved yet</h4><p>Bookmark any question to keep it here.</p></div>
      ) : items.map((q) => <QuestionCard key={q.id} q={q} />)}
    </div>
  );
}
