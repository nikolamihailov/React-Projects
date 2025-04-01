import SectionInfo from "../SectionInfo";
import Section from "../UI/Section/Section";
import { motion } from "framer-motion";
import { FaCocktail, FaStar, FaGlassCheers, FaLeaf } from "react-icons/fa"; // Using react-icons

const features = [
    {
        icon: <FaCocktail size={60} />,
        title: "Exquisite Cocktails",
        description: "Crafted by expert mixologists using the finest spirits and ingredients.",
    },
    {
        icon: <FaStar size={60} />,
        title: "Premium Quality",
        description: "Every drink is made with top-tier spirits and exclusive recipes.",
    },
    {
        icon: <FaGlassCheers size={60} />,
        title: "Elegant Atmosphere",
        description: "Luxurious ambiance designed for unforgettable experiences.",
    },
    {
        icon: <FaLeaf size={60} />,
        title: "Sustainable Ingredients",
        description: "We use organic, fresh, and locally sourced ingredients.",
    },
];

function FeaturesSection() {
    return (
        <Section sectionClassName="features">
            <SectionInfo heading="Indulge in Excellence" subheading="Features" />

            <div className="features features__container">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="feature__card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="feature__icon">{feature.icon}</div>
                        <h3 className="feature__title">{feature.title}</h3>
                        <p className="feature__text">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}

export default FeaturesSection;
