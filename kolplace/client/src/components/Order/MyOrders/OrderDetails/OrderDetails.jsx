import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getOneOrder } from "../../../../data/services/orderService";
import styles from "./OrderDetails.module.css";
import ProductItem from "../../Checkout/ProductItem/ProductItem";
import { formatDate } from "../../../../utils/dateFormatter";
import Spinner from "../../../Spinner/Spinner";

// Rendered into the themed .app element (not <body>) so the dialog picks up
// the current light/dark colour variables.
const portalTarget = () => document.querySelector(".app") || document.body;

const OrderDetails = ({ id, onClose }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const titleId = useId();
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    getOneOrder(id)
      .then((data) => {
        setOrder(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Focus the dialog, close on Escape, give focus back when it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, []);

  const orderNumber = (order?._id || id || "").slice(5, -5);
  const products = order?.products || [];
  const itemCount = products.reduce(
    (sum, p) => sum + (Number(p.quantity) || 0),
    0
  );

  return createPortal(
    <div
      className={styles["overlay"]}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className={styles["dialog"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className={styles["head"]}>
          <div className={styles["head-text"]}>
            <h2 id={titleId}>
              Order <span className={styles["mono"]}>#{orderNumber}</span>
            </h2>
            {order && (
              <p className={styles["subtle"]}>
                Placed on {formatDate(order.createdAt)}
              </p>
            )}
          </div>
          <button
            type="button"
            className={styles["close"]}
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className={styles["body"]}>
          {isLoading ? (
            <div className={styles["loading"]}>
              <Spinner inline />
            </div>
          ) : (
            <>
              <section className={styles["block"]}>
                <h3 className={styles["block-title"]}>
                  Items <span className={styles["subtle"]}>({itemCount})</span>
                </h3>
                <div className={styles["products"]}>
                  {products.map((p) => (
                    <ProductItem key={p._id} productInfo={p} />
                  ))}
                </div>
              </section>

              <section className={styles["block"]}>
                <h3 className={styles["block-title"]}>Summary</h3>
                <dl className={styles["summary"]}>
                  <div>
                    <dt>Customer</dt>
                    <dd>
                      {order?.firstName} {order?.lastName}
                      {order?.email && (
                        <span className={styles["subtle"]}>{order.email}</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>{order?.deliveryType}</dd>
                  </div>
                  <div>
                    <dt>
                      {/office/i.test(order?.deliveryType || "")
                        ? "Office"
                        : "Address"}
                    </dt>
                    <dd>
                      {order?.address?.trim()}
                      {order?.city && (
                        <span className={styles["subtle"]}>{order.city}</span>
                      )}
                    </dd>
                  </div>
                  {order?.paymentMethod && (
                    <div>
                      <dt>Payment</dt>
                      <dd>{order.paymentMethod}</dd>
                    </div>
                  )}
                  <div className={styles["total"]}>
                    <dt>Total</dt>
                    <dd>${order?.totalPrice.toFixed(2)}</dd>
                  </div>
                </dl>
              </section>
            </>
          )}
        </div>
      </div>
    </div>,
    portalTarget()
  );
};

export default OrderDetails;
