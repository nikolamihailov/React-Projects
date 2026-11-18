import { useEffect, useState } from "react";
import styles from "./Stats.module.css";
import { getAllCategoriesAdmin } from "../../../data/services/categoryService";
import { getAllOrdersAdmin } from "../../../data/services/orderService";
import { getAllProductsAdmin } from "../../../data/services/productService";
import { getAllReviewsAdmin } from "../../../data/services/reviewService";
import { getAllUsersAdmin } from "../../../data/services/userService";
import { getAllStoresAdmin } from "../../../data/services/storeService";
import Spinner from "../../Spinner/Spinner";

const Stats = () => {
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [storesCount, setStoresCount] = useState(0);
  const [orders, setOrders] = useState({
    count: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categories, products, reviews, users, stores, ordersData] =
          await Promise.all([
            getAllCategoriesAdmin(),
            getAllProductsAdmin(),
            getAllReviewsAdmin(),
            getAllUsersAdmin(),
            getAllStoresAdmin(),
            getAllOrdersAdmin(),
          ]);

        setCategoriesCount(categories);
        setProductsCount(products);
        setReviewsCount(reviews);
        setUsersCount(users);
        setStoresCount(stores);
        setOrders({
          count: ordersData.ordersCount,
          totalPrice: ordersData.totalPrice,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className={styles["admin-stats"]}>
      <h1>All Stats</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles["stats"]}>
          <div className={styles["count-stats-categories"]}>
            <h3>Total Categories:</h3> <span>{categoriesCount}</span>
          </div>
          <div className={styles["count-stats-products"]}>
            <h3>Total Products:</h3> <span>{productsCount}</span>
          </div>
          <div className={styles["count-stats-reviews"]}>
            <h3>Total Reviews:</h3> <span>{reviewsCount}</span>
          </div>
          <div className={styles["count-stats-users"]}>
            <h3>Total Users:</h3> <span>{usersCount}</span>
          </div>
          <div className={styles["count-stats-stores"]}>
            <h3>Total Stores:</h3> <span>{storesCount}</span>
          </div>
          <div className={styles["count-stats-orders"]}>
            <h3>Total Orders:</h3> <span>{orders?.count}</span>
          </div>
          <div className={styles["total-profit-sales"]}>
            <h3>Total Profit in Sales:</h3>{" "}
            <span>${orders?.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Stats;
