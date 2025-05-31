import { useState } from "react";
import SectionInfo from "../../SectionInfo";
import Section from "../../UI/Section/Section";
import { Sides } from "../../../../../types/SIdes";

function TestimonialsSection() {
    const [cats] = useState(["Bad", "Stava", "Top", "Tragediq", "Bad", "Stava", "Top", "Tragediq"]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [moveWidth, setMoveWidth] = useState(0);
    const gap = 30;
    const itemWidth = 200;
    const itemWidthWithGap = 230;
    const shownItems = 3;
    const maxWidth = cats.length * itemWidthWithGap;

    const handleBtnClick = (side: Sides) => {
        if (side === Sides.Left && activeIdx >= 1) {
            setActiveIdx(activeIdx - 1);
            setMoveWidth(moveWidth - itemWidthWithGap);
        }
        if (side === Sides.Right && moveWidth < maxWidth - shownItems * itemWidthWithGap) {
            setActiveIdx(activeIdx + 1);
            setMoveWidth(moveWidth + itemWidthWithGap);
        }
    };

    return (
        <Section sectionClassName="testimonials">
            <SectionInfo heading="What Our Customers Say:" subheading="Testimonials" />
            <div
                style={{
                    position: "relative",
                    width: `${itemWidthWithGap * shownItems - gap}px`,
                    margin: "1.6rem auto",
                }}
            >
                <div style={{ overflowY: "visible", overflowX: "hidden", position: "relative", paddingTop: "30px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            transform: `translateX(-${activeIdx * itemWidthWithGap}px)`,
                            /* gap: "3rem", */
                            transition: "all 0.5s ease",
                            width: `${maxWidth}px`,
                        }}
                    >
                        {cats.map((cat, idx) => {
                            return (
                                <div
                                    style={{
                                        width: `${itemWidth}px`,
                                        height: "200px",
                                        backgroundColor: "orange",
                                        marginRight: `${gap}px`,
                                        transition: "0.5s ease",
                                    }}
                                    className={activeIdx === idx - 1 ? "active" : ""}
                                    key={idx}
                                >
                                    {cat}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        transform: "translate(-150%, -50%)",
                    }}
                    onClick={() => handleBtnClick(Sides.Left)}
                >
                    &larr;
                </button>
                <button
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translate(150%, -50%)",
                    }}
                    onClick={() => handleBtnClick(Sides.Right)}
                >
                    &rarr;
                </button>
            </div>
        </Section>
    );
}

export default TestimonialsSection;
