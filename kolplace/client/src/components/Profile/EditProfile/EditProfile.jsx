import { useContext, useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { getProfile, updateProfile } from "../../../data/services/userService";
import { v4 as uuidv4 } from "uuid";
import { NotifContext } from "../../../contexts/NotificationContext";
import Notification from "../../Notifications/Notification";
import ImageUpload from "../../ImageUpload/ImageUpload";
import avatar from "../../../assets/avatar.png";
import Spinner from "../../Spinner/Spinner";

const FORM_VALUES = {
  FirstName: "firstName",
  LastName: "lastName",
  Email: "email",
  Avatar: "avatar",
};

const EditProfile = ({ onClose, update }) => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [profile, setProfile] = useState({
    [FORM_VALUES.FirstName]: "",
    [FORM_VALUES.LastName]: "",
    [FORM_VALUES.Email]: "",
    [FORM_VALUES.Avatar]: "",
  });
  const { auth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    getProfile(auth.user?._id)
      .then((user) => {
        setProfile({
          [FORM_VALUES.FirstName]: user.firstName,
          [FORM_VALUES.LastName]: user.lastName,
          [FORM_VALUES.Email]: user.email,
          [FORM_VALUES.PhoneNumber]: user.phoneNumber || "",
          [FORM_VALUES.Avatar]: user.avatar || "",
        });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [auth.user?._id]);

  const onChange = (e) => {
    setProfile((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onAvatarChange = (name, url) => {
    setProfile((state) => ({ ...state, [name]: url }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    updateProfile(auth.user?._id, profile).then((data) => {
      if (data.errors) {
        setErrors(Object.values(data.errors));
      } else {
        updateNotifs([
          { text: "Profile edited successfully!", type: "success" },
        ]);
        update(data);
        onClose();
      }
    });
  };
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <form className={styles["edit-profile"]} onSubmit={onSubmit}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles["form-group"]}>
              <ImageUpload
                name={FORM_VALUES.Avatar}
                label="Avatar"
                value={profile.avatar}
                folder="avatars"
                fallback={avatar}
                alt="avatar"
                onChange={onAvatarChange}
                onBusyChange={setIsUploading}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.FirstName}>First Name</label>
              <input
                type="text"
                name={FORM_VALUES.FirstName}
                id={FORM_VALUES.FirstName}
                placeholder="John"
                value={profile[FORM_VALUES.FirstName]}
                onChange={onChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.LastName}>Last Name</label>
              <input
                type="text"
                name={FORM_VALUES.LastName}
                id={FORM_VALUES.LastName}
                placeholder="Doe"
                value={profile[FORM_VALUES.LastName]}
                onChange={onChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.Email}>Email</label>
              <input
                type="text"
                name={FORM_VALUES.Email}
                id={FORM_VALUES.Email}
                placeholder="john_doe@gmail.com"
                value={profile[FORM_VALUES.Email]}
                onChange={onChange}
              />
            </div>

            <button disabled={isUploading}>{isUploading ? "Uploading image..." : "Edit"}</button>
          </>
        )}
      </form>
      {errors.length > 0 && (
        <div className={styles["errors-container"]}>
          {errors.map((e) => (
            <Notification text={e} type={"error"} key={uuidv4()} />
          ))}
        </div>
      )}
    </>
  );
};

export default EditProfile;
