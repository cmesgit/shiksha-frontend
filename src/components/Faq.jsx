import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/AboutUs.css";
import "../css/Faq.css";
import ScribbleIcon from "./icons/ScribbleIcon";
import { getFaqs } from "../api/contentApi";
import { CONTACT_FAQS } from "../content/contactFaqs";

/* FAQ page, built from the About us page's design system (AboutUs.css:
   .about-page + ap-* classes) so the two read as one family: the same hero,
   centred section heads with an underlined eyebrow, white numbered cards
   with gradient icons, and the green closing CTA. The accordion itself is
   styled in Faq.css (fq-*).

   Two groups:
   - "Courses & learning": the CMS's general FAQ (page="general"), with the
     static list below as the fallback when nothing is published.
   - "Contacting us": the questions that used to close the Contact page. */

const DEFAULT_GENERAL = [
  { q: "What courses does the coaching provide?", a: "We provide courses for competitive exams, school subjects, and professional skill development — including JEE, NEET, board exam prep, and more." },
  { q: "How can I join the classes?", a: "You can register directly on our website or contact our support team for a guided onboarding. Both live and offline options are available." },
  { q: "Do you offer online classes?", a: "Yes, we offer both live interactive sessions and recorded lectures you can revisit anytime — accessible from any device." },
  { q: "What is the refund policy?", a: "Refund requests must be raised within 24 hours from the date of purchase. Please refer to our refund policy page for detailed terms and conditions." },
];

// The same gradients the About page uses on its cards, cycled per question.
const GRADS = [
  "linear-gradient(135deg,#12b47a,#0B5B3E)",
  "linear-gradient(135deg,#7C5CFC,#12b3a6)",
  "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  "linear-gradient(135deg,#FFB21D,#F59E0B)",
  "linear-gradient(135deg,#F59E0B,#E14D2A)",
];

function FaqItem({ id, n, icon, grad, item, open, onToggle }) {
  return (
    <div className={`fq-item${open ? " is-open" : ""}`}>
      <h3 className="fq-q">
        <button type="button" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
          <span className="fq-ic" style={{ background: grad }}><ScribbleIcon name={icon} size={20} /></span>
          <span className="fq-text">{item.q}</span>
          <span className="fq-num" aria-hidden="true">{String(n).padStart(2, "0")}</span>
          <span className="fq-chev" aria-hidden="true"><ScribbleIcon name="chevron-down" size={18} /></span>
        </button>
      </h3>
      <div className="fq-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
        <div className="fq-a-inner">
          {item.html
            ? <div className="fq-a-text" dangerouslySetInnerHTML={{ __html: item.a }} />
            : <p className="fq-a-text">{item.a}</p>}
        </div>
      </div>
    </div>
  );
}

function FaqGroup({ id, eyebrow, title, em, sub, items, icons, soft }) {
  const [open, setOpen] = useState(null);
  return (
    <section className={`ap-sec${soft ? " ap-soft" : ""}`} id={id}>
      {soft && <span className="ap-dots" />}
      <div className="ap-wrap">
        <div className="ap-head">
          <span className="ap-eyebrow"><u>{eyebrow}</u></span>
          <h2>{title} <span className="ap-em">{em}</span></h2>
          <p>{sub}</p>
        </div>
        <div className="fq-list">
          {items.map((item, i) => (
            <FaqItem
              key={item.q}
              id={`${id}-${i}`}
              n={i + 1}
              icon={icons[i % icons.length]}
              grad={GRADS[i % GRADS.length]}
              item={item}
              open={open === i}
              onToggle={() => setOpen((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Faq() {
  useEffect(() => { document.title = "FAQs · ShikshaCom"; }, []);
  const [general, setGeneral] = useState(DEFAULT_GENERAL);

  useEffect(() => {
    let alive = true;
    getFaqs("general").then((rows) => {
      if (alive && rows.length) setGeneral(rows.map((r) => ({ q: r.question, a: r.answer_html, html: true })));
    });
    return () => { alive = false; };
  }, []);

  const topics = [
    { href: "#fq-learning", icon: "courses", grad: GRADS[0], title: "Courses & learning", sub: `${general.length} questions` },
    { href: "#fq-contact", icon: "mail", grad: GRADS[1], title: "Contacting us", sub: `${CONTACT_FAQS.length} questions` },
  ];

  return (
    <main className="about-page faq-page">

      {/* ============================ HERO ============================ */}
      <section className="ap-hero">
        <div className="ap-wrap">
          <div className="ap-hero-grid">
            <div className="ap-hero-copy">
              <span className="ap-badge"><i />FAQs</span>
              <h1>Questions? We have <span className="ap-em">answers.</span></h1>
              <p className="ap-hero-sub">
                Everything people ask us most often, about our courses and about getting in touch.
                Can&apos;t find yours? Our team is a message away.
              </p>
              <div className="ap-hero-cta">
                <Link className="ap-btn ap-btn--solid" to="/contact">
                  Contact us <ScribbleIcon name="arrow-right" size={16} />
                </Link>
                <Link className="ap-btn ap-btn--ghost" to="/courses">
                  Browse courses
                </Link>
              </div>
            </div>

            {/* jump links to each group, styled like the About page's cards */}
            <nav className="fq-topics" aria-label="FAQ topics">
              {topics.map((t) => (
                <a key={t.href} className="fq-topic" href={t.href}>
                  <span className="fq-ic" style={{ background: t.grad }}><ScribbleIcon name={t.icon} size={20} /></span>
                  <span className="fq-topic-text"><b>{t.title}</b><span>{t.sub}</span></span>
                  <span className="fq-topic-go" aria-hidden="true"><ScribbleIcon name="arrow-right" size={16} /></span>
                </a>
              ))}
              <Link className="fq-topic fq-topic--help" to="/contact">
                <span className="fq-ic fq-ic--soft"><ScribbleIcon name="help" size={20} /></span>
                <span className="fq-topic-text"><b>Still stuck?</b><span>Write to a real person</span></span>
                <span className="fq-topic-go" aria-hidden="true"><ScribbleIcon name="arrow-right" size={16} /></span>
              </Link>
            </nav>
          </div>
        </div>
      </section>

      <FaqGroup
        id="fq-learning"
        soft
        eyebrow="Courses & learning"
        title="Learning with"
        em="ShikshaCom"
        sub="Courses, classes, joining and refunds."
        items={general}
        icons={["courses", "user", "video", "calendar", "book"]}
      />

      <FaqGroup
        id="fq-contact"
        eyebrow="Contacting us"
        title="Before you"
        em="write in"
        sub="Replies, visits, partnerships and languages: the answer may already be here."
        items={CONTACT_FAQS}
        icons={["clock", "help", "location", "school", "globe"]}
      />

      {/* ============================ CTA ============================ */}
      <section className="ap-sec" style={{ paddingTop: 0 }}>
        <div className="ap-wrap">
          <div className="ap-cta">
            <svg className="ap-cwm a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <svg className="ap-cwm b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></svg>
            <span className="ap-eyebrow"><u>Still have questions?</u></span>
            <h2>We are happy to help.</h2>
            <p>Send us a message and a real person from our team will get back to you, usually within one working day.</p>
            <div className="ap-cta-actions">
              <Link className="ap-btn ap-btn--white" to="/contact">
                Contact us <ScribbleIcon name="arrow-right" size={16} />
              </Link>
              <Link className="ap-btn ap-btn--outline" to="/courses">
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
