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
    const [selectedIdx, setSelectedIdx] = useState(0);
    // every item has a GAP-wide right margin, so one step is always item + gap
    const itemWidthWithGap = ITEM_WIDTHS[itemSize] + GAP;
    const maxWidth = items.length * itemWidthWithGap;

    // with one item shown we can step to the very last one; otherwise stop while the last two are visible
    const lastActiveIdx = Math.max(shownItems === 1 ? items.length - 1 : items.length - 2, 0);
    // shownItems changes on resize, so keep the index in range
    const activeIdx = Math.min(selectedIdx, lastActiveIdx);

    const handleBtnClick = (side: Sides) => {
        if (side === Sides.LEFT) {
            setSelectedIdx(Math.max(activeIdx - 1, 0));
            return;
        }

        setSelectedIdx(Math.min(activeIdx + 1, lastActiveIdx));
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
                    type="button"
                    className="testimonials__btn testimonials__btn--left"
                    aria-label="Previous testimonial"
                    onClick={() => handleBtnClick(Sides.LEFT)}
                >
                    <FaArrowLeft color="#fff" aria-hidden="true" />
                </button>
            )}
            {activeIdx < lastActiveIdx && (
                <button
                    type="button"
                    className="testimonials__btn testimonials__btn--right"
                    aria-label="Next testimonial"
                    onClick={() => handleBtnClick(Sides.RIGHT)}
                >
                    <FaArrowRight color="#fff" aria-hidden="true" />
                </button>
            )}
        </div>
    );
}

export default Testimonial;
