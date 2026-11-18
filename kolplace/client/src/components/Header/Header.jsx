import "./Header.module.css";
import MainNav from "../Navigation/NavigationMain/MainNav";
import TopNav from "../Navigation/NavigationTop/TopNav";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNavMobile from "../Navigation/NavigationMobile/NavigationTopMobile";
import useMediaQuery from "../../hooks/useMediaQuery";

const Header = () => {
  const [pageURL, setPageURL] = useState("/");
  // Same breakpoint as the CSS media queries (56.5em).
  const isMobile = useMediaQuery("(max-width: 56.5em)");
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
          {isMobile ? (
            <TopNavMobile />
          ) : (
            <>
              <TopNav />
              <MainNav />
            </>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
