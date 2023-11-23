import useTitle from "../../hooks/useTitle";
import styles from "./About.module.css";

const About = () => {
  useTitle("About Us | KolPlace");

  return (
    <section className={styles["about-us-section"]}>
      <div>
        <h1>About us</h1>
        <p>
          Welcome to KolPlace, where the joy extends beyond just selecting your
          latest acquisition. Whether it&apos;s a trending video game, a
          challenging puzzle, or a beloved book, we invite you to indulge in an
          experience that transforms your personal time into precious moments.
          At KolPlace, we believe in making every moment special, whether
          it&apos;s for yourself or someone close to you. Discover everything
          you need in one place at KolPlace! Our website is designed with you in
          mind – a user-friendly interface that makes browsing a pleasure. From
          effortless navigation to a hassle-free checkout process, we prioritize
          a smooth and enjoyable online shopping journey. <br />
          <br />
          KolPlace is more than an e-commerce platform, it&apos;s a tech-forward
          destination where innovation meets entertainment. Join us in
          celebrating the perfect blend of cutting-edge technology, captivating
          reads, and unique lifestyle products.
        </p>
      </div>
      <div className={styles["contact-section"]}>
        <p>Have questions or need assistance? Reach out to us!</p>
        <p>
          Email:
          <a href="mailto:kolplace_km@gmail.com">kolplace_km@gmail.com</a>
        </p>
        <p>
          Phone: <a href="tel:+44 20 7946 0443">+44 20 7946 0443</a>
        </p>
      </div>
      <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7220.342447010138!2d55.27434804195275!3d25.19744761881899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2z0JTRg9Cx0LDQuSDQnNC-0Ls!5e0!3m2!1sbg!2sbg!4v1700751018522!5m2!1sbg!2sbg"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default About;
