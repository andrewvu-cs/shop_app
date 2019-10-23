import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import ProductItem from '../../components/ProductItem';

const ProductsOverviewScreen = props => {
  return (
    <View style={styles.screen}>
      <ProductItem/>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;
