import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import ProductItem from "../../components/ProductItem";
import { PRODUCTS } from "../../data/product-data";

const ProductsOverviewScreen = props => {
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
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={PRODUCTS}
        renderItem={renderProductItem}
      />
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverviewScreen;
