import useMediaQuery from "../../../hooks/useMediaQuery";
import styles from "./Logo.module.css";
import logo from "../../../assets/logo.svg";
import favicon from "../../../assets/favicon.png";

const Logo = () => {
  // Same breakpoint as the CSS media queries (62.5em).
  const isCompact = useMediaQuery("(max-width: 62.5em)");
  const logoSrc = isCompact ? favicon : logo;
  return (
    <div className={styles["logo-container"]}>
      <img src={logoSrc} className={styles.logo} alt="KolPlace logo" />
    </div>
  );
};

export default Logo;
