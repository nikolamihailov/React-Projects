import { Link } from "react-router-dom"; // Import Link from React Router if you're using it
import styles from "./ErrorPage.module.css";
import useTitle from "../../hooks/useTitle";

const ErrorPage = () => {
  useTitle("Error Page");
  return (
    <div className={styles["error-section"]}>
      <h2>Oops! Something went wrong.</h2>
      <img src="/src/assets/errorPageCartImage.png" alt="Error" />
      <p>
        We apologize for the inconvenience. The page you&apos;re looking for may
        be unavailable <span>&#58;&#40;</span>
      </p>
      <Link to="/">Go back shopping</Link>
    </div>
  );
};

export default ErrorPage;
