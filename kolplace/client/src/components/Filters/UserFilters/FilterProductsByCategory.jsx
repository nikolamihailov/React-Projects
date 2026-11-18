import { useContext, useEffect, useState } from "react";
import styles from "../Filters.module.css";
import { getAll } from "../../../data/services/categoryService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { NotifContext } from "../../../contexts/NotificationContext";

const FilterProductsByCategory = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    getAll()
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, [updateNotifs, navigateTo, updateAuth]);

  return (
    <div className={styles["filters"]}>
      <select name="filtersCategory" id="filtersCategory" onChange={onChange}>
        <option value="all">All</option>
        {categories?.map((c) => {
          return (
            <option value={c._id} key={c._id}>
              {c.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterProductsByCategory;
