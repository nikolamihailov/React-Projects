import { Testimonial } from "../../../../../types/Testimonial"

interface TestimonialItemProps {
   testimonial: Testimonial
}
function TestimonialItem({ testimonial }: TestimonialItemProps) {
    return (
        <article className="testimonial">
            <img src={testimonial.picture} alt={`${testimonial.name}'s pic`} />
            <h2 className="tesimonial__author">{testimonial.name}</h2>
            <p className="testimonial__text">{testimonial.review}</p>
            <div className="testiminial__rating">{testimonial.rating}</div>
        </article>
    )
}

export default TestimonialItem
