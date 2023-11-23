import styles from "../CarouselContainer/Carousel.module.css";

const CarouselBtn = ({
  activeSlide,
  direction,
  changeSlide,
  updateInterval,
}) => {
  const handleChange = () => {
    if (direction === "left") {
      changeSlide(activeSlide - 1);
      updateInterval(true);
    }
    if (direction === "right") {
      changeSlide(activeSlide + 1);
      updateInterval(true);
    }
  };
  return (
    <button className={styles[`${direction}-btn`]} onClick={handleChange}>
      <i className={`fa-solid fa-arrow-${direction}`}></i>
    </button>
  );
};

export default CarouselBtn;
