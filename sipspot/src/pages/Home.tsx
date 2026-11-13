import FeaturedCocktailsSection from "@/features/home/FeaturedCocktails/FeaturedCocktailsSection";
import FeaturesSection from "@/features/home/Features/FeaturesSection";
import HeroSection from "@/features/home/Hero/HeroSection";
import PartnersSection from "@/features/home/Partners/PartnersSection";
import ReservationSection from "@/features/shared/components/ReservationSection/ReservationSection";
import TestimonialsSection from "@/features/home/Testimonials/TestimonialsSection";

function Home() {
    return (
        <>
            <HeroSection />
            <PartnersSection />
            <FeaturedCocktailsSection />
            <FeaturesSection />
            <TestimonialsSection />
            <ReservationSection />
        </>
    );
}

export default Home;
