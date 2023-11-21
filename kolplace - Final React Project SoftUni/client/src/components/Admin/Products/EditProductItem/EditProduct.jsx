import { useContext, useEffect, useState } from "react";
import styles from "../AddProductItem/AddProduct.module.css";
import { getAll } from "../../../../data/services/categoryService";
import {
  editProduct,
  getOneProduct,
} from "../../../../data/services/productService";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../../../Notifications/Notification";
import { v4 as uuidv4 } from "uuid";

const FORM_VALUES = {
  Name: "name",
  Price: "price",
  Category: "category",
  HasPromoPrice: "hasPromoPrice",
  PromoPrice: "promoPrice",
  Description: "description",
  Image: "mainImage",
  ImageTwo: "imageTwo",
  ImageThree: "imageThree",
  ImageFour: "imageFour",
};

const EditProductItem = ({ onClose, id, updateProducts }) => {
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    [FORM_VALUES.Name]: "",
    [FORM_VALUES.Price]: "",
    [FORM_VALUES.Category]: "",
    [FORM_VALUES.HasPromoPrice]: false,
    [FORM_VALUES.PromoPrice]: "",
    [FORM_VALUES.Description]: "",
    [FORM_VALUES.Image]: "",
    [FORM_VALUES.ImageTwo]: "",
    [FORM_VALUES.ImageThree]: "",
    [FORM_VALUES.ImageFour]: "",
  });

  const navigateTo = useNavigate();
  const [errors, setErrors] = useState([]);
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    getAll()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));

    getOneProduct(id)
      .then((product) =>
        setValues({
          [FORM_VALUES.Name]: product.name || "",
          [FORM_VALUES.Price]: product.price || "",
          [FORM_VALUES.HasPromoPrice]: product.hasPromoPrice || false,
          [FORM_VALUES.PromoPrice]: product.promoPrice || "",
          [FORM_VALUES.Category]: product.category ? product.category : "",
          [FORM_VALUES.Description]: product.description || "",
          [FORM_VALUES.Image]: product.mainImage || "",
          [FORM_VALUES.ImageTwo]: product.imageTwo || "",
          [FORM_VALUES.ImageThree]: product.imageThree || "",
          [FORM_VALUES.ImageFour]: product.imageFour || "",
        })
      )
      .catch((err) => console.log(err));
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox")
      setValues((state) => ({ ...state, [name]: checked }));
    else setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedProduct = await editProduct(id, values);
    if (editedProduct.expMessage) {
      updateNotifs([{ text: editedProduct.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (editedProduct.errors) {
      setErrors(Object.values(editedProduct.errors));
    } else {
      updateProducts((products) =>
        products.map((product) =>
          product._id === editedProduct._id ? editedProduct : product
        )
      );
      updateNotifs([
        { text: `Product - ${editedProduct.name} updated!`, type: "success" },
      ]);
      setErrors([]);
      onClose();
      navigateTo("/admin-panel/products");
    }
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <form onSubmit={onSubmit} className={styles["add-product"]}>
        <div className={styles["all-product-inputs"]}>
          <div className={styles["inputs"]}>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.Name}>Product Name</label>
              <input
                type="text"
                name={FORM_VALUES.Name}
                id={FORM_VALUES.Name}
                placeholder="Iphone 15 Pro Max"
                value={values[FORM_VALUES.Name] || ""}
                onChange={onChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.Price}>Product Price</label>
              <input
                type="number"
                step={0.1}
                name={FORM_VALUES.Price}
                id={FORM_VALUES.Price}
                placeholder="999"
                value={values[FORM_VALUES.Price] || ""}
                onChange={onChange}
              />
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["container"]}>
                Has Promo Price
                <input
                  type="checkbox"
                  name={FORM_VALUES.HasPromoPrice}
                  checked={values[FORM_VALUES.HasPromoPrice]}
                  onChange={onChange}
                />
                <span className={styles["checkmark"]}></span>
              </label>
            </div>
            {values[FORM_VALUES.HasPromoPrice] && (
              <div className={styles["form-group"]}>
                <label htmlFor={FORM_VALUES.PromoPrice}>
                  Product Promo Price
                </label>
                <input
                  type="number"
                  step={0.1}
                  name={FORM_VALUES.PromoPrice}
                  id={FORM_VALUES.PromoPrice}
                  placeholder="799"
                  value={values[FORM_VALUES.PromoPrice] || ""}
                  onChange={onChange}
                />
              </div>
            )}
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.Category}>Category</label>
              <select
                name={FORM_VALUES.Category}
                id={FORM_VALUES.Category}
                onChange={onChange}
                value={values[FORM_VALUES.Category] || ""}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.Description}>
                Product Description
              </label>
              <textarea
                name={FORM_VALUES.Description}
                id={FORM_VALUES.Description}
                value={values[FORM_VALUES.Description] || ""}
                placeholder="The Ihone 15 Pro Max is the only ..."
                onChange={onChange}
              ></textarea>
            </div>
          </div>
          <div className={styles["images"]}>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.Image}>Product Image</label>
              <input
                type="text"
                name={FORM_VALUES.Image}
                placeholder="https://iphone-15..."
                id={FORM_VALUES.Image}
                value={values[FORM_VALUES.Image] || ""}
                onChange={onChange}
              />
              {values[FORM_VALUES.Image] === "" ? (
                <img
                  src="/src/assets/no-image.jpg"
                  alt={values[FORM_VALUES.Name]}
                />
              ) : (
                <img
                  src={values[FORM_VALUES.Image]}
                  alt={values[FORM_VALUES.Name]}
                />
              )}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.ImageTwo}>
                Product Image 2 (Optional)
              </label>
              <input
                type="text"
                name={FORM_VALUES.ImageTwo}
                placeholder="https://iphone-15..."
                id={FORM_VALUES.ImageTwo}
                value={values[FORM_VALUES.ImageTwo] || ""}
                onChange={onChange}
              />
              {values[FORM_VALUES.ImageTwo] === "" ? (
                <img
                  src="/src/assets/no-image.jpg"
                  alt={values[FORM_VALUES.Name]}
                />
              ) : (
                <img
                  src={values[FORM_VALUES.ImageTwo]}
                  alt={values[FORM_VALUES.Name]}
                />
              )}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.ImageThree}>
                Product Image 3 (Optional)
              </label>
              <input
                type="text"
                name={FORM_VALUES.ImageThree}
                placeholder="https://iphone-15..."
                id={FORM_VALUES.ImageThree}
                value={values[FORM_VALUES.ImageThree] || ""}
                onChange={onChange}
              />
              {values[FORM_VALUES.ImageThree] === "" ? (
                <img
                  src="/src/assets/no-image.jpg"
                  alt={values[FORM_VALUES.Name]}
                />
              ) : (
                <img
                  src={values[FORM_VALUES.ImageThree]}
                  alt={values[FORM_VALUES.Name]}
                />
              )}
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor={FORM_VALUES.ImageFour}>
                Product Image 4 (Optional)
              </label>
              <input
                type="text"
                name={FORM_VALUES.ImageFour}
                placeholder="https://iphone-15..."
                id={FORM_VALUES.ImageFour}
                value={values[FORM_VALUES.ImageFour] || ""}
                onChange={onChange}
              />
              {values[FORM_VALUES.ImageFour] === "" ? (
                <img
                  src="/src/assets/no-image.jpg"
                  alt={values[FORM_VALUES.Name]}
                />
              ) : (
                <img
                  src={values[FORM_VALUES.ImageFour]}
                  alt={values[FORM_VALUES.Name]}
                />
              )}
            </div>
          </div>
        </div>

        <button type="submit">Edit</button>
      </form>
      {errors.length > 0 && (
        <div className={styles["errors-container"]}>
          {errors.map((e) => (
            <Notification text={e} type={"error"} key={uuidv4()} />
          ))}
        </div>
      )}
    </>
  );
};

export default EditProductItem;
