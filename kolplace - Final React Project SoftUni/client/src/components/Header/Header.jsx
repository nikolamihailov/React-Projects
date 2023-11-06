import "./Header.module.css";
import MainNav from "../Navigation/NavigationMain/MainNav";
import TopNav from "../Navigation/NavigationTop/TopNav";

const Header = () => {
  return (
    <header>
      <TopNav />
      <MainNav />
    </header>
  );
};

export default Header;
