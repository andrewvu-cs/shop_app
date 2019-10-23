import React from "react";
import { useSelector } from "react-redux";
import {
  ScrollView,
  View,
  Image,
  Button,
  Text,
  StyleSheet
} from "react-native";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.pid === productId)
  );

  return (
    <View style={styles.screen}>
      <Text>{selectedProduct.description}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductDetailScreen;
