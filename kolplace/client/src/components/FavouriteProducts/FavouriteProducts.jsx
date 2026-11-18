import { useContext, useEffect } from "react";
import { FavouriteProductsContext } from "../../contexts/FavouriteProductsContext";
import styles from "./FavouriteProducts.module.css";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductCard/ProductGrid";
import useTitle from "../../hooks/useTitle";
import ListToolbar from "../Filters/ListToolbar/ListToolbar";
import favouritesBanner from "../../assets/favourites.png";

const FavouriteProducts = () => {
  useTitle("Favourite Products | KolPlace");
  const { favProducts } = useContext(FavouriteProductsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles["favourite-products-section"]}>
      <div>
        <h1>Favourite Products</h1>
        <img
          className={styles["favourites-banner-image"]}
          src={favouritesBanner}
          alt="favourites-banner"
        />
      </div>
      <hr />

      <div>
        <ListToolbar
          count={favProducts.favouriteProducts.length}
          label={favProducts.favouriteProducts.length === 1 ? "favourite product" : "favourite products"}
        />
      </div>
      <ProductGrid>
          {favProducts.favouriteProducts.length > 0 ? (
            favProducts.favouriteProducts.map((p) => {
              return (
                <ProductCard
                  key={p._id}
                  {...p}
                />
              );
            })
          ) : (
            <h2>You have no favourite products!</h2>
          )}
      </ProductGrid>
    </section>
  );
};

export default FavouriteProducts;
