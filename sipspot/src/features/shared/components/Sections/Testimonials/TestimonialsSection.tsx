import { useState } from "react";
import SectionInfo from "../../SectionInfo";
import Section from "../../UI/Section/Section";
import { Sides } from "../../../../../types/SIdes";

function TestimonialsSection() {
    const [cats] = useState(["Bad", "Stava", "Top", "Tragediq", "Bad", "Stava", "Top", "Tragediq"]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [moveWidth, setMoveWidth] = useState(0);
    const itemWidth = 230;
    const shownItems = 3;
    const maxWidth = cats.length * itemWidth;

    const handleBtnClick = (side: Sides) => {
        if (side === Sides.Left && activeIdx >= 1) {
            setActiveIdx(activeIdx - 1);
            setMoveWidth(moveWidth - itemWidth);
        }
        if (side === Sides.Right && moveWidth < maxWidth - shownItems * itemWidth) {
            setActiveIdx(activeIdx + 1);
            setMoveWidth(moveWidth + itemWidth);
        }
    };

    return (
        <Section sectionClassName="testimonials">
            <SectionInfo heading="What Our Customers Say:" subheading="Testimonials" />
            <div style={{ position: "relative", width: `660px`, margin: "0 auto" }}>
                <div style={{ overflow: "hidden" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            transform: `translateX(-${activeIdx * 230}px)`,
                            /* gap: "3rem", */
                            transition: "all 0.5s ease",
                            width: `${maxWidth}px`,
                        }}
                    >
                        {cats.map((cat, idx) => {
                            return (
                                <div
                                    style={{
                                        minWidth: "200px",
                                        height: "200px",
                                        backgroundColor: "orange",
                                        marginRight: "30px",
                                        transition: "0.5s ease",
                                    }}
                                    className={activeIdx === idx - 1 ? "active" : ""}
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
