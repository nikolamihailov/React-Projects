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
  const { auth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (cart?.products.length === 0) {
      updateNotifs([{ text: "You have no items in the cart!", type: "error" }]);
      navigateTo("/");
    }
    window.scroll(0, 0);
    getAllCities()
      .then((data) => {
        setCities(data.cities);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [cart?.products, updateNotifs, navigateTo]);

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

  return (
    <section className={styles["checkout-section"]}>
      <Link to={"/shopping-cart"}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <div className={styles["page-info"]}>
        <h1>Checkout</h1>
        <img src="/src/assets/checkout.png" alt="checkout" />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <h5>Delivery Type</h5>
          <div className={styles["delivery-type"]}>
            <input
              type="radio"
              id="toEcontOffice"
              name={FORM_VALUES.DeliveryType}
              checked={values[FORM_VALUES.DeliveryType] === "To Econt Office"}
              value="To Econt Office"
              onChange={onChange}
            />
            <label htmlFor="toEcontOffice">To Econt Office</label>

            <input
              type="radio"
              id="toAddress"
              name={FORM_VALUES.DeliveryType}
              value="To Address"
              onChange={onChange}
              checked={values[FORM_VALUES.DeliveryType] === "To Address"}
            />
            <label htmlFor="toAddress">To Address</label>
          </div>
          <h5>Address Info</h5>

          {values[FORM_VALUES.DeliveryType] === "To Econt Office" && (
            <div className={styles["with-office"]}>
              <div className={styles["form-group"]}>
                <label htmlFor={FORM_VALUES.City}>City</label>
                <select
                  name={FORM_VALUES.City}
                  id={FORM_VALUES.City}
                  value={values[FORM_VALUES.City]}
                  onChange={onChange}
                >
                  {cities?.length > 0 &&
                    cities.map((c) => (
                      <option key={c.id} value={c.id + "-" + c.nameEn}>
                        {c.nameEn}
                      </option>
                    ))}
                </select>
              </div>

              {offices?.length > 0 && (
                <div className={styles["form-group"]}>
                  <label htmlFor={FORM_VALUES.Address}>Office Address</label>
                  <select
                    name={FORM_VALUES.Address}
                    id={FORM_VALUES.Address}
                    value={values[FORM_VALUES.Address]}
                    onChange={onChange}
                  >
                    {offices?.length > 0 &&
                      offices.map((o) => (
                        <option key={o.id} value={o.address.fullAddressEn}>
                          {o.address.fullAddressEn}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          )}
          {values[FORM_VALUES.DeliveryType] === "To Address" && (
            <div className={styles["without-office"]}>
              <div className={styles["form-group"]}>
                <label htmlFor={FORM_VALUES.City}>City</label>
                <select
                  name={FORM_VALUES.City}
                  id={FORM_VALUES.City}
                  value={values[FORM_VALUES.City]}
                  onChange={onChange}
                >
                  {cities?.length > 0 &&
                    cities.map((c) => (
                      <option key={c.id} value={c.id + "-" + c.nameEn}>
                        {c.nameEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor={FORM_VALUES.Address}>Address</label>
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
          <h5>Payment method</h5>
          <p style={{ fontWeight: "bold" }}> - Onsite Pay</p>
          <span style={{ fontStyle: "italic", marginTop: "10px" }}>
            Currently we offer only onsite payment***
          </span>
          <div className={styles["checkout-products"]}>
            <h3>Products</h3>
            {cart?.products.map((p) => {
              return <ProductItem key={p.product._id} productInfo={p} />;
            })}
          </div>

          <h5>Total Price</h5>
          <div className={styles["total-price"]}>
            <p>${cart.totalPrice.toFixed(2)}</p>
          </div>
          <button type="submit">Finish Order</button>
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
