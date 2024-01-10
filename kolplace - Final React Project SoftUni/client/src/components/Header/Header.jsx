import "./Header.module.css";
import MainNav from "../Navigation/NavigationMain/MainNav";
import TopNav from "../Navigation/NavigationTop/TopNav";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNavMobile from "../Navigation/NavigationMobile/NavigationTopMobile";

const Header = () => {
  const [pageURL, setPageURL] = useState("/");
  const [isMobile, setIsMobile] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setPageURL(loc.pathname);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
