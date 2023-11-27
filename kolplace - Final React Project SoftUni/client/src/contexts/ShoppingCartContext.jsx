import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";
import { getCart, addToCart } from "../data/services/shoppingCartService";

export const ShoppingCartContext = createContext();

const reducer = (state, action) => {
  switch (action?.type) {
    case "INIT":
      return {
        ...state,
        products: action.products,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        products: [...state.products, action.product],
        totalPrice: state.products.reduce((total, p) => {
          const price = p.product.hasPromoPrice
            ? p.product.promoPrice
            : p.product.price;
          return total + price * p.quantity;
        }, 0),
      };
    default:
      return state;
  }
};
export const ShoppingCartProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const userShoppingCartId = auth.user?.shoppingCart;

  const [cart, dispatch] = useReducer(reducer, {
    products: [],
    totalPrice: 0,
  });

  useEffect(() => {
    if (userShoppingCartId) {
      getCart(userShoppingCartId)
        .then((data) => {
          dispatch({
            type: "INIT",
            products: data.products,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [userShoppingCartId]);

  const addProductToCart = useCallback(
    async (product, count = 1) => {
      await addToCart(userShoppingCartId, {
        product: product._id,
        count,
      });
      dispatch({
        type: "ADD_TO_CART",
        product: { product, count },
      });
    },
    [userShoppingCartId]
  );

  const ctxValues = {
    cart,
    addProductToCart,
  };

  return (
    <ShoppingCartContext.Provider value={ctxValues}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
