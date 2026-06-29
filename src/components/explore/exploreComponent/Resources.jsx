import { Book, Download, FileCheck, Shield } from "lucide-react";

const resources = [
  {
    icon: <Download size={22} />,
    title: "Paper Template",
    text: "Download an official research paper structure.",
    body: "Title\nAuthor details\nAbstract\nKeywords\nIntroduction\nMethodology\nResults\nDiscussion\nConclusion\nReferences"
  },
  {
    icon: <Shield size={22} />,
    title: "Publication Ethics",
    text: "Research ethics and plagiarism guidelines.",
    body: "Confirm authorship, cite every source, disclose conflicts and avoid fabricated data."
  },
  {
    icon: <Book size={22} />,
    title: "Author Guidelines",
    text: "Formatting, references and submission guide.",
    body: "Use clear headings, add a 150-250 word abstract and follow one citation style consistently."
  },
  {
    icon: <FileCheck size={22} />,
    title: "Review Process",
    text: "Understand how papers are reviewed.",
    body: "Screening, AI quality check, peer review, revision, final approval and publication."
  }
];

const downloadResource = (item) => {
  const blob = new Blob([`${item.title}\n\n${item.body}`], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

export default function Resources({ onNotice }) {
  return (
    <section className="resources-section">
      <div className="section-title">
        <h2>Research Resources</h2>
        <p>Everything needed before submitting your paper.</p>
      </div>

      <div className="resource-grid">
        {resources.map((item) => (
          <article className="resource-card" key={item.title}>
            <div className="resource-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <button
              type="button"
              onClick={() => {
                downloadResource(item);
                onNotice(`${item.title} downloaded.`);
              }}
            >
              Download
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
