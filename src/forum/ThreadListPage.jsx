// PLACEMENT: src/forum/ThreadListPage.jsx   (REPLACE THE WHOLE FILE — landing/frontend app)
//
// Forum home from the approved design: search bar → category grid (real
// Tags from /forum/tags/) → Discussions feed with filter chips + trending
// rail → windowed pager. Wired to the existing endpoints:
//   GET /forum/threads/?search=&tag=&sort=newest|oldest|popular&page=&page_size=
//   GET /forum/tags/
// Design chips map to real backend sorts (Recent→newest, Popular→popular,
// Oldest→oldest). Unanswered/Solved chips from the design need backend
// filters that don't exist yet — deliberately left out rather than faked
// client-side on one page of data.

import React, { useEffect, useMemo, useState } from "react";
import { getThreads, getTags } from "../api/forum";
import ThreadCard from "./ThreadCard";
import ForumShell, { GuestBanner } from "./ForumShell";
import { fmtNum, tagColor, titleCase } from "./utils";

const PAGE_SIZE = 10;
const FILTERS = [
  ["newest", "Recent", "Newest questions first"],
  ["popular", "Popular", "Most upvoted questions"],
  ["oldest", "Oldest", "From the very beginning"],
];

function Pager({ page, pageCount, onPage }) {
  if (pageCount <= 1) return null;
  const items = [];
  let prev = 0;
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) {
      if (p - prev > 1) items.push({ dots: true, key: `d${p}` });
      items.push({ p, key: p });
      prev = p;
    }
  }
  return (
    <div className="sfr-pager">
      <button className="sfr-pagebtn" disabled={page === 1} onClick={() => onPage(page - 1)} aria-label="Previous page">‹</button>
      {items.map((it) =>
        it.dots ? (
          <span key={it.key} className="sfr-pagedots">…</span>
        ) : (
          <button
            key={it.key}
            className={`sfr-pagebtn${it.p === page ? " active" : ""}`}
            onClick={() => onPage(it.p)}
          >
            {it.p}
          </button>
        )
      )}
      <button className="sfr-pagebtn" disabled={page === pageCount} onClick={() => onPage(page + 1)} aria-label="Next page">›</button>
    </div>
  );
}

export default function ThreadListPage() {
  const [threads, setThreads] = useState([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sort, setSort] = useState("newest");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    getTags().then(setTags).catch(() => {});
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getThreads({
      search: debounced || undefined,
      tag: tag || undefined,
      sort,
      page,
      page_size: PAGE_SIZE,
    })
      .then((data) => {
        if (!mounted) return;
        setThreads(data.results || []);
        setCount(data.count || 0);
      })
      .catch(() => mounted && setThreads([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [debounced, sort, tag, page]);

  const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const filterDesc = (FILTERS.find(([k]) => k === sort) || FILTERS[0])[2];
  const trending = useMemo(
    () => [...threads].sort((a, b) => (b.reply_count ?? 0) - (a.reply_count ?? 0)).slice(0, 3),
    [threads]
  );

  const pickTag = (name) => {
    setTag((cur) => (cur === name ? "" : name));
    setPage(1);
    window.scrollTo(0, 0);
  };

  return (
    <ForumShell crumb="">
      <div className="sfr-view">
        <GuestBanner />

        {/* search */}
        <div className="sfr-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(14,28,15,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            placeholder="Search threads by title or content…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* category (tag) grid */}
        {tags.length > 0 && (
          <>
            <div className="sfr-h2row">
              <h2 className="sfr-h2">Categories</h2>
              <span className="sfr-h2note">{tags.length} {tags.length === 1 ? "board" : "boards"}</span>
            </div>
            <div className="sfr-cats">
              {tags.map((t) => {
                const c = tagColor(t.name);
                return (
                  <button
                    key={t.id}
                    className={`sfr-cat sfr-reset${tag === t.name ? " active" : ""}`}
                    onClick={() => pickTag(t.name)}
                  >
                    <div className="sfr-cat-glyph" style={{ background: c.tint, color: c.color }}>
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="sfr-cat-name">{titleCase(t.name)}</div>
                    <div className="sfr-cat-meta">{tag === t.name ? "Showing this board — tap to clear" : "Tap to browse"}</div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* feed + rail */}
        <div className="sfr-cols">
          <div>
            <div className="sfr-h2row">
              <h2 className="sfr-h2">
                Discussions{tag ? ` · ${titleCase(tag)}` : ""}
              </h2>
              <div className="sfr-chips">
                {FILTERS.map(([k, label]) => (
                  <button
                    key={k}
                    className={`sfr-chip${sort === k ? " active" : ""}`}
                    onClick={() => { setSort(k); setPage(1); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="sfr-feednote">
              <span>{filterDesc}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(14,28,15,.3)" }} />
              <span>{count ? `${fmtNum(count)} threads` : loading ? "" : "No threads yet"}</span>
            </div>

            {loading ? (
              <div className="sfr-loading">Loading discussions…</div>
            ) : threads.length === 0 ? (
              <div className="sfr-empty">
                {debounced || tag
                  ? "No threads match this view. Clear the search or category to see everything."
                  : "No discussions yet — start the first thread."}
              </div>
            ) : (
              <div className="sfr-feed">
                {threads.map((t) => (
                  <ThreadCard key={t.id} thread={t} onTagClick={pickTag} />
                ))}
              </div>
            )}

            <Pager page={page} pageCount={pageCount} onPage={(p) => { setPage(p); window.scrollTo(0, 0); }} />
          </div>

          <div className="sfr-rail">
            <div className="sfr-railcard">
              <h3 className="sfr-railtitle">Most discussed on this page</h3>
              {trending.length === 0 && <div className="sfr-railmeta">Nothing yet.</div>}
              {trending.map((t, i) => (
                <button
                  key={t.id}
                  className="sfr-railitem sfr-reset"
                  onClick={() => (window.location.href = `/forum/${t.id}`)}
                >
                  <span className="sfr-railrank">{i + 1}</span>
                  <span>
                    <span className="sfr-railtext">{t.title}</span>
                    <div className="sfr-railmeta">{fmtNum(t.reply_count ?? 0)} replies</div>
                  </span>
                </button>
              ))}
            </div>
            <div className="sfr-railcard">
              <h3 className="sfr-railtitle">House rules</h3>
              <div className="sfr-railmeta" style={{ lineHeight: 1.7 }}>
                Be kind and specific. Search before posting. One question per
                thread. Posts pass the same moderation gate as chat.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ForumShell>
  );
}
