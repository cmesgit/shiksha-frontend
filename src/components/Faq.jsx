import React, { useEffect, useState } from 'react';
import '../css/Faq.css';
import { getFaqs } from '../api/contentApi';

// Default icons cycled onto whichever FAQ items are rendered, static or
// CMS-sourced — the CMS rows carry no icon field of their own.
const DEFAULT_ICONS = ['fa-book-open', 'fa-user-plus', 'fa-video', 'fa-rotate-left'];

// Same static fallback as before — replaced wholesale by CMS rows for
// page="general" the moment any are published, matching home/Faq.jsx's
// "replace-if-present" convention.
const DEFAULT_FAQS = [
  {
    icon: 'fa-book-open',
    question: 'What courses does the coaching provide?',
    answer:
      'We provide courses for competitive exams, school subjects, and professional skill development — including JEE, NEET, board exam prep, and more.',
  },
  {
    icon: 'fa-user-plus',
    question: 'How can I join the classes?',
    answer:
      'You can register directly on our website or contact our support team for a guided onboarding. Both live and offline options are available.',
  },
  {
    icon: 'fa-video',
    question: 'Do you offer online classes?',
    answer:
      'Yes, we offer both live interactive sessions and recorded lectures you can revisit anytime — accessible from any device.',
  },
  {
    icon: 'fa-rotate-left',
    question: 'What is the refund policy?',
    answer:
      'Refund requests must be raised within 24 hours from the date of purchase. Please refer to our refund policy page for detailed terms and conditions.',
  },
];

const accents = ['#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState(() =>
    DEFAULT_FAQS.map((f) => ({ q: f.question, a: f.answer, icon: f.icon, html: false }))
  );

  useEffect(() => {
    let alive = true;
    getFaqs('general').then((rows) => {
      if (alive && rows.length) {
        setFaqData(
          rows.map((r, i) => ({
            q: r.question,
            a: r.answer_html,
            icon: DEFAULT_ICONS[i % DEFAULT_ICONS.length],
            html: true,
          }))
        );
        setActiveIndex(null);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section className="faq-section">
      <div className="faq-bg-grid" />
      <div className="faq-glow-a" />
      <div className="faq-glow-b" />
      <div className="faq-glow-c" />

      <div className="faq-inner">
        {/* Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <div className="faq-badge-dot" />
            <span className="faq-badge-text">FAQs</span>
          </div>
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-sub">Find answers to the most commonly asked questions.</p>
        </div>

        {/* Cards */}
        <div className="faq-list">
          {faqData.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                className={`faq-card ${isOpen ? 'open' : ''}`}
                style={{ '--acc': accents[i] }}
              >
                <div className="faq-q" onClick={() => toggle(i)}>
                  <div className="faq-q-icon">
                    <i className={`fa-solid ${faq.icon}`} />
                  </div>
                  <span className="faq-q-text">{faq.q}</span>
                  <div className="faq-chevron">
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="2,4 6,8 10,4" />
                    </svg>
                  </div>
                </div>

                <div className={`faq-body ${isOpen ? 'open' : ''}`}>
                  <div className="faq-body-inner">
                    {faq.html ? (
                      <p className="faq-a" dangerouslySetInnerHTML={{ __html: faq.a }} />
                    ) : (
                      <p className="faq-a">{faq.a}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;