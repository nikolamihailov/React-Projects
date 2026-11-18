import { useContext } from "react";
import styles from "../Icons.module.css";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FavouriteProductsContext } from "../../../../contexts/FavouriteProductsContext";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";

const FavouritesIcon = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { favProducts } = useContext(FavouriteProductsContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  return (
    <>
      <button
        className={styles["icon-btn"]}
        title="Favourite Products"
        onClick={() => {
          if (isAuthenticated) {
            navigateTo("/favourite-products");
          } else {
            updateNotifs([
              {
                text: "You need to be signed in to view favourite products!",
                type: "error",
              },
            ]);
            navigateTo("/login");
          }
        }}
      >
        <i className="fa-regular fa-heart"></i>
        {isAuthenticated && <span>{favProducts.favouriteProducts.length}</span>}
      </button>
    </>
  );
};
export default FavouritesIcon;
