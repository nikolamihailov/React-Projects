type FeatureItemProps = {
    name: string;
    imgSrc: string;
}

function FeaturedItem({ name, imgSrc }: FeatureItemProps) {
    return <div>
        <img src={imgSrc} alt={`${name} cocktail`} />
        <h3>{name}</h3>
    </div>
}

export default FeaturedItem;