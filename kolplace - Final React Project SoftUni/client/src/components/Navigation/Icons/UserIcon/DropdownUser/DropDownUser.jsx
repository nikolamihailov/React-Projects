import styles from "./Dropdown.module.css";
import { Link } from "react-router-dom";
const DropDownUser = () => {
  return (
    <ul className={styles["user-dropdown"]}>
      <Link to={"/login"}>
        <li>
          <i className="fa-solid fa-key"></i>
          <span>Login</span>
        </li>
      </Link>

      <Link to={"/register"}>
        <li>
          <i className="fa-solid fa-user-plus"></i>
          <span>Register</span>
        </li>
      </Link>
    </ul>
  );
};

export default DropDownUser;
