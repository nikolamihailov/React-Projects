import useTitle from "../../hooks/useTitle";
import styles from "./About.module.css";
import Map from "./Map/Map";

const values = [
  {
    icon: "fa-layer-group",
    title: "Everything in one place",
    text: "Whether it's a trending video game, a challenging puzzle, or a beloved book, discover everything you need in one place at KolPlace.",
  },
  {
    icon: "fa-compass",
    title: "Easy browsing",
    text: "Our website is designed with you in mind – a user-friendly interface that makes browsing a pleasure.",
  },
  {
    icon: "fa-bag-shopping",
    title: "Hassle-free checkout",
    text: "From effortless navigation to a hassle-free checkout process, we prioritize a smooth and enjoyable online shopping journey.",
  },
];

const About = () => {
  useTitle("About Us | KolPlace");

  return (
    <section className={styles["about"]}>
      <div className={styles["intro"]}>
        <h1>About us</h1>
        <p>
          Welcome to KolPlace, where the joy extends beyond just selecting your
          latest acquisition.
        </p>
      </div>

      <div className={styles["story"]}>
        <h2>Our story</h2>
        <p>
          We invite you to indulge in an experience that transforms your
          personal time into precious moments. At KolPlace, we believe in making
          every moment special, whether it&apos;s for yourself or someone close
          to you.
        </p>
        <p>
          KolPlace is more than an e-commerce platform, it&apos;s a tech-forward
          destination where innovation meets entertainment. Join us in
          celebrating the perfect blend of cutting-edge technology, captivating
          reads, and unique lifestyle products.
        </p>
      </div>

      <ul className={styles["values"]}>
        {values.map((v) => (
          <li key={v.title} className={styles["value"]}>
            <span className={styles["value-icon"]} aria-hidden="true">
              <i className={`fa-solid ${v.icon}`}></i>
            </span>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </li>
        ))}
      </ul>

      <div className={styles["contact-grid"]}>
        <div className={styles["contact"]}>
          <h2>Get in touch</h2>
          <p className={styles["muted"]}>
            Have questions or need assistance? Reach out to us!
          </p>
          <ul className={styles["contact-list"]}>
            <li>
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              <span className={styles["contact-label"]}>Email</span>
              <a href="mailto:kolplace_km@gmail.com">kolplace_km@gmail.com</a>
            </li>
            <li>
              <i className="fa-solid fa-phone" aria-hidden="true"></i>
              <span className={styles["contact-label"]}>Phone</span>
              <a href="tel:+44 20 7946 0443">+44 20 7946 0443</a>
            </li>
          </ul>
        </div>
        <div className={styles["map-card"]}>
          <Map />
        </div>
      </div>
    </section>
  );
};

export default About;
