import { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { getAllMineOrders } from "../../../data/services/orderService";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./MyOrders.module.css";
import OrderItem from "./OrderItem/OrderItem";
import useTitle from "../../../hooks/useTitle";
import { useShowHide } from "../../../hooks/useShowHide";
import OrderDetails from "./OrderDetails/OrderDetails";
import Spinner from "../../Spinner/Spinner";

const MyOrders = () => {
  useTitle("My Orders | KolPlace");
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  const { isOpen, showHide } = useShowHide();

  useEffect(() => {
    getAllMineOrders(auth.user?._id)
      .then((data) => {
        setMyOrders(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [auth.user?._id]);

  // Newest order first.
  const orders = useMemo(
    () =>
      Array.isArray(myOrders)
        ? [...myOrders].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [],
    [myOrders]
  );

  const onOpenDetails = (id) => {
    setSelectedOrder(id);
    showHide();
  };

  return (
    <section className={styles["page"]}>
      <div className={styles["heading"]}>
        <p className={styles["eyebrow"]}>Account</p>
        <h1 className={styles["title"]}>My orders</h1>
        {!isLoading && orders.length > 0 && (
          <p className={styles["count"]}>
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        )}
      </div>

      {isLoading ? (
        <div className={styles["loading"]}>
          <Spinner />
        </div>
      ) : orders.length > 0 ? (
        <div className={styles["list"]}>
          <div className={styles["list-head"]} aria-hidden="true">
            <span>Order</span>
            <span>Date</span>
            <span>Delivery</span>
            <span>Items</span>
            <span className={styles["align-end"]}>Total</span>
            <span></span>
          </div>
          <ul className={styles["rows"]}>
            {orders.map((o) => (
              <OrderItem key={o._id} {...o} onOpenDetails={onOpenDetails} />
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles["empty"]}>
          <span className={styles["empty-icon"]} aria-hidden="true">
            <i className="fa-solid fa-box-open"></i>
          </span>
          <h2 className={styles["empty-title"]}>No orders yet</h2>
          <p className={styles["empty-text"]}>
            When you place an order it will show up here, together with its
            delivery details.
          </p>
          <Link to="/" className={styles["button"]}>
            Start shopping
          </Link>
        </div>
      )}

      {isOpen && <OrderDetails id={selectedOrder} onClose={showHide} />}
    </section>
  );
};

export default MyOrders;
