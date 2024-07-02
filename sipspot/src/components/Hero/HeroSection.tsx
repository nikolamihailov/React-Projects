import heroImg from "../../../public/hero-img.png";
import Button from "../UI/Button";
import styles from "./Hero.module.css";

function HeroSection() {
  return (
    <section className={styles["hero-section"]}>
      <div className={styles["text-box"]}>
        <h1 className={styles["hero-heading"]}>Discover the Ultimate Cocktail Experience</h1>
        <p className={styles["hero-desc"]}>
          Crafting the finest cocktails for your delight. Every sip, a new story. Cheers to
          unforgettable moments!
        </p>
        <Button>Explore Our Cocktails</Button>
      </div>
      <div className={styles["img-box"]}>
        <img src={heroImg} alt="Delicious cocktails" />
      </div>
    </section>
  );
}

export default HeroSection;
