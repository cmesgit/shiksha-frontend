import { CheckCircle } from "lucide-react";

const features = [
  "Open Access Publications",
  "AI Assisted Review",
  "Faculty Mentorship",
  "Research Collaboration",
  "Citation Generator",
  "Research Templates",
  "Student Friendly",
  "Modern Publishing Platform"
];

export default function WhyPublish() {
  return (
    <section className="why-section">
      <div className="section-title">
        <h2>Why Publish on ShikshaCom?</h2>
        <p>Everything researchers need in one platform.</p>
      </div>

      <div className="why-grid">
        {features.map((feature) => (
          <div className="why-card" key={feature}>
            <CheckCircle size={18} />
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
