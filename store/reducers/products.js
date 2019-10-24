import PRODUCTS from "../../data/product-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.uid === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.pid !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          product => product.pid !== action.pid
        )
      };
  }
  return state;
};
