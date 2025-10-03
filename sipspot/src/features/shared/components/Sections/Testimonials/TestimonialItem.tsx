import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
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
            <div className="testimonial-item__rating">
                <Rating value={testimonial.rating} />
                <span className="testimonial-item__rating-number">{testimonial.rating.toFixed(1)}/5</span>
            </div>
            <p className="testimonial-item__review">
                <FaQuoteLeft className="testimonial-item__quote" />
                {testimonial.review}
                <FaQuoteRight className="testimonial-item__quote" />
            </p>
        </article>
    );
}

export default TestimonialItem;
