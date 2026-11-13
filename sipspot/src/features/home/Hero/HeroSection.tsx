import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { barInfo } from "@/data/barInfo";
import { heroStats } from "@/data/heroStats";
import Button from "@/features/shared/components/UI/Button/Button";
import heroImg from "/hero-img.webp";

type ImageStatus = "loading" | "loaded" | "error";

function HeroSection() {
    // the glass stays hidden until it has loaded, so the browser never paints (and bounces) the alt text instead
    const [imgStatus, setImgStatus] = useState<ImageStatus>("loading");
    const imgRef = useRef<HTMLImageElement>(null);

    // a cached image can finish loading before React attaches onLoad
    useEffect(() => {
        const img = imgRef.current;
        if (img?.complete) setImgStatus(img.naturalWidth > 0 ? "loaded" : "error");
    }, []);

    const handleImgLoad = () => setImgStatus("loaded");
    const handleImgError = () => setImgStatus("error");

    return (
        <section className="hero">
            <div className="hero__inner container">
                <m.div
                    className="hero__text-box"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <span className="heading-sub">Cocktail bar · Since {barInfo.foundedYear}</span>
                    <h1 className="hero__heading">
                        Crafted cocktails, <em>unforgettable</em> evenings
                    </h1>
                    <p className="hero__info">
                        Slow-stirred classics and seasonal signatures, poured by bartenders who care about every
                        detail - from the ice to the garnish.
                    </p>
                    <div className="hero__btns">
                        <Button el="link" href="/recipes" type="medium" variant="secondary">
                            Explore the menu <IoArrowForward aria-hidden="true" />
                        </Button>
                        <Button el="link" href="#reservation" type="medium" variant="light">
                            Book a table
                        </Button>
                    </div>
                    <dl className="hero__stats">
                        {heroStats.map((stat) => (
                            <div key={stat.label} className="hero__stat">
                                <dt>{stat.label}</dt>
                                <dd>{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </m.div>
                <m.div
                    className="hero__img-box"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                >
                    <img
                        ref={imgRef}
                        className="hero__img"
                        src={heroImg}
                        alt="A signature SipSpot cocktail"
                        width={520}
                        height={520}
                        fetchPriority="high"
                        data-status={imgStatus}
                        onLoad={handleImgLoad}
                        onError={handleImgError}
                    />
                </m.div>
            </div>
        </section>
    );
}

export default HeroSection;
