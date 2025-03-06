type FeatureItemProps = {
    name: string,
    imgSrc: string,
};

function FeaturedItem({ name, imgSrc }: FeatureItemProps) {
    return (
        <div className="featured-cocktails__item">
            <img className="featured-cocktails__img" src={imgSrc} alt={`${name} cocktail`} />
            <h3 className="featured-cocktails__title">{name}</h3>
        </div>
    );
}

export default FeaturedItem;
