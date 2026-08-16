/* ProfilePickerIllustration.jsx — a small decorative header for the "who's
   learning?" switchboard, using illustration fragments from the ShikshaCom
   signup/login handoff that never made it into the shipped app: books,
   apple and pencil (reference/IntroAnimation.dc.html — an earlier draft of
   the signup illustration, superseded by IntroAnimationC but never deleted
   from the asset bundle). ProfilePicker itself isn't part of that handoff,
   so this is a new, modest composition rather than a port of an existing
   screen — one static "pick up your studies" vignette, gently idling,
   rather than the auth pages' multi-beat cycling narratives (there's no
   role/step story here to cycle through). */
import PARTS from "../auth/illoParts.js";
import "./ProfilePickerIllustration.css";

/* Anchor = the point inside each fragment that place() pins, taken from the
   original design (reference/IntroAnimation.dc.html's own ANCHOR map) —
   these are intrinsic to the artwork, not something this composition invents. */
const ANCHOR = {
  books:  [265, 435],
  apple:  [89, 392],
  pencil: [371, 404],
};

function place(name, x, y, s, { flip = false } = {}) {
  const a = ANCHOR[name];
  return {
    transform: `translate(${x}px, ${y}px) scale(${s})${flip ? " scale(-1,1)" : ""} translate(${-a[0]}px, ${-a[1]}px)`,
    transformOrigin: "0 0",
  };
}

function Part({ name }) {
  const html = PARTS[name];
  if (!html) return null;
  return <g dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function ProfilePickerIllustration() {
  return (
    <div className="pp-illo">
      <svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <ellipse cx="150" cy="128" rx="92" ry="12" fill="#0f9d6b" opacity=".1" />

        <g style={place("books", 150, 123, 0.31)}>
          <g className="pp-illo__settle"><Part name="books" /></g>
        </g>
        <g style={place("apple", 96, 77, 0.6)}>
          <g className="pp-illo__float"><Part name="apple" /></g>
        </g>
        <g style={place("pencil", 208, 69, 0.56, { flip: true })}>
          <g className="pp-illo__float-slow"><Part name="pencil" /></g>
        </g>
      </svg>
    </div>
  );
}
