import styles from "../Filters.module.css";

const FilterProductsBySort = ({ onChange, value }) => {
  return (
    <div className={styles["filters"]}>
      <select name="filters" id="filters" value={value} onChange={onChange}>
        <option value="createdAt-asc">Oldest</option>
        <option value="createdAt-desc">Newest</option>
        <option value="name-asc">Name (a-z)</option>
        <option value="name-desc">Name (z-a)</option>
        <option value="price-asc">Price asc</option>
        <option value="price-desc">Price desc</option>
        <option value="reviews">Most commented</option>
      </select>
    </div>
  );
};

export default FilterProductsBySort;
