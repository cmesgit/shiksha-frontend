import { FileText, FolderOpen, Send, UploadCloud } from "lucide-react";

const formatSize = (size) => {
  if (!size) return "Folder";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export default function PublishResearch({
  categories,
  uploadedFiles,
  submissions,
  onFilesSelected,
  onSubmit
}) {
  return (
    <section className="publish-section">
      <div className="section-title">
        <h2>Publish Your Research</h2>
        <p>Submit your research paper, faculty publication or student project.</p>
      </div>

      <div className="publish-wrapper">
        <div className="upload-card">
          <UploadCloud size={55} />
          <h3>Upload papers, folders or images</h3>
          <p>Supported formats: PDF, DOCX, ZIP, PNG and JPG.</p>

          <div className="upload-actions">
            <label className="upload-button">
              <FileText size={18} />
              Upload Files
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.zip,image/*"
                onChange={(event) => onFilesSelected(event.target.files)}
              />
            </label>

            <label className="upload-button secondary">
              <FolderOpen size={18} />
              Upload Folder
              <input
                type="file"
                multiple
                directory=""
                webkitdirectory=""
                onChange={(event) => onFilesSelected(event.target.files)}
              />
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="upload-list">
              {uploadedFiles.slice(0, 6).map((file) => (
                <div key={file.id}>
                  <span>{file.name}</span>
                  <small>{formatSize(file.size)}</small>
                </div>
              ))}
              {uploadedFiles.length > 6 && <p>+{uploadedFiles.length - 6} more files</p>}
            </div>
          )}
        </div>

        <form className="publish-form" onSubmit={onSubmit}>
          <input name="title" placeholder="Research Title" required />
          <input name="author" placeholder="Author Name" required />
          <input name="department" placeholder="Department" />
          <input name="institution" placeholder="Institution / University" />
          <input name="keywords" placeholder="Keywords (comma separated)" />
          <select name="category" defaultValue="">
            <option value="" disabled>
              Research Category
            </option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <textarea name="abstract" rows="6" placeholder="Research Abstract" />

          <button className="submit-paper" type="submit">
            <Send size={18} />
            Submit Research
          </button>
        </form>
      </div>

      {submissions.length > 0 && (
        <div className="submission-panel">
          <h3>Local Submission Queue</h3>
          {submissions.map((item) => (
            <div className="submission-item" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.author} - {item.category || "Uncategorized"}</span>
              </div>
              <small>{item.files} file{item.files === 1 ? "" : "s"} - {item.status}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
