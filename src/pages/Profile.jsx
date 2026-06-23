import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import "../css/Profile.css";

// localStorage key scoped to the active learner profile
const storageKey = (profileId) => `shiksha_profile_${profileId}`;

const loadLocalProfile = (profileId) => {
  if (!profileId) return {};
  try {
    const raw = localStorage.getItem(storageKey(profileId));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
};

const saveLocalProfile = (profileId, data) => {
  if (!profileId) return;
  try {
    localStorage.setItem(storageKey(profileId), JSON.stringify(data));
  } catch { /* storage full — ignore */ }
};

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [avatar, setAvatar]     = useState(null);
  const [avatarType, setAvatarType] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [tempAvatarType, setTempAvatarType] = useState(null);
  const [tempAvatarFile, setTempAvatarFile] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [activeProfileId, setActiveProfileId] = useState(null); // ← FIX: store profile id
  const [studentInfo, setStudentInfo] = useState(null);
  const [courses, setCourses]   = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Public profile data — persisted in localStorage, keyed by profileId
  const [about, setAbout]         = useState("");
  const [subjects, setSubjects]   = useState([]);
  const [hobbies, setHobbies]     = useState([]);
  const [languages, setLanguages] = useState([]);

  // Ephemeral edit-mode state
  const [editName, setEditName]           = useState("");
  const [editAbout, setEditAbout]         = useState("");
  const [editSubjects, setEditSubjects]   = useState([]);
  const [editHobbies, setEditHobbies]     = useState([]);
  const [editLanguages, setEditLanguages] = useState([]);
  const [newSubject, setNewSubject]       = useState("");
  const [newHobby, setNewHobby]           = useState("");
  const [newLanguage, setNewLanguage]     = useState("");

  const emojis = [
    "😀","😎","🤓","😊","🥳","😇","🤩","😍",
    "🦊","🐱","🐶","🐼","🦁","🐯","🐻","🐨",
    "👨‍🎓","👩‍🎓","👨‍💻","👩‍💻","🧑‍🎨","👨‍🔬","👩‍🔬","🧑‍🚀",
    "⭐","🌟","✨","💫","🔥","💎","🎯","🎨",
  ];

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const [meRes, spRes] = await Promise.all([
        api.get("/accounts/me/"),
        api.get("/accounts/student/profile/"),
      ]);
      const me = meRes.data;
      const sp = spRes.data;

      // ── FIX: capture active profile id for subsequent PATCHes ──
      const profileId = me.active_profile?.id || null;
      setActiveProfileId(profileId);

      // me.profile is _legacy_profile_dict(active_learner_profile)
      const legacyProfile = me.profile || {};

      setStudentInfo({
        name:         sp.name         || legacyProfile.full_name  || me.username || "",
        email:        sp.email        || me.email                 || "",
        studentId:    sp.student_id                               || "",
        phone:        sp.phone        || legacyProfile.phone      || "",
        gender:       sp.gender                                   || "",
        dateOfBirth:  sp.date_of_birth                           || "",
        state:        sp.state                                    || "",
        district:     sp.district                                 || "",
        city:         sp.city_town                                || "",
        pinCode:      sp.pin_code                                 || "",
        currentClass: sp.current_class                           || "",
        stream:       sp.stream                                   || "",
        board:        sp.board                                    || "",
        schoolName:   sp.school_name  || legacyProfile.school_name || "",
      });

      // ── FIX: avatar comes from the active learner profile ──
      const ap = me.active_profile;
      setAvatar(ap?.avatar || sp.photo || null);
      setAvatarType(ap?.avatar_type || null);

      setCourses(me.enrollments || []);

      // ── FIX: load persisted public-profile data from localStorage ──
      if (profileId) {
        const local = loadLocalProfile(profileId);
        setAbout(local.about       || "");
        setSubjects(local.subjects || []);
        setHobbies(local.hobbies   || []);
        setLanguages(local.languages || []);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditName(studentInfo?.name || "");
    setEditAbout(about);
    setEditSubjects([...subjects]);
    setEditHobbies([...hobbies]);
    setEditLanguages([...languages]);
    setNewSubject(""); setNewHobby(""); setNewLanguage("");
    setIsEditing(true);
  };

  const handleEditCancel = () => { setIsEditing(false); };

  const handleEditSave = async () => {
    setSaving(true);

    // ── FIX: persist about/interests to localStorage ──
    const localData = {
      about: editAbout,
      subjects: editSubjects,
      hobbies: editHobbies,
      languages: editLanguages,
    };
    saveLocalProfile(activeProfileId, localData);
    setAbout(editAbout);
    setSubjects(editSubjects);
    setHobbies(editHobbies);
    setLanguages(editLanguages);

    try {
      // ── FIX: PATCH display_name to the active learner profile ──
      if (activeProfileId && editName.trim()) {
        await api.patch(`/accounts/profiles/${activeProfileId}/`, {
          display_name: editName.trim(),
        });
      }
      await fetchProfile();
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setSaving(false);
      setIsEditing(false);
    }
  };

  const handleOpenPicker = () => {
    setTempAvatar(avatar);
    setTempAvatarType(avatarType);
    setShowPicker(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setTempAvatarFile(file);
    setTempAvatar(URL.createObjectURL(file));
    setTempAvatarType("image");
  };

  const handleEmojiSelect = (emoji) => {
    setTempAvatar(emoji);
    setTempAvatarType("emoji");
  };

  const handleAvatarSave = async () => {
    if (!activeProfileId) return;
    try {
      // ── FIX: PATCH avatar to the active learner profile endpoint ──
      if (tempAvatarType === "emoji") {
        await api.patch(`/accounts/profiles/${activeProfileId}/`, {
          avatar_emoji: tempAvatar,
        });
      } else if (tempAvatarType === "image" && tempAvatarFile) {
        const formData = new FormData();
        formData.append("avatar_image", tempAvatarFile);
        await api.patch(`/accounts/profiles/${activeProfileId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchProfile();
      setShowPicker(false);
      setTempAvatar(null);
      setTempAvatarType(null);
      setTempAvatarFile(null);
    } catch (err) {
      console.error("Avatar update failed", err);
    }
  };

  const handlePickerCancel = () => {
    setShowPicker(false);
    setTempAvatar(null);
    setTempAvatarType(null);
    setTempAvatarFile(null);
  };

  const addSubject  = () => { if (newSubject.trim())  { setEditSubjects(p => [...p, newSubject.trim()]);   setNewSubject("");  } };
  const addHobby    = () => { if (newHobby.trim())    { setEditHobbies(p  => [...p, newHobby.trim()]);     setNewHobby("");    } };
  const addLanguage = () => { if (newLanguage.trim()) { setEditLanguages(p => [...p, newLanguage.trim()]); setNewLanguage(""); } };

  if (loading) return <div className="profileLoading">Loading...</div>;

  const metaBits = [
    studentInfo?.currentClass && `Class ${studentInfo.currentClass}`,
    studentInfo?.stream,
    studentInfo?.board?.toUpperCase(),
  ].filter(Boolean);

  const locationBits = [studentInfo?.city, studentInfo?.district, studentInfo?.state]
    .filter(Boolean).join(", ");

  const langBadgeText = languages.length > 0 ? languages.join(" & ") : null;

  const displaySubjects = isEditing ? editSubjects : subjects;
  const displayHobbies  = isEditing ? editHobbies  : hobbies;

  return (
    <div className="profilePage">
      <div className="profileContainer">
        {/* ── Header ── */}
        <div className="profileHeader">
          <div className="profileHeader__left">
            <div className="profileHeader__avatarWrap">
              <div className="profileHeader__avatar" onClick={handleOpenPicker} style={{ cursor: "pointer" }}>
                {avatar ? (
                  avatarType === "emoji" ? (
                    <span className="profileHeader__avatarEmoji">{avatar}</span>
                  ) : (
                    <img src={avatar} alt={studentInfo?.name} />
                  )
                ) : (
                  <span className="profileHeader__avatarFallback">
                    {studentInfo?.name?.[0]?.toUpperCase() || "?"}
                  </span>
                )}
                <div className="profileHeader__avatarOverlay">Edit</div>
              </div>

              {showPicker && (
                <div className="avatarPicker__backdrop" onClick={handlePickerCancel}>
                  <div className="avatarPicker" onClick={(e) => e.stopPropagation()}>
                    <div className="avatarPicker__header">
                      <span>{avatar ? "Change Avatar" : "Choose Avatar"}</span>
                      <button className="avatarPicker__close" onClick={handlePickerCancel}>×</button>
                    </div>

                    <div className="avatarPicker__preview">
                      <div className="avatarPicker__previewCircle">
                        {tempAvatar ? (
                          tempAvatarType === "emoji" ? (
                            <span className="avatarPicker__previewEmoji">{tempAvatar}</span>
                          ) : (
                            <img src={tempAvatar} alt="Preview" className="avatarPicker__previewImg" />
                          )
                        ) : (
                          <span className="avatarPicker__previewPlaceholder">Preview</span>
                        )}
                      </div>
                    </div>

                    <div className="avatarPicker__section">
                      <p className="avatarPicker__label">Upload Image</p>
                      <label className="avatarPicker__uploadBtn">
                        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        Choose File
                      </label>
                    </div>

                    <div className="avatarPicker__section">
                      <p className="avatarPicker__label">Or Select Emoji</p>
                      <div className="avatarPicker__emojiGrid">
                        {emojis.map((emoji, idx) => (
                          <button
                            key={idx}
                            className={`avatarPicker__emojiBtn ${tempAvatar === emoji ? "avatarPicker__emojiBtn--selected" : ""}`}
                            onClick={() => handleEmojiSelect(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="avatarPicker__actions">
                      <button className="avatarPicker__cancelBtn" onClick={handlePickerCancel}>Cancel</button>
                      <button className="avatarPicker__saveBtn" onClick={handleAvatarSave} disabled={!tempAvatar}>Save</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="profileHeader__info">
              {isEditing ? (
                <div className="profileHeader__nameRow">
                  <input
                    className="profileHeader__nameInput"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Your name"
                  />
                  <button className="profileHeader__nameClear" onClick={() => setEditName("")}>×</button>
                </div>
              ) : (
                <h2 className="profileHeader__name">{studentInfo?.name}</h2>
              )}

              {metaBits.length > 0 && (
                <div className="profileHeader__metaRow">
                  <span>• {metaBits.join("  •  ")}</span>
                </div>
              )}
              {studentInfo?.schoolName && (
                <div className="profileHeader__metaRow">
                  <span>• {studentInfo.schoolName}</span>
                </div>
              )}
              {studentInfo?.studentId && (
                <div className="profileHeader__metaRow">
                  <span>• {studentInfo.studentId}</span>
                </div>
              )}
              {locationBits && (
                <div className="profileHeader__metaRow">
                  <span>• {locationBits}</span>
                </div>
              )}

              {!isEditing && (
                <div className="profileHeader__badges">
                  <span className="profileBadge profileBadge--online">
                    <span className="profileBadge__dot" />
                    Online
                  </span>
                  {langBadgeText && (
                    <span className="profileBadge profileBadge--lang">{langBadgeText}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="profileHeader__actions">
            {isEditing ? (
              <div className="profileHeader__editBtns">
                <button className="profileBtn profileBtn--outline" onClick={handleEditCancel}>Cancel</button>
                <button className="profileBtn profileBtn--solid" onClick={handleEditSave} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <>
                <div className="profileHeader__editBtns">
                  <button className="profileBtn profileBtn--outline" onClick={handleEditClick}>
                    Edit Profile
                  </button>
                </div>
                <button
                  className="profileBtn profileBtn--outline profileBtn--private"
                  onClick={() => navigate("/private-details")}
                >
                  Private Details
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── About ── */}
        <hr className="profileDivider" />
        <div className="profileSection">
          <h3 className="profileSection__title">About</h3>
          {isEditing ? (
            <textarea
              className="profileSection__textarea"
              value={editAbout}
              onChange={(e) => setEditAbout(e.target.value)}
              placeholder="Tell something about yourself..."
            />
          ) : about ? (
            <p className="profileSection__text">{about}</p>
          ) : (
            <p className="profileSection__placeholder">Add something about yourself...</p>
          )}
        </div>

        {/* ── Interests ── */}
        <hr className="profileDivider" />
        <div className="profileSection">
          <h3 className="profileSection__title">Interests</h3>
          <div className="interests__grid">
            <div>
              <h4 className="interests__colTitle">Subjects</h4>
              {displaySubjects.map((s, i) => (
                <div key={i} className="interests__item interests__item--narrow">
                  <span>• {s}</span>
                  {isEditing && (
                    <button
                      className="interests__removeBtn"
                      onClick={() => setEditSubjects(editSubjects.filter((_, idx) => idx !== i))}
                    >×</button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="interests__addRow">
                  <span className="interests__addBullet">•</span>
                  <input
                    className="interests__addInput"
                    placeholder="Add Subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSubject()}
                  />
                </div>
              )}
            </div>

            <div>
              <h4 className="interests__colTitle">Hobbies</h4>
              {displayHobbies.map((h, i) => (
                <div key={i} className="interests__item interests__item--narrow">
                  <span>• {h}</span>
                  {isEditing && (
                    <button
                      className="interests__removeBtn"
                      onClick={() => setEditHobbies(editHobbies.filter((_, idx) => idx !== i))}
                    >×</button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="interests__addRow">
                  <span className="interests__addBullet">•</span>
                  <input
                    className="interests__addInput"
                    placeholder="Add Hobby"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addHobby()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Languages (edit mode only) ── */}
        {isEditing && (
          <>
            <hr className="profileDivider" />
            <div className="profileSection">
              <h3 className="profileSection__title">Languages</h3>
              {editLanguages.map((l, i) => (
                <div key={i} className="interests__item interests__item--narrow">
                  <span>• {l}</span>
                  <button
                    className="interests__removeBtn"
                    onClick={() => setEditLanguages(editLanguages.filter((_, idx) => idx !== i))}
                  >×</button>
                </div>
              ))}
              <div className="interests__addRow">
                <span className="interests__addBullet">•</span>
                <input
                  className="interests__addInput"
                  placeholder="Add Language"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLanguage()}
                />
              </div>
            </div>
          </>
        )}

        {/* ── Private Session Activity (view mode only) ── */}
        {!isEditing && (
          <>
            <hr className="profileDivider" />
            <div className="profileSection">
              <h3 className="profileSection__title">Private Session Activity</h3>
              <ul className="activity__list">
                <li><strong>24/25</strong> Private Sessions Attended</li>
                <li><strong>95%</strong> Attendance Rate</li>
              </ul>
            </div>
          </>
        )}

        <hr className="profileDivider" />
      </div>

      {/* ── Courses Enrolled ── */}
      {courses.length > 0 && (
        <div className="coursesSection">
          <div className="coursesSection__table">
            <div className="coursesSection__header">
              <span className="coursesSection__headerItem">COURSES ENROLLED</span>
              <span className="coursesSection__headerItem">BATCH CODE</span>
            </div>
            <div className="coursesSection__body">
              {courses.map((item) => (
                <div key={item.id} className="coursesSection__row">
                  <span className="coursesSection__course">{item.course_title}</span>
                  <span className="coursesSection__batch">{item.batch_code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
