import { motion } from "framer-motion";
import { useState } from "react";
import { IoCheckmarkCircle, IoExpandOutline } from "react-icons/io5";
import { galleryPhotos, galleryStories } from "../data/gallery";
import PageHeader from "../features/shared/components/PageHeader/PageHeader";
import ReservationSection from "../features/shared/components/Sections/ReservationSection";
import SectionInfo from "../features/shared/components/SectionInfo";
import Lightbox, { LightboxItem } from "../features/shared/components/UI/Lightbox/Lightbox";

const lightboxItems: LightboxItem[] = galleryPhotos.map((photo) => ({
    image: `${photo.image}/large`,
    title: photo.name,
    caption: photo.caption,
    href: `/recipes/${photo.drinkId}`,
}));

function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleLightboxClose = () => setActiveIndex(null);

    return (
        <>
            <PageHeader
                eyebrow="Gallery"
                title="Moments from the bar"
                description="A look at the drinks, the room and the people behind them. Tap any photo to see it up close."
            />

            <section className="gallery-section">
                <div className="container">
                    <SectionInfo
                        subheading="In the glass"
                        heading="Drinks worth a photo"
                        description="A few of the classics our bartenders are proudest of. Every one of them is on the menu tonight."
                    />
                    <ul className="gallery-grid">
                        {galleryPhotos.map((photo, index) => {
                            const handleOpen = () => setActiveIndex(index);

                            return (
                                <motion.li
                                    key={photo.drinkId}
                                    className="gallery-grid__item"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                                >
                                    <button
                                        type="button"
                                        className="gallery-grid__button"
                                        aria-label={`Open photo: ${photo.name}`}
                                        onClick={handleOpen}
                                    >
                                        <img
                                            className="gallery-grid__img"
                                            src={`${photo.image}/medium`}
                                            alt=""
                                            loading="lazy"
                                        />
                                        <span className="gallery-grid__overlay" aria-hidden="true">
                                            <span className="gallery-grid__name">{photo.name}</span>
                                            <span className="gallery-grid__caption">{photo.caption}</span>
                                            <IoExpandOutline className="gallery-grid__icon" />
                                        </span>
                                    </button>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            <section className="gallery-stories" aria-label="Life at SipSpot">
                <div className="container">
                    {galleryStories.map((story, index) => (
                        <motion.article
                            key={story.title}
                            className="story"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            // every other story puts the image on the right
                            data-reversed={index % 2 === 1}
                        >
                            <div className="story__media">
                                <img className="story__img" src={`${story.image}/large`} alt={story.imageAlt} loading="lazy" />
                            </div>
                            <div className="story__text">
                                <span className="heading-sub">{story.eyebrow}</span>
                                <h2 className="heading-secondary">{story.title}</h2>
                                <p className="lede">{story.text}</p>
                                <ul className="story__points">
                                    {story.points.map((point) => (
                                        <li key={point}>
                                            <IoCheckmarkCircle aria-hidden="true" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            <ReservationSection />

            <Lightbox
                items={lightboxItems}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                onClose={handleLightboxClose}
            />
        </>
    );
}

export default Gallery;
