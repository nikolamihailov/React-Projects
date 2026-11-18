import { useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./EditProfile.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { getProfile, updateProfile } from "../../../data/services/userService";
import { NotifContext } from "../../../contexts/NotificationContext";
import ImageUpload from "../../ImageUpload/ImageUpload";
import avatar from "../../../assets/avatar.png";
import Spinner from "../../Spinner/Spinner";

const FORM_VALUES = {
  FirstName: "firstName",
  LastName: "lastName",
  Email: "email",
  Avatar: "avatar",
};

// Rendered into the themed .app element so the dialog picks up the
// light/dark colour variables.
const portalTarget = () => document.querySelector(".app") || document.body;

const EditProfile = ({ onClose, update }) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    [FORM_VALUES.FirstName]: "",
    [FORM_VALUES.LastName]: "",
    [FORM_VALUES.Email]: "",
    [FORM_VALUES.Avatar]: "",
  });
  const { auth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    getProfile(auth.user?._id)
      .then((user) => {
        setProfile({
          [FORM_VALUES.FirstName]: user.firstName,
          [FORM_VALUES.LastName]: user.lastName,
          [FORM_VALUES.Email]: user.email,
          [FORM_VALUES.Avatar]: user.avatar || "",
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [auth.user?._id]);

  // Focus the dialog, close on Escape and give focus back when it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const onChange = (e) => {
    setProfile((state) => ({ ...state, [e.target.name]: e.target.value }));
    setErrors([]);
  };

  const onAvatarChange = (name, url) => {
    setProfile((state) => ({ ...state, [name]: url }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    updateProfile(auth.user?._id, profile)
      .then((data) => {
        if (data.errors) {
          setErrors(Object.values(data.errors));
        } else {
          updateNotifs([{ text: "Profile edited successfully!", type: "success" }]);
          update(data);
          onClose();
        }
      })
      .finally(() => setIsSaving(false));
  };

  const fields = [
    { name: FORM_VALUES.FirstName, label: "First name", placeholder: "John", autoComplete: "given-name" },
    { name: FORM_VALUES.LastName, label: "Last name", placeholder: "Doe", autoComplete: "family-name" },
    { name: FORM_VALUES.Email, label: "Email", placeholder: "john_doe@gmail.com", autoComplete: "email", type: "email" },
  ];

  return createPortal(
    <div className={styles["overlay"]} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form
        ref={dialogRef}
        className={styles["dialog"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onSubmit={onSubmit}
        noValidate
      >
        <div className={styles["title-bar"]}>
          <h2 id={titleId}>Edit profile</h2>
          <button type="button" className={styles["close"]} onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div className={styles["body"]}>
          {isLoading ? (
            <div className={styles["loading"]}>
              <Spinner />
            </div>
          ) : (
            <>
              {errors.length > 0 && (
                <ul className={styles["errors"]} role="alert">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
              <ImageUpload
                name={FORM_VALUES.Avatar}
                label="Avatar"
                value={profile.avatar}
                folder="avatars"
                fallback={avatar}
                alt="avatar"
                onChange={onAvatarChange}
                onBusyChange={setIsUploading}
                className={styles["avatar"]}
              />
              {fields.map((f) => (
                <div key={f.name} className={styles["field"]}>
                  <label htmlFor={f.name}>{f.label}</label>
                  <input
                    type={f.type || "text"}
                    name={f.name}
                    id={f.name}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    value={profile[f.name]}
                    onChange={onChange}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {!isLoading && (
          <div className={styles["footer"]}>
            <button type="button" className={styles["secondary"]} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles["primary"]} disabled={isUploading || isSaving}>
              {isUploading ? "Uploading image..." : isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </form>
    </div>,
    portalTarget()
  );
};

export default EditProfile;
