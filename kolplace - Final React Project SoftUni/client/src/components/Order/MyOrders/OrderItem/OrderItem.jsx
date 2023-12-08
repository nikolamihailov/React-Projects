import { formatDate } from "../../../../utils/dateFormatter";
import styles from "./OrderItem.module.css";

const OrderItem = ({
  _id,
  createdAt,
  totalPrice,
  deliveryType,
  onOpenDetails,
}) => {
  return (
    <article className={styles["order"]}>
      <h4>
        <span className="icon">
          <i className="fa-solid fa-hashtag"></i>
        </span>
        <strong>Order Number:</strong> {_id.slice(5, -5)}
      </h4>
      <h4>
        <span className="icon">
          <i className="fa-solid fa-calendar-days"></i>
        </span>
        <strong>Order made on:</strong> {formatDate(createdAt)}
      </h4>
      <h4>
        <span className="icon">
          <i className="fa-solid fa-truck"></i>
        </span>
        <strong>Type of Delivery:</strong> {deliveryType}
      </h4>
      <h4>
        <span className="icon">
          <i className="fa-solid fa-money-bill"></i>
        </span>
        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
      </h4>
      <button onClick={() => onOpenDetails(_id)}>Details</button>
    </article>
  );
};

export default OrderItem;
