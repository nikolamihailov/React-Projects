import { useEffect, useState } from "react";
import { getOneOrder } from "../../../../data/services/orderService";
import styles from "./OrderDetails.module.css";
import ProductItem from "../../Checkout/ProductItem/ProductItem";
import { formatDate } from "../../../../utils/dateFormatter";

const OrderDetails = ({ id, onClose }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOneOrder(id)
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <article className={styles["order-details"]}>
        <div>
          <h2>{order?._id.slice(5, -5)}</h2>
          <p>{order && formatDate(order.createdAt)}</p>
        </div>

        <section className={styles["customer-details"]}>
          <h3>
            {order?.firstName} {order?.lastName}
          </h3>
          <p>Email: {order?.email}</p>
        </section>

        <section className={styles["delivery-details"]}>
          <h3>Delivery Information</h3>
          <p>Delivery Type: {order?.deliveryType}</p>
          <p>City: {order?.city}</p>
          <p>Address: {order?.address}</p>
        </section>

        <section className={styles["ordered-products"]}>
          <h2>Ordered Products</h2>
          {order?.products.map((p) => (
            <ProductItem key={p.product._id} productInfo={p} />
          ))}
        </section>

        <footer>
          <h2>Total Price: ${order?.totalPrice.toFixed(2)}</h2>
        </footer>
      </article>
    </>
  );
};

export default OrderDetails;
