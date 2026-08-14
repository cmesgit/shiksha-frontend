// ─────────────────────────────────────────────────────────────────────────────
// src/explore/exploreApi.js
//
// The data layer for the Explore (Scribd-style document hub) module.
//
// Right now every function resolves from the local seed in ./data/exploreSeed
// so the whole UI works with zero backend. Each function is async and shaped
// like a real network call, so when the backend lands you only touch THIS file
// — the components never change.
//
// To go live, flip USE_MOCK to false and implement the real branch of each
// function against your Django API. Suggested endpoints (documents app):
//   GET    /explore/facets/                      -> { categories, subjects, levels, languages, filetypes, sorts, dateRanges }
//   GET    /explore/landing/                     -> { featured, trending, recent, authors, collections }
//   GET    /explore/documents/?q=&category=&subject=&level=&language=&filetype=&date=&sort=&page=&page_size=
//   GET    /explore/documents/:id/               -> document (+ author, related, recommended)
//   GET    /explore/authors/:id/                 -> author (+ docs, collections)
//   GET    /explore/collections/                 -> [collection]
//   GET    /explore/collections/:id/             -> collection (+ docs)
//   POST   /explore/documents/:id/save/          -> { saved }
//   POST   /explore/authors/:id/follow/          -> { following }
//   POST   /explore/documents/:id/like/          -> { liked, likes }
//   POST   /explore/documents/:id/view/          -> { views }
//   POST   /explore/documents/                   -> created document (multipart upload)
//   POST   /explore/documents/:id/report/        -> { ok }
// ─────────────────────────────────────────────────────────────────────────────

import api from "../api/apiClient";
import {
  CATEGORIES, SUBJECTS, LEVELS, LANGUAGES, FILETYPES, SORTS, DATE_RANGES,
  AUTHORS, DOCUMENTS, COLLECTIONS, TYPE_META, DOC_TYPES_UPLOAD,
} from "./data/exploreSeed";

// Explore runs on the local seed until the backend `documents` app is
// deployed to the API this frontend points at. The reachable dev API
// (api.dev.shikshacom.com) now serves /explore/* (documents app deployed +
// migrated on dev, 2026-07-20), so Explore reads live DB-backed data. The dev
// library may be empty until documents are uploaded — pages degrade gracefully.
const USE_MOCK = false;

// Simulate network latency so loading states are exercised in dev.
const wait = (ms = 220) => new Promise((r) => setTimeout(r, ms));
const clone = (v) => JSON.parse(JSON.stringify(v));

// ── helpers over the seed ────────────────────────────────────────────────────
const authorById = (id) => AUTHORS.find((a) => a.id === id) || null;

// Attach the author object + type meta onto a document for the cards/reader.
function hydrateDoc(d) {
  if (!d) return null;
  return {
    ...clone(d),
    author: clone(authorById(d.authorId)),
    typeMeta: clone(TYPE_META[d.type] || {}),
  };
}

// Rough numeric value for a "12.4k" / "1.8k" string, used for sorting.
export function parseCount(v) {
  if (typeof v === "number") return v;
  const s = String(v || "").trim().toLowerCase();
  const n = parseFloat(s);
  if (Number.isNaN(n)) return 0;
  if (s.endsWith("k")) return n * 1_000;
  if (s.endsWith("m")) return n * 1_000_000;
  return n;
}

function sortDocs(list, sort) {
  const arr = [...list];
  switch (sort) {
    case "Latest":          arr.sort((a, b) => (a.date < b.date ? 1 : -1)); break;
    case "Most Viewed":     arr.sort((a, b) => parseCount(b.views) - parseCount(a.views)); break;
    case "Most Downloaded": arr.sort((a, b) => parseCount(b.downloads) - parseCount(a.downloads)); break;
    case "Trending":
    default:
      arr.sort((a, b) => (b.trending - a.trending) || (parseCount(b.views) - parseCount(a.views)));
  }
  return arr;
}

// Date-range filter against DATE_RANGES labels.
function withinRange(dateStr, range) {
  if (!range || range === "Any time") return true;
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return true;
  const now = Date.now();
  const day = 86_400_000;
  const map = {
    "Past 24 hours": day,
    "Past week": 7 * day,
    "Past month": 30 * day,
    "Past year": 365 * day,
  };
  const span = map[range];
  return span ? now - then <= span : true;
}

// ── facets (filter options) ──────────────────────────────────────────────────
export async function getFacets() {
  if (USE_MOCK) {
    await wait(80);
    return clone({
      categories: CATEGORIES, subjects: SUBJECTS, levels: LEVELS,
      languages: LANGUAGES, filetypes: FILETYPES, sorts: SORTS, dateRanges: DATE_RANGES,
      uploadTypes: DOC_TYPES_UPLOAD,
    });
  }
  const { data } = await api.get("/explore/facets/");
  return data;
}

// ── landing rails ─────────────────────────────────────────────────────────────
export async function getLanding() {
  if (USE_MOCK) {
    await wait();
    const docs = DOCUMENTS.map(hydrateDoc);
    return {
      categories: clone(CATEGORIES),
      trendChips: ["Machine Learning", "GATE", "Thermodynamics", "5G", "Economics", "NEET", "Blockchain"],
      featured: docs.filter((d) => d.featured),
      trending: sortDocs(docs.filter((d) => d.trending), "Trending"),
      recent: docs.filter((d) => d.recent),
      authors: AUTHORS.map((a) => clone(a)),
      collections: COLLECTIONS.map((c) => ({
        ...clone(c),
        curator: clone(authorById(c.curatorId)),
        count: c.docIds.length,
      })),
    };
  }
  const { data } = await api.get("/explore/landing/");
  return data;
}

// ── search / browse ───────────────────────────────────────────────────────────
// filters: { q, category, subject, level, language, filetype, date, sort }
export async function searchDocuments(filters = {}) {
  if (USE_MOCK) {
    await wait();
    const q = (filters.q || "").trim().toLowerCase();
    let list = DOCUMENTS.filter((d) => {
      if (filters.category && filters.category !== "All" && d.type !== filters.category) return false;
      if (filters.subject && filters.subject !== "All" && d.subject !== filters.subject) return false;
      if (filters.level && filters.level !== "All" && d.level !== filters.level) return false;
      if (filters.language && filters.language !== "All" && d.language !== filters.language) return false;
      if (filters.filetype && filters.filetype !== "All" && d.filetype !== filters.filetype) return false;
      if (!withinRange(d.date, filters.date)) return false;
      if (q) {
        const hay = [d.title, d.desc, d.subject, (d.tags || []).join(" "), authorById(d.authorId)?.name]
          .join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = sortDocs(list, filters.sort || "Trending").map(hydrateDoc);
    return { results: list, count: list.length };
  }
  const { data } = await api.get("/explore/documents/", { params: filters });
  return data; // { results, count }
}

// ── single document (+ related / recommended) ─────────────────────────────────
export async function getDocument(id) {
  if (USE_MOCK) {
    await wait();
    const doc = hydrateDoc(DOCUMENTS.find((d) => d.id === id));
    if (!doc) return null;
    const related = DOCUMENTS
      .filter((d) => d.id !== id && (d.type === doc.type || d.subject === doc.subject))
      .slice(0, 4).map(hydrateDoc);
    const recommended = DOCUMENTS
      .filter((d) => d.id !== id && d.authorId !== doc.authorId)
      .slice(0, 6).map(hydrateDoc);
    return { doc, related, recommended };
  }
  const { data } = await api.get(`/explore/documents/${id}/`);
  return data;
}

// ── author ────────────────────────────────────────────────────────────────────
export async function getAuthor(id) {
  if (USE_MOCK) {
    await wait();
    const author = authorById(id);
    if (!author) return null;
    const docs = DOCUMENTS.filter((d) => d.authorId === id).map(hydrateDoc);
    const collections = COLLECTIONS
      .filter((c) => c.curatorId === id)
      .map((c) => ({ ...clone(c), count: c.docIds.length }));
    return { author: clone(author), docs, collections };
  }
  const { data } = await api.get(`/explore/authors/${id}/`);
  return data;
}

// ── collections ────────────────────────────────────────────────────────────────
export async function listCollections() {
  if (USE_MOCK) {
    await wait();
    return COLLECTIONS.map((c) => ({
      ...clone(c),
      curator: clone(authorById(c.curatorId)),
      count: c.docIds.length,
    }));
  }
  const { data } = await api.get("/explore/collections/");
  return data;
}

export async function getCollection(id) {
  if (USE_MOCK) {
    await wait();
    const c = COLLECTIONS.find((x) => x.id === id);
    if (!c) return null;
    return {
      ...clone(c),
      curator: clone(authorById(c.curatorId)),
      docs: c.docIds.map((did) => hydrateDoc(DOCUMENTS.find((d) => d.id === did))).filter(Boolean),
    };
  }
  const { data } = await api.get(`/explore/collections/${id}/`);
  return data;
}

// ── document lookups used by the local library store ──────────────────────────
export async function getDocumentsByIds(ids = []) {
  if (USE_MOCK) {
    await wait(120);
    return ids.map((id) => hydrateDoc(DOCUMENTS.find((d) => d.id === id))).filter(Boolean);
  }
  const { data } = await api.get("/explore/documents/", { params: { ids: ids.join(",") } });
  return data.results || data;
}

// ── write actions (real endpoints; mock is a no-op that echoes) ────────────────
export async function saveDocument(id, saved) {
  if (USE_MOCK) { await wait(80); return { saved }; }
  const { data } = await api.post(`/explore/documents/${id}/save/`, { saved });
  return data;
}
export async function followAuthor(id, following) {
  if (USE_MOCK) { await wait(80); return { following }; }
  const { data } = await api.post(`/explore/authors/${id}/follow/`, { following });
  return data;
}
export async function likeDocument(id, liked) {
  if (USE_MOCK) { await wait(80); return { liked }; }
  const { data } = await api.post(`/explore/documents/${id}/like/`, { liked });
  return data;
}
export async function recordDownload(id) {
  if (USE_MOCK) { await wait(60); return { downloads: 0 }; }
  const { data } = await api.post(`/explore/documents/${id}/download/`);
  return data;
}
export async function reportDocument(id, payload) {
  if (USE_MOCK) { await wait(120); return { ok: true }; }
  const { data } = await api.post(`/explore/documents/${id}/report/`, payload);
  return data;
}
export async function uploadDocument(payload) {
  if (USE_MOCK) {
    await wait(300);
    // Echo a document-shaped object so the UI can show it immediately.
    return {
      id: "u" + Date.now(),
      title: payload.title,
      type: payload.category || "notes",
      subject: payload.subject || "General",
      level: "Undergraduate",
      language: payload.language || "English",
      filetype: payload.filetype || "PDF",
      date: new Date().toISOString().slice(0, 10),
      dateLabel: new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
      views: "0", downloads: "0", rating: 0, pages: 0,
      tags: (payload.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      desc: payload.description || "",
      full: payload.description || "",
    };
  }
  const form = new FormData();
  Object.entries(payload).forEach(([k, v]) => v != null && form.append(k, v));
  const { data } = await api.post("/explore/documents/", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
