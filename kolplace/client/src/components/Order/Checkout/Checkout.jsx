import { useCallback, useContext, useEffect, useState } from "react";
import useTitle from "../../../hooks/useTitle";
import {
  getAllCities,
  getAllOfficesInCity,
} from "../../../data/services/api/econt-api";
import styles from "./Checkout.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ProductItem from "./ProductItem/ProductItem";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { getProfile } from "../../../data/services/userService";
import { createOrder } from "../../../data/services/orderService";
import { NotifContext } from "../../../contexts/NotificationContext";
import Notification from "../../Notifications/Notification";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../Spinner/Spinner";

const FORM_VALUES = {
  City: "city",
  Office: "office",
  DeliveryType: "deliveryType",
  Address: "address",
};

const DELIVERY_OPTIONS = [
  {
    id: "toAddress",
    value: "To Address",
    icon: "fa-solid fa-house",
    hint: "Courier delivery to your door",
  },
  {
    id: "toEcontOffice",
    value: "To Econt Office",
    icon: "fa-solid fa-building",
    hint: "Pick up from an Econt office",
  },
];

const Checkout = () => {
  useTitle("Checkout | KolPlace");
  const [values, setValues] = useState({
    [FORM_VALUES.City]: "",
    [FORM_VALUES.DeliveryType]: "To Address",
    [FORM_VALUES.Address]: "",
  });
  const [errors, setErrors] = useState([]);
  const [cities, setCities] = useState([]);
  const [offices, setOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart, emptyCartProducts } = useContext(ShoppingCartContext);
  const { auth, updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (cart?.isLoaded && cart.products.length === 0) {
      updateNotifs([{ text: "You have no items in the cart!", type: "error" }]);
      navigateTo("/");
    }
    window.scroll(0, 0);
    getAllCities()
      .then((data) => {
        setCities(data?.cities || []);
      })
      .catch((err) => {
        // Never leave checkout spinning if the courier lookup fails.
        console.log(err);
        updateNotifs([{ text: "Could not load delivery cities, please refresh the page.", type: "error" }]);
      })
      .finally(() => setIsLoading(false));
  }, [cart?.isLoaded, cart?.products, updateNotifs, navigateTo]);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
    if (name === FORM_VALUES.City) {
      const id = value.split("-")[0];
      getAllOfficesInCity(Number(id))
        .then((data) => {
          setOffices(data.offices);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await getProfile(auth?.user._id);

    const products = cart?.products.map((p) => ({
      product: p.product._id,
      quantity: p.quantity,
    }));

    const body = {
      maker: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: values[FORM_VALUES.City].split("-")[1],
      deliveryType: values[FORM_VALUES.DeliveryType],
      address: values[FORM_VALUES.Address],
      paymentMethod: "Onsite pay",
      products: products,
      totalPrice: cart?.totalPrice,
    };
    const order = await createOrder(body);
    if (order.expMessage) {
      updateNotifs([{ text: order.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (order.errors) {
      window.scroll(0, 0);
      setErrors(order.errors);
    } else {
      updateNotifs([
        { text: "You successfuly made the order!", type: "success" },
      ]);
      navigateTo("/order-complete");
      emptyCartProducts();
    }
  };

  const isOfficeDelivery =
    values[FORM_VALUES.DeliveryType] === "To Econt Office";
  const itemCount =
    cart?.products.reduce((count, p) => count + Number(p.quantity), 0) ?? 0;

  const citySelect = (
    <div className={styles["field"]}>
      <label htmlFor={FORM_VALUES.City}>City</label>
      <select
        name={FORM_VALUES.City}
        id={FORM_VALUES.City}
        value={values[FORM_VALUES.City]}
        onChange={onChange}
      >
        <option value="" disabled>
          Select a city
        </option>
        {cities?.length > 0 &&
          cities.map((c) => (
            <option key={c.id} value={c.id + "-" + c.nameEn}>
              {c.nameEn}
            </option>
          ))}
      </select>
    </div>
  );

  return (
    <section className={styles["checkout-section"]}>
      <div className={styles["page-head"]}>
        <Link to={"/shopping-cart"} className={styles["back"]}>
          <i className="fa-solid fa-arrow-left"></i> Back to cart
        </Link>
        <h1>Checkout</h1>
        <p>Choose how you would like to receive your order, then place it.</p>
      </div>

      {isLoading || !cart?.isLoaded ? (
        <div className={styles["loading"]}>
          <Spinner />
        </div>
      ) : (
        <form onSubmit={onSubmit} className={styles["layout"]}>
          <div className={styles["sections"]}>
            <section className={styles["card"]}>
              <h2>
                <span className={styles["step"]}>1</span> Contact
              </h2>
              <p className={styles["contact"]}>
                <i className="fa-solid fa-envelope"></i>
                Ordering as <strong>{auth?.user?.email}</strong>
              </p>
            </section>

            <section className={styles["card"]}>
              <h2>
                <span className={styles["step"]}>2</span> Delivery
              </h2>
              <fieldset className={styles["delivery-type"]}>
                <legend>Delivery type</legend>
                <div className={styles["options"]}>
                  {DELIVERY_OPTIONS.map((o) => (
                    <label
                      key={o.id}
                      htmlFor={o.id}
                      className={`${styles["option"]} ${
                        values[FORM_VALUES.DeliveryType] === o.value
                          ? styles["selected"]
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        id={o.id}
                        name={FORM_VALUES.DeliveryType}
                        value={o.value}
                        checked={values[FORM_VALUES.DeliveryType] === o.value}
                        onChange={onChange}
                      />
                      <i className={o.icon} aria-hidden="true"></i>
                      <span>
                        <strong>{o.value}</strong>
                        <small>{o.hint}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {isOfficeDelivery && (
                <div className={styles["fields"]}>
                  {citySelect}
                  {offices?.length > 0 && (
                    <div className={styles["field"]}>
                      <label htmlFor={FORM_VALUES.Address}>Office</label>
                      <select
                        name={FORM_VALUES.Address}
                        id={FORM_VALUES.Address}
                        value={values[FORM_VALUES.Address]}
                        onChange={onChange}
                      >
                        <option value="" disabled>
                          Select an office
                        </option>
                        {offices.map((o) => (
                          <option key={o.id} value={o.address.fullAddressEn}>
                            {o.address.fullAddressEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
              {!isOfficeDelivery && (
                <div className={styles["fields"]}>
                  {citySelect}
                  <div className={styles["field"]}>
                    <label htmlFor={FORM_VALUES.Address}>Street address</label>
                    <input
                      type="text"
                      placeholder="ul. TSar Ivan Asen I №1"
                      id={FORM_VALUES.Address}
                      name={FORM_VALUES.Address}
                      value={values[FORM_VALUES.Address]}
                      onChange={onChange}
                    />
                  </div>
                </div>
              )}
            </section>

            <section className={styles["card"]}>
              <h2>
                <span className={styles["step"]}>3</span> Payment
              </h2>
              <div className={`${styles["option"]} ${styles["selected"]}`}>
                <i className="fa-solid fa-money-bill" aria-hidden="true"></i>
                <span>
                  <strong>Onsite pay</strong>
                  <small>Pay when you receive your order.</small>
                </span>
              </div>
              <p className={styles["hint"]}>
                Currently we offer only onsite payment.
              </p>
            </section>
          </div>

          <aside className={styles["summary"]} aria-label="Order summary">
            <h2>Order summary</h2>
            <div className={styles["summary-items"]}>
              {cart?.products.map((p) => {
                return <ProductItem key={p.product._id} productInfo={p} />;
              })}
            </div>
            <dl className={styles["rows"]}>
              <div>
                <dt>
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </dt>
                <dd>${cart.totalPrice.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Payment</dt>
                <dd className={styles["muted"]}>On delivery</dd>
              </div>
              <div className={styles["total"]}>
                <dt>Total</dt>
                <dd>${cart.totalPrice.toFixed(2)}</dd>
              </div>
            </dl>
            <button type="submit" className={styles["primary"]}>
              Place order
            </button>
            <Link to={"/shopping-cart"} className={styles["secondary"]}>
              Edit cart
            </Link>
          </aside>
        </form>
      )}

      {errors.length > 0 && (
        <div className={styles["errors-container"]}>
          {errors.map((e) => (
            <Notification text={e} type={"error"} key={uuidv4()} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Checkout;
