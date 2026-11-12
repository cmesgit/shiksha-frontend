import { useEffect, useState } from "react";
import "../css/AboutUs.css";
import "../css/Feedback.css";
import ScribbleIcon from "./icons/ScribbleIcon";

/* Feedback page, built on the About us design system (AboutUs.css:
   .about-page + ap-* classes) like /faq: About's hero with a pill badge and a
   green-accented headline, the contact details as About-style cards with
   gradient icons, and the form as a clean white card (Feedback.css, fb-*).

   The form itself is unchanged: same fields and the same Web3Forms
   endpoint and access key. */

const INFO = [
  { icon: "clock", grad: "linear-gradient(135deg,#3b82f6,#1d4ed8)", label: "Response time", value: "Within 2–3 business days" },
  { icon: "mail", grad: "linear-gradient(135deg,#12b47a,#0B5B3E)", label: "Email us", value: "info@shikshacom.com", href: "mailto:info@shikshacom.com" },
  { icon: "phone", grad: "linear-gradient(135deg,#FFB21D,#F59E0B)", label: "Call us", value: "0389-2300225", href: "tel:03892300225" },
];

export default function Feedback() {
  useEffect(() => { document.title = "Feedback · ShikshaCom"; }, []);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
      form.reset();
    } catch {
      // Previously a failed send did nothing at all; say so instead.
      setError("We couldn't send your feedback. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="about-page feedback-page">
      <section className="ap-hero">
        <span className="ap-dots" />
        <div className="ap-wrap">
          <div className="ap-hero-grid">

            <div className="ap-hero-copy">
              <span className="ap-badge"><i />Feedback</span>
              <h1>We&apos;d love to hear <span className="ap-em">from you.</span></h1>
              <p className="ap-hero-sub">
                Your feedback helps us improve and serve you better. Share your thoughts,
                suggestions, or any issues you have run into.
              </p>

              <div className="fb-info">
                {INFO.map((item) => {
                  const body = (
                    <>
                      <span className="fb-ic" style={{ background: item.grad }}><ScribbleIcon name={item.icon} size={20} /></span>
                      <span className="fb-info-text"><span>{item.label}</span><b>{item.value}</b></span>
                    </>
                  );
                  return item.href
                    ? <a key={item.label} className="fb-info-card" href={item.href}>{body}</a>
                    : <div key={item.label} className="fb-info-card">{body}</div>;
                })}
              </div>
            </div>

            <div className="fb-card">
              {submitted ? (
                <div className="fb-done" role="status">
                  <span className="fb-done-ic"><ScribbleIcon name="check" size={30} /></span>
                  <h2>Thank you!</h2>
                  <p>Your feedback has been sent. We&apos;ll get back to you shortly.</p>
                  <button type="button" className="ap-btn ap-btn--ghost" onClick={() => setSubmitted(false)}>
                    Send another
                  </button>
                </div>
              ) : (
                <form className="fb-form" onSubmit={handleSubmit}>
                  <div className="fb-card-head">
                    <h2>Share your <span className="ap-em">feedback</span></h2>
                    <p>It takes less than a minute.</p>
                  </div>

                  <input type="hidden" name="access_key" value="a0608d50-fde6-4fa4-84ef-088941c2ece7" />
                  <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  <div className="fb-row">
                    <label className="fb-field">
                      <span>First name</span>
                      <input type="text" name="first_name" placeholder="John" autoComplete="given-name" required />
                    </label>
                    <label className="fb-field">
                      <span>Last name</span>
                      <input type="text" name="last_name" placeholder="Doe" autoComplete="family-name" required />
                    </label>
                  </div>

                  <label className="fb-field">
                    <span>Email address</span>
                    <input type="email" name="email" placeholder="john@example.com" autoComplete="email" required />
                  </label>

                  <label className="fb-field">
                    <span>Message</span>
                    <textarea name="message" rows={5} placeholder="Tell us what you think…" required />
                  </label>

                  {error && <p className="fb-error" role="alert">{error}</p>}

                  <button type="submit" className="ap-btn ap-btn--solid fb-submit" disabled={loading}>
                    {loading ? "Sending…" : <>Send feedback <ScribbleIcon name="arrow-right" size={16} /></>}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
