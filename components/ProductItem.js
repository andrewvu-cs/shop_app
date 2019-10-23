import React from "react";
import {
  Image,
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import Colors from "../constants/Colors";

const ProductItem = props => {
  // Gives Opacity effect for ios, ripple effect for android
  let TouchFeedback = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchFeedback = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchFeedback onPress={props.onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
              <Text style={styles.price}>$ {props.price.toFixed(2)} </Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={props.onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={props.onAddToCart}
              />
            </View>
          </View>
        </TouchFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden"
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    height: "100%",
    width: "100%"
  },
  details: {
    alignItems: "center",
    height: "20%",
    padding: 10
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'open-sans-bold'
  },
  price: {
    alignSelf: "center",
    fontSize: 14,
    color: "#888",
    fontFamily: 'open-sans'
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 20
  }
});

export default ProductItem;
