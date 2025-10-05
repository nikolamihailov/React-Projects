export enum TestimonialItemSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

export type Testimonial = {
    picture: string;
    name: string;
    review: string;
    rating: number;
};
