import { useState, useEffect } from "react";
import styles from "./Logo.module.css";

const Logo = () => {
  const [logoSrc, setLogoSrc] = useState("/src/assets/logo.svg");

  useEffect(() => {
    const updateLogoSrc = () => {
      if (window.innerWidth <= 700) setLogoSrc("/src/assets/favicon.png");
      else setLogoSrc("/src/assets/logo.svg");
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
