import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../../data/services/categoryService";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddCategory.module.css";
import { NotifContext } from "../../../../contexts/NotificationContext";
import Notification from "../../../Notifications/Notification";
import { AuthContext } from "../../../../contexts/AuthContext";

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
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
          <label htmlFor="name">Category Image</label>
          <input
            type="text"
            name="categoryImage"
            placeholder="https://games..."
            id="categoryImage"
            value={values[FORM_VALUES.CategoryImage]}
            onChange={onChange}
          />
        </div>
        {values[FORM_VALUES.CategoryImage] === "" ? (
          <img src="/src/assets/no-image.jpg" alt={values[FORM_VALUES.Name]} />
        ) : (
          <img
            src={values[FORM_VALUES.CategoryImage]}
            alt={values[FORM_VALUES.Name]}
          />
        )}

        <button type="submit">Add</button>
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
