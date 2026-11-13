import { motion } from "framer-motion";
import { FaCocktail, FaGlassCheers, FaLeaf, FaStar } from "react-icons/fa";
import SectionInfo from "@/features/shared/components/SectionInfo";
import Section from "@/features/shared/components/UI/Section/Section";

const features = [
    {
        icon: FaCocktail,
        title: "Exquisite cocktails",
        description: "Crafted by expert mixologists using the finest spirits and house-made syrups.",
    },
    {
        icon: FaStar,
        title: "Premium quality",
        description: "Top-shelf spirits, clear hand-cut ice and juice squeezed fresh every evening.",
    },
    {
        icon: FaGlassCheers,
        title: "Elegant atmosphere",
        description: "Low light, velvet booths and a soundtrack made for long conversations.",
    },
    {
        icon: FaLeaf,
        title: "Sustainable ingredients",
        description: "Seasonal, local produce and a zero-waste approach to garnishes and citrus.",
    },
];

function FeaturesSection() {
    return (
        <Section sectionClassName="features">
            <div className="container">
                <SectionInfo
                    subheading="Why SipSpot"
                    heading="Indulge in excellence"
                    description="Every detail of the evening is considered - so all you have to do is choose your drink."
                />

                <ul className="features">
                    {features.map((feature, index) => (
                        <motion.li
                            key={feature.title}
                            className="feature"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.12 }}
                            viewport={{ once: true }}
                        >
                            <span className="feature__icon">
                                <feature.icon aria-hidden="true" />
                            </span>
                            <h3 className="feature__title">{feature.title}</h3>
                            <p className="feature__text">{feature.description}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}

export default FeaturesSection;
