import styles from "./OrderItem.module.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
});

// One row of the My Orders list: a table row on desktop, a card on phones.
// The small labels are visible only in the card layout (screen readers always
// get them).
const OrderItem = ({
  _id,
  createdAt,
  totalPrice,
  deliveryType,
  products,
  onOpenDetails,
}) => {
  const orderNumber = _id.slice(5, -5);
  const created = new Date(createdAt);
  const itemCount = Array.isArray(products)
    ? products.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0)
    : null;
  const isOffice = /office/i.test(deliveryType || "");

  return (
    <li className={styles["order"]}>
      <div className={`${styles["cell"]} ${styles["number"]}`}>
        <span className={styles["label"]}>Order</span>
        <span className={styles["mono"]}>#{orderNumber}</span>
      </div>

      <div className={`${styles["cell"]} ${styles["date"]}`}>
        <span className={styles["label"]}>Date</span>
        <span>
          <time dateTime={created.toISOString()}>{dateFormat.format(created)}</time>
          <span className={styles["muted"]}> {timeFormat.format(created)}</span>
        </span>
      </div>

      <div className={`${styles["cell"]} ${styles["delivery"]}`}>
        <span className={styles["label"]}>Delivery</span>
        <span className={styles["chip"]}>
          <i
            className={isOffice ? "fa-solid fa-store" : "fa-solid fa-house"}
            aria-hidden="true"
          ></i>
          {deliveryType}
        </span>
      </div>

      <div className={`${styles["cell"]} ${styles["items"]}`}>
        <span className={styles["label"]}>Items</span>
        <span>{itemCount ?? "-"}</span>
      </div>

      <div className={`${styles["cell"]} ${styles["total"]}`}>
        <span className={styles["label"]}>Total</span>
        <span className={styles["price"]}>${totalPrice.toFixed(2)}</span>
      </div>

      <div className={styles["action"]}>
        <button
          type="button"
          className={styles["button"]}
          onClick={() => onOpenDetails(_id)}
          aria-label={`View details of order ${orderNumber}`}
        >
          View details
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
