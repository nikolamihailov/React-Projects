import styles from "./UserProfile.module.css";
import { motion } from "framer-motion";
import { formatDate } from "../../../../utils/dateFormatter";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import defaultAvatar from "../../../../assets/avatar.png";

const UserProfile = ({
  _id,
  firstName,
  lastName,
  avatar,
  role,
  createdAt,
  openDelete,
}) => {
  const { auth } = useContext(AuthContext);
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02, y: -10, transition: 0.2 }}
      className={styles["admin-user-profile"]}
    >
      <div>
        {auth.user?._id === _id && (
          <p
            style={{
              fontWeight: "bold",
              fontSize: "19px",
              marginBottom: "15px",
            }}
          >
            You
          </p>
        )}
        {role !== "admin" && (
          <button onClick={() => openDelete(_id)} title={"Delete User"}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        )}
        {role === "admin" && auth.user?._id !== _id && (
          <button disabled={true} title="Admin">
            <i className="fas fa-user-shield"></i>
          </button>
        )}
      </div>
      <img src={avatar ? avatar : defaultAvatar} alt="avatar" />
      <h2>{firstName + " " + lastName}</h2>
      <h3>{role}</h3>
      <span>
        Created: <br />
        {formatDate(createdAt)}
      </span>
    </motion.div>
  );
};

export default UserProfile;
