import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_EMPTY,
} from "../constants/cartConstants";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems?.find(
        (x) => x.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        state.cartItems.push(item);
        return { ...state };
      }
    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => {
          return x.product !== action.payload;
        }),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
