import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";
import {
  getCart,
  addToCart,
  emptyCart,
  removeProduct,
} from "../data/services/shoppingCartService";

export const ShoppingCartContext = createContext();

const reducer = (state, action) => {
  switch (action?.type) {
    case "INIT":
      return {
        ...state,
        products: action.products,
        totalPrice:
          action.products.length > 0
            ? action.products.reduce((total, p) => {
                const price = p.product.hasPromoPrice
                  ? p.product.promoPrice
                  : p.product.price;
                return total + price * p.quantity;
              }, 0)
            : 0,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        products: action.products,
        totalPrice: action.products.reduce((total, p) => {
          const price = p.product.hasPromoPrice
            ? p.product.promoPrice
            : p.product.price;
          return total + price * p.quantity;
        }, 0),
      };
    case "REMOVE_CART_PRODUCT":
      return {
        ...state,
        products: action.products,
        totalPrice: action.products.reduce((total, p) => {
          const price = p.product.hasPromoPrice
            ? p.product.promoPrice
            : p.product.price;
          return total + price * p.quantity;
        }, 0),
      };
    case "EMPTY_CART":
      return {
        products: action.products,
        totalPrice: 0,
      };

    case "CHANGE_PRODUCT_QUANTITY":
      return {
        products: action.products,
        totalPrice: action.products.reduce((total, p) => {
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
    async (product, quantity = 1) => {
      const hasItem = cart.products.find((p) => p.product._id === product._id);
      if (hasItem) quantity = hasItem.quantity + 1;
      // console.log(hasItem);
      // console.log(quantity);
      const updatedProducts = await addToCart(userShoppingCartId, {
        product: product._id,
        quantity,
      });
      console.log(updatedProducts);
      dispatch({
        type: "ADD_TO_CART",
        products: updatedProducts.products,
      });
    },
    [userShoppingCartId, cart.products]
  );

  const removeCartProduct = useCallback(
    async (productId) => {
      const updatedCart = await removeProduct(userShoppingCartId, {
        productId,
      });
      dispatch({
        type: "REMOVE_CART_PRODUCT",
        products: updatedCart.products,
      });
    },
    [userShoppingCartId]
  );

  const emptyCartProducts = useCallback(async () => {
    const emptiedCart = await emptyCart(userShoppingCartId);
    dispatch({
      type: "EMPTY_CART",
      products: emptiedCart.products,
    });
  }, [userShoppingCartId]);

  const changeProductQuantity = useCallback(
    async (productId, quantity) => {
      const updated = await addToCart(userShoppingCartId, {
        product: productId,
        quantity,
      });

      dispatch({ type: "CHANGE_PRODUCT_QUANTITY", products: updated.products });
    },
    [userShoppingCartId]
  );

  const ctxValues = {
    cart,
    addProductToCart,
    emptyCartProducts,
    removeCartProduct,
    changeProductQuantity,
  };

  return (
    <ShoppingCartContext.Provider value={ctxValues}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
