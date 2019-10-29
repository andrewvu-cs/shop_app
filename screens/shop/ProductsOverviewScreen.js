import React, { useEffect } from "react";
import { FlatList, Button, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

const ProductsOverviewScreen = props => {
  /* useSelector recieves the state, use the state => products (set up in our reducer (App.js)) 
      => availableProducts slice (set up in reducers/products.js) */
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.fetchProducts());
  }, [dispatch]);

  const selectItemHandler = (pid, title) => {
    props.navigation.navigate("ProductDetails", {
      productId: pid,
      productTitle: title
    });
  };

  const renderProductItem = itemData => {
    return (
      <ProductItem
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          selectItemHandler(itemData.item.pid, itemData.item.title);
        }}
      >
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={() => {
            selectItemHandler(itemData.item.pid, itemData.item.title);
          }}
        />
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      </ProductItem>
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
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
