import { useCallback, useEffect, useState } from "react";
import CarouselItem from "../CarouselItem/CarouselItem";
import styles from "./Carousel.module.css";
import { getAll } from "../../../../data/services/categoryService";
import CarouselBtn from "../CarouselBtn/CarouselBtn";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isIntervalStopped, setIntervalStopped] = useState(false);

  const prevSlide = useCallback(
    (slide) => {
      if (slide >= 0) setActiveSlide(slide);
      else if (slide < 0) setActiveSlide(categories.length - 1);
    },
    [categories.length]
  );

  const nextSlide = useCallback(
    (slide) => {
      if (slide <= categories.length - 1) setActiveSlide(slide);
      else if (slide >= categories.length - 1) setActiveSlide(0);
    },
    [categories.length]
  );

  const updateInterval = useCallback((data) => setIntervalStopped(data), []);

  useEffect(() => {
    getAll()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));

    const intervalId = setInterval(() => {
      nextSlide(activeSlide + 1);
    }, 5000);
    if (isIntervalStopped) clearInterval(intervalId);
    return () => {
      clearInterval(intervalId);
    };
  }, [activeSlide, nextSlide, isIntervalStopped]);

  return (
    <>
      <div className={styles["carousel-home"]}>
        <CarouselBtn
          direction={"left"}
          changeSlide={prevSlide}
          updateInterval={updateInterval}
          activeSlide={activeSlide}
        />
        <div
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
          className={styles["inner"]}
        >
          {categories?.map((c, idx) => {
            return <CarouselItem {...c} key={idx} />;
          })}
        </div>
        <CarouselBtn
          direction={"right"}
          changeSlide={nextSlide}
          activeSlide={activeSlide}
          updateInterval={updateInterval}
        />
      </div>
    </>
  );
};

export default Carousel;
