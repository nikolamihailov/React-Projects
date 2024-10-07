import HeroSection from "../components/Sections/Hero/HeroSection";
import AboutSection from "../components/Sections/About/About";
import ContactSection from "../components/Sections/Contact/Contact";
import useTitle from "../hooks/useTitle";

function LandingPage() {
  useTitle("Flow - SPA and Fitness");

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

export default LandingPage;
