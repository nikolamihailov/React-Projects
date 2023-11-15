import { useContext } from "react";
import styles from "./AdminInfo.module.css";
import { AuthContext } from "../../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const AdminInfo = () => {
  const { names, role } = useContext(AuthContext);
  const [firstName, lastName] = names;
  return (
    <div className={styles["info"]}>
      <Link to={"/admin-panel"}>
        <img src="/src/assets/avatar.png" alt="" />
      </Link>
      <p>
        {firstName} {lastName}
      </p>
      <p>Role: {role}</p>
    </div>
  );
};
export default AdminInfo;
