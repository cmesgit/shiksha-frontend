import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFormFillupData, submitFormFillup, getStates, getDistricts } from "../api/formFillupApi";
import { useAuth } from "../contexts/AuthContext";
import extractError from "../utils/extractError";
import "../css/FormFillup.css";

const STUDENT_FIELDS = {
  // Personal
  first_name: "",
  last_name: "",
  phone: "",
  gender: "",
  date_of_birth: "",
  profile_photo: null,        // File object or null

  // Address
  state: "",
  district: "",
  city_town: "",
  pin_code: "",

  // Parent/Guardian
  father_name: "",
  father_phone: "",
  mother_name: "",
  mother_phone: "",
  guardian_name: "",
  guardian_phone: "",
  parent_guardian_email: "",

  // Academic
  currently_studying: "",     // "yes" or "no"
  current_class: "",          // "8","9","10","11","12"
  stream: "",                 // "science","commerce","arts"
  board: "",                  // "cbse","icse","mbse","nios","other"
  board_other: "",
  school_name: "",
  academic_year: "",          // auto-populated, display only
  highest_education: "",      // "below_8","8","9","10","11","12"
  reason_not_studying: "",
};

const TEACHER_FIELDS = {
  // Personal (same as student)
  first_name: "",
  last_name: "",
  phone: "",
  gender: "",
  date_of_birth: "",
  profile_photo: null,

  // Address (same as student)
  state: "",
  district: "",
  city_town: "",
  pin_code: "",

  // Educational Qualifications
  highest_degree: "",         // "10th_pass","12th_pass","diploma","bachelors","masters","phd","other"
  field_of_study: "",
  year_of_completion: "",
  teaching_certifications: [], // ["bed","med","deled","ctet","state_tet","other"]
  qualification_certificate: null,  // File object

  // Teaching Experience
  experience_range: "",       // "0","lt1","1_3","3_5","5_10","10plus"
  employment_status: "",      // "fulltime","parttime","private_tutor","unemployed","retired"
  currently_employed: false,
  current_institution: "",
  current_position: "",

  // Verification Documents
  govt_id_type: "",           // "aadhaar","pan","voter_id","driving_license"
  id_number: "",
  id_proof_front: null,       // File object (required)
  id_proof_back: null,        // File object (optional)

  // Course Application (optional section)
  subject: "",
  boards: [],                 // ["cbse","icse","mbse","nios"]
  classes: [],                // ["8","9","10","11","12"]
  streams: [],                // ["science","commerce","arts"]

  // Skill Application (optional section)
  skill_name: "",
  skill_description: "",
  skill_related_subject: "",
  skill_supporting_image: null,
  skill_supporting_video: null,
};

const FormFillup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bootstrap } = useAuth();

  const isOnboarding = location.state?.onboarding === true;

  const [states, setStates] = useState([]);          // [{name: "Mizoram"}, ...]
  const [districts, setDistricts] = useState([]);    // ["Aizawl", "Champhai", ...]
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [formType, setFormType] = useState(null);
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(true);
  const [existingFiles, setExistingFiles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch form data and states in parallel
        const [formRes, statesRes] = await Promise.all([
          getFormFillupData(),
          getStates(),
        ]);

        const { form_type, email: userEmail, profile_photo, ...fields } = formRes.data;
        setFormType(form_type);
        setEmail(userEmail);
        setStates(statesRes.data);

        const defaults = form_type === "teacher" ? { ...TEACHER_FIELDS } : { ...STUDENT_FIELDS };
        const merged = { ...defaults };

        for (const key of Object.keys(defaults)) {
          const val = fields[key];
          if (val !== null && val !== undefined && val !== "") {
            merged[key] = val;
          }
        }

        // Don't put URL strings into file fields — keep them null
        // profile_photo, qualification_certificate, id_proof_front, etc. come as URLs from GET
        // Store URLs separately for display, keep File fields null
        merged.profile_photo = null;
        if (form_type === "teacher") {
          merged.qualification_certificate = null;
          merged.id_proof_front = null;
          merged.id_proof_back = null;
          merged.skill_supporting_image = null;
          merged.skill_supporting_video = null;
        }

        setForm(merged);

        // Store existing file URLs for "already uploaded" display
        setExistingFiles({
          profile_photo: formRes.data.profile_photo,
          qualification_certificate: formRes.data.qualification_certificate,
          id_proof_front: formRes.data.id_proof_front,
          id_proof_back: formRes.data.id_proof_back,
          skill_supporting_image: formRes.data.skill_supporting_image,
          skill_supporting_video: formRes.data.skill_supporting_video,
        });

        // If state already set, fetch its districts
        if (merged.state) {
          const distRes = await getDistricts(merged.state);
          setDistricts(distRes.data);
        }
      } catch (err) {
        const raw = extractError(err);
        const msg = raw instanceof Error ? raw.message : typeof raw === "string" ? raw : "Failed to load form data.";
        setFetchError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // File inputs
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const val = type === "checkbox" ? checked : value;

    setForm((prev) => {
      const updated = { ...prev, [name]: val };

      // When state changes, reset district and fetch new districts
      if (name === "state") {
        updated.district = "";
        fetchDistricts(value);
      }

      // When currently_studying changes, clear conditional fields
      if (name === "currently_studying") {
        if (value === "yes") {
          updated.highest_education = "";
          updated.reason_not_studying = "";
        } else {
          updated.current_class = "";
          updated.stream = "";
          updated.board = "";
          updated.board_other = "";
          updated.school_name = "";
        }
      }

      // When current_class changes, clear stream if not 11/12
      if (name === "current_class" && !["11", "12"].includes(value)) {
        updated.stream = "";
      }

      return updated;
    });

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const fetchDistricts = async (stateName) => {
    if (!stateName) { setDistricts([]); return; }
    setLoadingDistricts(true);
    try {
      const res = await getDistricts(stateName);
      setDistricts(res.data);
    } catch { setDistricts([]); }
    finally { setLoadingDistricts(false); }
  };

  const handleMultiCheck = (fieldName, value) => {
    setForm((prev) => {
      const arr = prev[fieldName] || [];
      const updated = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [fieldName]: updated };
    });
  };

  const validate = () => {
    const errs = {};

    if (!form.first_name?.trim()) errs.first_name = "First name is required";
    if (!form.last_name?.trim()) errs.last_name = "Last name is required";
    if (!form.phone?.trim()) errs.phone = "Phone number is required";
    if (!form.date_of_birth) errs.date_of_birth = "Date of birth is required";
    if (!form.state) errs.state = "State is required";
    if (!form.district) errs.district = "District is required";
    if (!form.city_town?.trim()) errs.city_town = "City/Town is required";

    if (formType === "student") {
      // Parent contact: at least 1 name+phone pair
      const hasParent =
        (form.father_name && form.father_phone) ||
        (form.mother_name && form.mother_phone) ||
        (form.guardian_name && form.guardian_phone);
      if (!hasParent) errs.parent_guardian = "At least one complete parent/guardian contact (name + phone) is required";

      // Academic
      if (!form.currently_studying) errs.currently_studying = "Please select if currently studying";
      if (form.currently_studying === "yes") {
        if (!form.current_class) errs.current_class = "Class is required";
        if (!form.board) errs.board = "Board is required";
        if (form.board === "other" && !form.board_other?.trim()) errs.board_other = "Please specify your board";
        if (["11", "12"].includes(form.current_class) && !form.stream) errs.stream = "Stream is required for Class 11-12";
      }
      if (form.currently_studying === "no") {
        if (!form.highest_education) errs.highest_education = "Highest education is required";
      }
    }

    if (formType === "teacher") {
      // Educational Qualifications
      if (!form.highest_degree) errs.highest_degree = "Highest degree is required";
      if (!form.field_of_study?.trim()) errs.field_of_study = "Field of study is required";
      if (!form.year_of_completion) errs.year_of_completion = "Year of completion is required";

      // Teaching Experience
      if (!form.experience_range) errs.experience_range = "Teaching experience is required";
      if (!form.employment_status) errs.employment_status = "Employment status is required";

      // Verification
      if (!form.govt_id_type) errs.govt_id_type = "Government ID type is required";
      if (!form.id_number?.trim()) errs.id_number = "ID number is required";
      // id_proof_front required only if not already uploaded
      if (!form.id_proof_front && !existingFiles.id_proof_front)
        errs.id_proof_front = "ID proof is required";

      // Course Application — validate only if any field is filled
      const hasCourse = form.subject || form.boards.length || form.classes.length;
      if (hasCourse) {
        if (!form.subject) errs.subject = "Subject is required";
        if (!form.boards.length) errs.boards = "At least one board is required";
        if (!form.classes.length) errs.classes = "At least one class is required";
        if ((form.classes.includes("11") || form.classes.includes("12")) && !form.streams.length)
          errs.streams = "Stream is required for Class 11-12";
      }

      // Skill — validate only if any field is filled
      const hasSkill = form.skill_name || form.skill_description;
      if (hasSkill) {
        if (!form.skill_name?.trim()) errs.skill_name = "Skill name is required";
        if (!form.skill_description?.trim()) errs.skill_description = "Skill description is required";
        if (!form.skill_related_subject) errs.skill_related_subject = "Related subject is required";
      }

    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;
    setSubmitting(true);

    try {
      const fd = new FormData();

      // Append all text/select fields
      for (const [key, value] of Object.entries(form)) {
        // Skip file fields (handled separately)
        if (value instanceof File || value === null) continue;

        // Arrays: append each value individually
        if (Array.isArray(value)) {
          value.forEach((v) => fd.append(key, v));
          continue;
        }

        // Booleans
        if (typeof value === "boolean") {
          fd.append(key, value ? "true" : "false");
          continue;
        }

        fd.append(key, value);
      }

      // Append file fields only if a new file was selected
      const fileFields = [
        "profile_photo",
        "qualification_certificate",
        "id_proof_front", "id_proof_back",
        "skill_supporting_image", "skill_supporting_video",
      ];
      for (const field of fileFields) {
        if (form[field] instanceof File) {
          fd.append(field, form[field]);
        }
      }

      await submitFormFillup(fd);
      await bootstrap();

      if (isOnboarding) {
        navigate("/dashboard", { replace: true });
      } else {
        setSuccess("Profile updated successfully!");
      }
    } catch (err) {
      const raw = extractError(err);
      const msg = raw instanceof Error ? raw.message : typeof raw === "string" ? raw : "Failed to save. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="ff-container">
        <div className="ff-glow"></div>
        <div className="ff-card">
          <p className="ff-loading">Loading form...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="ff-container">
        <div className="ff-glow"></div>
        <div className="ff-card">
          <p className="ff-error-msg">{fetchError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ff-container">
      {/* ambient glow bottom-left — mirrors hero-glow-2 */}
      <div className="ff-glow"></div>

      <div className="ff-card">
        <h2>{isOnboarding ? "Complete Your Profile" : "Update Profile"}</h2>
        <p className="ff-subtitle">
          {isOnboarding
            ? "Please fill in your details to get started."
            : `${formType === "teacher" ? "Teacher" : "Student"} Form`}
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {/* ===== PERSONAL INFO ===== */}
          <h3 className="ff-section-title">Personal Information</h3>

          <div className="ff-row">
            <div className="ff-field">
              <label>First Name *</label>
              <input type="text" name="first_name" value={form.first_name} onChange={handleChange} placeholder="First name" />
              {errors.first_name && <span className="ff-field-error">{errors.first_name}</span>}
            </div>
            <div className="ff-field">
              <label>Last Name *</label>
              <input type="text" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last name" />
              {errors.last_name && <span className="ff-field-error">{errors.last_name}</span>}
            </div>
          </div>

          <div className="ff-field">
            <label>Email</label>
            <input type="email" value={email} disabled />
          </div>

          <div className="ff-field">
            <label>Phone *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
            {errors.phone && <span className="ff-field-error">{errors.phone}</span>}
          </div>

          <div className="ff-field">
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          <div className="ff-field">
            <label>Date of Birth *</label>
            <input type="date" name="date_of_birth" value={form.date_of_birth || ""} onChange={handleChange} />
            {errors.date_of_birth && <span className="ff-field-error">{errors.date_of_birth}</span>}
          </div>

          <div className="ff-field">
            <label>Profile Photo</label>
            <input type="file" name="profile_photo" accept="image/*" onChange={handleChange} className="ff-file-input" />
            {existingFiles.profile_photo && !form.profile_photo && (
              <span className="ff-file-existing">Current photo uploaded</span>
            )}
            {form.profile_photo && (
              <span className="ff-file-name">{form.profile_photo.name}</span>
            )}
          </div>


          {/* ===== FAMILY INFO(STUDENT ONLY) ===== */}
          {formType === "student" && (
            <>
              <h3 className="ff-section-title">Parent / Guardian Information</h3>
              {errors.parent_guardian && <p className="ff-error-msg">{errors.parent_guardian}</p>}

              <div className="ff-row">
                <div className="ff-field">
                  <label>Father's Name</label>
                  <input type="text" name="father_name" value={form.father_name} onChange={handleChange} placeholder="Father's name" />
                </div>
                <div className="ff-field">
                  <label>Father's Phone</label>
                  <input type="tel" name="father_phone" value={form.father_phone} onChange={handleChange} placeholder="Father's phone" />
                </div>
              </div>

              <div className="ff-row">
                <div className="ff-field">
                  <label>Mother's Name</label>
                  <input type="text" name="mother_name" value={form.mother_name} onChange={handleChange} placeholder="Mother's name" />
                </div>
                <div className="ff-field">
                  <label>Mother's Phone</label>
                  <input type="tel" name="mother_phone" value={form.mother_phone} onChange={handleChange} placeholder="Mother's phone" />
                </div>
              </div>

              <div className="ff-row">
                <div className="ff-field">
                  <label>Guardian's Name</label>
                  <input type="text" name="guardian_name" value={form.guardian_name} onChange={handleChange} placeholder="Guardian's name" />
                </div>
                <div className="ff-field">
                  <label>Guardian's Phone</label>
                  <input type="tel" name="guardian_phone" value={form.guardian_phone} onChange={handleChange} placeholder="Guardian's phone" />
                </div>
              </div>

              <div className="ff-field">
                <label>Parent/Guardian Email</label>
                <input type="email" name="parent_guardian_email" value={form.parent_guardian_email} onChange={handleChange} placeholder="Parent or guardian email" />
              </div>
            </>
          )}

          {/* ===== Academic Info(STUDENT ONLY) ===== */}
          {formType === "student" && (
            <>
              <h3 className="ff-section-title">Academic Information</h3>

              <div className="ff-field">
                <label>Currently Studying? *</label>
                <div className="ff-radio-group">
                  <label className="ff-radio-label">
                    <input type="radio" name="currently_studying" value="yes"
                      checked={form.currently_studying === "yes"} onChange={handleChange} />
                    Yes
                  </label>
                  <label className="ff-radio-label">
                    <input type="radio" name="currently_studying" value="no"
                      checked={form.currently_studying === "no"} onChange={handleChange} />
                    No
                  </label>
                </div>
                {errors.currently_studying && <span className="ff-field-error">{errors.currently_studying}</span>}
              </div>

              {/* === IF YES === */}
              {form.currently_studying === "yes" && (
                <>
                  <div className="ff-row">
                    <div className="ff-field">
                      <label>Class/Grade *</label>
                      <select name="current_class" value={form.current_class} onChange={handleChange}>
                        <option value="">Select Class</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                      </select>
                      {errors.current_class && <span className="ff-field-error">{errors.current_class}</span>}
                    </div>

                    {["11", "12"].includes(form.current_class) && (
                      <div className="ff-field">
                        <label>Stream *</label>
                        <select name="stream" value={form.stream} onChange={handleChange}>
                          <option value="">Select Stream</option>
                          <option value="science">Science</option>
                          <option value="commerce">Commerce</option>
                          <option value="arts">Arts</option>
                        </select>
                        {errors.stream && <span className="ff-field-error">{errors.stream}</span>}
                      </div>
                    )}
                  </div>

                  <div className="ff-field">
                    <label>Board *</label>
                    <select name="board" value={form.board} onChange={handleChange}>
                      <option value="">Select Board</option>
                      <option value="cbse">CBSE</option>
                      <option value="icse">ICSE</option>
                      <option value="mbse">Mizoram Board of School Education</option>
                      <option value="nios">NIOS</option>
                      <option value="other">Other State Board</option>
                    </select>
                    {errors.board && <span className="ff-field-error">{errors.board}</span>}
                  </div>

                  {form.board === "other" && (
                    <div className="ff-field">
                      <label>Specify Board *</label>
                      <input type="text" name="board_other" value={form.board_other} onChange={handleChange} placeholder="Enter your board name" />
                      {errors.board_other && <span className="ff-field-error">{errors.board_other}</span>}
                    </div>
                  )}

                  <div className="ff-field">
                    <label>School Name</label>
                    <input type="text" name="school_name" value={form.school_name} onChange={handleChange} placeholder="School name" />
                  </div>

                  <div className="ff-field">
                    <label>Academic Year</label>
                    <input type="text" value={form.academic_year || "Auto-populated on save"} disabled />
                  </div>
                </>
              )}

              {/* === IF NO === */}
              {form.currently_studying === "no" && (
                <>
                  <div className="ff-field">
                    <label>Highest Education Completed *</label>
                    <select name="highest_education" value={form.highest_education} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="below_8">Below Class 8</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                    {errors.highest_education && <span className="ff-field-error">{errors.highest_education}</span>}
                  </div>

                  <div className="ff-field">
                    <label>Reason for not currently studying</label>
                    <textarea name="reason_not_studying" value={form.reason_not_studying} onChange={handleChange}
                      placeholder="Optional" rows={3} maxLength={200} />
                    <span className="ff-char-count">{(form.reason_not_studying || "").length}/200</span>
                  </div>
                </>
              )}
            </>
          )}


          {/* ===== ADDRESS ===== */}
          <h3 className="ff-section-title">Address</h3>

          <div className="ff-row">
            <div className="ff-field">
              <label>State *</label>
              <select name="state" value={form.state} onChange={handleChange}>
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
              {errors.state && <span className="ff-field-error">{errors.state}</span>}
            </div>
            <div className="ff-field">
              <label>District *</label>
              <select name="district" value={form.district} onChange={handleChange} disabled={!form.state || loadingDistricts}>
                <option value="">{loadingDistricts ? "Loading..." : "Select District"}</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.district && <span className="ff-field-error">{errors.district}</span>}
            </div>
          </div>

          <div className="ff-row">
            <div className="ff-field">
              <label>City/Town *</label>
              <input type="text" name="city_town" value={form.city_town} onChange={handleChange} placeholder="Enter city or town" />
              {errors.city_town && <span className="ff-field-error">{errors.city_town}</span>}
            </div>
            <div className="ff-field">
              <label>Pin Code</label>
              <input type="text" name="pin_code" value={form.pin_code} onChange={handleChange} placeholder="Pin code" />
            </div>
          </div>


          {/* ===== Educational Qualifications (TEACHER ONLY) ===== */}
          {formType === "teacher" && (
            <>
              <h3 className="ff-section-title">Educational Qualifications</h3>

              <div className="ff-field">
                <label>Highest Degree *</label>
                <select name="highest_degree" value={form.highest_degree} onChange={handleChange}>
                  <option value="">Select Degree</option>
                  <option value="10th_pass">10th Pass</option>
                  <option value="12th_pass">12th Pass</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">Ph.D.</option>
                  <option value="other">Other</option>
                </select>
                {errors.highest_degree && <span className="ff-field-error">{errors.highest_degree}</span>}
              </div>

              <div className="ff-field">
                <label>Field of Study *</label>
                <input type="text" name="field_of_study" value={form.field_of_study} onChange={handleChange}
                  placeholder="e.g., Mathematics, Physics, English Literature" />
                {errors.field_of_study && <span className="ff-field-error">{errors.field_of_study}</span>}
              </div>

              <div className="ff-field">
                <label>Year of Completion *</label>
                <select name="year_of_completion" value={form.year_of_completion} onChange={handleChange}>
                  <option value="">Select Year</option>
                  {Array.from({ length: 2026 - 1970 + 1 }, (_, i) => 2026 - i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                {errors.year_of_completion && <span className="ff-field-error">{errors.year_of_completion}</span>}
              </div>

              <div className="ff-field">
                <label>Teaching Certifications</label>
                <div className="ff-multi-select">
                  {[
                    { value: "bed", label: "B.Ed" },
                    { value: "med", label: "M.Ed" },
                    { value: "deled", label: "D.El.Ed" },
                    { value: "ctet", label: "CTET" },
                    { value: "state_tet", label: "State TET" },
                    { value: "other", label: "Other" },
                  ].map((opt) => (
                    <label key={opt.value} className="ff-checkbox-row">
                      <input type="checkbox" checked={form.teaching_certifications.includes(opt.value)}
                        onChange={() => handleMultiCheck("teaching_certifications", opt.value)} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="ff-field">
                <label>Upload Qualification Certificate (PDF/Image, max 5MB)</label>
                <input type="file" name="qualification_certificate" accept=".pdf,image/*" onChange={handleChange} className="ff-file-input" />
                {existingFiles.qualification_certificate && !form.qualification_certificate && (
                  <span className="ff-file-existing">Certificate already uploaded</span>
                )}
                {form.qualification_certificate && (
                  <span className="ff-file-name">{form.qualification_certificate.name}</span>
                )}
              </div>
            </>
          )}


          {/* ===== Teaching Experience (TEACHER ONLY) ===== */}
          {formType === "teacher" && (
            <>
              <h3 className="ff-section-title">Teaching Experience</h3>

              <div className="ff-field">
                <label>Years of Teaching Experience *</label>
                <select name="experience_range" value={form.experience_range} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="0">New Teacher (0 years)</option>
                  <option value="lt1">Less than 1 year</option>
                  <option value="1_3">1-3 years</option>
                  <option value="3_5">3-5 years</option>
                  <option value="5_10">5-10 years</option>
                  <option value="10plus">10+ years</option>
                </select>
                {errors.experience_range && <span className="ff-field-error">{errors.experience_range}</span>}
              </div>

              <div className="ff-field">
                <label>Current Employment Status *</label>
                <select name="employment_status" value={form.employment_status} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="fulltime">Full-time teacher at school</option>
                  <option value="parttime">Part-time teacher</option>
                  <option value="private_tutor">Private tutor</option>
                  <option value="unemployed">Unemployed/Looking for opportunities</option>
                  <option value="retired">Retired teacher</option>
                </select>
                {errors.employment_status && <span className="ff-field-error">{errors.employment_status}</span>}
              </div>

              <div className="ff-field">
                <label>Currently Employed? *</label>
                <div className="ff-radio-group">
                  <label className="ff-radio-label">
                    <input type="radio" name="currently_employed" value="true"
                      checked={form.currently_employed === true} onChange={() => setForm(p => ({ ...p, currently_employed: true }))} />
                    Yes
                  </label>
                  <label className="ff-radio-label">
                    <input type="radio" name="currently_employed" value="false"
                      checked={form.currently_employed === false} onChange={() => setForm(p => ({ ...p, currently_employed: false }))} />
                    No
                  </label>
                </div>
              </div>

              {form.currently_employed && (
                <div className="ff-row">
                  <div className="ff-field">
                    <label>School/Institution Name</label>
                    <input type="text" name="current_institution" value={form.current_institution} onChange={handleChange} placeholder="Institution name" />
                  </div>
                  <div className="ff-field">
                    <label>Position/Role</label>
                    <input type="text" name="current_position" value={form.current_position} onChange={handleChange} placeholder="e.g., Senior Teacher" />
                  </div>
                </div>
              )}
            </>
          )}
          {/* ===== Verification Documents (TEACHER ONLY) ===== */}
          {formType === "teacher" && (
            <>
              <h3 className="ff-section-title">Verification Documents</h3>

              <div className="ff-field">
                <label>Government ID Type *</label>
                <select name="govt_id_type" value={form.govt_id_type} onChange={handleChange}>
                  <option value="">Select ID Type</option>
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="voter_id">Voter ID</option>
                  <option value="driving_license">Driving License</option>
                </select>
                {errors.govt_id_type && <span className="ff-field-error">{errors.govt_id_type}</span>}
              </div>

              <div className="ff-field">
                <label>ID Number *</label>
                <input type="text" name="id_number" value={form.id_number} onChange={handleChange} placeholder="Enter ID number" />
                {errors.id_number && <span className="ff-field-error">{errors.id_number}</span>}
              </div>

              <div className="ff-row">
                <div className="ff-field">
                  <label>Upload ID Proof - Front * (PDF/Image, max 5MB)</label>
                  <input type="file" name="id_proof_front" accept=".pdf,image/*" onChange={handleChange} className="ff-file-input" />
                  {existingFiles.id_proof_front && !form.id_proof_front && (
                    <span className="ff-file-existing">Front already uploaded</span>
                  )}
                  {form.id_proof_front && <span className="ff-file-name">{form.id_proof_front.name}</span>}
                  {errors.id_proof_front && <span className="ff-field-error">{errors.id_proof_front}</span>}
                </div>
                <div className="ff-field">
                  <label>Upload ID Proof - Back (optional)</label>
                  <input type="file" name="id_proof_back" accept=".pdf,image/*" onChange={handleChange} className="ff-file-input" />
                  {existingFiles.id_proof_back && !form.id_proof_back && (
                    <span className="ff-file-existing">Back already uploaded</span>
                  )}
                  {form.id_proof_back && <span className="ff-file-name">{form.id_proof_back.name}</span>}
                </div>
              </div>
            </>
          )}
          {/* ===== Course Application (TEACHER ONLY) ===== */}
          {formType === "teacher" && (
            <>
              <h3 className="ff-section-title">Course Application</h3>

              <div className="ff-field">
                <label>Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange}>
                  <option value="">Select Subject</option>
                  {["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science",
                    "History", "Geography", "Economics", "Computer Science", "Accountancy",
                    "Business Studies", "Political Science", "Other"
                  ].map((s) => (
                    <option key={s} value={s.toLowerCase().replace(/ /g, "_")}>{s}</option>
                  ))}
                </select>
                {errors.subject && <span className="ff-field-error">{errors.subject}</span>}
              </div>

              <div className="ff-field">
                <label>Boards (select at least one)</label>
                <div className="ff-multi-select">
                  {[
                    { value: "cbse", label: "CBSE" },
                    { value: "icse", label: "ICSE" },
                    { value: "mbse", label: "Mizoram Board" },
                    { value: "nios", label: "NIOS" },
                  ].map((opt) => (
                    <label key={opt.value} className="ff-checkbox-row">
                      <input type="checkbox" checked={form.boards.includes(opt.value)}
                        onChange={() => handleMultiCheck("boards", opt.value)} />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {errors.boards && <span className="ff-field-error">{errors.boards}</span>}
              </div>

              <div className="ff-field">
                <label>Classes (select at least one)</label>
                <div className="ff-multi-select">
                  {["8", "9", "10", "11", "12"].map((c) => (
                    <label key={c} className="ff-checkbox-row">
                      <input type="checkbox" checked={form.classes.includes(c)}
                        onChange={() => handleMultiCheck("classes", c)} />
                      Class {c}
                    </label>
                  ))}
                </div>
                {errors.classes && <span className="ff-field-error">{errors.classes}</span>}
              </div>

              {(form.classes.includes("11") || form.classes.includes("12")) && (
                <div className="ff-field">
                  <label>Streams (required for Class 11-12)</label>
                  <div className="ff-multi-select">
                    {[
                      { value: "science", label: "Science" },
                      { value: "commerce", label: "Commerce" },
                      { value: "arts", label: "Arts" },
                    ].map((opt) => (
                      <label key={opt.value} className="ff-checkbox-row">
                        <input type="checkbox" checked={form.streams.includes(opt.value)}
                          onChange={() => handleMultiCheck("streams", opt.value)} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  {errors.streams && <span className="ff-field-error">{errors.streams}</span>}
                </div>
              )}
            </>
          )}

          {/* ===== Skill Application (TEACHER ONLY) ===== */}
          {formType === "teacher" && (
            <>
              <h3 className="ff-section-title">Specialized Skill Application</h3>

              <div className="ff-field">
                <label>Skill Name</label>
                <input type="text" name="skill_name" value={form.skill_name} onChange={handleChange}
                  placeholder='e.g., "JEE Advanced Physics Problem Solving"' />
                {errors.skill_name && <span className="ff-field-error">{errors.skill_name}</span>}
              </div>

              <div className="ff-field">
                <label>Skill Description (max 500 chars)</label>
                <textarea name="skill_description" value={form.skill_description} onChange={handleChange}
                  placeholder="Explain your expertise in this area" rows={3} maxLength={500} />
                <span className="ff-char-count">{(form.skill_description || "").length}/500</span>
                {errors.skill_description && <span className="ff-field-error">{errors.skill_description}</span>}
              </div>

              <div className="ff-field">
                <label>Related Subject</label>
                <select name="skill_related_subject" value={form.skill_related_subject} onChange={handleChange}>
                  <option value="">Select Subject</option>
                  {["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science",
                    "History", "Geography", "Economics", "Computer Science", "Accountancy",
                    "Business Studies", "Political Science", "Other"
                  ].map((s) => (
                    <option key={s} value={s.toLowerCase().replace(/ /g, "_")}>{s}</option>
                  ))}
                </select>
                {errors.skill_related_subject && <span className="ff-field-error">{errors.skill_related_subject}</span>}
              </div>

              <div className="ff-row">
                <div className="ff-field">
                  <label>Supporting Image (JPG/PNG, max 10MB)</label>
                  <input type="file" name="skill_supporting_image" accept="image/jpeg,image/png" onChange={handleChange} className="ff-file-input" />
                  {form.skill_supporting_image && <span className="ff-file-name">{form.skill_supporting_image.name}</span>}
                </div>
                <div className="ff-field">
                  <label>Supporting Video (MP4, max 50MB)</label>
                  <input type="file" name="skill_supporting_video" accept="video/mp4" onChange={handleChange} className="ff-file-input" />
                  {form.skill_supporting_video && <span className="ff-file-name">{form.skill_supporting_video.name}</span>}
                </div>
              </div>
            </>
          )}


          {/* ===== SUBMIT ===== */}
          {errors.submit && <p className="ff-error-msg">{errors.submit}</p>}
          {success && <p className="ff-success-msg">{success}</p>}

          <div className="ff-actions">
            {!isOnboarding && (
              <button type="button" className="ff-btn-secondary" onClick={() => navigate(-1)}>
                Cancel
              </button>
            )}
            <button type="submit" className="ff-btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : isOnboarding ? "Complete Profile" : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormFillup;