import ScribbleIcon from "../icons/ScribbleIcon";
import "./heroLook.css";

/* Shared pieces of the "hero look" (forum, blogs, Explore), styled by
   heroLook.css. Both are decorative and hidden from assistive tech. */

// Dots, dashed ring and gold squiggle, borrowed from the homepage hero.
export function HeroDeco() {
  return (
    <div className="fh-deco" aria-hidden="true">
      <span className="fh-dots fh-a" />
      <span className="fh-dots fh-b" />
      <span className="fh-ring" />
      <span className="fh-squiggle">
        <svg viewBox="0 0 104 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 12c8-10 16-10 24 0s16 10 24 0 16-10 24 0 16 10 24 0" /></svg>
      </span>
    </div>
  );
}

/* The morphing blob with four floating cards. Kept abstract (skeleton lines,
   a status chip, an avatar stack) so it never reads as real content.

   cards: up to four entries, placed in fixed slots (fh-f1 … fh-f4):
     { icon, tone: "gold" | undefined, lines: 2 | 3 }  → icon + skeleton lines
     { icon, text }                                     → solid round icon + label
     { avatars: true, text }                            → avatar stack + label */
export function HeroVisual({ cards }) {
  return (
    <div className="fh-visual" aria-hidden="true">
      <span className="fh-blob" />
      {cards.slice(0, 4).map((c, i) => (
        <div key={i} className={`fh-float fh-f${i + 1}`}>
          {c.avatars ? (
            <span className="fh-avs"><b /><b /><b /></span>
          ) : c.text ? (
            <span className="fh-f-ic solid"><ScribbleIcon name={c.icon} size={18} /></span>
          ) : (
            <span className={`fh-f-ic${c.tone ? ` ${c.tone}` : ""}`}><ScribbleIcon name={c.icon} size={20} /></span>
          )}
          {c.text ? (
            <span className="fh-f-text">{c.text}</span>
          ) : (
            <span className="fh-f-lines">{Array.from({ length: c.lines || 2 }, (_, j) => <i key={j} />)}</span>
          )}
        </div>
      ))}
    </div>
  );
}
