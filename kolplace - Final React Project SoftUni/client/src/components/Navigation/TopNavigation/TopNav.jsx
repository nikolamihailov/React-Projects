import styles from "./TopNav.module.css";
import UserIconDropDown from "../Icons/UserIcon/UserIconDropdown";
import FavouritesIcon from "../Icons/FavouritesIcon/FavouritesIcon";
import ShoppingCartIcon from "../Icons/ShoppingCartIcon/ShoppingCartIcon";
import Logo from "../Logo/Logo";

const TopNav = () => {
  return (
    <nav className={styles["top-nav"]}>
      <div className={styles["top-nav-container"]}>
        {/* logo */}
        <Logo />
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
