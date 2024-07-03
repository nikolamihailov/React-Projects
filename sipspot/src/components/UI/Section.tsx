import { ReactNode } from "react";

type SectionProps = {
  bgColor: string;
  children: ReactNode;
};

function Section({ bgColor, children }: SectionProps) {
  return <section style={{ backgroundColor: bgColor }}>{children}</section>;
}

export default Section;
