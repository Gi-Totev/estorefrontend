import Axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = async (dispatch, order) => {
  console.log(order);
  dispatch({ type: ORDER_CREATE_REQUEST, payload: { order } });

  try {
    const { data } = await Axios.post(
      "https://estorebackenddemo.herokuapp.com/api/orders",
      order,
      {
        headers: { auth: `Bearer ${order.userInfo.token}` },
      }
    );
    console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: ORDER_CREATE_RESET });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = async (dispatch, orderId, token) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const { data } = await Axios.get(
      `https://estorebackenddemo.herokuapp.com/api/orders/${orderId}`,
      {
        headers: { auth: `Bearer ${token}` },
      }
    );
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder = async (dispatch, order, paymentResult, token) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });

  try {
    const { data } = await Axios.put(
      `https://estorebackenddemo.herokuapp.com/api/orders/${order._id}/pay`,
      paymentResult,
      { headers: { auth: `Bearer ${token}` } }
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const listOrder = async (dispatch, state) => {
  dispatch({ type: ORDER_LIST_REQUEST });

  const { userInfo } = state;

  try {
    const { data } = await Axios.get(
      "https://estorebackenddemo.herokuapp.com/api/orders/mine",
      {
        headers: { auth: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};
