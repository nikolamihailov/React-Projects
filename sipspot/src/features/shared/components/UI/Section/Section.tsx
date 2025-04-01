import { ReactNode } from "react";
import { motion } from "framer-motion";
import { sectionTransition } from "./sectionTransition";

type SectionProps = {
    sectionClassName: string,
    children: ReactNode,
};

function Section({ sectionClassName, children }: SectionProps) {
    return (
        <section className={`section section__${sectionClassName}`}>
            <motion.div {...sectionTransition}>{children}</motion.div>
        </section>
    );
}

export default Section;
