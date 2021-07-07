import React, { useState, useContext, useReducer } from "react";
import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps";
import { cartReducer } from "../reducers/cartReducer";
import { Store } from "../store/store";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentMethod = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(cartReducer, context);
  const [paymentMethod, setPaymentMethod] = useState(state.paymentMethod);

  if (!state.shippingAddress) {
    props.history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(dispatch, paymentMethod);
    console.log(state);
    dispatch({ type: 0 });
    console.log(state);
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input
              name="paymentMethod"
              type="radio"
              id="paypal"
              value="PayPal"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              name="paymentMethod"
              type="radio"
              id="stripe"
              value="Stripe"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
