import { useState } from "react";
import SectionInfo from "../../SectionInfo";
import Section from "../../UI/Section/Section";

function TestimonialsSection() {
    const [cats] = useState(["Bad", "Stava", "Top", "Tragediq"]);

    return (
        <Section sectionClassName="testimonials">
            <SectionInfo heading="What Our Customers Say:" subheading="Testimonials" />
            {cats.map((cat) => {
                return <div>{cat}</div>;
            })}
        </Section>
    );
}

export default TestimonialsSection;
