import styles from "./ProductItem.module.css";

const ProductItem = ({ _id, name, mainImage, price, openEdit, openDelete }) => {
  return (
    <div className={styles["admin-product-item"]}>
      <div>
        <button onClick={() => openEdit(_id)} title={"Edit Item"}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={() => openDelete(_id)} title={"Delete Item"}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <img src={mainImage} alt={name} />
      <h2>{name}</h2>
      <p>${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductItem;
