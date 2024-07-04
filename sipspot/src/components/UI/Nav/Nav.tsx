import { ReactNode } from "react";
import styles from "./Nav.module.css";

type NavProps = {
  bgColor?: string;
  children: ReactNode;
};

function Nav({ bgColor = "#000", children }: NavProps) {
  return (
    <nav style={{ backgroundColor: bgColor }} className={styles["nav"]}>
      {children}
    </nav>
  );
}

export default Nav;
