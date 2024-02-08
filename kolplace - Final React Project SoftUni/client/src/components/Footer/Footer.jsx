import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [pageURL, setPageURL] = useState("/");
  const loc = useLocation();

  useEffect(() => {
    setPageURL(loc.pathname);
  }, [loc]);
  return (
    <>
      {!pageURL.startsWith("/admin") && (
        <footer className={styles["footer"]} data-testid="footer">
          <h3>All rights reserved! &copy; {new Date().getFullYear()}</h3>
          <i>
            Design:
            <a
              href="https://github.com/nikolamihailov/"
              target="_blank"
              rel="noreferrer"
            >
              Nikola Mihaylov
            </a>
          </i>
        </footer>
      )}
    </>
  );
};

export default Footer;
