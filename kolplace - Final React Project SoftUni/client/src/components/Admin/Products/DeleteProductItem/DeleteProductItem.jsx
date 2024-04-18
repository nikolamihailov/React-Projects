import { useContext, useEffect, useState } from "react";
import styles from "./DeleteProduct.module.css";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { getOneProduct, deleteProduct } from "../../../../data/services/productService";
import Spinner from "../../../Spinner/Spinner";

const DeleteProductItem = ({ onClose, id, updateProducts }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getOneProduct(id)
      .then((data) => setProduct(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  const onDelete = async () => {
    const deletedProduct = await deleteProduct(id);
    if (deletedProduct.expMessage) {
      updateNotifs([{ text: deletedProduct.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    if (deletedProduct.error) {
      updateNotifs([{ text: deletedProduct.error, type: "error" }]);
    } else {
      updateProducts((products) => products.filter((p) => p._id !== deletedProduct._id));
      updateNotifs([
        {
          text: `Product - ${deletedProduct.name} deleted!`,
          type: "success",
        },
      ]);
      onClose();
      navigateTo("/admin-panel/products");
    }
  };
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className={styles["delete-product"]}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <p>
              Are you sure you want to delete the product <span>{product?.name}</span>?
            </p>
            <div>
              <button onClick={onDelete}>Ok</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DeleteProductItem;
