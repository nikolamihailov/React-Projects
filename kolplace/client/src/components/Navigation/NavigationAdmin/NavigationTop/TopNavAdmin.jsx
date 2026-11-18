import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";
import styles from "./TopNavAdmin.module.css";
import ThemeButton from "../../../ThemeToggler/ThemeButton";

const TopNavAdmin = ({ isMenuOpen, onMenuToggle }) => {
  return (
    <nav className={styles["top-nav-admin"]}>
      <button
        type="button"
        className={styles["menu-button"]}
        onClick={onMenuToggle}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="admin-side-menu"
      >
        <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>
      <Link to={"/"} className={styles["logo"]}>
        <Logo />
      </Link>
      <ThemeButton />
    </nav>
  );
};

export default TopNavAdmin;
