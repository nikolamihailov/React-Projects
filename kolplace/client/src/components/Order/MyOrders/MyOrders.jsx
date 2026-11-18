import { useEffect, useState } from "react";
import { useContext } from "react";
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

  const onOpenDetails = (id) => {
    setSelectedOrder(id);
    showHide();
  };

  return (
    <section className={styles["my-orders-section"]}>
      <h1>My Orders</h1>
      <div className={styles["orders-icon"]}>
        <i className="fas fa-truck"></i>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles["orders"]}>
          {myOrders.length > 0 &&
            myOrders.map((o) => {
              return (
                <OrderItem key={o._id} {...o} onOpenDetails={onOpenDetails} />
              );
            })}
          {myOrders.length === 0 && (
            <h3>You haven&apos;t order anything yet! </h3>
          )}
        </div>
      )}

      {isOpen && <OrderDetails id={selectedOrder} onClose={showHide} />}
    </section>
  );
};

export default MyOrders;
