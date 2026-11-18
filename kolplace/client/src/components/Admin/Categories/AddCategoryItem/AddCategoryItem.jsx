import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../../data/services/categoryService";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddCategory.module.css";
import { NotifContext } from "../../../../contexts/NotificationContext";
import Notification from "../../../Notifications/Notification";
import { AuthContext } from "../../../../contexts/AuthContext";
import ImageUpload from "../../../ImageUpload/ImageUpload";
import noImage from "../../../../assets/no-image.jpg";

const FORM_VALUES = {
  Name: "name",
  CategoryImage: "categoryImage",
};

const AddCategoryItem = ({ onClose }) => {
  const [values, setValues] = useState({
    [FORM_VALUES.Name]: "",
    [FORM_VALUES.CategoryImage]: "",
  });

  const navigateTo = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
  };

  const onImageChange = (name, url) => {
    setValues((state) => ({ ...state, [name]: url }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values[FORM_VALUES.Name].trim() === "") {
      updateNotifs([{ text: "Name must be filled!", type: "error" }]);
      return;
    }
    if (!values[FORM_VALUES.CategoryImage]) {
      updateNotifs([{ text: "Image must be filled!", type: "error" }]);
      return;
    }
    const category = await createCategory(values);
    if (category.expMessage) {
      updateNotifs([{ text: category.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (category.errors) {
      setErrors(Object.values(category.errors));
    } else {
      updateNotifs([
        { text: `Category - ${category.name} added!`, type: "success" },
      ]);
      setErrors([]);
      onClose();
      navigateTo("/admin-panel/categories");
    }
  };
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <form onSubmit={onSubmit} className={styles["add-category"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Games"
            value={values[FORM_VALUES.Name]}
            onChange={onChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <ImageUpload
            name={FORM_VALUES.CategoryImage}
            label="Category Image"
            value={values[FORM_VALUES.CategoryImage]}
            folder="categories"
            fallback={noImage}
            alt={values[FORM_VALUES.Name]}
            onChange={onImageChange}
            onBusyChange={setIsUploading}
          />
        </div>

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading image..." : "Add"}
        </button>
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

export default AddCategoryItem;
