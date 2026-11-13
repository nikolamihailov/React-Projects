import { m } from "framer-motion";
import { features } from "@/data/features";
import SectionInfo from "@/features/shared/components/SectionInfo";
import Section from "@/features/shared/components/UI/Section/Section";

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
                        <m.li
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
                        </m.li>
                    ))}
                </ul>
            </div>
        </Section>
    );
}

export default FeaturesSection;
