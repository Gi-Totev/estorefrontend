import React, { useReducer, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { detailsOrder, payOrder } from "../actions/orderActions";
import { orderDetailsReducer, orderPayReducer } from "../reducers/orderReducer";
import { Store } from "../store/store";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import Axios from "axios";

const OrderDetails = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(orderDetailsReducer, context);
  const [payState, payDispatch] = useReducer(orderPayReducer, context);
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = props.match.params.id;
  const { order, loading = true, error } = state;
  const {
    error: errorPay,
    success: successPay,
    loading: loadingPay,
  } = payState;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";

      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order?._id || successPay || (order && order._id !== orderId)) {
      payDispatch({ type: ORDER_PAY_RESET });
      detailsOrder(dispatch, orderId, context.userInfo.token);
    } else {
      if (!order?.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, sdkReady, payState, orderId]);

  const successPaymentHandler = (paymentResult) => {
    payOrder(payDispatch, order, paymentResult, context.userInfo.token);
  };

  if (order) {
    console.log(order);
    console.log(payState);
  }

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    order !== undefined && (
      <div>
        <h1>Order {order._id}</h1>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address:</strong> {order.shippingAddress.address}{" "}
                    <br />
                    <strong>City:</strong> {order.shippingAddress.city} <br />
                    <strong>Counry:</strong> {order.shippingAddress.country}{" "}
                    <br />
                    <strong>ZIP:</strong> {order.shippingAddress.zip} <br />
                  </p>
                  {order?.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">
                      "Not delivered yet"
                    </MessageBox>
                  )}
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment</h2>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order?.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">"Not paid yet"</MessageBox>
                  )}
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Order Items</h2>
                  <ul>
                    {order.orderItems.map((item) => (
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
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
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
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping Price</div>
                    <div>${order.shipping.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>
                      <strong>Order Total</strong>
                    </div>
                    <div>
                      <strong>${order.total.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay === true && <LoadingBox></LoadingBox>}
                        <PayPalButton
                          amount={order.total}
                          onSuccess={successPaymentHandler}
                        ></PayPalButton>
                      </>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderDetails;
