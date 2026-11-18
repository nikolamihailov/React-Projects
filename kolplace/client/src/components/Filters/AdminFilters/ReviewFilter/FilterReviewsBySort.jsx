import FilterSelect from "../../FilterSelect/FilterSelect";

const FilterReviewsBySort = ({ onChange }) => (
  <FilterSelect label="Sort by" id="review-sort" name="review-sort" onChange={onChange}>
    <option value="createdAt-asc">Oldest</option>
    <option value="createdAt-desc">Newest</option>
    <option value="rating-asc">Rating (low to high)</option>
    <option value="rating-desc">Rating (high to low)</option>
  </FilterSelect>
);

export default FilterReviewsBySort;
