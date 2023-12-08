import { Link } from "react-router-dom";
import styles from "./ShopFeatures.module.css";

const ShopFeaturesSection = () => {
  return (
    <section className={styles["shopFeatures"]}>
      <div className={styles["feature"]}>
        <i className="fas fa-money-bill" />
        <a
          href="https://en.wikipedia.org/wiki/Money-back_guarantee"
          target="_blank"
          rel="noreferrer"
        >
          <p>Money Back Guarantee</p>
        </a>
      </div>
      <div className={styles["feature-slash"]}></div>
      <div className={styles["feature"]}>
        <i className="fas fa-shield-alt" />
        <a
          href="  https://www.acq.osd.mil/asda/dpc/index.html"
          target="_blank"
          rel="noreferrer"
        >
          <p>Price Defense Policy</p>
        </a>
      </div>
      <div className={styles["feature-slash"]}></div>
      <div className={styles["feature"]}>
        <i className="fas fa-truck" />
        <p>Fast Shipping</p>
      </div>
      <div className={styles["feature-slash"]}></div>
      <div className={styles["feature"]}>
        <i className="fas fa-phone" />
        <p>24/7 Customer Support</p>
      </div>
      <div className={styles["feature-slash"]}></div>
      <div className={styles["feature"]}>
        <i className="fas fa-store" />
        <Link to={"/our-stores"}>
          {" "}
          <p>Our Stores</p>
        </Link>
      </div>
    </section>
  );
};

export default ShopFeaturesSection;
