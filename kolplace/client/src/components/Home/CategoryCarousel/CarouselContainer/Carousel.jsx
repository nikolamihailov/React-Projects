import { useCallback, useContext, useEffect, useState } from "react";
import CarouselItem from "../CarouselItem/CarouselItem";
import styles from "./Carousel.module.css";
import { getAll } from "../../../../data/services/categoryService";
import CarouselBtn from "../CarouselBtn/CarouselBtn";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";

const AUTOPLAY_MS = 5000;

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);
  const count = categories.length;

  // Load the categories once.
  useEffect(() => {
    getAll()
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
          return;
        }
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.log(err));
  }, [updateAuth, updateNotifs, navigateTo]);

  // Wraps around at both ends.
  const goTo = useCallback(
    (slide) => {
      if (!count) return;
      setActiveSlide(((slide % count) + count) % count);
    },
    [count]
  );

  // Autoplay. Any change of slide restarts the timer, so after a click the
  // user gets a full interval before it moves on. Paused while hovered or
  // focused, and off for people who prefer reduced motion.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (count < 2 || isPaused || reduceMotion) return;
    const id = setTimeout(() => goTo(activeSlide + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [activeSlide, count, isPaused, goTo]);

  return (
    <section
      className={styles["carousel-home"]}
      aria-roledescription="carousel"
      aria-label="Shop by category"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles["viewport"]}>
        <div
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          className={styles["inner"]}
        >
          {categories.map((c, idx) => (
            <CarouselItem {...c} key={c._id || idx} isActive={idx === activeSlide} />
          ))}
        </div>

        {count > 1 && (
          <>
            <CarouselBtn direction={"left"} onClick={() => goTo(activeSlide - 1)} />
            <CarouselBtn direction={"right"} onClick={() => goTo(activeSlide + 1)} />
          </>
        )}
      </div>

      {count > 1 && (
        <div className={styles["dots"]} role="group" aria-label="Choose a category slide">
          {categories.map((c, idx) => (
            <button
              key={c._id || idx}
              type="button"
              className={`${styles["dot"]} ${idx === activeSlide ? styles["dot-active"] : ""}`}
              onClick={() => goTo(idx)}
              aria-label={`Show ${c.name}`}
              aria-current={idx === activeSlide}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Carousel;
