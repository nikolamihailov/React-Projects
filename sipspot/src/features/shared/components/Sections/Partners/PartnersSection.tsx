import { Gap } from "../../../../../types/Gap";
import Carousel from "../../UI/Carousel/Carousel";
import { partners } from "./partnersArray";

function PartnersSection() {
    return (
        <section className="section section__partners">
            <Carousel gap={Gap.MEDIUM} items={partners} />
        </section>
    );
}

export default PartnersSection;
