import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import productsReducer from "./store/reducers/products.js";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ProductsOverviewScreen />
    </Provider>
  );
}
