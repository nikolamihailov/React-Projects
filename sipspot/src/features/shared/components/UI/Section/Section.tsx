import { ReactNode } from "react";

type SectionProps = {
    sectionClassName: string,
    children: ReactNode,
};

function Section({ sectionClassName, children }: SectionProps) {
    return <section className={`section section__${sectionClassName}`}>{children}</section>;
}

export default Section;
