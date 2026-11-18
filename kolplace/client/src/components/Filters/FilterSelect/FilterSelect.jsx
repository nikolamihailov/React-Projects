import styles from "./FilterSelect.module.css";

// Labelled dropdown used for every filter and sort control, in the shop and the admin panel.
const FilterSelect = ({ label, id, children, ...props }) => (
  <label className={styles["filter"]} htmlFor={id}>
    <span>{label}</span>
    <select id={id} {...props}>
      {children}
    </select>
  </label>
);

export default FilterSelect;
