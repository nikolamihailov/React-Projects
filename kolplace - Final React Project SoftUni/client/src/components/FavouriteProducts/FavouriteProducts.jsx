import { useContext, useEffect } from "react";
import { FavouriteProductsContext } from "../../contexts/FavouriteProductsContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FavouriteProducts.module.css";
import FavouriteProductItem from "./FavouriteProductItem/FavouriteProductItem";
import useTitle from "../../hooks/useTitle";

const FavouriteProducts = () => {
  useTitle("Favourite Products | KolPlace");
  const { favProducts, removeProductFromFavouritesList } = useContext(
    FavouriteProductsContext
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles["favourite-products-section"]}>
      <div>
        <h1>Favourite Products</h1>
        <img
          className={styles["promotion-banner-image"]}
          src="/src/assets/favourites.png"
          alt="promotions-banner"
        />
      </div>
      <hr />

      <div>
        <div className={styles["sort-and-info"]}>
          <p>
            Your Favourite Products:{" "}
            <span>{favProducts.favouriteProducts.length}</span>
          </p>
        </div>
      </div>
      <motion.div layout className={styles["products"]}>
        <AnimatePresence>
          {favProducts.favouriteProducts.length > 0 ? (
            favProducts.favouriteProducts.map((p) => {
              return (
                <FavouriteProductItem
                  key={p._id}
                  {...p}
                  removeProductFromFavouritesList={
                    removeProductFromFavouritesList
                  }
                />
              );
            })
          ) : (
            <h2>You have no favourite products!</h2>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FavouriteProducts;
