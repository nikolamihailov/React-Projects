import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";
import {
  addProductToFavourites,
  getFavouriteProducts,
  removeProductFromFavourites,
} from "../data/services/userService";
import { NotifContext } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

export const FavouriteProductsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        favouriteProducts: action.products,
      };
    case "ADD_PRODUCT":
    case "REMOVE_PRODUCT":
      return {
        ...state,
        favouriteProducts: action.products,
      };
    default:
      return state;
  }
};
export const FavouriteProductsProvider = ({ children }) => {
  const { auth, updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();
  const [favProducts, dispatch] = useReducer(reducer, {
    favouriteProducts: [],
  });
  // console.log(auth.user._id);

  useEffect(() => {
    if (auth.user?._id) {
      getFavouriteProducts(auth.user?._id)
        .then((data) => {
          if (data.expMessage) {
            updateNotifs([{ text: data.expMessage, type: "error" }]);
            navigateTo("/login");
            updateAuth({});
          }
          dispatch({
            type: "INIT",
            products: data,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [auth.user?._id, navigateTo, updateAuth, updateNotifs]);

  const addProductToFavouriteProducts = useCallback(
    async (productId) => {
      const updated = await addProductToFavourites(auth.user?._id, {
        productId,
      });
      if (updated.expMessage) {
        updateNotifs([{ text: updated.expMessage, type: "error" }]);
        navigateTo("/login");
        updateAuth({});
      }
      dispatch({
        type: "ADD_PRODUCT",
        products: updated,
      });
    },
    [auth.user?._id, navigateTo, updateAuth, updateNotifs]
  );

  const removeProductFromFavouritesList = useCallback(
    async (productId) => {
      const updated = await removeProductFromFavourites(auth.user?._id, {
        productId,
      });
      if (updated.expMessage) {
        updateNotifs([{ text: updated.expMessage, type: "error" }]);
        navigateTo("/login");
        updateAuth({});
      }
      dispatch({
        type: "REMOVE_PRODUCT",
        products: updated,
      });
    },
    [auth.user?._id, navigateTo, updateAuth, updateNotifs]
  );

  const canAddProduct = useCallback(
    (productId) => {
      const product = favProducts.favouriteProducts.find(
        (p) => p._id === productId
      );
      return product ? false : true;
    },
    [favProducts.favouriteProducts]
  );

  const ctxValues = {
    favProducts,
    addProductToFavouriteProducts,
    canAddProduct,
    removeProductFromFavouritesList,
  };

  return (
    <FavouriteProductsContext.Provider value={ctxValues}>
      {children}
    </FavouriteProductsContext.Provider>
  );
};
