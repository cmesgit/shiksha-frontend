import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateProfileFields } from "../api/profile";
import "../css/PhoneGate.css";

/**
 * Just-in-time phone capture at enrolment.
 *
 * Phase 7 of the account-model work deleted the ten-field completeness wall
 * (`RequireProfileComplete` + `ProfileFillupModal`) that used to stand in front
 * of enrolment. This is the replacement it was always meant to get: ask for the
 * one field this action actually needs, at the moment it's needed, then carry
 * on with what the person was already doing.
 *
 * ⚠ Deliberately does NOT call `bootstrap()` after saving. `bootstrap()` sets
 * AuthContext's `loading`, App.jsx swaps the whole route tree for
 * `<RouteFallback />` while that is true, and the calling screen unmounts
 * mid-enrolment — losing the receipt, UTR and batch the person just typed.
 * That is the exact trap `addTeacherIdentity` hit during the account-model
 * build. The saved number is held in local state instead; nothing else on the
 * enrolment screens reads it, so there is nothing to keep in sync.
 */

// Indian mobile numbers: 10 digits, first digit 6-9. Matches what the backend
// accepts rather than being stricter than it.
const PHONE_RE = /^[6-9]\d{9}$/;

export function usePhoneGate() {
  const { user, activeProfile } = useAuth();
  const [justSaved, setJustSaved] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Read through to the server value until we've saved our own. Derived rather
  // than seeded into useState so a phone arriving with a late `/me/` response
  // is picked up instead of being frozen at the initial empty render.
  const phone =
    justSaved || activeProfile?.phone || user?.profile?.phone || "";

  const save = async (raw) => {
    const next = String(raw || "").trim();
    setError("");

    if (!PHONE_RE.test(next)) {
      setError("Enter a 10-digit mobile number starting with 6, 7, 8 or 9.");
      return false;
    }
    if (!activeProfile?.id) {
      setError("Couldn't find your profile. Please reload the page and try again.");
      return false;
    }

    setSaving(true);
    try {
      await updateProfileFields(activeProfile.id, { phone: next });
      setJustSaved(next);
      return true;
    } catch (err) {
      const data = err?.response?.data;
      setError(
        data?.detail ||
          (Array.isArray(data?.phone) ? data.phone[0] : null) ||
          "Couldn't save your number. Please try again."
      );
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { phone, hasPhone: Boolean(phone), saving, error, save };
}

/**
 * The ask itself. `onSaved` fires only after a successful save, so a caller can
 * resume the action the person originally clicked (free enrol, Razorpay) rather
 * than making them click twice.
 */
export function PhoneGateField({ gate, onSaved, why, cta = "Save" }) {
  const [value, setValue] = useState("");

  const submit = async () => {
    const ok = await gate.save(value);
    if (ok && onSaved) onSaved();
  };

  return (
    <div className="phone-gate">
      <p className="phone-gate__why">{why}</p>
      <div className="phone-gate__row">
        <input
          className="phone-gate__input"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          placeholder="10-digit mobile number"
          aria-label="Mobile number"
          aria-invalid={gate.error ? "true" : undefined}
          value={value}
          disabled={gate.saving}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
          // Not a <form>: on the UPI screen this sits inside the enrolment
          // form's card, and a nested form would either be invalid markup or
          // submit the enrolment itself.
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (value && !gate.saving) submit();
            }
          }}
        />
        <button
          type="button"
          className="phone-gate__save"
          onClick={submit}
          disabled={gate.saving || !value}
        >
          {gate.saving ? "Saving…" : cta}
        </button>
      </div>
      {gate.error && (
        <p className="phone-gate__error" role="alert">
          {gate.error}
        </p>
      )}
    </div>
  );
}
