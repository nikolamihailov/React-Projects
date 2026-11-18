import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../AdminModal/AdminModal";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { getOneProduct, deleteProduct } from "../../../../data/services/productService";

const DeleteProductItem = ({ onClose, id, updateProducts }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
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
      return;
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
  const confirmDelete = async () => {
    setIsBusy(true);
    try {
      await onDelete();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <ConfirmDialog
      title="Delete product"
      onConfirm={confirmDelete}
      onClose={onClose}
      isLoading={isLoading}
      isBusy={isBusy}
    >
      <p>
          Delete <strong>{product?.name}</strong>? Its reviews are removed and it is taken out of every
          cart and favourites list. This can&apos;t be undone.
        </p>
    </ConfirmDialog>
  );
};

export default DeleteProductItem;
