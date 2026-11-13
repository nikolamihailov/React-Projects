import { IoArrowForward } from "react-icons/io5";
import Section from "@/features/shared/components/UI/Section/Section";
import SectionInfo from "@/features/shared/components/SectionInfo";
import Button from "@/features/shared/components/UI/Button/Button";
import FeaturedItem, { FeaturedCocktail } from "./FeaturedItem";
import cosmopolitanPng from "/cosmopolitan.png";
import daiquiriPng from "/daiquiri.png";
import mojitoPng from "/mojito.png";
import strawberryMargaritaPng from "/strawberryMargarita.png";

// ids are TheCocktailDB drinks, so each card opens the full recipe
const featuredCocktails: FeaturedCocktail[] = [
    { id: "11007", name: "Margarita", imgSrc: strawberryMargaritaPng, notes: "Tequila · lime · salted rim" },
    { id: "11006", name: "Daiquiri", imgSrc: daiquiriPng, notes: "White rum · lime · sugar" },
    { id: "11000", name: "Mojito", imgSrc: mojitoPng, notes: "Rum · fresh mint · soda" },
    { id: "17196", name: "Cosmopolitan", imgSrc: cosmopolitanPng, notes: "Citrus vodka · cranberry · lime" },
];

function FeaturedCocktailsSection() {
    return (
        <Section sectionClassName="featured-cocktails">
            <div className="featured-cocktails container">
                <SectionInfo
                    subheading="Signature pours"
                    heading="Our most loved cocktails"
                    description="The drinks our guests come back for - balanced, bright and made with fresh juice every night. Open any of them for the full recipe."
                />
                <ul className="featured-cocktails__container">
                    {featuredCocktails.map((cocktail, index) => (
                        <FeaturedItem key={cocktail.id} cocktail={cocktail} index={index} />
                    ))}
                </ul>
                <Button el="link" href="/recipes" type="medium" variant="outline">
                    Browse the full menu <IoArrowForward aria-hidden="true" />
                </Button>
            </div>
        </Section>
    );
}

export default FeaturedCocktailsSection;
