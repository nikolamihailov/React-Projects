import { Gap } from "../../../../types/Gap";
import Carousel from "../UI/Carousel/Carousel";
import Section from "../UI/Section/Section";
import { partners } from "./partnersArray";

function PartnersSection() {
    return (
        <Section sectionClassName="partners">
            <Carousel gap={Gap.MEDIUM} items={partners} />
        </Section>
    )
}

export default PartnersSection;