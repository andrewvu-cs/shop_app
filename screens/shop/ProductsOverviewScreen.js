import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  /* useSelector recieves the state, use the state => products (set up in our reducer (App.js)) 
      => availableProducts slice (set up in reducers/products.js) */
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    console.log('LOAD PRODUCtS');
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  },[dispatch, setIsLoading, setError]);

  // whenever the component is loaded
  useEffect(() => {
    setIsLoading(true);
    loadProducts();
    setIsLoading(false);
  }, [dispatch, loadProducts]);

  // drawer navigation is saved in memory re-render will not happpen 
  // stack navigation is 
  // need to create a navigation listner
  useEffect(()=> {
    const willFocusSub = props.navigation.addListener('willFocus', () => {
      loadProducts();
    })
    // cleanup
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

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

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred! </Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.primary}/>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverviewScreen;
