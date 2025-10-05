import { TestimonialItemSize } from "../../../../../types/Testimonial";
import SectionInfo from "../../SectionInfo";
import Section from "../../UI/Section/Section";
import Testimonial from "./Testimonial";
import TestimonialItem from "./TestimonialItem";
import { testimonialItems } from "./testimonials";

function TestimonialsSection() {
    return (
        <Section sectionClassName="testimonials">
            <SectionInfo heading="What Our Customers Say:" subheading="Testimonials" />
            <Testimonial
                items={testimonialItems}
                itemSize={TestimonialItemSize.MEDIUM}
                shownItems={3}
                renderItem={(item) => <TestimonialItem testimonial={item} />}
            />
        </Section>
    );
}

export default TestimonialsSection;
