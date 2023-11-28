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
  const { auth } = useContext(AuthContext);
  const [favProducts, dispatch] = useReducer(reducer, {
    favouriteProducts: [],
  });
  // console.log(auth.user._id);

  useEffect(() => {
    if (auth.user?._id) {
      getFavouriteProducts(auth.user?._id)
        .then((data) => {
          dispatch({
            type: "INIT",
            products: data,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [auth.user?._id]);

  const addProductToFavouriteProducts = useCallback(
    async (productId) => {
      console.log(productId);
      const updated = await addProductToFavourites(auth.user?._id, {
        productId,
      });
      console.log(updated);
      dispatch({
        type: "ADD_PRODUCT",
        products: updated,
      });
    },
    [auth.user?._id]
  );

  const removeProductFromFavouritesList = useCallback(
    async (productId) => {
      console.log(productId);
      const updated = await removeProductFromFavourites(auth.user?._id, {
        productId,
      });
      console.log(updated);
      dispatch({
        type: "REMOVE_PRODUCT",
        products: updated,
      });
    },
    [auth.user?._id]
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
