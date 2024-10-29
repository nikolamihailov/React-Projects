import WelcomeBack from "../components/Sections/WelcomeBack/WelcomeBack";
import HowItWorks from "../components/Sections/HowItWorks/HowItWorks";
import FAQ from "../components/Sections/FAQ/FAQ";
import useTitle from "../hooks/useTitle";
import { useEffect } from "react";

function Home() {
  useTitle("Flow - SPA and Fitness");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <WelcomeBack />
      <HowItWorks />
      <FAQ />
    </>
  );
}

export default Home;
