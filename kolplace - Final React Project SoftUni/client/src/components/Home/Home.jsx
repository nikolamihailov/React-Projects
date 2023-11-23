import useTitle from "../../hooks/useTitle";
import Carousel from "./CategoryCarousel/CarouselContainer/Carousel";
import styles from "./Home.module.css";

const Home = () => {
  useTitle("KolPlace - Your Shopping Place");
  return (
    <section className={styles["home"]}>
      <Carousel />
    </section>
  );
};

export default Home;
