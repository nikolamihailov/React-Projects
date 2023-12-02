import styles from "../../Filters.module.css";

const FilterUsersBySort = ({ onChange }) => {
  return (
    <div className={styles["filters"]}>
      <select name="filters" id="filters" onChange={onChange}>
        <option value="createdAt-asc">Oldest</option>
        <option value="createdAt-desc">Newest</option>
        <option value="firstName-asc">Name (a-z)</option>
        <option value="firstName-desc">Name (z-a)</option>
        <option value="admins">Admins</option>
      </select>
    </div>
  );
};

export default FilterUsersBySort;
