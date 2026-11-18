import DropDownUser from "./DropdownUser/DropDownUser";
import styles from "../Icons.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";

// Opens on click/tap (phones have no hover) and also on hover where a mouse is
// available. Closes on an outside click, Escape or navigation.
const UserIconDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (e) => ref.current && !ref.current.contains(e.target) && setIsOpen(false);
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={styles["dropdown-container"]}
      onMouseEnter={canHover ? () => setIsOpen(true) : undefined}
      onMouseLeave={canHover ? () => setIsOpen(false) : undefined}
    >
      <button
        type="button"
        className={styles["icon-btn"]}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
      >
        <i className="fa-regular fa-user" aria-hidden="true"></i>
        {isAuthenticated && <i className="fa-regular fa-circle-check" aria-hidden="true"></i>}
      </button>
      {isOpen && <DropDownUser mouseLeave={() => setIsOpen(false)} />}
    </div>
  );
};
export default UserIconDropDown;
