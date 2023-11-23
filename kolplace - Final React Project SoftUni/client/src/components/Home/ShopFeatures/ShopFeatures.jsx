import styles from "./ShopFeatures.module.css";

const ShopFeaturesSection = () => {
  return (
    <section className={styles["shopFeatures"]}>
      <div className={styles["feature"]}>
        <i className="fas fa-money-bill" />
        <p>Money Back Guarantee</p>
      </div>
      <div className={styles["feature-slash"]}></div>
      <div className={styles["feature"]}>
        <i className="fas fa-shield-alt" />
        <p>Price Defense Policy</p>
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
        <p>Our Stores</p>
      </div>
    </section>
  );
};

export default ShopFeaturesSection;
