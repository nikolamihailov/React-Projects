import useTitle from "../../hooks/useTitle";
import ShortAboutSection from "./AboutSection/ShortAbout";
import Carousel from "./CategoryCarousel/CarouselContainer/Carousel";
import styles from "./Home.module.css";
import CarouselProducts from "./ProductsCarousel/CarouselContainer/Carousel";
import ShopFeaturesSection from "./ShopFeatures/ShopFeatures";

const Home = () => {
  useTitle("KolPlace - Your Shopping Place");
  return (
    <section className={styles["home"]}>
      <Carousel />
      <ShopFeaturesSection />
      <CarouselProducts category={"games"} items={5} title={"Latest Games"} />
      <CarouselProducts
        category={"smartphones"}
        items={5}
        title={"Latest Smartphones"}
      />
      <CarouselProducts category={"books"} items={5} title={"Latest Books"} />
      <ShortAboutSection />
    </section>
  );
};

export default Home;
