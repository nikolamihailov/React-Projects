import MainNav from "../Navigation/MainNavigation/MainNav";
import TopNav from "../Navigation/TopNavigation/TopNav";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header>
      <TopNav theme={theme} toggleTheme={toggleTheme} />
      <MainNav />
    </header>
  );
};

export default Header;
