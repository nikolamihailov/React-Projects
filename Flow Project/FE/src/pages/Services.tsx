import ServicesSection from "../features/services/ServicesSection";
import useTitle from "../hooks/useTitle";

function Services() {
  useTitle("Services | Flow - SPA and Fitness");

  return (
    <>
      <ServicesSection />
    </>
  );
}

export default Services;
