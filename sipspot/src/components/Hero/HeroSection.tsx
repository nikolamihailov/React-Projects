import heroImg from "../../../public/hero-img.png";
import Button from "../UI/Button/Button";
import Section from "../UI/Section/Section";
import styles from "./Hero.module.css";

function HeroSection() {
  return (
    <Section bgColor="#ffe066">
      <div className={styles["hero"]}>
        <div className={styles["text-box"]}>
          <h1 className={styles["hero-heading"]}>Discover the Ultimate Cocktail Experience</h1>
          <p className={styles["hero-desc"]}>
            Crafting the finest cocktails for your delight. Every sip, a new story. Cheers to
            unforgettable moments!
          </p>
          <Button bgColor="#8B0401" color="#fff">
            Explore Cocktails
          </Button>
          <Button bgColor="#f08c00" color="#fff">
            Book Reservation
          </Button>
        </div>
        <div className={styles["img-box"]}>
          <img src={heroImg} alt="Delicious cocktails" />
        </div>
      </div>
    </Section>
  );
}

export default HeroSection;
