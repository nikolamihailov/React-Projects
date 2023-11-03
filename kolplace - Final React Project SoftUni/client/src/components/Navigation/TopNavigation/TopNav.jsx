import { useState, useEffect } from "react";
import styles from "./TopNav.module.css";
import UserIconDropDown from "../Icons/UserIcon/UserIconDropdown";
import FavouritesIcon from "../Icons/FavouritesIcon/FavouritesIcon";
import ShoppingCartIcon from "../Icons/ShoppingCartIcon/ShoppingCartIcon";

const TopNav = () => {
  const [logoSrc, setLogoSrc] = useState(
    "/src/assets/logo.svg"
  );

  useEffect(() => {
    const updateLogoSrc = () => {
      if (window.innerWidth <= 700)
        setLogoSrc("/src/assets/favicon.png");
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
    <nav>
      <div>
        {/* logo */}
        <div>
          <img
            src={logoSrc}
            className={styles.logo}
            alt="KolPlace logo"
          />
        </div>
        {/*  // icons navigation */}
        <div>
          <UserIconDropDown />
          <FavouritesIcon />
          <ShoppingCartIcon />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
