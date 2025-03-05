import FeaturedCocktailsSection from "../features/cocktails/FeaturedCocktails/FeaturedCocktailsSection";
import HeroSection from "../features/shared/components/Hero/HeroSection";
import PartnersSection from "../features/shared/components/Partners/PartnersSection";

function Home() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <FeaturedCocktailsSection/>
    </>
  );
}

export default Home;
