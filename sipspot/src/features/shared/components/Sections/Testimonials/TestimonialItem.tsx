import { Testimonial } from "../../../../../types/Testimonial";

interface TestimonialItemProps {
    testimonial: Testimonial;
}
function TestimonialItem({ testimonial }: TestimonialItemProps) {
    return (
        <article className="testimonial-item">
            <img className="testimonial-item__authorImg" src={testimonial.picture} alt={`${testimonial.name}'s pic`} />
            <h2 className="testimonial-item__author">{testimonial.name}</h2>
            <p className="testimonial-item__text">{testimonial.review}</p>
            <div className="testiminial-item__rating">{testimonial.rating}</div>
        </article>
    );
}

export default TestimonialItem;
