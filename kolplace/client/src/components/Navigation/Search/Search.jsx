import { useCallback, useRef, useState } from "react";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../../data/services/productService";
import DropdownSearch, { MAX_RESULTS } from "./DropdownSearch/DropdownSearch";

const resultsUrl = (term) => `/products/search?for=${encodeURIComponent(term)}`;

const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // -1 = nothing highlighted; 0..n-1 = a product row; n = "See all results".
  const [activeIndex, setActiveIndex] = useState(-1);
  const requestId = useRef(0);
  const inputRef = useRef(null);
  const navigateTo = useNavigate();

  const onChange = useCallback((e) => {
    const { value } = e.target;
    setSearch(value);
    setActiveIndex(-1);

    if (value.trim() === "") {
      requestId.current += 1;
      setProducts([]);
      setIsLoading(false);
      return;
    }

    // Only the latest request may update the list (typing fires many).
    const id = ++requestId.current;
    setIsLoading(true);
    searchProducts(value)
      .then((data) => {
        if (id !== requestId.current) return;
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (id !== requestId.current) return;
        console.log(err);
        setProducts([]);
        setIsLoading(false);
      });
  }, []);

  const onClose = useCallback(() => {
    requestId.current += 1;
    setProducts([]);
    setSearch("");
    setIsLoading(false);
    setActiveIndex(-1);
  }, []);

  const onClear = () => {
    onClose();
    inputRef.current?.focus();
  };

  const visibleCount = Math.min(products.length, MAX_RESULTS);
  const isOpen = search.trim() !== "";
  // Rows reachable by keyboard: the products plus "See all" (when there are results).
  const rowCount = visibleCount > 0 ? visibleCount + 1 : 0;

  const onSubmit = (e) => {
    e.preventDefault();
    const term = search.trim();
    if (!term) return;

    let target = resultsUrl(term);
    if (activeIndex >= 0 && activeIndex < visibleCount) {
      target = `/products/${products[activeIndex]._id}`;
    }
    onClose();
    navigateTo(target);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (!rowCount) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % rowCount);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? rowCount - 1 : i - 1));
    }
  };

  return (
    <div className={styles["search"]}>
      <form role="search" className={styles["form"]} onSubmit={onSubmit}>
        <label htmlFor="search" className={styles["visually-hidden"]}>
          Search products
        </label>
        <span className={styles["icon"]} aria-hidden="true">
          <i className="fa fa-search"></i>
        </span>
        <input
          ref={inputRef}
          className={styles["input"]}
          type="search"
          id="search"
          name="search"
          value={search}
          onChange={onChange}
          onKeyDown={onKeyDown}
          maxLength={25}
          placeholder="Search products..."
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-activedescendant={
            activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
          }
        />
        {search !== "" && (
          <button
            type="button"
            className={styles["clear"]}
            onClick={onClear}
            aria-label="Clear search"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        )}
        <button type="submit" className={styles["visually-hidden"]}>
          Search
        </button>
      </form>

      <DropdownSearch
        products={products}
        search={search}
        isLoading={isLoading}
        activeIndex={activeIndex}
        onHover={setActiveIndex}
        onClose={onClose}
        resultsUrl={resultsUrl(search.trim())}
      />
    </div>
  );
};

export default Search;
