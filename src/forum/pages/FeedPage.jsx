import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getThreads, getTopics } from "../../api/forum";
import QuestionCard from "../components/QuestionCard";
import GuestBanner from "../components/GuestBanner";
import { FEED_TABS } from "../utils";

export default function FeedPage() {
  const [params, setParams] = useSearchParams();
  const activeTopic = params.get("topic") || "";
  const [tab, setTab] = useState("foryou");
  const [topics, setTopics] = useState([]);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 8;

  useEffect(() => { getTopics().then((d) => setTopics(d.topics || [])).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    const sort = FEED_TABS.find((t) => t.id === tab)?.sort || "foryou";
    const q = { sort, page, page_size: PAGE_SIZE };
    if (activeTopic) q.topic = activeTopic;
    getThreads(q)
      .then((d) => {
        setCount(d.count || 0);
        setItems((prev) => (page === 1 ? d.results || [] : [...prev, ...(d.results || [])]));
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [tab, page, activeTopic]);

  const changeTab = (id) => { setTab(id); setPage(1); };
  const selectTopic = (t) => {
    setPage(1);
    setParams(activeTopic === t ? {} : { topic: t });
  };

  return (
    <div>
      <GuestBanner />

      <div className="fm-tabs">
        {FEED_TABS.map((t) => (
          <button key={t.id} className={`fm-tab${tab === t.id ? " active" : ""}`} onClick={() => changeTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {topics.length ? (
        <div className="fm-topics">
          {activeTopic ? (
            <button className="fm-chip on" onClick={() => selectTopic(activeTopic)}>#{activeTopic} ✕</button>
          ) : null}
          {topics.filter((t) => t !== activeTopic).slice(0, 10).map((t) => (
            <button key={t} className="fm-chip" onClick={() => selectTopic(t)}>{t}</button>
          ))}
        </div>
      ) : null}

      {loading && page === 1 ? (
        <div className="fm-loading">Loading questions…</div>
      ) : items.length === 0 ? (
        <div className="fm-empty">
          <h4>No questions yet</h4>
          <p>{activeTopic ? `No questions tagged #${activeTopic} yet. Be the first to ask.` : "Be the first to ask a question or share a post."}</p>
        </div>
      ) : (
        <>
          {items.map((q) => <QuestionCard key={q.id} q={q} />)}
          {items.length < count ? (
            <div className="fm-pager">
              <button onClick={() => setPage((p) => p + 1)} disabled={loading}>{loading ? "Loading…" : "Load more"}</button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
