import { AdminFilterSelect } from "../../../Admin/AdminListPage/AdminListPage";

const FilterReviewsBySort = ({ onChange }) => (
  <AdminFilterSelect label="Sort by" id="review-sort" name="review-sort" onChange={onChange}>
    <option value="createdAt-asc">Oldest</option>
    <option value="createdAt-desc">Newest</option>
    <option value="rating-asc">Rating (low to high)</option>
    <option value="rating-desc">Rating (high to low)</option>
  </AdminFilterSelect>
);

export default FilterReviewsBySort;
