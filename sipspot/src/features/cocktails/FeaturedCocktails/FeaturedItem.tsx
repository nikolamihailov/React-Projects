import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FeatureItemProps = {
    name: string;
    imgSrc: string;
};

function FeaturedItem({ name, imgSrc }: FeatureItemProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeIn" }}
        >
            <div className="featured-cocktails__item">
                <img className="featured-cocktails__img" src={imgSrc} alt={`${name} cocktail`} />
                <h3 className="featured-cocktails__title">{name}</h3>
            </div>
        </motion.div>
    );
}

export default FeaturedItem;
