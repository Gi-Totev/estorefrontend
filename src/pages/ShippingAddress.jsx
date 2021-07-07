import React, { useState, useReducer, useContext } from "react";
import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps";
import { Store } from "../store/store";
import { saveShippingAddress } from "../actions/cartActions";
import { cartReducer } from "../reducers/cartReducer";

const ShippingAddress = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(cartReducer, context);

  const [fullName, setFullName] = useState(
    state.shippingAddress ? state?.shippingAddress.fullName : ""
  );
  const [country, setCountry] = useState(
    state.shippingAddress ? state?.shippingAddress.country : ""
  );
  const [city, setCity] = useState(
    state.shippingAddress ? state?.shippingAddress.city : ""
  );
  const [zip, setZip] = useState(
    state.shippingAddress ? state?.shippingAddress.zip : ""
  );
  const [address, setAddress] = useState(
    state.shippingAddress ? state?.shippingAddress.address : ""
  );

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress(dispatch, fullName, address, city, country, zip);
    props.history.push("/payment");
  };

  if (!state.userInfo) {
    props.history.push("/signin");
  }

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Full Name</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">Full Name</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Full Name</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zip">Full Name</label>
          <input
            type="text"
            id="zip"
            placeholder="Enter Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;
