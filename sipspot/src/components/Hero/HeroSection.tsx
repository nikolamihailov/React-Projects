import heroImg from "../../../public/hero-img.png";
import styles from "./Hero.module.css";

function HeroSection() {
  return (
    <section className={styles["hero-section"]}>
      <h1>SipSpot - Best Cocktails!</h1>
      <img src={heroImg} alt="" />
    </section>
  );
}

export default HeroSection;
