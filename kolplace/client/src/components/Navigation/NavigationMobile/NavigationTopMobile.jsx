import { Link } from "react-router-dom";
import styles from "./NavigationTopMobile.module.css";
import Logo from "../Logo/Logo";
import UserIconDropDown from "../Icons/UserIcon/UserIconDropdown";
import FavouritesIcon from "../Icons/FavouritesIcon/FavouritesIcon";
import ShoppingCartIcon from "../Icons/ShoppingCartIcon/ShoppingCartIcon";
import Search from "../Search/Search";
import { useShowHide } from "../../../hooks/useShowHide";
import NavigationAside from "./NavigationAside/NavigationAside";

const TopNavMobile = () => {
  const { isOpen, showHide } = useShowHide();
  return (
    <nav className={styles["top-nav-mobile"]}>
      {isOpen && <NavigationAside onClose={showHide} />}
      <div className={styles["top-nav-mobile-container"]}>
        <div className={styles["logo-menu"]}>
          <button
            type="button"
            className={styles["menu-btn"]}
            onClick={showHide}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
          <Link to={"/"} aria-label="KolPlace home">
            <Logo />
          </Link>
        </div>

        <div className={styles["icons-container"]}>
          <UserIconDropDown />
          <FavouritesIcon />
          <ShoppingCartIcon />
        </div>
      </div>
      <Search />
    </nav>
  );
};

export default TopNavMobile;
