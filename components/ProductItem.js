import React from "react";
import {
  ImageBackground,
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const ProductItem = props => {
  return (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.mealHeader}>
          <ImageBackground source={{ uri: props.imageUrl }} style={styles.bgImg}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mealDetails}>
          <Button style={styles.button} title="Detils" onPress={() => {}} />
          <Text>$ {props.price} </Text>
          <Button style={styles.button}title="Cart" onPress={() => {}} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10
  },
  mealHeader: {
    height: '85%',
    flexDirection: 'row'
  },    
  bgImg:{
      width: '100%',
      height: '100%'
  },
  titleContainer:{
      paddingHorizontal: 12,
      paddingVertical: 5,
      backgroundColor:  "rgba(0,0,0,0.6)"
  },    
  title:{
      textAlign: "center",
      fontSize: 20,
      color: 'white'
  },
  mealDetails:{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: '15%',
      paddingHorizontal: 0,
      borderTopWidth: 2,
      borderTopColor: 'red',
      alignContent:'center'
  },
  button:{
    alignSelf: 'center'
  }

});

export default ProductItem;
