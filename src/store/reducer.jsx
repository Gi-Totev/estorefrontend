import data from "../data";

const reducer = (state, action) => {
  return { products: data.products };
};

export default reducer;
