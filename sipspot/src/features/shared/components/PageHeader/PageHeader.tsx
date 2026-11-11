import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageHeaderProps = {
    eyebrow: string;
    title: string;
    description?: ReactNode;
};

// the same title band opens every inner page (Recipes, Gallery, About)
function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
    return (
        <header className="page-header">
            <motion.div
                className="page-header__inner container"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <span className="heading-sub">{eyebrow}</span>
                <h1 className="heading-primary page-header__title">{title}</h1>
                {description && <p className="lede page-header__description">{description}</p>}
            </motion.div>
        </header>
    );
}

export default PageHeader;
