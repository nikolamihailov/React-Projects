import { Testimonial } from "../../../../../types/Testimonial";
import user1 from "/user-1.jpg";
import user2 from "/user-2.jpg";
import user3 from "/user-3.jpg";
import user4 from "/user-4.jpg";
import user5 from "/user-5.jpg";

export const testimonialItems: Testimonial[] = [
    {
        picture: user1,
        name: "Jack Collins",
        review: "The Mojito was so refreshing! Loved the creative cocktail menu and cozy atmosphere.",
        rating: 4.8,
    },
    {
        picture: user2,
        name: "Sophie Turner",
        review: "SipSpot’s bartenders are true artists. The Cosmopolitan was perfectly balanced!",
        rating: 5,
    },
    {
        picture: user3,
        name: "Ethan Martinez",
        review: "I tried the Strawberry Margarita and it was delicious. Will definitely come back for more!",
        rating: 4.7,
    },
    {
        picture: user4,
        name: "Olivia Brooks",
        review: "Great place for cocktail lovers. The Daiquiri was a highlight of my night.",
        rating: 4.5,
    },
    {
        picture: user5,
        name: "Lucas Fisher",
        review: "Amazing selection and friendly staff. The signature drinks are a must-try!",
        rating: 5,
    },
];
