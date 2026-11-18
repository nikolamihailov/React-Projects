import { useContext, useEffect, useState } from "react";
import styles from "../AddProductItem/AddProduct.module.css";
import { getAll } from "../../../../data/services/categoryService";
import { editProduct, getOneProduct } from "../../../../data/services/productService";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../../../Notifications/Notification";
import { v4 as uuidv4 } from "uuid";
import noImage from "../../../../assets/no-image.jpg";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import Spinner from "../../../Spinner/Spinner";

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

const PRODUCT_IMAGES = [
  { field: FORM_VALUES.Image, label: "Product Image", optional: false },
  { field: FORM_VALUES.ImageTwo, label: "Product Image 2 (Optional)", optional: true },
  { field: FORM_VALUES.ImageThree, label: "Product Image 3 (Optional)", optional: true },
  { field: FORM_VALUES.ImageFour, label: "Product Image 4 (Optional)", optional: true },
];

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
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();
  const [errors, setErrors] = useState([]);
  const [uploadsInProgress, setUploadsInProgress] = useState(0);
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const categories = await getAll();
        setCategories(categories);

        const product = await getOneProduct(id);
        setValues({
          [FORM_VALUES.Name]: product.name,
          [FORM_VALUES.Price]: product.price,
          [FORM_VALUES.HasPromoPrice]: product.hasPromoPrice,
          [FORM_VALUES.PromoPrice]: product.promoPrice,
          [FORM_VALUES.Category]: product.category._id,
          [FORM_VALUES.Description]: product.description,
          [FORM_VALUES.Image]: product.mainImage,
          [FORM_VALUES.ImageTwo]: product.imageTwo,
          [FORM_VALUES.ImageThree]: product.imageThree,
          [FORM_VALUES.ImageFour]: product.imageFour,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setValues((state) => ({ ...state, [name]: checked }));
    else setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
  };

  const onImageChange = (name, url) => {
    setValues((state) => ({ ...state, [name]: url }));
    setErrors([]);
  };

  const onBusyChange = (busy) => setUploadsInProgress((n) => n + (busy ? 1 : -1));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values[FORM_VALUES.Name].trim() === "") {
      updateNotifs([{ text: "Name must be filled!", type: "error" }]);
      return;
    }
    if (!values[FORM_VALUES.Image]) {
      updateNotifs([{ text: "Product image is required!", type: "error" }]);
      return;
    }
    if (values[FORM_VALUES.Description].trim() === "") {
      updateNotifs([{ text: "Description must be filled!", type: "error" }]);
      return;
    }
    console.log(values);
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
        products.map((product) => (product._id === editedProduct._id ? editedProduct : product))
      );
      updateNotifs([{ text: `Product - ${editedProduct.name} updated!`, type: "success" }]);
      setErrors([]);
      onClose();
      navigateTo("/admin-panel/products");
    }
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <form onSubmit={onSubmit} className={styles["add-product"]}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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
                  <div className={styles["form-group-checkbox"]}>
                  <label htmlFor="checkbox">
                    Has Promo Price
                  </label>
                    <input
                      type="checkbox"
                      name={FORM_VALUES.HasPromoPrice}
                      checked={values[FORM_VALUES.HasPromoPrice]}
                      onChange={onChange}
                      id="checkbox"
                    />
                  </div>
                </div>
                {values[FORM_VALUES.HasPromoPrice] && (
                  <div className={styles["form-group"]}>
                    <label htmlFor={FORM_VALUES.PromoPrice}>Product Promo Price</label>
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
                    value={values[FORM_VALUES.Category]}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor={FORM_VALUES.Description}>Product Description</label>
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
                {PRODUCT_IMAGES.map(({ field, label, optional }) => (
                  <div className={styles["form-group"]} key={field}>
                    <ImageUpload
                      name={field}
                      label={label}
                      value={values[field]}
                      folder="products"
                      fallback={noImage}
                      alt={values[FORM_VALUES.Name]}
                      optional={optional}
                      onChange={onImageChange}
                      onBusyChange={onBusyChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" disabled={uploadsInProgress > 0}>
          {uploadsInProgress > 0 ? "Uploading image..." : "Edit"}
        </button>
          </>
        )}
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
