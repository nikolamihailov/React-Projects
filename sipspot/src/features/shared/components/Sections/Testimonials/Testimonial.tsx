import { useState } from "react";
import classNames from "classnames";
import { Sides } from "../../../../../types/Sides";
import { TestimonialItemSize } from "../../../../../types/Testimonial";

type TestimonialProps<T> = {
    items: T[];
    itemSize: TestimonialItemSize;
    shownItems: number;
    renderItem: (item: T, idx: number) => React.ReactNode;
};

const ITEM_WIDTHS: Record<TestimonialItemSize, number> = {
    [TestimonialItemSize.SMALL]: 100,
    [TestimonialItemSize.MEDIUM]: 200,
    [TestimonialItemSize.LARGE]: 300,
};

const GAP = 30;

function Testimonial<T>({ items, itemSize, shownItems, renderItem }: TestimonialProps<T>) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [moveWidth, setMoveWidth] = useState(0);
    const itemWidthWithGap = ITEM_WIDTHS[itemSize] + GAP;
    const maxWidth = items.length * itemWidthWithGap;

    const handleBtnClick = (side: Sides) => {
        if (side === Sides.LEFT && activeIdx >= 1) {
            setActiveIdx(activeIdx - 1);
            setMoveWidth(moveWidth - itemWidthWithGap);
        }
        if (side === Sides.RIGHT && moveWidth < maxWidth - shownItems * itemWidthWithGap) {
            setActiveIdx(activeIdx + 1);
            setMoveWidth(moveWidth + itemWidthWithGap);
        }
    };

    const itemClasses = (idx: number) =>
        classNames(
            "testimonial__item",
            `testimonial__item${activeIdx === idx - 1 ? "--active" : ""}`,
            `testimonial__item--${itemSize}`
        );

    return (
        <div
            className="testimonial"
            style={{
                width: `${itemWidthWithGap * shownItems - GAP}px`,
            }}
        >
            <div className="testimonial__container">
                <div
                    className="testimonial__content-wrapper"
                    style={{
                        transform: `translateX(-${activeIdx * itemWidthWithGap}px)`,
                        width: `${maxWidth}px`,
                    }}
                >
                    {items.map((item, idx) => {
                        return (
                            <div className={itemClasses(idx)} key={idx}>
                                {renderItem(item, idx)}
                            </div>
                        );
                    })}
                </div>
            </div>
            <button className="testimonial__btn testimonial__btn--left" onClick={() => handleBtnClick(Sides.LEFT)}>
                &larr;
            </button>
            <button className="testimonial__btn testimonial__btn--right" onClick={() => handleBtnClick(Sides.RIGHT)}>
                &rarr;
            </button>
        </div>
    );
}

export default Testimonial;
