import { useCallback, useContext, useEffect, useState } from "react";
import { getProfile } from "../../data/services/userService";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./UserProfile.module.css";
import EditProfile from "./EditProfile/EditProfile";
import { useShowHide } from "../../hooks/useShowHide";
import useTitle from "../../hooks/useTitle";
import Spinner from "../Spinner/Spinner";

const UserProfile = () => {
  useTitle("My Profile | KolPlace");
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, showHide } = useShowHide();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getProfile(auth.user?._id)
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [auth.user?._id]);

  const update = useCallback((data) => setProfile(data), []);

  return (
    <section className={styles["user-profile"]}>
      <h1>
        <i className="fa-regular fa-user"></i>My Profile{" "}
      </h1>
      <i
        className="fa-solid fa-pen-to-square"
        onClick={showHide}
        title="Edit Profile"
      ></i>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles["info"]}>
          <img src={profile?.avatar} alt="avatar" />
          <h2>Role: {profile?.role}</h2>
          <p>
            <strong>First Name: </strong>
            {profile?.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {profile?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile?.email}
          </p>
        </div>
      )}

      {isOpen && <EditProfile onClose={showHide} update={update} />}
    </section>
  );
};

export default UserProfile;
