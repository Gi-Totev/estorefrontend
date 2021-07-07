import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import Axios from "axios";

export const addToCart = async (dispatch, productId, qty, state) => {
  try {
    const { data } = await Axios.get(
      `https://estorebackenddemo.herokuapp.com/api/products/${productId}`
    );

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        qty,
      },
    });
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  } catch {
    console.log("A");
  }
};

export const removeFromCart = (dispatch, productId, state) => {
  try {
    dispatch({ type: CART_DELETE_ITEM, payload: productId });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(state.cartItems.filter((x) => x.product !== productId))
    );
  } catch {
    console.log("D");
  }
};

export const saveShippingAddress = (
  dispatch,
  fullName,
  address,
  city,
  country,
  zip
) => {
  const data = { fullName, address, city, country, zip };
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (dispatch, paymentMethod) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
