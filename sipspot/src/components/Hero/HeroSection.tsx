import { Colors } from "../../types/Colors";
import Button from "../UI/Button/Button";
import Section from "../UI/Section/Section";
import heroImg from "/hero-img.png";

function HeroSection() {
  return (
    <Section bgColor={Colors.Tertiary}>
      <div className="hero">
        <div className="hero__text-box">
          <h1 className="hero__heading">Discover the Ultimate Cocktail Experience</h1>
          <p className="hero__info">
            Crafting the finest cocktails for your delight. Every sip, a new story. Cheers to
            unforgettable moments! Elevate your evenings with our masterfully crafted drinks.
          </p>
          <div className="hero__btns">
            <Button el="link" href="/recipes" type="small" variant="primary">
              Explore Cocktails
            </Button>
            <Button el="link" href="#reservation" type="small" variant="secondary">
              Book Reservation
            </Button>
          </div>
        </div>
        <div className="hero__img-box">
          <img className="hero__img" src={heroImg} alt="Delicious cocktails" />
        </div>
      </div>
    </Section>
  );
}

export default HeroSection;
