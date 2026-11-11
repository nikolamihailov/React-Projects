import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export type LightboxItem = {
    image: string;
    title: string;
    caption: string;
    href?: string;
};

type LightboxProps = {
    items: LightboxItem[];
    activeIndex: number | null; // null = closed
    onChange: (index: number) => void;
    onClose: () => void;
};

function Lightbox({ items, activeIndex, onChange, onClose }: LightboxProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const isOpen = activeIndex !== null;

    const handlePrevious = () => {
        if (activeIndex === null) return;
        onChange((activeIndex - 1 + items.length) % items.length);
    };

    const handleNext = () => {
        if (activeIndex === null) return;
        onChange((activeIndex + 1) % items.length);
    };

    // keep the latest handlers for the keyboard listener without re-binding it on every change
    const handlersRef = useRef({ handlePrevious, handleNext, onClose });
    handlersRef.current = { handlePrevious, handleNext, onClose };

    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeButtonRef.current?.focus();
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") handlersRef.current.onClose();
            if (event.key === "ArrowLeft") handlersRef.current.handlePrevious();
            if (event.key === "ArrowRight") handlersRef.current.handleNext();
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
            // return focus to the photo that opened the lightbox
            previouslyFocused?.focus();
        };
    }, [isOpen]);

    if (activeIndex === null) return null;

    const item = items[activeIndex];

    // rendered into <body> so it sits above everything, outside animated (transformed) sections
    return createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} photo`}>
            <div className="lightbox__backdrop" aria-hidden="true" onClick={onClose} />
            <button ref={closeButtonRef} type="button" className="lightbox__close" aria-label="Close" onClick={onClose}>
                <IoClose aria-hidden="true" />
            </button>
            <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                aria-label="Previous photo"
                onClick={handlePrevious}
            >
                <IoChevronBack aria-hidden="true" />
            </button>

            <figure className="lightbox__figure">
                <img className="lightbox__img" src={item.image} alt={item.title} />
                <figcaption className="lightbox__caption">
                    <span>
                        <strong>{item.title}</strong> - {item.caption}
                    </span>
                    <span className="lightbox__meta">
                        {activeIndex + 1} / {items.length}
                        {item.href && (
                            <Link to={item.href} className="lightbox__link">
                                View recipe
                            </Link>
                        )}
                    </span>
                </figcaption>
            </figure>

            <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Next photo" onClick={handleNext}>
                <IoChevronForward aria-hidden="true" />
            </button>
        </div>,
        document.body
    );
}

export default Lightbox;
