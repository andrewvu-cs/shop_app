import React from "react";
import {
    ScrollView,
    View,
    Image,
    Button,
    StyleSheet,
    Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DefaultText from "../../components/UI/DefaultText";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.pid === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <DefaultText style={styles.price}>
        ${selectedProduct.price.toFixed(2)}
      </DefaultText>
      <DefaultText style={styles.description}>
        {selectedProduct.description}
      </DefaultText>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

var { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: height * 0.33
  },
  actions: {
    marginVertical: 10,
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;
