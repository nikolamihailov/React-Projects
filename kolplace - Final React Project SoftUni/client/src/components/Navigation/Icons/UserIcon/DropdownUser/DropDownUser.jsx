import styles from "./Dropdown.module.css";
const DropDownUser = () => {
  return (
    <ul className={styles["user-dropdown"]}>
      <li>
        <i className="fa-solid fa-key"></i>
        <span>Login</span>
      </li>

      <li>
        <i className="fa-solid fa-user-plus"></i>
        <span>Register</span>
      </li>
    </ul>
  );
};

export default DropDownUser;
