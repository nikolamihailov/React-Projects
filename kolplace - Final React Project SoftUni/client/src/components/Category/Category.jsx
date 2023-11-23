import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCategoryByName } from "../../data/services/categoryService";
import { NotifContext } from "../../contexts/NotificationContext";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllFromCategory } from "../../data/services/productService";
import ProductItem from "./ProductItem/ProductItem";

import styles from "./Category.module.css";

const Category = () => {
  const { name } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, productsData] = await Promise.all([
          getOneCategoryByName(name),
          getAllFromCategory(name),
        ]);

        if (categoryData.expMessage) {
          updateNotifs([{ text: categoryData.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        if (categoryData.nonExisting) {
          updateNotifs([{ text: categoryData.nonExisting, type: "error" }]);
          navigateTo("/error");
        }
        setCategory(categoryData);

        if (productsData.expMessage) {
          updateNotifs([{ text: productsData.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        setProducts(productsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [name, updateAuth, updateNotifs, navigateTo]);

  return (
    <section className={styles["category-section"]}>
      <div>
        <h1>{category?.name}</h1>
        <img
          className={styles["category-banner-image"]}
          src={category?.categoryImage}
          alt={category?.name}
        />
        <p>Hello there!</p>
      </div>

      <div className={styles["products"]}>
        {products.length > 0 ? (
          products.map((p) => {
            return <ProductItem key={p._id} {...p} />;
          })
        ) : (
          <h2>No products in this category!</h2>
        )}
      </div>
    </section>
  );
};

export default Category;
