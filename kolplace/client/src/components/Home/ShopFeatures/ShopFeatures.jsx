import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./ShopFeatures.module.css";

const FEATURES = [
  { icon: "fa-money-bill", label: "Money back guarantee" },
  { icon: "fa-shield-alt", label: "Price defense policy" },
  { icon: "fa-truck", label: "Fast shipping" },
  { icon: "fa-phone", label: "24/7 customer support" },
  { icon: "fa-store", label: "Our stores", to: "/our-stores" },
];

const ShopFeaturesSection = () => (
  <section className={styles["shop-features"]} aria-label="Why shop with us">
    <ul className={styles["list"]}>
      {FEATURES.map(({ icon, label, to }, idx) => {
        const content = (
          <>
            <span className={styles["icon"]} aria-hidden="true">
              <i className={`fas ${icon}`}></i>
            </span>
            <span className={styles["label"]}>{label}</span>
          </>
        );
        return (
          <Fragment key={label}>
            {idx > 0 && <li className={styles["slash"]} aria-hidden="true"></li>}
            <li className={styles["feature"]}>
              {to ? (
                <Link to={to} className={styles["link"]}>
                  {content}
                </Link>
              ) : (
                <div className={styles["link"]}>{content}</div>
              )}
            </li>
          </Fragment>
        );
      })}
    </ul>
  </section>
);

export default ShopFeaturesSection;
