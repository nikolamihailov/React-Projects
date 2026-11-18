import FilterSelect from "../../FilterSelect/FilterSelect";

const FilterUsersBySort = ({ onChange }) => (
  <FilterSelect label="Show" id="user-sort" name="user-sort" onChange={onChange}>
    <option value="createdAt-asc">Oldest</option>
    <option value="createdAt-desc">Newest</option>
    <option value="firstName-asc">Name (A-Z)</option>
    <option value="firstName-desc">Name (Z-A)</option>
    <option value="admins">Admins only</option>
  </FilterSelect>
);

export default FilterUsersBySort;
