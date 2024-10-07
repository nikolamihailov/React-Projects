import WelcomeBack from "../components/Sections/WelcomeBack/WelcomeBack";
import HowItWorks from "../components/Sections/HowItWorks/HowItWorks";
import FAQ from "../components/Sections/FAQ/FAQ";
import useTitle from "../hooks/useTitle";

function Home() {
  useTitle("Flow - SPA and Fitness");

  return (
    <>
      <WelcomeBack />
      <HowItWorks />
      <FAQ />
    </>
  );
}

export default Home;
