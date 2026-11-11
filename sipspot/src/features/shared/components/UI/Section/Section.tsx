import { ReactNode } from "react";
import { motion } from "framer-motion";
import { sectionTransition } from "./sectionTransition";

type SectionProps = {
    sectionClassName: string;
    id?: string;
    children: ReactNode;
};

function Section({ sectionClassName, id, children }: SectionProps) {
    return (
        <section id={id} className={`section section__${sectionClassName}`}>
            <motion.div {...sectionTransition}>{children}</motion.div>
        </section>
    );
}

export default Section;
