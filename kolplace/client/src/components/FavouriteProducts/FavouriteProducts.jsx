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
      <div className={styles["hero"]}>
        <div className={styles["hero-text"]}>
          <p className={styles["eyebrow"]}>Your list</p>
          <h1 className={styles["title"]}>Favourite products</h1>
          <p className={styles["subtitle"]}>
            Products you saved with the heart button, ready when you are.
          </p>
        </div>
        <div className={styles["hero-media"]}>
          <img src={favouritesBanner} alt="Favourites" />
        </div>
      </div>

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
