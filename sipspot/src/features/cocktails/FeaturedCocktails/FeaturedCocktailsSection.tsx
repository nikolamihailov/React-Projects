import Section from "../../shared/components/UI/Section/Section";
import FeaturedItem from "./FeaturedItem";
import daiquiriPng from "/daiquiri.png";
import strawberryMargaritaPng from "/strawberryMargarita.png";
import mojitoPng from "/mojito.png";

function FeaturedCocktailsSection() {
    return (
        <Section sectionClassName="featured-cocktails">
            <div className="featured-cocktails">
                <div className="featured-cocktails__info">
                    <h2 className="heading-secondary">Our most popular cocktails:</h2>
                    <p className="paragraph">
                        Discover our selection of best-loved cocktails, crafted to perfection. Whether you enjoy the
                        refreshing zest of a Mojito, the sweet and tangy flavors of a Strawberry Margarita, or the
                        smooth balance of a classic Daiquiri, there's a drink here to delight every palate.
                    </p>
                </div>
                <div className="featured-cocktails__container">
                    <FeaturedItem name="Strawberry Margarita" imgSrc={strawberryMargaritaPng} />
                    <FeaturedItem name="Daiquiri" imgSrc={daiquiriPng} />
                    <FeaturedItem name="Mojito" imgSrc={mojitoPng} />
                </div>
            </div>
        </Section>
    );
}

export default FeaturedCocktailsSection;
