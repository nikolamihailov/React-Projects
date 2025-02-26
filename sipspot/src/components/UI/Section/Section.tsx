import { ReactNode } from "react";
import { Colors } from "../../../types/Colors";

type SectionProps = {
  bgColor?: string;
  children: ReactNode;
};

function Section({ bgColor = Colors.White, children }: SectionProps) {
  return (
    <section style={{ backgroundColor: bgColor }} className="section">
      {children}
    </section>
  );
}

export default Section;
