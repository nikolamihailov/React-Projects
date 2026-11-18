import { useCallback, useState } from "react";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../../data/services/productService";
import DropdownSearch from "./DropdownSearch/DropdownSearch";

const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();

  const onChange = useCallback((e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      setSearch(value);
      setProducts([]);
    }
    //
    // console.log(searchParams.get("searched"));
    // console.log(search);
    if (value.trim() !== "") {
      setSearch(value);

      searchProducts(value)
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const onClose = useCallback(() => {
    setProducts([]);
    setSearch("");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    onClose();
    navigateTo(`/products/search?for=${encodeURIComponent(search)}`);
  };

  return (
    <div className={styles["search-bar-container"]}>
      <form onSubmit={onSubmit}>
        <div className={styles["search-bar"]}>
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={onChange}
            maxLength={25}
            placeholder="Search..."
          />
        </div>
      </form>

      <DropdownSearch products={products} search={search} onClose={onClose} />
    </div>
  );
};

export default Search;
