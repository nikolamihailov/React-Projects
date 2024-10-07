import { useParams } from "react-router-dom";
import ServicePageSection from "../features/services/ServicePageSection";

function ServicePage() {
  const { id } = useParams();

  return <ServicePageSection id={Number(id)} />;
}

export default ServicePage;
