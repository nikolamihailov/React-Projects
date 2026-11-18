import styles from "../../Filters.module.css";

const FilterCategories = ({ onChange }) => {
  return (
    <div className={styles["filters"]}>
      <select name="filters" id="filters" onChange={onChange}>
        <option value="createdAt-asc">Oldest</option>
        <option value="createdAt-desc">Newest</option>
        <option value="name-asc">Name (a-z)</option>
        <option value="name-desc">Name (z-a)</option>
      </select>
    </div>
  );
};

export default FilterCategories;
