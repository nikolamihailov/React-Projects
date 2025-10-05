import { Gap } from "../../../../../types/Gap";

type CarouselItem = {
    id: number | string;
    src: string;
};

type CarouselProps = {
    items: CarouselItem[];
    gap?: Gap;
};

function Carousel({ items, gap = Gap.MEDIUM }: CarouselProps) {
    const duplicatedItems = [...items, ...items];

    return (
        <div className="carousel">
            <div className={`carousel__track carousel__gap--${gap}`}>
                {duplicatedItems.map((item, index) => (
                    <div className="carousel__item" key={`${item.id}-${index}`}>
                        <img src={item.src} alt="carousel-item-img" className="carousel__img" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
