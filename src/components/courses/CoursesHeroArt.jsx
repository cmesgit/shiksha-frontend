// PLACEMENT: src/components/courses/CoursesHeroArt.jsx
//
// The illustration inside the hero's dashed circle. Kept in its own file
// because the Freepik artwork is ~50KB of path data and would bury the actual
// logic in CoursesHero.jsx.
//
// TO USE THE EXACT ARTWORK FROM THE MOCK:
// Open CoursesHero.jsx, find `<div class="chero-art">` inside the MARKUP
// string, and copy the whole `<svg ...>…</svg>` that follows it. Paste it over
// the `<svg>` below. Two edits are needed because it's JSX, not HTML:
//   1. `stroke-width` → `strokeWidth`, `stroke-linecap` → `strokeLinecap`,
//      `stroke-linejoin` → `strokeLinejoin`, `fill-rule` → `fillRule`,
//      `clip-path` → `clipPath`, `stop-color` → `stopColor`
//   2. every `style="fill:#0F9D6B"` → `style={{ fill: '#0F9D6B' }}`
// A regex pass handles both: the artwork uses `style="…"` heavily, so it's
// worth running find-and-replace rather than doing it by hand.
//
// Easier alternative: skip the paste entirely and upload the artwork as a PNG
// or SVG in Admin-dashboard → Content → Home Content → "Courses Hero" → image.
// CoursesHero.jsx renders `block.img` in place of this component when present,
// so this file is only ever the fallback.
//
// Until then, the placeholder below ships — it's on-palette and sized to the
// same 500×500 viewBox, so swapping in the real artwork won't shift layout.

export default function CoursesHeroArt() {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      {/* device */}
      <rect x="118" y="86" width="230" height="330" rx="26" fill="#fff" stroke="#0B5B3E" strokeWidth="4" />
      <rect x="140" y="112" width="186" height="118" rx="16" fill="#0F9D6B" />
      <circle cx="233" cy="171" r="30" fill="#fff" />
      <path d="M225 158.5v25l21-12.5z" fill="#0F9D6B" />

      {/* lesson rows */}
      <rect x="140" y="252" width="118" height="12" rx="6" fill="#0B2E20" opacity=".82" />
      <rect x="140" y="276" width="186" height="9" rx="4.5" fill="#0B2E20" opacity=".14" />
      <rect x="140" y="294" width="150" height="9" rx="4.5" fill="#0B2E20" opacity=".14" />

      <rect x="140" y="322" width="186" height="34" rx="10" fill="#E7F6EE" />
      <circle cx="160" cy="339" r="9" fill="#0F9D6B" />
      <path d="M157 334.5v9l7.5-4.5z" fill="#fff" />
      <rect x="180" y="335" width="86" height="8" rx="4" fill="#0B5B3E" opacity=".45" />

      <rect x="140" y="366" width="186" height="34" rx="10" fill="#F6FAF7" />
      <circle cx="160" cy="383" r="9" fill="#0B2E20" opacity=".16" />
      <rect x="180" y="379" width="66" height="8" rx="4" fill="#0B2E20" opacity=".2" />

      {/* orbiting accents */}
      <circle cx="382" cy="150" r="30" fill="#FFB21D" opacity=".9" />
      <path d="M370 150h24M384 140l10 10-10 10" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="96" cy="300" r="24" fill="#3b82f6" opacity=".9" />
      <path d="M87 300l6 6 12-13" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="378" cy="322" r="16" fill="#0B5B3E" opacity=".18" />
      <circle cx="104" cy="152" r="11" fill="#0F9D6B" opacity=".28" />
    </svg>
  );
}
