/* availability.js — shared weekly-availability store for Skill Dev (ESM).
   ────────────────────────────────────────────────────────────────
   Same store the standalone "Teacher Profile final.html" used (window.SDAvail),
   re-exported as an ES module so the React profile can import it directly:

       import { SDAvail } from "./availability";

   It is purely client-side (localStorage). The Django backend has no
   availability model yet, so the weekly grid is presentational + a place to
   pick a slot when requesting a session. When you add an availability API,
   swap `get()` for a fetch and `book()` for a POST — the component reads only
   through this object, so its markup never changes.

   Slot key format: "<dayIndex>-<slotIndex>"  (e.g. "3-1"). */

// Mon–Sat of the CURRENT week with real date numbers, e.g. ["Mon 23", ...].
// Must line up with the student app + backend _SLOT_HOURS [9,11,14,16,18,20].
function mondayOfThisWeek() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // back up to Monday
  return d;
}
const DAYS = (() => {
  const m = mondayOfThisWeek();
  const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return names.map((n, i) => {
    const d = new Date(m);
    d.setDate(m.getDate() + i);
    return `${n} ${d.getDate()}`;
  });
})();
const SLOTS = ["9 AM", "11 AM", "2 PM", "4 PM", "6 PM", "8 PM"];

// Must line up with _SLOT_HOURS in the backend: [9,11,14,16,18,20].
const SLOT_HOURS = [9, 11, 14, 16, 18, 20];

// Mon=0..Sat=5 index of "today" in this Mon–Sat grid (Sun -> 6, off-grid).
function todayIdx() { return (new Date().getDay() + 6) % 7; }

// True when a slot key belongs to a day/hour of the CURRENT week that has
// already elapsed. The grid shows this week's real dates, but the backend
// silently rolls a past slot forward to next week's occurrence — so a past
// slot must be shown as unavailable rather than a clickable "open" that lies
// about which date it books.
function isPast(k) {
  const [di, si] = String(k).split("-").map(Number);
  const t = todayIdx();
  if (di < t) return true;                              // earlier weekday
  if (di === t) return new Date().getHours() >= SLOT_HOURS[si]; // today, past hour
  return false;
}

// Deterministic default open pattern so each teacher looks different.
function defaultOpen(tid) {
  const out = [];
  DAYS.forEach((d, di) => SLOTS.forEach((sl, si) => {
    if (((tid * 7 + di * 3 + si * 5) % 4) !== 0) out.push(di + "-" + si);
  }));
  return out;
}
function defaultBooked(tid) {
  const o = defaultOpen(tid);
  return o.length ? [o[0]] : [];
}

// Teacher ids are UUID strings once wired; hash them to a stable small int so
// the deterministic seed still works for any id shape.
function seed(tid) {
  if (typeof tid === "number") return tid;
  const s = String(tid);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 9973;
  return (h % 9) + 1;
}

const KEY = (tid) => "sd_avail_" + tid;

function load(tid) {
  const sd = seed(tid);
  try {
    const raw = localStorage.getItem(KEY(tid));
    if (raw) { const o = JSON.parse(raw); return { open: o.open || [], booked: o.booked || [] }; }
  } catch (e) {}
  return { open: defaultOpen(sd), booked: defaultBooked(sd) };
}
function save(tid, data) { try { localStorage.setItem(KEY(tid), JSON.stringify(data)); } catch (e) {} }

function get(tid) { return load(tid); }

function status(tid, k) {
  const d = load(tid);
  if (d.booked.includes(k)) return "booked";
  if (d.open.includes(k)) return "open";
  return "closed";
}

function toggleOpen(tid, k) {
  const d = load(tid);
  if (d.booked.includes(k)) return d;
  d.open = d.open.includes(k) ? d.open.filter(x => x !== k) : [...d.open, k];
  save(tid, d);
  return d;
}

function book(tid, k) {
  const d = load(tid);
  if (!d.open.includes(k)) d.open = [...d.open, k];
  if (!d.booked.includes(k)) d.booked = [...d.booked, k];
  save(tid, d);
  return d;
}

function label(k) {
  const [di, si] = k.split("-").map(Number);
  return DAYS[di] + " · " + SLOTS[si];
}

export const SDAvail = { DAYS, SLOTS, SLOT_HOURS, get, status, toggleOpen, book, label, isPast, KEY };

// Also attach to window so any legacy code that reads window.SDAvail still works.
if (typeof window !== "undefined") window.SDAvail = SDAvail;

export default SDAvail;
