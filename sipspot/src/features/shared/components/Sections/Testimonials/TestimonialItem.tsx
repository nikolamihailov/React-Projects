import { Testimonial } from "../../../../../types/Testimonial";
import Rating from "./Rating";

interface TestimonialItemProps {
    testimonial: Testimonial;
}
function TestimonialItem({ testimonial }: TestimonialItemProps) {
    return (
        <article className="testimonial-item">
            <img className="testimonial-item__authorImg" src={testimonial.picture} alt={`${testimonial.name}'s pic`} />
            <h2 className="testimonial-item__name">{testimonial.name}</h2>
            <p className="testimonial-item__review">
                <span className="testimonial-item__quote">" </span>
                {testimonial.review}
                <span className="testimonial-item__quote"> "</span>
            </p>
            <Rating value={testimonial.rating} />
        </article>
    );
}

export default TestimonialItem;
