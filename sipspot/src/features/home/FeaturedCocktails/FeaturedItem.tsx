import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FeaturedCocktail } from "@/data/featuredCocktails";

type FeaturedItemProps = {
    cocktail: FeaturedCocktail;
    index: number;
};

function FeaturedItem({ cocktail, index }: FeaturedItemProps) {
    return (
        <motion.li
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        >
            <Link className="featured-cocktails__item" to={`/recipes/${cocktail.id}`}>
                <div className="featured-cocktails__img-box">
                    <img className="featured-cocktails__img" src={cocktail.imgSrc} alt="" width={200} height={200} />
                </div>
                <h3 className="featured-cocktails__title">{cocktail.name}</h3>
                <p className="featured-cocktails__notes">{cocktail.notes}</p>
                <span className="featured-cocktails__cta">
                    View recipe <IoArrowForward aria-hidden="true" />
                </span>
            </Link>
        </motion.li>
    );
}

export default FeaturedItem;
