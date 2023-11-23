import useTitle from "../../hooks/useTitle";
import Carousel from "./CategoryCarousel/CarouselContainer/Carousel";
import styles from "./Home.module.css";
import ShopFeaturesSection from "./ShopFeatures/ShopFeatures";

const Home = () => {
  useTitle("KolPlace - Your Shopping Place");
  return (
    <section className={styles["home"]}>
      <Carousel />
      <ShopFeaturesSection />
    </section>
  );
};

export default Home;
