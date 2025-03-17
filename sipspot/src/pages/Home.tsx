import FeaturedCocktailsSection from "../features/cocktails/FeaturedCocktails/FeaturedCocktailsSection";
import FeaturesSection from "../features/shared/components/Features/FeaturesSection";
import HeroSection from "../features/shared/components/Hero/HeroSection";
import PartnersSection from "../features/shared/components/Partners/PartnersSection";

function Home() {
    return (
        <>
            <HeroSection />
            <PartnersSection />
            <FeaturedCocktailsSection />
            <FeaturesSection />
        </>
    );
}

export default Home;
