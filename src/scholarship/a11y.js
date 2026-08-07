// Shared accessibility helper for the module's several "choose one of
// several custom-styled cards" selection UIs (course pick, verification
// method, exam answer options) — they're semantically radio buttons
// wearing div-shaped clothes, so they need role="radio"/"radiogroup",
// aria-checked, and Enter/Space keyboard activation to work for anyone not
// using a mouse. Native <input type="radio"> was avoided in the original
// build to keep full control over the card layout; this is the standard
// ARIA pattern for that trade-off (see the WAI-ARIA Authoring Practices
// "radio group" pattern).
export const radioKeyDown = (onSelect) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onSelect();
  }
};
