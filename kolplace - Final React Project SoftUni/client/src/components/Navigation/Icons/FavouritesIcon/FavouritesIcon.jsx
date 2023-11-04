import styles from "../Icons.module.css";

const FavouritesIcon = () => {
  return (
    <>
      <button
        className={styles["icon-btn"]}
        title="Favourite Products"
      >
        <i className="fa-regular fa-heart"></i>
        <span>0</span>
      </button>
    </>
  );
};
export default FavouritesIcon;
