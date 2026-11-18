import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import useTitle from "../../hooks/useTitle";
import errorCart from "../../assets/errorPageCartImage.png";

const ErrorPage = () => {
  useTitle("Error Page");
  return (
    <section className={styles["error-section"]}>
      <div className={styles["content"]}>
        <img
          className={styles["image"]}
          src={errorCart}
          alt="An empty shopping cart"
        />
        <p className={styles["eyebrow"]}>Page not found</p>
        <h1 className={styles["title"]}>Oops! Something went wrong.</h1>
        <p className={styles["text"]}>
          We apologize for the inconvenience. The page you&apos;re looking for
          may have moved or is currently unavailable.
        </p>
        <Link to="/" className={styles["button"]}>
          <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
          Go back shopping
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
