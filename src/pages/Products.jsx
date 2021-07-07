import React, { useContext, useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating/Rating";
import { Store } from "../store/store";
import { detailsProduct } from "../actions/productActions";
import { productDetailsReducer } from "../reducers/productReducers";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";

const DisplayProduct = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(productDetailsReducer, context);

  const { loading, product, error } = state;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    detailsProduct(dispatch, props.match.params.id);
  }, [props.match.params.id]);

  if (!product) {
    return <div className="alert-danger">Product not Found</div>;
  }

  const addToCart = () => {
    props.history.push(`/cart/${product._id}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Results</Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    reviews={product.numReviews}
                  />
                </li>
                <li>Price: $ {product.price}</li>
                <li>
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button className="primary block" onClick={addToCart}>
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayProduct;
