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
import { NotifContext } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext();

const reducer = (state, action) => {
  switch (action?.type) {
    case "INIT":
      return {
        ...state,
        products: action.products,
        totalPrice:
          action.products?.length > 0
            ? action.products?.reduce((total, p) => {
                const price = p.product.hasPromoPrice
                  ? p.product.promoPrice
                  : p.product.price;
                return total + price * p.quantity;
              }, 0)
            : 0,
      };
    case "ADD_TO_CART":
    case "REMOVE_CART_PRODUCT":
    case "CHANGE_PRODUCT_QUANTITY":
      return {
        products: action.products,
        totalPrice: action.products?.reduce((total, p) => {
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
    default:
      return state;
  }
};
export const ShoppingCartProvider = ({ children }) => {
  const { auth, updateAuth } = useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  const userShoppingCartId = auth.user?.shoppingCart;

  const [cart, dispatch] = useReducer(reducer, {
    products: [],
    totalPrice: 0,
  });

  useEffect(() => {
    if (!userShoppingCartId) {
      dispatch({
        type: "EMPTY_CART",
        products: [],
      });
    }
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
      const updatedProducts = await addToCart(userShoppingCartId, {
        product: product._id,
        quantity,
      });
      if (updatedProducts.expMessage) {
        updateNotifs([{ text: updatedProducts.expMessage, type: "error" }]);
        navigateTo("/login");
        updateAuth({});
      }
      dispatch({
        type: "ADD_TO_CART",
        products: updatedProducts.products,
      });
    },
    [userShoppingCartId, cart.products, navigateTo, updateAuth, updateNotifs]
  );

  const removeCartProduct = useCallback(
    async (productId) => {
      const updatedCart = await removeProduct(userShoppingCartId, {
        productId,
      });
      if (updatedCart.expMessage) {
        updateNotifs([{ text: updatedCart.expMessage, type: "error" }]);
        navigateTo("/login");
        updateAuth({});
      }
      dispatch({
        type: "REMOVE_CART_PRODUCT",
        products: updatedCart.products,
      });
    },
    [userShoppingCartId, navigateTo, updateAuth, updateNotifs]
  );

  const emptyCartProducts = useCallback(async () => {
    const emptiedCart = await emptyCart(userShoppingCartId);
    if (emptiedCart.expMessage) {
      updateNotifs([{ text: emptiedCart.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }
    dispatch({
      type: "EMPTY_CART",
      products: emptiedCart.products,
    });
  }, [userShoppingCartId, navigateTo, updateAuth, updateNotifs]);

  const changeProductQuantity = useCallback(
    async (productId, quantity) => {
      const updated = await addToCart(userShoppingCartId, {
        product: productId,
        quantity,
      });
      if (updated.expMessage) {
        updateNotifs([{ text: updated.expMessage, type: "error" }]);
        navigateTo("/login");
        updateAuth({});
      }

      dispatch({ type: "CHANGE_PRODUCT_QUANTITY", products: updated.products });
    },
    [userShoppingCartId, navigateTo, updateAuth, updateNotifs]
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
