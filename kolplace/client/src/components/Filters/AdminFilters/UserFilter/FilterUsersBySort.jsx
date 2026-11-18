import { AdminFilterSelect } from "../../../Admin/AdminListPage/AdminListPage";

const FilterUsersBySort = ({ onChange }) => (
  <AdminFilterSelect label="Show" id="user-sort" name="user-sort" onChange={onChange}>
    <option value="createdAt-asc">Oldest</option>
    <option value="createdAt-desc">Newest</option>
    <option value="firstName-asc">Name (A-Z)</option>
    <option value="firstName-desc">Name (Z-A)</option>
    <option value="admins">Admins only</option>
  </AdminFilterSelect>
);

export default FilterUsersBySort;
