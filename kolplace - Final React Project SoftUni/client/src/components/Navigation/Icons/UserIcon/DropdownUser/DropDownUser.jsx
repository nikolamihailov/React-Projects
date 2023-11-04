import styles from "./Dropdown.module.css";
const DropDownUser = () => {
  return (
    <ul className={styles["user-dropdown"]}>
      <li>Login</li>
      <li>Register</li>
    </ul>
  );
};

export default DropDownUser;
