import FilterSelect from "../../FilterSelect/FilterSelect";

const FilterProductsBySort = ({ onChange }) => (
  <FilterSelect label="Sort by" id="product-sort" name="product-sort" onChange={onChange}>
    <option value="createdAt-asc">Oldest</option>
    <option value="createdAt-desc">Newest</option>
    <option value="name-asc">Name (A-Z)</option>
    <option value="name-desc">Name (Z-A)</option>
    <option value="price-asc">Price (low to high)</option>
    <option value="price-desc">Price (high to low)</option>
  </FilterSelect>
);

export default FilterProductsBySort;
