import FilterSelect from "../FilterSelect/FilterSelect";

const FilterProductsBySort = ({ onChange, value }) => (
  <FilterSelect label="Sort by" id="products-sort" name="filters" value={value} onChange={onChange}>
    <option value="createdAt-asc">Oldest</option>
    <option value="createdAt-desc">Newest</option>
    <option value="name-asc">Name (A-Z)</option>
    <option value="name-desc">Name (Z-A)</option>
    <option value="price-asc">Price (low to high)</option>
    <option value="price-desc">Price (high to low)</option>
    <option value="reviews">Most reviewed</option>
  </FilterSelect>
);

export default FilterProductsBySort;
