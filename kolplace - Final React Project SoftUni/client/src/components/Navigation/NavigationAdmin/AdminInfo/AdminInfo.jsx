import { useContext, useEffect, useState } from "react";
import styles from "./AdminInfo.module.css";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { getProfile } from "../../../../data/services/userService";
import avatar from "../../../../assets/avatar.png";
import Spinner from "../../../Spinner/Spinner";

const AdminInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getProfile(auth.user?._id)
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [auth.user?._id]);

  return (
    <div className={styles["info"]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Link to={"/admin-panel"}>
            <img src={profile?.avatar ? profile.avatar : avatar} alt="avatar" />
          </Link>
          <p>
            {profile?.firstName} {profile?.lastName}
          </p>
          <p>Role: {profile?.role}</p>
        </>
      )}
    </div>
  );
};
export default AdminInfo;
