import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles["header"]}>
      <Navigation />
    </header>
  );
}

export default Header;
