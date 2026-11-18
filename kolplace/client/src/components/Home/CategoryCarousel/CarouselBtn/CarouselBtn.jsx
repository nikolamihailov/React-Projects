import styles from "../CarouselContainer/Carousel.module.css";

const CarouselBtn = ({ direction, onClick }) => (
  <button
    type="button"
    className={`${styles["nav-btn"]} ${styles[`${direction}-btn`]}`}
    onClick={onClick}
    aria-label={direction === "left" ? "Previous category" : "Next category"}
  >
    <i className={`fa-solid fa-arrow-${direction}`} aria-hidden="true"></i>
  </button>
);

export default CarouselBtn;
