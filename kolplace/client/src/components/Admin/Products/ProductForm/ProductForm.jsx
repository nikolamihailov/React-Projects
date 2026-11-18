import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../../../data/services/categoryService";
import { createProduct, editProduct, getOneProduct } from "../../../../data/services/productService";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import AdminModal, { ModalButton } from "../../AdminModal/AdminModal";
import form from "../../AdminModal/AdminForm.module.css";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import noImage from "../../../../assets/no-image.jpg";

const EMPTY = {
  name: "",
  price: "",
  category: "",
  hasPromoPrice: false,
  promoPrice: "",
  description: "",
  mainImage: "",
  imageTwo: "",
  imageThree: "",
  imageFour: "",
};

const PRODUCT_IMAGES = [
  { field: "mainImage", label: "Main image" },
  { field: "imageTwo", label: "Image 2 (optional)", optional: true },
  { field: "imageThree", label: "Image 3 (optional)", optional: true },
  { field: "imageFour", label: "Image 4 (optional)", optional: true },
];

// Add (no id) or edit (id) a product. onSaved(product, isNew) lets the list update.
const ProductForm = ({ id, onClose, onSaved }) => {
  const isEdit = Boolean(id);
  const [values, setValues] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadsInProgress, setUploadsInProgress] = useState(0);
  const [errors, setErrors] = useState([]);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      try {
        const allCategories = await getAll();
        setCategories(allCategories);
        if (isEdit) {
          const p = await getOneProduct(id);
          setValues({
            name: p.name,
            price: p.price,
            category: p.category?._id || p.category,
            hasPromoPrice: p.hasPromoPrice,
            promoPrice: p.promoPrice ?? "",
            description: p.description,
            mainImage: p.mainImage || "",
            imageTwo: p.imageTwo || "",
            imageThree: p.imageThree || "",
            imageFour: p.imageFour || "",
          });
        } else {
          setValues((v) => ({ ...v, category: allCategories[0]?._id || "" }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((state) => ({ ...state, [name]: type === "checkbox" ? checked : value }));
    setErrors([]);
  };

  const onImageChange = (name, url) => {
    setValues((state) => ({ ...state, [name]: url }));
    setErrors([]);
  };

  const onBusyChange = (busy) => setUploadsInProgress((n) => n + (busy ? 1 : -1));

  const onSubmit = async (e) => {
    e.preventDefault();
    const missing = [];
    if (!String(values.name).trim()) missing.push("Name must be filled!");
    if (String(values.price).trim() === "") missing.push("Price must be filled!");
    if (!String(values.description).trim()) missing.push("Description must be filled!");
    if (!values.mainImage) missing.push("Main image is required!");
    if (missing.length) return setErrors(missing);

    setIsSaving(true);
    const result = isEdit ? await editProduct(id, values) : await createProduct(values);
    setIsSaving(false);

    if (result.expMessage) {
      updateNotifs([{ text: result.expMessage, type: "error" }]);
      updateAuth({});
      navigateTo("/login");
      return;
    }
    if (result.errors) {
      setErrors(Object.values(result.errors));
      return;
    }
    updateNotifs([
      { text: `Product - ${result.name} ${isEdit ? "updated" : "added"}!`, type: "success" },
    ]);
    onSaved?.(result, !isEdit);
    onClose();
  };

  const isUploading = uploadsInProgress > 0;

  return (
    <AdminModal
      as="form"
      onSubmit={onSubmit}
      title={isEdit ? "Edit product" : "Add product"}
      onClose={onClose}
      size="lg"
      isLoading={isLoading}
      footer={
        <>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
          <ModalButton type="submit" variant="primary" disabled={isUploading || isSaving}>
            {isUploading ? "Uploading image..." : isSaving ? "Saving..." : isEdit ? "Save changes" : "Add product"}
          </ModalButton>
        </>
      }
    >
      <div className={form["form"]}>
        {errors.length > 0 && (
          <ul className={form["errors"]} role="alert">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <div className={form["columns"]}>
          <div className={form["stack"]}>
            <label className={form["field"]}>
              Name
              <input name="name" value={values.name} onChange={onChange} placeholder="iPhone 15 Pro Max" />
            </label>
            <div className={form["row"]}>
              <label className={form["field"]}>
                Price
                <input type="number" step="0.01" min="0" name="price" value={values.price} onChange={onChange} placeholder="999" />
              </label>
              <label className={form["field"]}>
                Category
                <select name="category" value={values.category} onChange={onChange}>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className={form["checkbox"]}>
              <input type="checkbox" name="hasPromoPrice" checked={Boolean(values.hasPromoPrice)} onChange={onChange} />
              On promotion
            </label>
            {values.hasPromoPrice && (
              <label className={form["field"]}>
                Promo price
                <input type="number" step="0.01" min="0" name="promoPrice" value={values.promoPrice} onChange={onChange} placeholder="799" />
              </label>
            )}
            <label className={`${form["field"]} ${form["grow"]}`}>
              Description
              <textarea name="description" value={values.description} onChange={onChange} placeholder="The iPhone 15 Pro Max is..." />
            </label>
          </div>
          <div>
            <p className={form["section-label"]}>Images</p>
            <div className={form["image-grid"]}>
              {PRODUCT_IMAGES.map(({ field, label, optional }) => (
                <ImageUpload
                  key={field}
                  name={field}
                  label={label}
                  value={values[field]}
                  folder="products"
                  fallback={noImage}
                  alt={values.name}
                  optional={optional}
                  onChange={onImageChange}
                  onBusyChange={onBusyChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default ProductForm;
