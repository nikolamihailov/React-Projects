import "./Header.module.css";
import MainNav from "../Navigation/NavigationMain/MainNav";
import TopNav from "../Navigation/NavigationTop/TopNav";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [pageURL, setPageURL] = useState("/");
  const loc = useLocation();

  useEffect(() => {
    setPageURL(loc.pathname);
  }, [loc]);
  return (
    <>
      {pageURL.startsWith("/admin") ? (
        ""
      ) : (
        <header>
          <TopNav />
          <MainNav />
        </header>
      )}
    </>
  );
};

export default Header;
