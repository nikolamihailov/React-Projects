import { ReactNode } from "react";
import { m } from "framer-motion";
import { sectionTransition } from "./sectionTransition";

type SectionProps = {
    sectionClassName: string;
    id?: string;
    children: ReactNode;
};

function Section({ sectionClassName, id, children }: SectionProps) {
    return (
        <section id={id} className={`section section__${sectionClassName}`}>
            <m.div {...sectionTransition}>{children}</m.div>
        </section>
    );
}

export default Section;
