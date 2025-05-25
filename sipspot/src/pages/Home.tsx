import FeaturedCocktailsSection from "../features/cocktails/FeaturedCocktails/FeaturedCocktailsSection";
import FeaturesSection from "../features/shared/components/Sections/FeaturesSection";
import HeroSection from "../features/shared/components/Sections/HeroSection";
import PartnersSection from "../features/shared/components/Sections/Partners/PartnersSection";
import TestimonialsSection from "../features/shared/components/Sections/Testimonials/TestimonialsSection";

function Home() {
    return (
        <>
            <HeroSection />
            <PartnersSection />
            <FeaturedCocktailsSection />
            <FeaturesSection />
            <TestimonialsSection />
        </>
    );
}

export default Home;
