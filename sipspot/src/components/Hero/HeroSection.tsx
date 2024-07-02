import heroImg from "../../../public/hero-img.png";
import Button from "../UI/Button";
import styles from "./Hero.module.css";

function HeroSection() {
  return (
    <section className={styles["hero-section"]}>
      <div className={styles["text-box"]}>
        <h1>SipSpot - Best Cocktails!</h1>
        <p>
          Sip, savor, and celebrate! Discover the art of cocktails where every drink tells a story
        </p>
        <Button>Browse Cocktails</Button>
      </div>
      <div className={styles["img-box"]}>
        <img src={heroImg} alt="" />
      </div>
    </section>
  );
}

export default HeroSection;
