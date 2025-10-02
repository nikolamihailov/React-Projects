import { useState } from "react";
import classNames from "classnames";
import { Sides } from "../../../../../types/Sides";
import { TestimonialItemSize } from "../../../../../types/Testimonial";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type TestimonialProps<T> = {
    items: T[];
    itemSize: TestimonialItemSize;
    shownItems: number;
    renderItem: (item: T, idx: number) => React.ReactNode;
};

const ITEM_WIDTHS: Record<TestimonialItemSize, number> = {
    [TestimonialItemSize.SMALL]: 150,
    [TestimonialItemSize.MEDIUM]: 250,
    [TestimonialItemSize.LARGE]: 350,
};

const GAP = 30;

function Testimonial<T>({ items, itemSize, shownItems, renderItem }: TestimonialProps<T>) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [moveWidth, setMoveWidth] = useState(0);
    const itemWidthWithGap = shownItems === 1 ? ITEM_WIDTHS[itemSize] : ITEM_WIDTHS[itemSize] + GAP;
    const maxWidth = items.length * itemWidthWithGap;

    const handleBtnClick = (side: Sides) => {
        if (side === Sides.LEFT && activeIdx >= 1) {
            setActiveIdx(activeIdx - 1);
            setMoveWidth(moveWidth - itemWidthWithGap);
        }
        if (shownItems === 1) {
            if (side === Sides.RIGHT && moveWidth < maxWidth - shownItems * itemWidthWithGap) {
                setActiveIdx(activeIdx + 1);
                setMoveWidth(moveWidth + itemWidthWithGap);
            }
        } else {
            if (side === Sides.RIGHT && moveWidth <= maxWidth - shownItems * itemWidthWithGap) {
                setActiveIdx(activeIdx + 1);
                setMoveWidth(moveWidth + itemWidthWithGap);
            }
        }
    };

    const getActiveIndex = (idx: number) => {
        if (shownItems === 1) return idx === activeIdx;
        if (shownItems === 2) return idx === activeIdx;
        if (shownItems >= 3) return idx === activeIdx + 1;
        return false;
    };

    const itemClasses = (idx: number) =>
        classNames(
            "testimonials__item-container",
            {
                "testimonials__item-container--active": getActiveIndex(idx),
            },
            `testimonials__item-container--${itemSize}`
        );

    return (
        <div
            className="testimonials"
            style={{
                width: `${itemWidthWithGap * shownItems - GAP}px`,
            }}
        >
            <div className="testimonials__container">
                <div
                    className="testimonials__content-wrapper"
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
            {activeIdx >= 1 && (
                <button
                    className="testimonials__btn testimonials__btn--left"
                    onClick={() => handleBtnClick(Sides.LEFT)}
                >
                    <FaArrowLeft color="#fff" />
                </button>
            )}
            {activeIdx < items.length - 2 && (
                <button
                    className="testimonials__btn testimonials__btn--right"
                    onClick={() => handleBtnClick(Sides.RIGHT)}
                >
                    <FaArrowRight color="#fff" />
                </button>
            )}
        </div>
    );
}

export default Testimonial;
