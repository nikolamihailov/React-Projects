import { useCallback, useEffect, useState } from "react";
import styles from "./Products.module.css";
import AddProductItem from "./AddProductItem/AddProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    setProducts(["op"]);
  }, []);

  const onCloseAdd = useCallback(() => setIsAddOpen(false), []);

  return (
    <div className={styles["admin-products"]}>
      <h1>All Products</h1>

      <div className={styles["admin-products-top"]}>
        <button onClick={() => setIsAddOpen(true)}>
          Add product <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>

      <div className={styles["admin-products-container"]}>
        {products?.length > 0 ? <h3>Opa</h3> : <h2>No products</h2>}
      </div>
      {isAddOpen && <AddProductItem onClose={onCloseAdd} />}
    </div>
  );
};

export default Products;
