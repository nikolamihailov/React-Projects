import Section from "../../shared/components/UI/Section/Section";
import FeaturedItem from "./FeaturedItem";
import daiquiriPng from "/daiquiri.png";
import strawberryMargaritaPng from "/strawberryMargarita.png";
import mojitoPng from "/mojito.png";

function FeaturedCocktailsSection() {
    return (
        <Section sectionClassName="featured-cocktails">
            <div className="featured-cocktails__container">
                <FeaturedItem name="Daiquiri" imgSrc={daiquiriPng} />
                <FeaturedItem name="Mojito" imgSrc={mojitoPng} />
                <FeaturedItem name="Strawberry Margarita" imgSrc={strawberryMargaritaPng} />
            </div>
        </Section>
    );
}

export default FeaturedCocktailsSection;
