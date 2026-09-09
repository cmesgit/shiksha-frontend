import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { Field } from "./AuthKit";

/* ════════════════════════════════════════════════════════════════
   ExpertDetails — what a new Skill Dev expert needs before learners
   can find them, asked at the moment they commit rather than never.

   WHY THIS EXISTS (and why it reverses a previous decision on purpose)
   ───────────────────────────────────────────────────────────────────
   BecomeTeacher's docstring used to say, of the Skill track: "nothing new is
   COLLECTED here… the one-click design is deliberate — a marketplace listing
   needs no review". The first half did not follow from the second. "No admin
   review" means nobody has to APPROVE you; it does not mean the product knows
   anything about you.

   Measured on a real local stack, 2026-09-09: a brand-new account that
   registers and clicks "Start teaching on Skill Dev" lands on a confirmation
   reading "7 things left before learners can find you" — subject, languages,
   bio, name, date of birth, phone, photo — with `ExpertProfile.is_listed`
   False, because `refresh_listing()` only flips it once `completeness()`
   passes. So the one click bought an account that cannot be found by anyone,
   and the person's next move was a link to a different screen anyway.

   The friction argument in the original decision is still right, and is kept:
   don't ask for anything before the person has DECIDED. This form opens only
   after they click the Skill card — the same seam the faculty fix used when
   it moved document collection to after "Apply to teach". And it is
   SKIPPABLE, so the genuine one-click path still exists for anyone who wants
   to get in first and fill this in later.

   THE PHOTO (the ninth field, and the one that decides visibility)
   ───────────────────────────────────────────────────────────────
   `apply_personal_fields` reads `profile_photo` from `files`, never from the
   JSON body, and this is a JSON endpoint — so for one iteration this form
   took someone from 7 gaps to 1 and still left `is_listed` False. A photo is
   part of `completeness()`, so without it the listing is hidden no matter how
   well everything else is filled in.

   `SignupSerializer._save_signup_photo` now accepts it as a base64
   {name, type, data} object beside the text fields — the same shape faculty
   documents already use. With it, this form produces a LISTED expert in one
   request.

   ⚠ The server re-checks these bytes with Pillow and refuses anything that
   merely CLAIMS to be an image, or whose real format disagrees with its
   declared type. The checks below are the friendly half; they are not the
   security boundary and must not be described as one.

   VALIDATION HERE IS LOAD-BEARING, NOT BELT-AND-BRACES
   ────────────────────────────────────────────────────
   `_provision_expert` catches ValidationError and persists whatever cleanly
   applied — "never block account creation on optional signup-time profile
   data". That is the right call for the account, and it means a malformed
   field is dropped SILENTLY and the person is told they are set up. Same trap
   `_save_signup_document` has on the faculty side. So the checks below are
   the only thing standing between a typo and a silently half-saved profile.
════════════════════════════════════════════════════════════════ */

/* Mirrors skills/profile_ops.py's VALID_MODES / OFFLINE_MODES. `class_location`
   is required for the two offline modes and meaningless for online — the
   server enforces exactly this in validate_location(). */
const MODES = [
  { value: "online", label: "Online only",        hint: "Video sessions. No address needed." },
  { value: "home",   label: "At my place",        hint: "Learners come to you." },
  { value: "travel", label: "I travel to them",   hint: "You go to the learner." },
];
const OFFLINE_MODES = ["home", "travel"];

const OTHER = "__other__";

/* Mirrors SignupSerializer._SIGNUP_PHOTO_TYPES / _SIGNUP_PHOTO_MAX_BYTES.
   The server is the real gate (it Pillow-verifies the decoded bytes); these
   exist so someone picking a 12 MB HEIC gets told instantly instead of
   watching it upload and silently vanish. */
const PHOTO_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const PHOTO_MAX_MB = 5;

const readAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload  = () => resolve(r.result);
    r.onerror = () => reject(new Error("Could not read that file."));
    r.readAsDataURL(file);
  });

export default function ExpertDetails({ onSubmit, onSkip, onBack, busy }) {
  const [cats, setCats]   = useState([]);
  const [error, setError] = useState("");

  const [fullName, setFullName]   = useState("");
  const [dob, setDob]             = useState("");
  const [phone, setPhone]         = useState("");
  const [category, setCategory]   = useState("");
  const [subjectText, setSubject] = useState("");
  const [languages, setLanguages] = useState("");
  const [bio, setBio]             = useState("");
  const [mode, setMode]           = useState("");
  const [location, setLocation]   = useState("");
  // { name, type, data } once chosen — the exact shape _save_signup_photo
  // expects. `preview` is a local object URL, never sent.
  const [photo, setPhoto]         = useState(null);
  const [preview, setPreview]     = useState("");

  // Revoke the object URL when it changes or the form unmounts, or every
  // re-pick leaks a blob for the life of the page.
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const onPickPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!PHOTO_TYPES.includes((file.type || "").toLowerCase())) {
      setPhoto(null); setPreview("");
      setError("That has to be a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > PHOTO_MAX_MB * 1024 * 1024) {
      setPhoto(null); setPreview("");
      setError(`That image is larger than ${PHOTO_MAX_MB} MB — pick a smaller one.`);
      return;
    }
    try {
      const data = await readAsDataUrl(file);
      setPhoto({ name: file.name, type: file.type.toLowerCase(), data });
      setPreview(URL.createObjectURL(file));
      setError("");
    } catch {
      setPhoto(null); setPreview("");
      setError("Could not read that image. Try a different file.");
    }
  };

  /* GET /skill/categories/ is AllowAny. Failing to load it must not block the
     form — the free-text branch alone satisfies `subject_description`, so a
     dead categories call degrades to "describe what you teach" rather than to
     a form nobody can submit. */
  useEffect(() => {
    let alive = true;
    api.get("/skill/categories/")
      .then(({ data }) => {
        if (!alive) return;
        const list = Array.isArray(data) ? data : (data?.results || data?.categories || []);
        setCats(list.filter((c) => c?.slug || c?.id));
      })
      .catch(() => { /* free-text branch covers it */ });
    return () => { alive = false; };
  }, []);

  const needsLocation = OFFLINE_MODES.includes(mode);
  const usingOther    = category === OTHER || (!cats.length && true);

  const submit = (e) => {
    e.preventDefault();

    // Ordered so the message names the FIRST thing to fix, top to bottom,
    // matching how the eye moves down the form.
    if (!fullName.trim())            return setError("Enter your name — learners see this on your listing.");
    if (!dob)                        return setError("Enter your date of birth.");
    if (!phone.trim())               return setError("Enter a phone number.");
    if (!category && !subjectText.trim())
      return setError("Pick a subject, or describe what you teach.");
    if (usingOther && !subjectText.trim())
      return setError("Describe what you teach.");
    if (!languages.trim())           return setError("List at least one language you teach in.");
    if (!bio.trim())                 return setError("Write a short introduction for learners.");
    if (bio.trim().length < 30)      return setError("Your introduction is very short — give learners a couple of sentences.");
    if (!mode)                       return setError("Choose how your classes happen.");
    if (needsLocation && !location.trim())
      return setError("Tell learners where the class is held.");
    // Required, because it is the difference between a listing learners can
    // find and one they cannot — completeness() counts it. Someone who would
    // rather not choose one now has "Skip" right below.
    if (!photo)
      return setError("Add a photo — your listing stays hidden without one.");

    setError("");

    /* One flat object: _provision_expert splits it into ExpertProfile fields
       and SELF-learner personal fields itself, through the same profile_ops
       helpers the dashboard editor uses. `languages` may be a comma-separated
       string — _coerce_languages accepts that and trims/caps it. */
    const payload = {
      full_name: fullName.trim(),
      date_of_birth: dob,
      phone: phone.trim(),
      languages: languages.trim(),
      bio: bio.trim(),
      class_mode: mode,
      // {name, type, data} with the data: prefix left on — the server strips
      // it. Dropped silently by _save_signup_photo if it fails verification,
      // in which case the confirmation screen reports it as still missing.
      profile_photo: photo,
    };
    // Send whichever of the two satisfies subject_description. Sending an
    // empty `category` key would resolve to null and clear it.
    if (category && category !== OTHER) payload.category = category;
    if (subjectText.trim())             payload.subject_description = subjectText.trim();
    // Only meaningful offline; omitted rather than blanked for online so a
    // previously-saved address is not wiped by choosing online.
    if (needsLocation) payload.class_location = location.trim();

    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="af-expert" style={{ maxWidth: 520 }}>
      <p className="af-sub" style={{ marginTop: 0 }}>
        This is what learners see. You can change any of it later — and your
        listing only goes live once it’s filled in.
      </p>

      <Field
        id="ed-name" label="Your name" value={fullName} autoFocus
        placeholder="As learners should see it"
        onChange={(e) => setFullName(e.target.value)} disabled={busy}
      />
      <Field
        id="ed-dob" label="Date of birth" type="date" value={dob}
        onChange={(e) => setDob(e.target.value)} disabled={busy}
      />
      <Field
        id="ed-phone" label="Phone number" type="tel" value={phone}
        placeholder="For booking notifications"
        onChange={(e) => setPhone(e.target.value)} disabled={busy}
      />

      {cats.length > 0 && (
        <div className="af-field">
          <label htmlFor="ed-cat">What do you teach?</label>
          <select
            id="ed-cat" value={category} disabled={busy}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a subject…</option>
            {cats.map((c) => (
              <option key={c.slug || c.id} value={c.slug || c.id}>{c.name || c.title || c.slug}</option>
            ))}
            <option value={OTHER}>Something else…</option>
          </select>
        </div>
      )}

      {(usingOther || !cats.length) && (
        <Field
          id="ed-subject" label={cats.length ? "Describe what you teach" : "What do you teach?"}
          value={subjectText} placeholder="e.g. Classical guitar for beginners"
          onChange={(e) => setSubject(e.target.value)} disabled={busy}
        />
      )}

      <Field
        id="ed-langs" label="Languages you teach in" value={languages}
        placeholder="English, Hindi, Mizo"
        onChange={(e) => setLanguages(e.target.value)} disabled={busy}
      />

      <div className="af-field">
        <label htmlFor="ed-bio">A short introduction</label>
        <textarea
          id="ed-bio" rows={4} value={bio} disabled={busy}
          placeholder="Who you are, what you teach, and who it suits. A couple of sentences is plenty."
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <fieldset className="af-field" style={{ border: 0, padding: 0, margin: "0 0 14px" }}>
        <legend style={{ fontSize: 13, fontWeight: 600, padding: 0, marginBottom: 6 }}>
          How do your classes happen?
        </legend>
        {MODES.map((m) => (
          <label key={m.value} className="af-checkbox" style={{ alignItems: "flex-start" }}>
            <input
              type="radio" name="class_mode" value={m.value}
              checked={mode === m.value} disabled={busy}
              onChange={() => setMode(m.value)}
            />
            <span>
              <b>{m.label}</b>
              <span style={{ display: "block", fontSize: 12, color: "#6b6e7a" }}>{m.hint}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {needsLocation && (
        <Field
          id="ed-loc" label="Where are the classes held?" value={location}
          placeholder="Area and city — learners use this to find you nearby"
          onChange={(e) => setLocation(e.target.value)} disabled={busy}
        />
      )}

      <div className="af-field">
        <label htmlFor="ed-photo">A photo of you</label>
        <div className="af-photo">
          {preview
            ? <img className="af-photo__thumb" src={preview} alt="" />
            : <span className="af-photo__thumb af-photo__thumb--empty" aria-hidden="true" />}
          <div className="af-photo__body">
            <input
              id="ed-photo" type="file" disabled={busy}
              accept={PHOTO_TYPES.join(",")} onChange={onPickPhoto}
            />
            <span className="af-photo__hint">
              {photo ? photo.name : `JPG, PNG or WebP · up to ${PHOTO_MAX_MB} MB`}
            </span>
          </div>
        </div>
      </div>

      {error && <p className="af-error">{error}</p>}

      <div className="af-actions">
        <button type="submit" className="af-btn af-btn--block" disabled={busy}>
          {busy ? "Setting up…" : "Start teaching on Skill Dev"}
        </button>
        {/* The original one-click path, kept rather than removed. Someone who
            wants in now and details later still gets exactly what they had —
            they are just told what it costs them, which they were not before. */}
        <button type="button" className="af-btn af-btn--ghost af-btn--block" disabled={busy} onClick={onSkip}>
          Skip — set this up later
        </button>
        <button type="button" className="af-btn af-btn--ghost af-btn--block" disabled={busy} onClick={onBack}>
          Back
        </button>
      </div>
    </form>
  );
}
