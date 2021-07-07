import React, { useState, useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { cartReducer } from "../reducers/cartReducer";
import { Store } from "../store/store";

const Cart = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(cartReducer, context);
  const [empty, setEmpty] = useState(true);

  const productId = props.match.params.id;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (productId) {
      addToCart(dispatch, productId, qty, state);
    }
    setEmpty(!state.cartItems.length ? true : false);
  }, [dispatch, productId, qty]);

  useEffect(() => {
    setEmpty(!state.cartItems.length ? true : false);
  }, [state.cartItems.length]);

  const removeFromCartHandler = (id) => {
    removeFromCart(dispatch, id, state);
    setEmpty(!state.cartItems.length ? true : false);
  };

  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {empty ? (
          <div>
            Cart is Empty <Link to="/">Go to Store</Link>
          </div>
        ) : (
          <ul>
            {state.cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div className="">
                    <img className="small" src={item.image} alt={item.name} />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCart(
                          dispatch,
                          item.product,
                          parseInt(e.target.value),
                          state
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="">${item.price}</div>
                  <div className="">
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({state.cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                items) : $
                {state.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                className="primary block"
                type="button"
                onClick={() => checkOutHandler()}
                disabled={state.cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
