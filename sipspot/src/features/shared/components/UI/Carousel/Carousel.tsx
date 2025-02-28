import { Gap } from "../../../../../types/Gap";

type CarouselItem = {
    id: number | string;
    src: string;
}
type CarouselProps = {
    items: CarouselItem[];
    gap: Gap;
}

function Carousel({ items, gap= Gap.MEDIUM }: CarouselProps) {
    return (
        <div className={`carousel carousel__gap--${gap}`}>
            {items.length && items.map(item => {
                return <div className="carousel__item" key={item.id}>
                    <img src={item.src} alt="carousel-item-img" className="carousel__img" />
                </div>
            })}
        </div>
    )
}

export default Carousel;