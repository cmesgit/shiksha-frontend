import { useEffect, useRef } from "react";
import { useHomeContent } from "../../hooks/useHomeContent";

/* Section-scoped styles, ported from the design handoff's Cta.jsx — shared
   tokens (--coral, --coral-dark, etc.) and the .sec/.wrap/.eyebrow/.btn/.rv
   primitives come from ShikshaHome.css, imported once by the homepage
   composer. */
const css = `.btn-white{background:#fff;color:var(--coral-dark)}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 16px 32px rgba(0,0,0,.16)}
.cta{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--coral),var(--coral-dark));border-radius:30px;padding:clamp(46px,7vw,74px) 24px;text-align:center;color:#fff;box-shadow:0 30px 70px rgba(11,91,62,.32)}
.cta .eyebrow{color:#ffe1d5;justify-content:center}
.cta .eyebrow u{border-color:#ffe1d5}
.cta h2{color:#fff;font-size:clamp(30px,4.4vw,46px);font-weight:800}
.cta p{margin:16px auto 0;max-width:520px;color:rgba(255,255,255,.92);font-size:16px}
.cta-actions{margin-top:30px;display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
.cta .btn-out{background:transparent;color:#fff;border-color:rgba(255,255,255,.6)}
.cta .btn-out:hover{background:rgba(255,255,255,.14);transform:translateY(-2px)}
.cwm{position:absolute;opacity:.12;color:#fff}
.cwm.a{top:-26px;left:-6px;width:120px}
.cwm.b{bottom:-36px;right:-6px;width:140px}`;

const DEFAULTS = {
  eyebrow: "Start Your Journey",
  heading: "Your learning starts here",
  body:
    "Create your free account, explore courses with Guest Preview, and begin your journey toward academic excellence.",
  cta_primary_label: "Create free account",
  cta_primary_href: "/signup",
  cta_secondary_label: "Browse as guest",
  cta_secondary_href: "/courses",
};

export default function Cta() {
  const rootRef = useRef(null);
  const { block } = useHomeContent("cta");

  const eyebrow = block?.eyebrow || DEFAULTS.eyebrow;
  const heading = block?.heading || DEFAULTS.heading;
  const body = block?.body || DEFAULTS.body;
  const ctaPrimaryLabel = block?.cta_primary_label || DEFAULTS.cta_primary_label;
  const ctaPrimaryHref = block?.cta_primary_href || DEFAULTS.cta_primary_href;
  const ctaSecondaryLabel = block?.cta_secondary_label || DEFAULTS.cta_secondary_label;
  const ctaSecondaryHref = block?.cta_secondary_href || DEFAULTS.cta_secondary_href;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // reveal on scroll
    const io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

    return () => io.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef}>
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="cta rv">
              <svg className="cwm a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              <svg className="cwm b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
              </svg>

              <span className="eyebrow"><u>{eyebrow}</u></span>
              <h2>{heading}</h2>
              <p>{body}</p>

              <div className="cta-actions">
                <a className="btn btn-white" href={ctaPrimaryHref}>
                  {ctaPrimaryLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a className="btn btn-out" href={ctaSecondaryHref}>
                  {ctaSecondaryLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
