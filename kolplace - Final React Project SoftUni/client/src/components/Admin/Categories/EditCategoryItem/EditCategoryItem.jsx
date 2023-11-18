import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editCategory } from "../../../../data/services/categoryService";
import { v4 as uuidv4 } from "uuid";
import styles from "../AddCategoryItem/AddCategory.module.css";
import { NotifContext } from "../../../../contexts/NotificationContext";
import Notification from "../../../Notifications/Notification";
import { getOneCategory } from "../../../../data/services/categoryService";

const FORM_VALUES = {
  Name: "name",
  CategoryImage: "categoryImage",
};

const EditCategoryItem = ({ onClose, id }) => {
  const navigateTo = useNavigate();
  const [errors, setErrors] = useState([]);
  const { updateNotifs } = useContext(NotifContext);

  const [values, setValues] = useState({
    [FORM_VALUES.Name]: "",
    [FORM_VALUES.CategoryImage]: "",
  });
  useEffect(() => {
    getOneCategory(id).then((data) =>
      setValues({
        [FORM_VALUES.Name]: data.name,
        [FORM_VALUES.CategoryImage]: data.categoryImage,
      })
    );
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
    setErrors([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedCategory = await editCategory(id, values);
    if (editedCategory.errors) {
      setErrors(Object.values(editedCategory.errors));
    } else {
      updateNotifs([
        { text: `Category - ${editedCategory.name} updated!`, type: "success" },
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
            value={values[FORM_VALUES.Name] || ""}
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
            value={values[FORM_VALUES.CategoryImage] || ""}
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

export default EditCategoryItem;
