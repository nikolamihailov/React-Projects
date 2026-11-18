import { useCallback, useContext, useEffect, useState } from "react";
import { getProfile } from "../../data/services/userService";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./UserProfile.module.css";
import EditProfile from "./EditProfile/EditProfile";
import { useShowHide } from "../../hooks/useShowHide";
import useTitle from "../../hooks/useTitle";
import Spinner from "../Spinner/Spinner";
import { NotifContext } from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";

const UserProfile = () => {
  useTitle("My Profile | KolPlace");
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, showHide } = useShowHide();
  const { auth, updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    getProfile(auth.user?._id)
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        setProfile(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [auth.user?._id, navigateTo, updateAuth, updateNotifs]);

  const update = useCallback((data) => setProfile(data), []);

  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  const details = [
    { label: "First name", value: profile?.firstName },
    { label: "Last name", value: profile?.lastName },
    { label: "Email", value: profile?.email },
    { label: "Role", value: profile?.role },
  ];

  return (
    <section className={styles["user-profile"]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles["container"]}>
          <div className={styles["page-heading"]}>
            <h1>My profile</h1>
            <p>Your personal details and account information.</p>
          </div>

          <div className={`${styles["card"]} ${styles["summary"]}`}>
            <img src={profile?.avatar ? profile?.avatar : avatar} alt="Your avatar" />
            <div className={styles["identity"]}>
              <h2>{fullName || "Your profile"}</h2>
              <p>{profile?.email}</p>
              {profile?.role && <span className={styles["role"]}>{profile.role}</span>}
            </div>
            <button type="button" className={styles["secondary"]} onClick={showHide}>
              <i className="fa-solid fa-pen" aria-hidden="true"></i>
              Edit profile
            </button>
          </div>

          <div className={styles["card"]}>
            <h2 className={styles["card-title"]}>Account details</h2>
            <dl className={styles["details"]}>
              {details.map((d) => (
                <div key={d.label} className={styles["detail-row"]}>
                  <dt>{d.label}</dt>
                  <dd>{d.value || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {isOpen && <EditProfile onClose={showHide} update={update} />}
    </section>
  );
};

export default UserProfile;
