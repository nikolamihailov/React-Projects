import styles from "./TopNav.module.css";
import UserIconDropDown from "../Icons/UserIcon/UserIconDropdown";
import FavouritesIcon from "../Icons/FavouritesIcon/FavouritesIcon";
import ShoppingCartIcon from "../Icons/ShoppingCartIcon/ShoppingCartIcon";
import Logo from "../Logo/Logo";
import ThemeButton from "../../ThemeToggler/ThemeButton";
import Search from "../Search/Search";

const TopNav = ({ theme, toggleTheme }) => {
  return (
    <nav className={styles["top-nav"]}>
      <div className={styles["top-nav-container"]}>
        {/* logo */}
        <Logo />
        <Search />
        {/*  // icons navigation */}
        <div>
          <div className={styles["icons-container"]}>
            <UserIconDropDown />
            <FavouritesIcon />
            <ShoppingCartIcon />
          </div>
        </div>
      </div>
      <ThemeButton
        toggleTheme={toggleTheme}
        theme={theme}
      />
    </nav>
  );
};

export default TopNav;
