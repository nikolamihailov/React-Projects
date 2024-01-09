import { useCallback, useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { getAll } from "../../data/services/storeService";
import Store from "./StoreItem/Store";
import styles from "./OurStores.module.css";
import { motion, AnimatePresence } from "framer-motion";
import StoreMap from "./StoreMap/StoreMap";
import Spinner from "../Spinner/Spinner";

const OurStores = () => {
  useTitle("Our Stores | KolPlace");
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isBigMapOpen, setIsBigMapOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAll().then((data) => {
      setStores(data);
      setIsLoading(false);
    });
  }, []);

  const onClose = useCallback(() => setIsBigMapOpen(false), []);
  const openBigMap = useCallback((id) => {
    setSelectedStore(id);
    setIsBigMapOpen(true);
  }, []);

  return (
    <section className={styles["our-stores-section"]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1>Our Stores</h1>
          <div className={styles["info"]}>
            <p>
              Since 2020, our stores have been curating an extensive collection
              to bring you the latest trends in gadgets, fashion, books, and
              beyond. Immerse yourself in the joy of discovery as we strive to
              cater to your diverse tastes. Whether you&apos;re a tech
              enthusiast, a fashionista, or a bookworm, KolPlace stores are
              designed to elevate your shopping experience. Join us and indulge
              in a one-stop-shop where variety meets convenience, and your
              satisfaction is our top priority.
            </p>
          </div>
          <motion.div className={styles["stores"]}>
            <AnimatePresence>
              {stores.length > 0 &&
                stores.map((s) => {
                  return <Store key={s._id} {...s} openBigMap={openBigMap} />;
                })}
            </AnimatePresence>
          </motion.div>
          {isBigMapOpen && <StoreMap id={selectedStore} onClose={onClose} />}
        </>
      )}
    </section>
  );
};
export default OurStores;
