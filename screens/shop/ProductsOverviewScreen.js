import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";
import { Platform } from "@unimodules/core";

const ProductsOverviewScreen = props => {
  /* useSelector recieves the state, use the state => products (set up in our reducer (App.js)) 
      => availableProducts slice (set up in reducers/products.js) */
  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  const renderProductItem = itemData => {
    return (
      <ProductItem
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => {
          props.navigation.navigate("ProductDetails", {
            productId: itemData.item.pid,
            productTitle: itemData.item.title
          });
        }}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.pid}
      data={products}
      renderItem={renderProductItem}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigate.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
              navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
