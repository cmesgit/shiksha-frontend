import { useEffect, useRef, useState } from "react";
import { getFaqs } from "../../api/contentApi";

/* Section-scoped styles, ported from the design handoff's Faq.jsx — shared
   tokens (--coral, --line-2, etc.) come from ShikshaHome.css, imported once
   by the homepage composer. */
const css = `.faq{max-width:820px;margin:0 auto}
.qa{background:#fff;border:1px solid var(--line-2);border-radius:15px;margin-bottom:13px;overflow:hidden;transition:box-shadow .25s,border-color .25s}
.qa.open{box-shadow:var(--sh);border-color:transparent}
.qa-q{width:100%;text-align:left;background:none;border:none;cursor:pointer;font-family:var(--display);font-weight:600;font-size:16px;color:var(--ink);padding:19px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.qa-q:focus-visible{outline:3px solid var(--coral);outline-offset:-3px}
.qa-ic{flex:none;width:30px;height:30px;border-radius:9px;background:var(--coral-soft);color:var(--coral);display:grid;place-items:center;transition:transform .3s,background .3s,color .3s}
.qa-ic svg{width:16px;height:16px}
.qa.open .qa-ic{transform:rotate(45deg);background:var(--coral);color:#fff}
.qa-a{max-height:0;overflow:hidden;transition:max-height .35s ease}
.qa-a p{padding:0 22px 21px;color:var(--body);font-size:14.4px}`;

// Same static fallback as the original homepage — replaced wholesale by
// CMS rows for page="home" the moment any are published (matching
// FeaturedCourses' "replace-if-present" convention).
const DEFAULT_FAQS = [
  { q: "How do I enroll in a course?", a: "Create a free account, choose the program that matches your class or exam, and enroll in a few steps. You can preview lessons as a guest first if you'd like to explore before signing up." },
  { q: "Can I preview courses before enrolling?", a: "Yes. Guest Preview lets you explore sample lessons and course structure without creating an account, so you can see the teaching style before you commit." },
  { q: "Are live classes recorded?", a: "Every live class is recorded and added to your dashboard, so you can revisit lessons anytime and revise at your own pace." },
  { q: "Which boards do you support?", a: "Courses are aligned with CBSE and NCERT, and we support the Mizoram Board (MBSE) for learners across Northeast India. More boards are on the way." },
  { q: "What competitive exams do you prepare students for?", a: "Our competitive tracks cover IIT-JEE, NEET, UPSC and Civil Services, and government recruitment exams such as SSC and Banking, with more categories being added." },
  { q: "Can I learn on my mobile phone?", a: "Yes. ShikshaCom works on any device — phone, tablet or computer — so you can attend live classes and watch recordings wherever you are." },
];

export default function Faq() {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(-1);
  const bodies = useRef([]);
  const [items, setItems] = useState(() =>
    DEFAULT_FAQS.map((f) => ({ q: f.q, a: f.a, html: false }))
  );

  useEffect(() => {
    let alive = true;
    getFaqs("home").then((rows) => {
      if (alive && rows.length) {
        setItems(rows.map((r) => ({ q: r.question, a: r.answer_html, html: true })));
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="sec" ref={rootRef}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>Frequently Asked Questions</u></span>
            <h2>Have questions? <span className="em">We've got answers.</span></h2>
          </div>
          <div className="faq">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div className={`qa rv${isOpen ? " open" : ""}`} key={item.q}>
                  <button
                    className="qa-q"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <span className="qa-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <div
                    className="qa-a"
                    ref={(el) => (bodies.current[i] = el)}
                    style={{ maxHeight: isOpen ? bodies.current[i]?.scrollHeight : 0 }}
                  >
                    {item.html ? (
                      <div dangerouslySetInnerHTML={{ __html: item.a }} />
                    ) : (
                      <p>{item.a}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
