import React, { useContext, useEffect, useReducer } from "react";
import Product from "../components/Product/Product";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import { productListReducer } from "../reducers/productReducers";
import { Store } from "../store/store";
import { listProducts } from "../actions/productActions";

const Home = () => {
  const context = useContext(Store);

  const [state, dispatch] = useReducer(productListReducer, context);

  const { loading, error, products } = state;

  useEffect(() => {
    listProducts(dispatch);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
