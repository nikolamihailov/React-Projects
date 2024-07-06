import Button from "../UI/Button/Button";
import Section from "../UI/Section/Section";
import heroImg from "../../../public/hero-img.png";
import styles from "./Hero.module.css";

function HeroSection() {
  return (
    <Section bgColor="#ffe066">
      <div className={styles["hero"]}>
        <div className={styles["text-box"]}>
          <h1>Discover the Ultimate Cocktail Experience</h1>
          <p>
            Crafting the finest cocktails for your delight. Every sip, a new story. Cheers to
            unforgettable moments! Elevate your evenings with our masterfully crafted drinks.
          </p>
          <Button
            bgColor="#8B0401"
            color="#fff"
            el="link"
            hoverBgColor="#fff"
            hoverColor="#000"
            href="/recipes"
          >
            Explore Cocktails
          </Button>
          <Button
            bgColor="#e67700"
            color="#fff"
            el="link"
            hoverBgColor="#fff"
            hoverColor="#000"
            href="#reservation"
          >
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
