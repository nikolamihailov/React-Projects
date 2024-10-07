import { ReactNode, CSSProperties } from "react";

type SectionProps = {
  bgColor: string;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
};

function Section({ bgColor = "#fff", children, id, style = {} }: SectionProps) {
  return (
    <section
      style={{
        backgroundColor: bgColor,
        padding: "9.6rem 0",
        ...style,
      }}
      id={id}
    >
      {children}
    </section>
  );
}

export default Section;
