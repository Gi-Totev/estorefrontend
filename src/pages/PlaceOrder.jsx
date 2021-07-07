import React, { useReducer, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps";
import { orderReducer } from "../reducers/orderReducer";
import { Store } from "../store/store";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import { CART_EMPTY } from "../constants/cartConstants";

const PlaceOrder = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(orderReducer, context);

  const [itemPrice, setItemPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    userInfo,
    success,
    error,
    loading,
    order,
  } = state;

  if (!paymentMethod) {
    props.history.push("/payment");
  }

  const convertToPrice = (num) => Number(num.toFixed(2));

  useEffect(() => {
    setItemPrice(
      convertToPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    );
    setShipping(itemPrice > 100 ? convertToPrice(0) : convertToPrice(10));
    setTaxPrice(convertToPrice(0.2 * itemPrice));
    setTotal(convertToPrice(taxPrice + itemPrice + shipping));
  }, [
    cartItems,
    itemPrice,
    setItemPrice,
    shipping,
    setShipping,
    taxPrice,
    setTaxPrice,
    total,
    setTotal,
  ]);

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_EMPTY });
      state.cartItems = [];
      dispatch({ type: ORDER_CREATE_RESET });
      props.history.push(`/order/${order._id}`);
    }
  }, [dispatch, order, props.history, success]);

  const placeOrderHandler = () => {
    createOrder(dispatch, {
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      userInfo,
      itemsPrice: itemPrice,
      taxPrice,
      shipping,
      total,
    });
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {shippingAddress.fullName} <br />
                  <strong>Address:</strong> {shippingAddress.address} <br />
                  <strong>City:</strong> {shippingAddress.city} <br />
                  <strong>Counry:</strong> {shippingAddress.country} <br />
                  <strong>ZIP:</strong> {shippingAddress.zip} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div className="">
                          <img
                            className="small"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${itemPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping Price</div>
                  <div>${shipping.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  className="primary block"
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && (
                <MessageBox variant="danger" value={error}></MessageBox>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
