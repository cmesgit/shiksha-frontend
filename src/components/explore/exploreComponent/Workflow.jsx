const workflow = [
  "Upload Paper",
  "Editorial Screening",
  "AI Quality Check",
  "Peer Review",
  "Author Revision",
  "Final Approval",
  "Published"
];

export default function Workflow() {
  return (
    <section className="workflow-section">
      <div className="section-title">
        <h2>Publication Workflow</h2>
        <p>A transparent publishing process for every submission.</p>
      </div>

      <div className="workflow">
        {workflow.map((step, index) => (
          <div className="workflow-item" key={step}>
            <div className="workflow-number">{index + 1}</div>
            <h4>{step}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
