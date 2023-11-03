import styles from "../Icons.module.css";

const FavouritesIcon = () => {
  return (
    <>
      <button
        className={styles["icon-btn"]}
        title="Favourite Products"
      >
        <i className="fa-regular fa-heart"></i>
      </button>
    </>
  );
};
export default FavouritesIcon;
