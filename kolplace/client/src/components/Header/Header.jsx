import styles from "./Header.module.css";
import MainNav from "../Navigation/NavigationMain/MainNav";
import TopNav from "../Navigation/NavigationTop/TopNav";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TopNavMobile from "../Navigation/NavigationMobile/NavigationTopMobile";
import useMediaQuery from "../../hooks/useMediaQuery";

const Header = () => {
  const [pageURL, setPageURL] = useState("/");
  // Same breakpoint as the CSS media queries (56.5em).
  const isMobile = useMediaQuery("(max-width: 56.5em)");
  const loc = useLocation();
  const headerRef = useRef(null);

  // Publish the real header height as --header-h so pages can fill exactly
  // the space below it (e.g. sign in keeps the footer below the fold).
  useEffect(() => {
    const el = headerRef.current;
    const root = document.documentElement;
    if (!el) {
      root.style.setProperty("--header-h", "0px");
      return;
    }
    const update = () => root.style.setProperty("--header-h", `${el.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pageURL, isMobile]);

  useEffect(() => {
    setPageURL(loc.pathname);
  }, [loc]);
  return (
    <>
      {pageURL.startsWith("/admin") ? (
        ""
      ) : (
        <header className={styles["site-header"]} ref={headerRef}>
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
