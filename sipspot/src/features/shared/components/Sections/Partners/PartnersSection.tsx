import { Gap } from "../../../../../types/Gap";
import Carousel from "../../UI/Carousel/Carousel";
import { partners } from "./partnersArray";

function PartnersSection() {
    return (
        <section className="section section__partners" aria-label="Our partner brands">
            <p className="partners__label">Pouring the world's finest spirits</p>
            <Carousel gap={Gap.MEDIUM} items={partners} />
        </section>
    );
}

export default PartnersSection;
