// Average star rating of a product, 0 when it has no reviews.
export const averageRating = (reviews = []) =>
    reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
