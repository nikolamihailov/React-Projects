import { useEffect, useState } from "react";
import styles from "../../Filters.module.css";
import { getAll } from "../../../../data/services/categoryService";

const FilterProductsByCategory = ({ onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  });
  return (
    <div className={styles["filters"]}>
      <select name="filters" id="filters" onChange={onChange}>
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
