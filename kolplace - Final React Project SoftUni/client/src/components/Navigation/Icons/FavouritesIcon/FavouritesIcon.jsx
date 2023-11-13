import { useContext } from "react";
import styles from "../Icons.module.css";
import { AuthContext } from "../../../../contexts/AuthContext";

const FavouritesIcon = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <button className={styles["icon-btn"]} title="Favourite Products">
        <i className="fa-regular fa-heart"></i>
        {isAuthenticated && <span>0</span>}
      </button>
    </>
  );
};
export default FavouritesIcon;
