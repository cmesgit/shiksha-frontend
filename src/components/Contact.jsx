import React from "react";
import email_icon from '../assets/envelope.svg'
import location_icon from '../assets/location.svg'
import phone_icon from '../assets/phone_icon.svg'

import { useHomeContent } from "../hooks/useHomeContent";
import { sanitizeInline } from "../utils/sanitizeInline";

import "../css/Contact.css";

/* Every string below is a fallback only — the CMS ("contact_hero" home-content
   section, plus its "contact_card" list items) supplies the live copy the
   moment rows exist. With an empty CMS this file renders exactly what it
   always has. Same "replace-if-present" convention as About2.jsx /
   WhyChooseShiksha.jsx.

   These were hardcoded here until now, which meant a changed phone number or a
   moved office needed a code change and a frontend deploy. */

const HEADER_DEFAULTS = {
  heading: "Contact ShikshaCom",
  subhead: "Get in touch with us! Here is how you can reach ShikshaCom.",
};

// icon key -> asset. Unknown keys fall back to the card at the same index
// (never a broken image), same contract as About2's PILLAR_ICON_COMPONENTS.
const CARD_ICONS = {
  location: location_icon,
  email: email_icon,
  phone: phone_icon,
};

const CARDS_DEFAULT = [
  {
    id: "d0",
    icon: "location",
    title: "Head Office",
    body: "House No. - 1473A<br />Maruti Vihar<br />Gurgaon, Haryana - 122002",
  },
  {
    id: "d1",
    icon: "location",
    title: "Regional Office Address",
    body: "Hualngohmun Vengchhak<br />Near World Bank Road<br />Aizawl , Mizoram - 796005",
  },
  { id: "d2", icon: "email", title: "Email", body: "info@shikshacom.com" },
  {
    id: "d3",
    icon: "phone",
    title: "Phone",
    body: "+0124-4255138 (Haryana)<br />+0389-2300225 (Mizoram)<br />+91 3893570403 (Mizoram)",
  },
];

const Contact = () => {
  const { block, items } = useHomeContent("contact_hero");

  const heading = block?.heading || HEADER_DEFAULTS.heading;
  const headingSecondary = block?.heading_secondary || "";
  const subhead = block?.subhead || HEADER_DEFAULTS.subhead;

  // Being list items rather than four fixed slots is the point: an editor can
  // add a third office or retire a phone line without a deploy.
  const cmsCards = items.filter((i) => i.variant === "contact_card");
  const usingCms = cmsCards.length > 0;
  const cards = usingCms ? cmsCards : CARDS_DEFAULT;

  return (
    <div className="contact2-container">
      {/* Header */}
      <header className="contact2-header">
        <h1>
          {heading}
          {headingSecondary ? <> <span className="em">{headingSecondary}</span></> : null}
        </h1>
        <p>{subhead}</p>
      </header>

      {/* Contact Information */}
      <section className="contact2-info">
        {cards.map((c, i) => {
          const fallback = CARDS_DEFAULT[i % CARDS_DEFAULT.length];
          const iconSrc = CARD_ICONS[c.icon] || CARD_ICONS[fallback.icon];
          return (
            <div className="contact2-card" key={c.id ?? i}>
              <img src={iconSrc} alt="" />
              <h2>{c.title || fallback.title}</h2>
              {/* CMS bodies are server-sanitized inline HTML and carry the
                  <br /> line breaks an address needs, so they must render as
                  HTML. The hardcoded fallbacks contain the same markup, so both
                  branches go through the sanitizer rather than only one — same
                  reasoning as About2.jsx's RichBody, minus the plain-text case
                  that does not arise here. */}
              <p dangerouslySetInnerHTML={{ __html: sanitizeInline(c.body || fallback.body) }} />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Contact;
