import { useState, useEffect } from "react";
import styles from "./Logo.module.css";
import logo from "../../../assets/logo.svg";
import favicon from "../../../assets/favicon.png";

const Logo = () => {
  const [logoSrc, setLogoSrc] = useState(logo);

  useEffect(() => {
    const updateLogoSrc = () => {
      if (window.innerWidth <= 700) setLogoSrc(favicon);
      else setLogoSrc(logo);
    };

    updateLogoSrc();

    window.addEventListener("resize", updateLogoSrc);

    // removing the event on unmount
    return () => {
      window.removeEventListener("resize", updateLogoSrc);
    };
  }, []);
  return (
    <div className={styles["logo-container"]}>
      <img src={logoSrc} className={styles.logo} alt="KolPlace logo" />
    </div>
  );
};

export default Logo;
