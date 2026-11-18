import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import styles from "./OrderComplete.module.css";
import thankYouImage from "../../../assets/thank-you.png";

const OrderComplete = () => {
  useTitle("Order Complete | KolPlace");
  return (
    <section className={styles["order-complete-section"]}>
      <h1>Thank you for choosing us!</h1>
      <img src={thankYouImage} alt="thank you" />
      <div>
        _ _ _ <i className="fa-solid fa-truck"></i>
      </div>
      <h3>
        Your order is on the way!<br></br> You can find details about it in{" "}
        <br />{" "}
        <button>
          <Link to={"/my-orders"}>My Orders</Link>
        </button>
      </h3>
    </section>
  );
};

export default OrderComplete;
