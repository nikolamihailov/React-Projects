import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import { NotifContext } from "../contexts/NotificationContext";
import { FavouriteProductsContext } from "../contexts/FavouriteProductsContext";

// Cart and favourite actions shared by product cards and the product page,
// including the "sign in first" redirect for guests.
const useProductActions = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { cart, addProductToCart } = useContext(ShoppingCartContext);
  const { canAddProduct, addProductToFavouriteProducts, removeProductFromFavouritesList } =
    useContext(FavouriteProductsContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  const requireSignIn = useCallback(
    (text) => {
      updateNotifs([{ text, type: "error" }]);
      navigateTo("/login");
    },
    [updateNotifs, navigateTo]
  );

  const addToCart = useCallback(
    (product) => {
      if (!isAuthenticated) return requireSignIn("You need to be signed in to buy products!");
      const alreadyIn = cart.products.some((p) => p.product?._id === product._id);
      addProductToCart(product);
      updateNotifs([
        {
          text: alreadyIn ? "Product already in cart, quantity increased!" : `${product.name} added to cart!`,
          type: "success",
        },
      ]);
    },
    [isAuthenticated, cart.products, addProductToCart, updateNotifs, requireSignIn]
  );

  const isFavourite = useCallback(
    (productId) => isAuthenticated && !canAddProduct(productId),
    [isAuthenticated, canAddProduct]
  );

  const toggleFavourite = useCallback(
    (product) => {
      if (!isAuthenticated) return requireSignIn("You need to be signed in to add to favourite products!");
      if (isFavourite(product._id)) {
        removeProductFromFavouritesList(product._id);
        updateNotifs([{ text: `${product.name} removed from favourites!`, type: "success" }]);
      } else {
        addProductToFavouriteProducts(product._id);
        updateNotifs([{ text: `${product.name} added to favourites!`, type: "success" }]);
      }
    },
    [isAuthenticated, isFavourite, removeProductFromFavouritesList, addProductToFavouriteProducts, updateNotifs, requireSignIn]
  );

  return { addToCart, isFavourite, toggleFavourite };
};

export default useProductActions;
