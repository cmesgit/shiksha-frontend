// Size rule for the supporting document on a teacher's skill application.
//
// The form has shown "max 50MB" next to that input since it was written and
// nothing enforced it — not here, and not on the server either. Django does
// not limit uploads: FILE_UPLOAD_MAX_MEMORY_SIZE only decides when a file
// stops being buffered in memory and spills to a temp file, and the
// multipart parser never applies DATA_UPLOAD_MAX_MEMORY_SIZE to FILE fields.
// Both are set to 50MB in that project, which is exactly what made the
// label look enforced.
//
// The server is authoritative (MAX_SKILL_FILE_BYTES in
// accounts/serializers.py, kept in sync with this by hand). This copy exists
// so that an oversized file costs the applicant one file input instead of a
// whole completed application: without it the rejection only arrives after
// the entire multipart body has been uploaded and the form comes back with
// nothing kept.
//
// Extracted from FormFillup.jsx rather than inlined so it can be tested at
// all — same reason and same pattern as notificationRouting.js in this
// directory. Plain ESM, no React import.

export const MAX_SKILL_FILE_BYTES = 50 * 1024 * 1024;

const MB = 1024 * 1024;

/**
 * @param {{size: number}|null|undefined} file
 * @returns {string} An applicant-facing message, or "" when the file is fine.
 */
export function skillFileError(file) {
  if (!file) return "";
  if (file.size > MAX_SKILL_FILE_BYTES) {
    // Name the real size. "File too large" leaves them guessing how much to
    // cut, which for a video is the difference between re-encoding and
    // giving up.
    return `That file is ${(file.size / MB).toFixed(1)} MB. `
      + `The limit is ${MAX_SKILL_FILE_BYTES / MB} MB.`;
  }
  return "";
}
