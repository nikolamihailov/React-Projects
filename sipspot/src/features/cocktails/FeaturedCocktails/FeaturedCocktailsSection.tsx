import Section from "../../shared/components/UI/Section/Section";
import FeaturedItem from "./FeaturedItem";
import martiniPng from "/martini.png";
import cosmopolitanPng from "/cosmopolitan.png";
import mojitoPng from "/mojito.png";

function FeaturedCocktailsSection() {
    return (
        <Section sectionClassName="featured-cocktails">
            <FeaturedItem name="Martini" imgSrc={martiniPng} />
            <FeaturedItem name="Mojito" imgSrc={mojitoPng} />
            <FeaturedItem name="Cosmopolitan" imgSrc={cosmopolitanPng} />
        </Section>
    )

}

export default FeaturedCocktailsSection;