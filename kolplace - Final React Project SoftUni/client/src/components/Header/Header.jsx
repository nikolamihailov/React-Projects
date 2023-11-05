import "./Header.module.css";
import MainNav from "../Navigation/NavigationMain/MainNav";
import TopNav from "../Navigation/NavigationTop/TopNav";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header>
      <TopNav theme={theme} toggleTheme={toggleTheme} />
      <MainNav />
    </header>
  );
};

export default Header;
