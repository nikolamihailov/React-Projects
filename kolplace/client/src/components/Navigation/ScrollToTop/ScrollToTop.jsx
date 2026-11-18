import { useState, useEffect, useCallback } from "react";
import styles from "./ScrollToTop.module.css";

const SHOW_AFTER = 600; // px scrolled before the button appears
const GAP = 16; // px kept between the button and the footer

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lift, setLift] = useState(0);

  // Show after scrolling down, and once the footer comes into view raise the
  // button by the visible part of the footer so it never sits on top of it.
  const update = useCallback(() => {
    setIsVisible(window.scrollY > SHOW_AFTER);
    const footer = document.querySelector("footer");
    const visibleFooter = footer ? window.innerHeight - footer.getBoundingClientRect().top : 0;
    setLift(visibleFooter > 0 ? visibleFooter + GAP : 0);
  }, []);

  const scrollToTop = useCallback(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <button
      type="button"
      className={isVisible ? styles["visible"] : styles["hidden"]}
      style={lift ? { transform: `translateY(-${lift}px)` } : undefined}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};

export default ScrollToTop;
