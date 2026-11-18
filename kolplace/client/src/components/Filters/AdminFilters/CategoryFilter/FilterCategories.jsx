import FilterSelect from "../../FilterSelect/FilterSelect";

const FilterCategories = ({ onChange }) => (
  <FilterSelect label="Sort by" id="category-sort" name="category-sort" onChange={onChange}>
    <option value="createdAt-asc">Oldest</option>
    <option value="createdAt-desc">Newest</option>
    <option value="name-asc">Name (A-Z)</option>
    <option value="name-desc">Name (Z-A)</option>
  </FilterSelect>
);

export default FilterCategories;
