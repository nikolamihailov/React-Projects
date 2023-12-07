import styles from "../../Filters.module.css";

const FilterReviewsBySort = ({ onChange }) => {
  return (
    <div className={styles["filters"]}>
      <select name="filters" id="filters" onChange={onChange}>
        <option value="createdAt-asc">Oldest</option>
        <option value="createdAt-desc">Newest</option>
        <option value="rating-asc">Rating Asc</option>
        <option value="rating-desc">Rating Desc</option>
      </select>
    </div>
  );
};

export default FilterReviewsBySort;
