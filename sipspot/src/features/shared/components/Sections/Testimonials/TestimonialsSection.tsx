import { useMediaQuery } from "../../../../../hooks/useMediaQuery";
import { TestimonialItemSize } from "../../../../../types/Testimonial";
import SectionInfo from "../../SectionInfo";
import Section from "../../UI/Section/Section";
import Testimonial from "./Testimonial";
import TestimonialItem from "./TestimonialItem";
import { testimonialItems } from "./testimonials";

function TestimonialsSection() {
    const isPhone = useMediaQuery("(max-width: 600px)");
    const isTablet = useMediaQuery("(max-width: 950px)");

    // the carousel has a fixed pixel width, so show fewer cards on smaller screens
    const getShownItems = () => {
        if (isPhone) return 1;
        if (isTablet) return 2;
        return 3;
    };

    return (
        <Section sectionClassName="testimonials">
            <SectionInfo heading="What Our Customers Say:" subheading="Testimonials" />
            <Testimonial
                items={testimonialItems}
                itemSize={TestimonialItemSize.MEDIUM}
                shownItems={getShownItems()}
                renderItem={(item) => <TestimonialItem testimonial={item} />}
            />
        </Section>
    );
}

export default TestimonialsSection;
