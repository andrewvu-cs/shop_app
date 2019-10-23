import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/ProductItem";
import { PRODUCTS } from '../../data/product-data';

const ProductsOverviewScreen = props => {
  /* useSelector recieves the state, use the state => products (set up in our reducer (App.js)) 
      => availableProducts slice (set up in reducers/products.js) */
  const products = useSelector(state => state.products.availableProducts);

  const renderProductItem = itemData => {
    return (
      <ProductItem
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.pid}
      data={ products }
      renderItem={renderProductItem}
    />
  );
};


ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
