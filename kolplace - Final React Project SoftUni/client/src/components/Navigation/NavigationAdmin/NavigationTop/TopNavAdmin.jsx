import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";
import styles from "./TopNavAdmin.module.css";
import ThemeButton from "../../../ThemeToggler/ThemeButton";

const TopNavAdmin = () => {
  return (
    <nav className={styles["top-nav-admin"]}>
      <Link to={"/"}>
        <Logo />
      </Link>
      <ThemeButton />
    </nav>
  );
};

export default TopNavAdmin;
