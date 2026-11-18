import { Link, useSearchParams } from "react-router-dom";
import styles from "./SearchedProducts.module.css";
import { useEffect, useState } from "react";
import { searchProducts } from "../../data/services/productService";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductCard/ProductGrid";
import useTitle from "../../hooks/useTitle";
import Spinner from "../Spinner/Spinner";

const SearchedProducts = () => {
  useTitle(`Search Results | KolPlace`);
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const term = (searchParams.get("for") || "").trim();

  useEffect(() => {
    if (term === "") {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    searchProducts(term)
      .then((data) => {
        if (ignore) return;
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        console.log(err);
        setProducts([]);
        setIsLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [term]);

  const count = products.length;

  return (
    <section className={styles["page"]}>
      <div className={styles["heading"]}>
        <p className={styles["eyebrow"]}>Search</p>
        <h1 className={styles["title"]}>
          {term ? (
            <>
              Results for <span>&ldquo;{term}&rdquo;</span>
            </>
          ) : (
            "Search products"
          )}
        </h1>
        {term && !isLoading && (
          <p className={styles["count"]}>
            {count} {count === 1 ? "product" : "products"} found
          </p>
        )}
      </div>

      {isLoading ? (
        <Spinner />
      ) : count > 0 ? (
        <ProductGrid>
          {products.map((p) => (
            <ProductCard key={p._id} {...p} />
          ))}
        </ProductGrid>
      ) : (
        <div className={styles["empty"]}>
          <span className={styles["empty-icon"]} aria-hidden="true">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <h2 className={styles["empty-title"]}>
            {term ? "No products matched your search" : "Type something to search"}
          </h2>
          <p className={styles["empty-text"]}>
            {term
              ? "Check the spelling, try a more general word, or browse the shop instead."
              : "Use the search box at the top of the page to find products."}
          </p>
          <Link to="/" className={styles["button"]}>
            Back to shopping
          </Link>
        </div>
      )}
    </section>
  );
};

export default SearchedProducts;
