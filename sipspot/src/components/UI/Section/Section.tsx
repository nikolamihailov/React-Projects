import { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  bgColor?: string;
  children: ReactNode;
};

function Section({ bgColor = "#000", children }: SectionProps) {
  return (
    <section style={{ backgroundColor: bgColor }} className={styles["section"]}>
      {children}
    </section>
  );
}

export default Section;
